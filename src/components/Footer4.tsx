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

const Footer4 = () => {
  return (
    <>
      <footer className="site-footer text-uppercase footer-white spa-footer">
        <FooterTop />
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
      </footer>
    </>
  );
};

export default Footer4;

export const FooterTop = () => {
  return (
    <>
      <div className="footer-top">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-xl-3 col-12 col-lg-3 col-md-6 col-sm-6">
              <div className="widget">
                <h6>Phone &amp; E-mail</h6>
                <ul>
                  <li>+91 800-123456 <br /> office@example.com</li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-12 col-lg-3 col-md-6 col-sm-6">
              <div className="widget">
                <h6>Address</h6>
                <ul>
                  <li>#8901 Marmora Road<br /> Chi Minh City, Vietnam </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-12 col-lg-3 col-md-6 col-sm-6">
              <div className="widget">
                <h6>Opening Times</h6>
                <ul>
                  <li>+91 800-123456 <br /> office@example.com</li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-12 col-lg-3 col-md-6 col-sm-6">
              <div className="widget">
                <Link to="/booking" className="site-button radius-no">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
