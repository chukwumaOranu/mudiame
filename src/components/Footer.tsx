import { IMAGE } from "../constent/theme";
import { Link } from "react-router-dom";
import FooterGalleryCarousel from "./FooterGalleryCarousel";

const fallbackGalleryItems = [
  { thumbnail_url: IMAGE.gallery_thumbPic1, image_url: IMAGE.image_galleryPic1, title: "Footer Gallery 1" },
  { thumbnail_url: IMAGE.gallery_thumbPic2, image_url: IMAGE.image_galleryPic2, title: "Footer Gallery 2" },
  { thumbnail_url: IMAGE.gallery_thumbPic3, image_url: IMAGE.image_galleryPic3, title: "Footer Gallery 3" },
  { thumbnail_url: IMAGE.gallery_thumbPic4, image_url: IMAGE.image_galleryPic4, title: "Footer Gallery 4" },
  { thumbnail_url: IMAGE.gallery_thumbPic5, image_url: IMAGE.image_galleryPic5, title: "Footer Gallery 5" },
  { thumbnail_url: IMAGE.gallery_thumbPic6, image_url: IMAGE.image_galleryPic6, title: "Footer Gallery 6" },
  { thumbnail_url: IMAGE.gallery_thumbPic7, image_url: IMAGE.image_galleryPic7, title: "Footer Gallery 7" },
  { thumbnail_url: IMAGE.gallery_thumbPic8, image_url: IMAGE.image_galleryPic8, title: "Footer Gallery 8" },
  { thumbnail_url: IMAGE.gallery_thumbPic1, image_url: IMAGE.image_galleryPic1, title: "Footer Gallery 9" },
  { thumbnail_url: IMAGE.gallery_thumbPic2, image_url: IMAGE.image_galleryPic2, title: "Footer Gallery 10" },
  { thumbnail_url: IMAGE.gallery_thumbPic3, image_url: IMAGE.image_galleryPic3, title: "Footer Gallery 11" },
  { thumbnail_url: IMAGE.gallery_thumbPic4, image_url: IMAGE.image_galleryPic4, title: "Footer Gallery 12" },
  { thumbnail_url: IMAGE.gallery_thumbPic5, image_url: IMAGE.image_galleryPic5, title: "Footer Gallery 13" },
  { thumbnail_url: IMAGE.gallery_thumbPic6, image_url: IMAGE.image_galleryPic6, title: "Footer Gallery 14" },
  { thumbnail_url: IMAGE.gallery_thumbPic7, image_url: IMAGE.image_galleryPic7, title: "Footer Gallery 15" },
  { thumbnail_url: IMAGE.gallery_thumbPic8, image_url: IMAGE.image_galleryPic8, title: "Footer Gallery 16" },
];

const companyLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "Book Now", to: "/booking" },
  { label: "Contact Us", to: "/contact-us" },
];

const usefulLinks = [
  { label: "Our Products", to: "/services" },
  { label: "Beauty Blog", to: "/blog" },
  { label: "Our Works", to: "/portfolio" },
  { label: "Book Appointment", to: "/booking" },
  { label: "Get In Touch", to: "/contact-us" },
];

const Footer = () => {
  return (
    <>
      <footer className="site-footer text-uppercase footer-white">
        <FooterGalleryCarousel
          fallbackItems={fallbackGalleryItems}
          wrapperClassName="portfolio-gallery"
          swiperClassName="carousel-gallery dots-none owl-none owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-btn-center-lr owl-btn-1 mfp-gallery"
          slidesPerView={10}
          breakpoints={{
            1188: { slidesPerView: 10 },
            1100: { slidesPerView: 9 },
            1000: { slidesPerView: 8 },
            900: { slidesPerView: 7 },
            800: { slidesPerView: 6 },
            700: { slidesPerView: 5 },
            200: { slidesPerView: 4 },
          }}
        />
        <FooterLinks />
        <BottomFooter />
      </footer>
    </>
  );
};

export const FooterLinks = () => {
  return (
    <>
      <div className="footer-top">
        <div className="container wow fadeIn">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-5">
              <div className="widget widget_services border-0">
                <h6 className="m-b20">Company</h6>
                <ul>
                  {companyLinks.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-7">
              <div className="widget widget_services border-0">
                <h6 className="m-b20">Useful Link</h6>
                <ul>
                  {usefulLinks.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-5">
              <div className="widget widget_getintuch">
                <h6 className="m-b30">Contact us</h6>
                <ul>
                  <li>
                    <i className="ti-location-pin"></i>
                    <strong>address</strong> Lekki, Lagos State, Nigeria
                  </li>
                  <li>
                    <i className="ti-mobile"></i>
                    <strong>phone</strong>
                    <a href="tel:08098866406">08098866406</a>
                  </li>
                  <li>
                    <i className="ti-email"></i>
                    <strong>email</strong>
                    <a href="mailto:mudiamelush@gmail.com">mudiamelush@gmail.com</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="widget">
                <h6 className="m-b30">Subscribe To Our Newsletter</h6>
                <p className="text-capitalize m-b20">
                  Stay in the loop with fresh beauty drops, product updates, and self-care essentials from Mudiame Lush.
                </p>
                <div className="subscribe-form m-b20">
                  <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                    <div className="dzSubscribeMsg"></div>
                    <div className="input-group">
                      <input
                        name="dzEmail"
                        required={true}
                        className="form-control"
                        placeholder="Your Email Address"
                        type="email"
                      />
                      <span className="input-group-btn">
                        <button type="button" className="site-button radius-xl">
                          Subscribe
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <ul className="list-inline m-a0">
                  <li>
                    <a href="#" className="site-button facebook circle ">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const BottomFooter = () => {
  return (
    <>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 text-center text-md-left">
              <span>
                Copyright © 2026 Mudiame Lush
              </span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 text-center text-md-right ">
              <div className="widget-link ">
                <ul>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/booking">Book Now</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
