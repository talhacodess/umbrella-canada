
import { useLocation, useRoutes } from 'react-router-dom';
import WebsiteRoutes from './routes/WebsiteRoutes';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer/Footer';
import TopNav from './components/Header/TopNav';
import { Suspense, useEffect, useState } from 'react';
import Navbar from './components/Header/Navbar';
import WhatsAppFloat from './components/SocialMedia/WhatsAppModal';
import AnnouncementBanner from './components/AnnouncementBanner';
import PopupGlobal from './components/PopupGlobal/PopupGlobal';
function App({ serverData, CategoryProducts, homePageData }) {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState('');
 useEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
  setCurrentUrl(window.location.origin + location.pathname + location.search);
}, [location]);
  const routes = WebsiteRoutes({ serverData, CategoryProducts, homePageData })
  const element = useRoutes(routes);
  return (
    <>
    {/* sd */}
      <ToastContainer />
      <PopupGlobal/>
          <WhatsAppFloat
            phone="+17472470456"
            message={`Hello, I am reaching out to inquire about ${currentUrl}`}
            tooltip="WhatsApp us"
            bottomClass="bottom-5"
            leftClass="left-8"
          />
          <AnnouncementBanner />
          {/* <TopNav /> */}
          <Navbar />
          
          <Suspense fallback={<div id="app"></div>}>
            {element}
          </Suspense>
         
       <Footer />
    </>
  );
}


export default App;