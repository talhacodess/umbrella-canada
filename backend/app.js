import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']); 
dns.setDefaultResultOrder('ipv4first'); // Forces IPv4 to avoid local resolution bugs
import express from "express";
import cluster from "cluster";
import os from "os";
import { connectDB } from "./config/database.js";
import ErrorMiddleware from "./middleware/Error.js";
import cors from "cors";
import bannerRouter from "./routes/bannerRoute.js";
import ContactusRouter from "./routes/contactusrouter.js";
import blogRouter from "./routes/blogRouter.js";
import blogProductRouter from "./routes/blogProductRouter.js";
import FaqRouter from "./routes/FaqRouter.js";
import adminRoute from "./routes/AdminRouter.js";
import productRouter from "./routes/ProductRouter.js";
import brandRouter from "./routes/BrandRouter.js";
import checkoutRouter from "./routes/CheckoutRouter.js";
import userRoute from "./routes/userRoute.js";
import categoryRouter from "./routes/MidCategoryRouter.js";
import ratingRoute from "./routes/RatingRouter.js";
import subscribeRouter from "./routes/SubscribeRouter.js";
import requestQuoteRouter from "./routes/RequestQuote.js";
import instantQuoteRouter from "./routes/InstantQuote.js";
import sitemapRouter from "./routes/sitemapRouter.js";
import { REDIS, redisClient }  from './redis_APIS/redis.js';
import popupRouter from "./routes/PopupRouter.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// SSR/Frontend imports
import fs from 'node:fs/promises';

const numCPUs = os.cpus().length;
const isProduction = process.env.NODE_ENV === 'production';

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server for ${numCPUs} CPUs`);

  // Fork workers based on CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit and restart
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });

  // Log worker online events
  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

} else {

   // Worker process - this is where your Express app runs
  console.log(`Worker ${process.pid} started`);


// Connect to database
connectDB();
const app = express();
app.use(express.static("static"));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware - Enhanced CORS for iOS Safari compatibility
app.use(cors({
  origin: '*', // Allow all origins (adjust in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'Pragma'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  credentials: false, // Set to false for iOS Safari compatibility
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


   
// const redisClient = redis.createClient({
//         socket: {
//         host: "31.97.14.21",
//         port: 6379,
//     },
//     username: "umbrella",
//     password: "umbrella123",
// });

// redisClient.connect()
//     .then(() => console.log("Connected to Redis"))
//     .catch(err => console.error("Redis connection error:", err));




app.use("/redis", REDIS);


// Backend API routes
app.use("/brands", brandRouter);
app.use("/user", userRoute);
app.use("/banner", bannerRouter);
app.use("/contactus", ContactusRouter);
app.use("/blog", blogRouter);
app.use("/blog-product", blogProductRouter);
app.use("/faq", FaqRouter);
app.use("/admin", adminRoute);
app.use("/category", categoryRouter);
app.use("/subcategory", categoryRouter); // Alias for subcategory routes
app.use("/products", productRouter);
app.use("/checkout", checkoutRouter);
app.use("/rating", ratingRoute);
app.use("/subscribe", subscribeRouter);
app.use("/requestQuote", requestQuoteRouter);
app.use("/instantQuote", instantQuoteRouter);
app.use("/", sitemapRouter);

// Popup form routes
app.use("/popup", popupRouter);

// Simple API test route 
app.get("/apis", async (req, res) => {
  res.send("App Is Running backend!");
});
// Error middleware for APIs
app.use(ErrorMiddleware);

// ================= SSR/Frontend optimization =================
// const isProduction = process.env.NODE_ENV === 'production';
const base = process.env.BASE || '/';

// Cache for production template and render function
let productionTemplate = '';
let productionRender = null;
let vite = null;

// Preload production assets in production mode
if (isProduction) {
  try {
    const templatePath = path.join(__dirname, '../frontend/dist/client/index.html');
    const serverEntryPath = path.join(__dirname, '../frontend/dist/server/entry-server.js');
    
    // Load assets in parallel
    const [template, serverModule] = await Promise.all([
      fs.readFile(templatePath, 'utf-8'),
      import(serverEntryPath)
    ]);
    
    productionTemplate = template;
    productionRender = serverModule.render;
    
    console.log('Production assets preloaded successfully');
  } catch (error) {
    console.error('Failed to preload production assets:', error);
    // Don't crash the server, but log the error
  }
} else {
  // Development mode - use Vite
  try {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
      root: path.join(__dirname, '../frontend'),
    });
    app.use(vite.middlewares);
  } catch (error) {
    console.error('Failed to start Vite:', error);
  }
}

// In production, serve static files with caching headers
if (isProduction) {
  try {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(base, sirv(path.join(__dirname, '../frontend/dist/client'), {
      extensions: [],
      maxAge: 31536000, // 1 year
      immutable: true
    }));
  } catch (error) {
    console.error('Failed to set up static file serving:', error);
  }
}

// Cache for rendered pages with LRU strategy
const ssrCache = new Map();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes cache
const MAX_CACHE_SIZE = 100; // Limit cache size to prevent memory issues

// Function to generate cache key from request
function getCacheKey(req) {
  return req.originalUrl;
}

// Function to clean up cache periodically
function cleanCache() {
  const now = Date.now();
  for (const [key, value] of ssrCache.entries()) {
    if (value.expiry < now) {
      ssrCache.delete(key);
    }
  }
  
  // Enforce size limit
  if (ssrCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(ssrCache.entries());
    // Remove oldest entries (first in the array)
    for (let i = 0; i < entries.length - MAX_CACHE_SIZE; i++) {
      ssrCache.delete(entries[i][0]);
    }
  }
}

setInterval(cleanCache, 60000);

app.use('*', async (req, res, next) => {
  const startTime = Date.now();
  const url = req.originalUrl;
  
  if (url.startsWith('/api/') || 
      url.startsWith('/_vite') || 
      url.includes('.')) {
    return next();
  }

  if (url.length > 1 && url.endsWith('/')) {
    const newUrl = url.slice(0, -1);
    return res.redirect(301, newUrl);
  }
  // Check cache first
  const cacheKey = getCacheKey(req);
  const cached = ssrCache.get(cacheKey);
  
  if (cached && cached.expiry > Date.now()) {
    res.set(cached.headers).status(200).send(cached.html);
    console.log(`SSR Cache hit for ${url}: ${Date.now() - startTime}ms`);
    return;
  }
  
  let template, render;
  let rendered = { html: '', helmet: {}, serverData: {} };
  
  try {
    if (!isProduction && vite) {
      // Development mode
      try {
        template = await fs.readFile(
          path.join(__dirname, '../frontend/index.html'), 
          'utf-8'
        );
        
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('../frontend/src/entry-server.jsx')).render;
      } catch (error) {
        console.error('Vite development error:', error);
        
      }
    } else if (isProduction && productionTemplate && productionRender) {
      // Production mode
      template = productionTemplate;
      render = productionRender;
    } else {
     
    }
    
    const renderPromise = render(url);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('SSR timeout')), 10000) // Increased to 10 seconds for API calls
    );
    
    // Race between render and timeout
    rendered = await Promise.race([renderPromise, timeoutPromise]);
    
    // Debug logging
    console.log(`SSR render result for ${url}:`, {
      hasHtml: !!rendered.html,
      hasServerData: !!rendered.serverData,
      hasCategoryProducts: !!rendered.CategoryProducts,
      hasHomePageData: !!rendered.homePageData,
      homePageDataKeys: rendered.homePageData ? Object.keys(rendered.homePageData) : []
    });
    
    // Prepare server data for injection
    const serverDataScript = rendered.serverData 
      ? `<script>window.__SERVER_DATA__ = ${JSON.stringify({ serverData: rendered.serverData })};</script>`
      : '<script>window.__SERVER_DATA__ = null;</script>';
    
    const categoryProductsScript = rendered.CategoryProducts
      ? `<script>window.__CATEGORY_PRODUCTS__ = ${JSON.stringify(rendered.CategoryProducts)};</script>`
      : '<script>window.__CATEGORY_PRODUCTS__ = null;</script>';

    const homePageDataScript = rendered.homePageData
      ? `<script>window.__HOME_PAGE_DATA__ = ${JSON.stringify(rendered.homePageData)};</script>`
      : '<script>window.__HOME_PAGE_DATA__ = null;</script>';
    
    console.log(`SSR scripts prepared for ${url}:`, {
      serverData: rendered.serverData ? 'present' : 'null',
      categoryProducts: rendered.CategoryProducts ? 'present' : 'null',
      homePageData: rendered.homePageData ? 'present' : 'null'
    });
    
    // Check if HTML content contains data (for SEO/view-source visibility)
    if (rendered.serverData) {
      const hasDataInHtml = rendered.html.includes(rendered.serverData.name || rendered.serverData.title || rendered.serverData.slug || '');
      console.log(`SSR: Data visible in HTML for ${url}:`, hasDataInHtml, {
        dataKey: rendered.serverData.name || rendered.serverData.title || rendered.serverData.slug || 'N/A'
      });
    }

    const html = template
      .replace(
        '<!--app-head-->',
        `\n${rendered.helmet?.title || ''}\n${rendered.helmet?.meta || ''}\n${rendered.helmet?.link || ''}\n${rendered.helmet?.script || ''}\n`
      )
      .replace('<!--app-html-->', rendered.html || '')
      .replace(
        '<!--server-data-->', 
        `${serverDataScript}\n${categoryProductsScript}\n${homePageDataScript}`
      );
    
    if (isProduction && res.statusCode === 200) {
      ssrCache.set(cacheKey, {
        html,
        headers: { 'Content-Type': 'text/html' },
        expiry: Date.now() + CACHE_TTL
      });
    }
    
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    console.log(`SSR completed for ${url}: ${Date.now() - startTime}ms`);
    
  } catch (e) {
    if (e.message === 'SSR timeout') {
      console.error(`SSR timeout for ${url}: ${Date.now() - startTime}ms`);
      
      if (template) {
        const fallbackHtml = template
          .replace('<!--app-head-->', '')
          .replace('<!--app-html-->', '<div id="app"></div>')
          .replace('<!--server-data-->', '<script>window.__SERVER_DATA__ = null;</script>\n<script>window.__CATEGORY_PRODUCTS__ = null;</script>\n<script>window.__HOME_PAGE_DATA__ = null;</script>');
        
        res.status(200).set({ 'Content-Type': 'text/html' }).send(fallbackHtml);
      } else {
        
      }
    } else {
      console.error('SSR Error:', e.stack);
     
    }
  }
});

// Start server
const PORT = process.env.PORT || 8000;
 app.listen(PORT, '0.0.0.0', () => {
    console.log(`Worker ${process.pid} is running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode`);
 });
}