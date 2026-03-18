import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useSearchParams,
} from "react-router-dom";
//import css file
import "./assets/css/plugins.css";
import "./assets/css/comman.css";
import "../node_modules/react-modal-video/css/modal-video.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "./assets/css/style.css";
import "./assets/css/templete.min.css";
import "./assets/css/skins.css";
import "./assets/plugins/smartwizard/css/smart_wizard.css";
// import components
import Header2 from "./components/Header2";
import Footer from "./components/Footer";

import AboutUs from "./pages/AboutUs";
import Booking from "./pages/Booking";
import Error404 from "./pages/Error404";
import ContectUs from "./pages/ContectUs";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Classic from "./pages/Classic";
import BlogDetail from "./pages/BlogDetail";
import PortfolioGrid3 from "./pages/PortfolioGrid3";
import ScrollTop from "./element/ScrollTop";
import Home2 from "./pages/Home2";
import { useState } from "react";
import AdminLoginPage from "./dashboard/pages/AdminLoginPage";
import AdminLandingPage from "./dashboard/pages/AdminLandingPage";

function App() {
  const [getscroll, setScroll] = useState(false);

  window.addEventListener("scroll", function () {
    window.scrollY > 640 ? setScroll(true) : setScroll(false);
  });
  return (
    <>
      <div className="page-wraper">
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home2 />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/home-2" element={<Navigate to="/" replace />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/services-details" element={<LegacyServiceRedirect />} />
              <Route path="/blog" element={<Classic />} />
              <Route path="/classic" element={<Navigate to="/blog" replace />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/blog-details" element={<LegacyBlogRedirect />} />
              <Route path="/portfolio" element={<PortfolioGrid3 />} />
              <Route path="/portfolio-grid-3" element={<Navigate to="/portfolio" replace />} />
              <Route path="/portfolio-grid-4" element={<Navigate to="/portfolio" replace />} />
              <Route path="/contact-us" element={<ContectUs />} />
              <Route path="/contect-us" element={<Navigate to="/contact-us" replace />} />
              <Route path="/error-404" element={<Error404 />} />
              <Route path="*" element={<Error404 />} />
            </Route>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminLandingPage />} />
          </Routes>
          <ScrollTop />
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="scroltop fa fa-chevron-up"
            style={{ display: `${getscroll === true ? "inline-block" : ""}` }}
          ></button>
        </Router>
      </div>
    </>
  );
}
function Layout() {
  return (
    <>
      <Header2 />
      <Outlet />
      <Footer />
    </>
  );
}

function LegacyServiceRedirect() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");

  if (slug) {
    return <Navigate to={`/services/${encodeURIComponent(slug)}`} replace />;
  }

  return <Navigate to="/services" replace />;
}

function LegacyBlogRedirect() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");

  if (slug) {
    return <Navigate to={`/blog/${encodeURIComponent(slug)}`} replace />;
  }

  return <Navigate to="/blog" replace />;
}

export default App;
