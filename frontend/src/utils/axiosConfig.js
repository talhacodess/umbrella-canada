import axios from 'axios';

// Detect iOS Safari
export const isIOSSafari = () => {
  if (typeof window === 'undefined') return false;
  
  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isSafari = /safari/.test(ua) && !/chrome|crios|fxios/.test(ua);
  
  return isIOS && isSafari;
};

// Configure axios defaults for better iOS Safari compatibility
const axiosInstance = axios.create({
  timeout: 20000, // Increased timeout for iOS Safari (20 seconds)
  headers: {
    'Accept': 'application/json',
  },
  // iOS Safari specific configurations
  withCredentials: false, // Avoid CORS issues on iOS
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
});

// Request interceptor for iOS Safari
axiosInstance.interceptors.request.use(
  (config) => {
    // Don't set Content-Type for GET requests (let browser handle it)
    if (config.method === 'get' || config.method === 'GET') {
      delete config.headers['Content-Type'];
    } else {
      // Only set Content-Type for POST/PUT requests if not FormData
      if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
      } else {
        // For FormData, let browser set Content-Type with boundary
        delete config.headers['Content-Type'];
      }
    }
    
    // Add cache control headers for iOS Safari
    if (isIOSSafari()) {
      config.headers['Cache-Control'] = 'no-cache';
      config.headers['Pragma'] = 'no-cache';
    }
    
    // Log request for debugging on iOS Safari
    if (isIOSSafari() && process.env.NODE_ENV === 'development') {
      console.log('iOS Safari Request:', config.method, config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling for iOS Safari
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful response for debugging on iOS Safari
    if (isIOSSafari()) {
      console.log('✅ iOS Safari Response Success:', {
        status: response.status,
        url: response.config.url,
        hasData: !!response.data
      });
    }
    return response;
  },
  (error) => {
    // Enhanced error handling for iOS Safari
    if (isIOSSafari()) {
      console.error('iOS Safari API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        code: error.code,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      if (error.code === 'ECONNABORTED') {
        console.warn('Request timeout on iOS Safari - this may be due to network conditions');
      } else if (!error.response) {
        console.warn('Network error on iOS Safari - check internet connection');
        console.warn('Error details:', error.message);
      } else if (error.response.status >= 500) {
        console.warn('Server error on iOS Safari');
      } else if (error.response.status === 404) {
        console.warn('API endpoint not found');
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
