import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
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

// import pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Booking from "./pages/Booking";
import OurTeam from "./pages/OurTeam";
import Maintenance from "./pages/Maintenance";
import LightGallery from "./pages/LightGallery";
import ComingSoon from "./pages/ComingSoon";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Registor from "./pages/Registor";
import ContectUs from "./pages/ContectUs";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Classic from "./pages/Classic";
import ClassicSidebar from "./pages/ClassicSidebar";
import DetailGrid from "./pages/DetailGrid";
import BlogGridSidebar from "./pages/BlogGridSidebar";
import LeftImageSideBar from "./pages/LeftImageSideBar";
import BlogDetail from "./pages/BlogDetail";
import PortfolioGrid2 from "./pages/PortfolioGrid2";
import PortfolioGrid3 from "./pages/PortfolioGrid3";
import ShopColumn from "./pages/ShopColumn";
import ShopColumnSidebar from "./pages/ShopColumnSidebar";
import ShopProductDetails from "./pages/ShopProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import ShopLogin from "./pages/ShopLogin";
import ShopRegister from "./pages/ShopRegister";
import ScrollTop from "./element/ScrollTop";
import Home2 from "./pages/Home2";
import Home3 from "./pages/Home3";
import Menu2 from "./element/Menu2";
import { IMAGE } from "./constent/theme";
import { Home4 } from "./pages/Home4";
import Home5 from "./pages/Home5";
import Home6 from "./pages/Home6";
import Header3 from "./components/Header3";
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
              <Route path="/home" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/light-gallery" element={<LightGallery />} />
              <Route path="/error-404" element={<Error404 />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registor" element={<Registor />} />
              <Route path="/contect-us" element={<ContectUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services-details" element={<ServiceDetail />} />
              <Route path="/classic" element={<Classic />} />
              <Route path="/classic-sidebar" element={<ClassicSidebar />} />
              <Route path="/detailed-grid" element={<DetailGrid />} />
              <Route
                path="/detailed-grid-sidebar"
                element={<BlogGridSidebar />}
              />
              <Route
                path="/left-image-sidebar"
                element={<LeftImageSideBar />}
              />
              <Route path="/blog-details" element={<BlogDetail />} />
              <Route path="/portfolio-grid-3" element={<PortfolioGrid2 />} />
              <Route path="/portfolio" element={<PortfolioGrid3 />} />
              <Route path="/shop-columns" element={<ShopColumn />} />
              <Route
                path="/shop-column-sidebar"
                element={<ShopColumnSidebar />}
              />
              <Route path="/product-details" element={<ShopProductDetails />} />
              <Route path="/shop-cart" element={<Cart />} />
              <Route path="/shop-checkout" element={<Checkout />} />
              <Route path="/shop-wishlist" element={<Wishlist />} />
              <Route path="/shop-login" element={<ShopLogin />} />
              <Route path="/shop-register" element={<ShopRegister />} />
            </Route>
            <Route element={<Layout2 />}>
              <Route path="/under-maintenance" element={<Maintenance />} />
            </Route>
            <Route element={<Layout3 />}>
              <Route path="/coming-soon" element={<ComingSoon />} />
            </Route>
            <Route element={<Layout4 />}>
              <Route path="/" element={<Home2 />} />
              <Route path="/home-2" element={<Home2 />} />
            </Route>
            <Route element={<Layout5 />}>
              <Route path="/home-3" element={<Home3 />} />
            </Route>
            <Route element={<Layout6 />}>
              <Route path="/home-4" element={<Home4 />} />
            </Route>
            <Route element={<Layout7 />}>
              <Route path="/home-5" element={<Home5 />} />
            </Route>
            <Route element={<Layout8 />}>
              <Route path="/home-6" element={<Home6 />} />
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
function Layout2() {
  return (
    <>
      <Outlet />
    </>
  );
}
function Layout3() {
  return (
    <>
      <Outlet />
    </>
  );
}

function Layout4() {
  return (
    <>
      <Header2 />
      <Outlet />
      <Footer />
    </>
  );
}

function Layout5() {
  return (
    <>
      <header className="site-header header mo-left" style={{ zIndex: 100 }}>
        <Menu2 button={""} img={IMAGE.logo3} img2={IMAGE.logoBlack} />
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

function Layout6() {
  return (
    <>
      <header
        className="site-header header header-transparent mo-left spa-header"
        style={{ zIndex: 110 }}
      >
        <Menu2
          img={IMAGE.logo4}
          img2={IMAGE.logoBlack}
          button={
            <div className="extra-nav">
              <div className="extra-cell">
                <Link to="/booking" className="site-button radius-no">
                  Book Now
                </Link>
              </div>
            </div>
          }
        />
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

function Layout7() {
  return (
    <>
      <header
        className="site-header header header-transparent mo-left spa-header "
        style={{ zIndex: 100 }}
      >
        <Menu2
          img={IMAGE.logoWhite3}
          img2={IMAGE.logoBlack}
          button={
            <div className="extra-nav">
              <div className="extra-cell">
                <Link to="/booking" className="site-button radius-no">
                  Book Now
                </Link>
              </div>
            </div>
          }
        />
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

function Layout8() {
  return (
    <>
      <Header3 />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
