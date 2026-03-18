import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
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

const Footer2 = () => {
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

export default Footer2;

export const FooterLinks = () => {
  return (
    <>
      <div className="footer-top">
        <div className="container wow fadeIn" data-wow-delay="0.5s">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-8 col-sm-8 text-center">
              <div className="max-w200 p-b30 m-auto">
                <Link to="/">
                  <img src={IMAGE.logo2} alt="Mudiame Lush" />
                </Link>
              </div>
              <div className="widget">
                <h5 className="m-b10 text-capitalize">Subscribe To Our Newsletter</h5>
                <p className="text-capitalize m-b20">
                  Stay in the loop with fresh beauty drops, product updates, and self-care essentials from Mudiame Lush.
                </p>
                <div className="subscribe-form m-b20">
                  <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                    <div className="dzSubscribeMsg"></div>
                    <div className="input-group">
                      <input name="dzEmail" required className="form-control" placeholder="Your Email Address" type="email" />
                      <span className="input-group-btn">
                        <button onClick={(e) => { e.preventDefault(); }} name="submit" value="Submit" type="submit" className="site-button radius-xl">
                          Subscribe
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <div className="m-b20">
                  <p className="m-b10">Lekki, Lagos State, Nigeria</p>
                  <p className="m-b10">
                    <a href="tel:08098866406">08098866406</a>
                  </p>
                  <p className="m-b0">
                    <a href="mailto:mudiamelush@gmail.com">mudiamelush@gmail.com</a>
                  </p>
                </div>
                <ul className="list-inline m-a0">
                  <li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/" className="site-button instagram circle "><i className="fa fa-instagram"></i></a></li>
                  <li><a href="mailto:mudiamelush@gmail.com" className="site-button google-plus circle "><i className="fa fa-envelope"></i></a></li>
                  <li><a href="tel:08098866406" className="site-button twitter circle "><i className="fa fa-phone"></i></a></li>
                  <li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/" className="site-button facebook circle "><i className="fa fa-facebook"></i></a></li>
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
            <div className="col-lg-6 col-md-6 col-sm-6 text-center text-md-left"> <span>Copyright © 2026 Mudiame Lush</span> </div>
            <div className="col-lg-6 col-md-6 col-sm-6 text-center text-md-right ">
              <div className="widget-link ">
                <ul>
                  <li><Link to="/contect-us"> Contact Us</Link></li>
                  <li><Link to="/booking"> Book Now</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
