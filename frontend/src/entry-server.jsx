import React, { StrictMode, Suspense } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { BaseUrl } from "./utils/BaseUrl";
import { Provider } from "react-redux";
import { store } from "./store/store";
export async function render(url) {
  console.log('SSR render called with URL:', url);
  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
  const cleanUrl = normalizedUrl.endsWith("/")
    ? normalizedUrl.slice(0, -1)
    : normalizedUrl;

  // Remove query parameters
  const baseUrl = cleanUrl.split("?")[0];
  
  console.log('SSR URL processing:', {
    originalUrl: url,
    normalizedUrl,
    cleanUrl,
    baseUrl
  });
  
  const helmetContext = {};
  let serverData = null;
  let CategoryProducts = null;
  let homePageData = null; // For home page: products, FAQ, banner

  try {
    // Handle different routes - check in order of specificity
    // Check for home page - baseUrl will be "" or "/" after cleaning
    const isHomePage = baseUrl === "/" || baseUrl === "" || normalizedUrl === "/" || url === "/";
    console.log('SSR: Is home page?', isHomePage, { baseUrl, normalizedUrl, url });
    
    if (isHomePage) {
      // Handle home page - fetch multiple data sources
      console.log('SSR: Fetching home page data...');
      try {
        const [productsRes, faqRes, bannerRes] = await Promise.allSettled([
          axios.get(`${BaseUrl}/products/getAll?page=1&perPage=8`),
          axios.get(`${BaseUrl}/faq/getAll`),
          axios.get(`${BaseUrl}/banner/getAll`)
        ]);

        console.log('SSR: Products result:', productsRes.status, productsRes.status === 'fulfilled' ? productsRes.value?.data?.status : productsRes.reason?.message);
        console.log('SSR: FAQ result:', faqRes.status, faqRes.status === 'fulfilled' ? faqRes.value?.data?.status : faqRes.reason?.message);
        console.log('SSR: Banner result:', bannerRes.status, bannerRes.status === 'fulfilled' ? bannerRes.value?.data?.data?.length : bannerRes.reason?.message);

        homePageData = {
          topProducts: productsRes.status === 'fulfilled' && productsRes.value?.data?.status === 'success' 
            ? productsRes.value.data.data 
            : [],
          faqs: faqRes.status === 'fulfilled' && faqRes.value?.data?.status === 'success'
            ? faqRes.value.data.data
            : [],
          banner: bannerRes.status === 'fulfilled' && bannerRes.value?.data?.data?.[0]
            ? bannerRes.value.data.data[0]
            : null
        };
        
        console.log('SSR: Home page data prepared:', {
          topProducts: homePageData.topProducts?.length || 0,
          faqs: homePageData.faqs?.length || 0,
          banner: homePageData.banner ? 'present' : 'null',
          homePageDataObject: homePageData
        });
      } catch (homeErr) {
        console.error('SSR: Home page data fetch error:', homeErr.message, homeErr.stack);
      }

    } else if (baseUrl.startsWith("/blog/")) {
      // Handle blog route
      const slug = baseUrl.split("/")[2];
      try {
        const { data } = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
        serverData = data?.data;
      } catch (blogErr) {
        console.error('SSR: Blog fetch error:', blogErr.message);
        // Continue without serverData
      }

    } else if (baseUrl.startsWith("/category/")) {
      // Handle sub-category route
      const slug = baseUrl.split("/")[2];
      try {
        const { data } = await axios.get(`${BaseUrl}/redis/category/get?slug=${slug}`);
        serverData = data?.data;

        if (serverData?._id) {
          try {
            const { data: productData } = await axios.get(
              `${BaseUrl}/products/categoryProducts/${serverData._id}`
            );
            CategoryProducts = productData?.data;
          } catch (productErr) {
            console.error('SSR: Category products fetch error:', productErr.message);
          }
        }
      } catch (categoryErr) {
        console.error('SSR: Category fetch error:', categoryErr.message);
        // Continue without serverData
      }

    } else if (baseUrl.startsWith("/product/")) {
      // Handle product route
      const slug = baseUrl.split("/")[2];
      try {
        const { data } = await axios.get(`${BaseUrl}/products/get?slug=${slug}`);
        serverData = data?.data;
      } catch (productErr) {
        console.error('SSR: Product fetch error:', productErr.message);
        // Continue without serverData
      }

    } else if (baseUrl !== "/" && baseUrl !== "" && baseUrl.split("/").length === 2) {
      // Handle category/brand route (e.g., /fashion-apparel-packaging-boxes)
      const slug = baseUrl.split("/")[1];
      try {
        const { data } = await axios.get(`${BaseUrl}/brands/get?slug=${slug}`);
        serverData = data?.data;
      } catch (brandErr) {
        console.error('SSR: Brand fetch error:', brandErr.message);
        // Continue without serverData
      }
    }
  } catch (err) {
    // On error → noindex meta
    console.error('SSR data fetch error:', err.message);
    // Don't set helmet on outer catch - let individual routes handle errors
  }

  // Render app with Suspense boundary to handle lazy loaded components
  let appHtml = '';
  try {
    appHtml = renderToString(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <Provider store={store}>
            <StaticRouter location={normalizedUrl}>
            
                <App serverData={serverData} CategoryProducts={CategoryProducts} homePageData={homePageData} />
              
            </StaticRouter>
          </Provider>
        </HelmetProvider>
      </StrictMode>
    );
  } catch (renderError) {
    console.error('SSR render error:', renderError.message);
    // Fallback HTML if render fails
    appHtml = '<div id="app"></div>';
    helmetContext.helmet = {
      meta: { toString: () => `<meta name="robots" content="noindex nofollow" />` },
    };
  }

  const { helmet } = helmetContext;

  // Ensure homePageData is set for home page even if fetch failed
  const isHomePage = baseUrl === "/" || baseUrl === "" || normalizedUrl === "/" || url === "/";
  if (isHomePage && !homePageData) {
    homePageData = { topProducts: [], faqs: [], banner: null };
  }
  
  const result = {
    html: appHtml,
    helmet: {
      title: helmet?.title?.toString() || "",
      meta: helmet?.meta?.toString() || "",
      link: helmet?.link?.toString() || "",
      script: helmet?.script?.toString() || "",
    },
    serverData: serverData || null,
    CategoryProducts: CategoryProducts || null,
    homePageData: homePageData || null,
  };
  
  console.log('SSR: Returning result:', {
    hasHtml: !!result.html,
    hasServerData: !!result.serverData,
    hasCategoryProducts: !!result.CategoryProducts,
    hasHomePageData: !!result.homePageData,
    homePageDataKeys: result.homePageData ? Object.keys(result.homePageData) : []
  });
  
  return result;
}
