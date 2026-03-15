import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const galleryBlog = [
  { img: IMAGE.gellryNailsPic1 },
  { img: IMAGE.gellryNailsPic2 },
  { img: IMAGE.gellryNailsPic3 },
  { img: IMAGE.gellryNailsPic4 },
  { img: IMAGE.gellryNailsPic5 },
  { img: IMAGE.gellryNailsPic6 },
];

const galleryImage = [
  IMAGE.gellryNailsPic1,
  IMAGE.gellryNailsPic2,
  IMAGE.gellryNailsPic3,
  IMAGE.gellryNailsPic4,
  IMAGE.gellryNailsPic5,
  IMAGE.gellryNailsPic6,
];

const Footer6 = () => {
  const [ind, setInd] = useState(0);

  function swiperGalleryBtn(e: number) {
    document
      .querySelector(".image_gallery_div")
      ?.classList.add("image_gallery");
    document.querySelector(".all_images")?.setAttribute("src", galleryImage[e]);
    setInd(e);
  }

  function removeClassHandler() {
    document
      .querySelector(".image_gallery_div")
      ?.classList.remove("image_gallery");
  }

  const prevHandler = () => {
    setInd(ind > 0 ? ind - 1 : 5);
    document
      .querySelector(".all_images")
      ?.setAttribute("src", galleryImage[ind]);
  };
  const nextHandler = () => {
    setInd((ind) => (ind < 5 ? ind + 1 : 0));
    document
      .querySelector(".all_images")
      ?.setAttribute("src", galleryImage[ind]);
  };

  return (
    <footer className="site-footer footer-white style-1 font-poppins">
      <div className="portfolio-gallery style-1">
        <Link to={"#"} className="dz-icon-box">
          <svg
            width="69"
            height="71"
            viewBox="0 0 69 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.5167 17.308C24.7212 17.308 16.82 25.4238 16.82 35.4855C16.82 45.5472 24.7212 53.663 34.5167 53.663C44.3122 53.663 52.2134 45.5472 52.2134 35.4855C52.2134 25.4238 44.3122 17.308 34.5167 17.308ZM34.5167 47.3033C28.1866 47.3033 23.0116 42.0035 23.0116 35.4855C23.0116 28.9675 28.1712 23.6677 34.5167 23.6677C40.8622 23.6677 46.0218 28.9675 46.0218 35.4855C46.0218 42.0035 40.8468 47.3033 34.5167 47.3033ZM57.0649 16.5644C57.0649 18.9216 55.2167 20.8043 52.9372 20.8043C50.6424 20.8043 48.8096 18.9058 48.8096 16.5644C48.8096 14.223 50.6578 12.3246 52.9372 12.3246C55.2167 12.3246 57.0649 14.223 57.0649 16.5644ZM68.7857 20.8675C68.5238 15.188 67.2609 10.1572 63.2102 6.01226C59.175 1.86733 54.2772 0.570068 48.748 0.285303C43.0493 -0.0469238 25.9687 -0.0469238 20.27 0.285303C14.7562 0.554248 9.85844 1.85151 5.80777 5.99644C1.7571 10.1414 0.509556 15.1722 0.232324 20.8517C-0.0911133 26.7052 -0.0911133 44.25 0.232324 50.1035C0.494155 55.783 1.7571 60.8138 5.80777 64.9587C9.85844 69.1037 14.7408 70.4009 20.27 70.6857C25.9687 71.0179 43.0493 71.0179 48.748 70.6857C54.2772 70.4167 59.175 69.1195 63.2102 64.9587C67.2455 60.8138 68.5084 55.783 68.7857 50.1035C69.1091 44.25 69.1091 26.721 68.7857 20.8675ZM61.4236 56.3841C60.2223 59.4849 57.8966 61.8738 54.8625 63.1236C50.3189 64.9746 39.5377 64.5474 34.5167 64.5474C29.4957 64.5474 18.6991 64.9587 14.1709 63.1236C11.1522 61.8896 8.82652 59.5007 7.60978 56.3841C5.80777 51.7171 6.22362 40.6429 6.22362 35.4855C6.22362 30.3281 5.82317 19.238 7.60978 14.5869C8.81112 11.4861 11.1368 9.09722 14.1709 7.84741C18.7145 5.99644 29.4957 6.42358 34.5167 6.42358C39.5377 6.42358 50.3343 6.01226 54.8625 7.84741C57.8812 9.0814 60.2069 11.4703 61.4236 14.5869C63.2256 19.2539 62.8098 30.3281 62.8098 35.4855C62.8098 40.6429 63.2256 51.733 61.4236 56.3841Z"
              fill="white"
            />
          </svg>
          <h6>@beautyzone</h6>
        </Link>
        <div className="container-fluid">
          <div className="row">
            <Swiper
              className="carousel-gallery2 dots-none owl-none owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-btn-center-lr owl-btn-1 mfp-gallery"
              slidesPerView={6}
              speed={1500}
              modules={[Autoplay]}
              autoplay={{
                delay: 1200,
              }}
              loop={true}
              breakpoints={{
                1188: { slidesPerView: 6 },
                991: { slidesPerView: 5 },
                775: { slidesPerView: 4 },
                575: { slidesPerView: 3 },
              }}
            >
              {galleryBlog.map((item, index) => (
                <SwiperSlide className="item dlab-box dz-media" key={index}>
                  <Link
                    onClick={() => {
                      swiperGalleryBtn(index);
                    }}
                    to={"#"}
                    className="dynamic-gallery-demo swiper-slide mfp-link  dlab-media dlab-img-overlay3"
                  >
                    <img className="footer-slide-image" src={item.img} alt="" />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="image_gallery_div">
        <div className="overlay" onClick={removeClassHandler}></div>
        <div className="mfp">
          <button onClick={removeClassHandler} className="mfp-close">
            <i className="ti-close"></i>
          </button>
          <img className="all_images" alt="" />
        </div>
        <div className="galleryButtons">
          <div
            onClick={prevHandler}
            className="prev mfp-arrow mfp-arrow-left mfp-prevent-close"
          ></div>
          <div
            onClick={nextHandler}
            className="next mfp-arrow mfp-arrow-right mfp-prevent-close"
          ></div>
        </div>
      </div>

      <div className="footer-background style-1">
        <div className="container">
          <div className="footer-top style-1">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-md-4 text-center text-md-left footer-logo">
                  <img src={IMAGE.logoWhite2} alt="" />
                </div>
                <div className="col-md-8">
                  <ul className="footer-nav">
                    <li>
                      <Link to="/">HOME</Link>
                    </li>
                    <li>
                      <Link to={"#"}>PAGES</Link>
                    </li>
                    <li>
                      <Link to={"#"}>EVENTS</Link>
                    </li>
                    <li>
                      <Link to={"#"}>PORTFOLIO</Link>
                    </li>
                    <li>
                      <Link to={"#"}>BLOG</Link>
                    </li>
                    <li>
                      <Link to={"#"}>SHOP</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-center style-1">
            <div className="container wow fadeIn">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-email text-lg-start">
                    <h5 className="footer-title">Our Newsletter</h5>
                    <div className="subscribe-form style-1 m-b20">
                      <form
                        className="dzSubscribe"
                        action="script/mailchamp.php"
                        method="post"
                      >
                        <div className="dzSubscribeMsg"></div>
                        <div className="input-group">
                          <input
                            name="dzEmail"
                            required
                            type="email"
                            className="form-control transparent m-b15 address placeholderStyle"
                            placeholder="Email Address"
                          />
                          <button
                            className="subscribe-btn p-0"
                            name="submit"
                            value="Submit"
                            type="submit"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_70_221)">
                                <path
                                  d="M7.29175 14.6768V18.5418C7.29175 18.8118 7.46508 19.0509 7.72175 19.1359C7.78591 19.1568 7.85175 19.1668 7.91675 19.1668C8.11175 19.1668 8.30008 19.0751 8.42008 18.9118L10.6809 15.8351L7.29175 14.6768Z"
                                  fill="white"
                                />
                                <path
                                  d="M19.7375 0.115907C19.5459 -0.0199262 19.2942 -0.0382595 19.0859 0.0709072L0.33587 9.86257C0.114204 9.97841 -0.0166296 10.2151 0.00170373 10.4642C0.0208704 10.7142 0.186704 10.9276 0.422537 11.0084L5.63504 12.7901L16.7359 3.29841L8.14587 13.6476L16.8817 16.6334C16.9467 16.6551 17.015 16.6667 17.0834 16.6667C17.1967 16.6667 17.3092 16.6359 17.4084 16.5759C17.5667 16.4792 17.6742 16.3167 17.7017 16.1342L19.9934 0.717574C20.0275 0.484241 19.9292 0.252574 19.7375 0.115907Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_70_221">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="dz-media-icons">
                    <h5 className="footer-title ">Stay Connected</h5>
                    <ul className="dz-social-icon d-flex align-items-center m-b0">
                      <li>
                        <Link target="_blank" to="https://www.facebook.com/">
                          <i className="fa fa-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link target="_blank" to="https://www.instagram.com/">
                          <i className="fa fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link target="_blank" to="https://twitter.com/">
                          <i className="fa fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link target="_blank" to="https://www.linkedin.com/">
                          <i className="fa fa-linkedin"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="dz-salon-timings">
                    <h5 className="footer-title ">Salon Hours</h5>
                    <ul>
                      <li className="opening-time m-b10">
                        <span className="days">Mon - wed</span>
                        <span className="time">
                          <Link to={"#"}>9:00 AM - 10:00 PM</Link>
                        </span>
                      </li>
                      <li className="opening-time m-b10">
                        <span className="days">Thus - Sat</span>
                        <span className="time">
                          <Link to={"#"}>10:00 AM - 9:00 PM</Link>
                        </span>
                      </li>
                      <li className="opening-time">
                        <span className="days">Sunday</span>
                        <span className="time">
                          <Link to={"#"}>3Pm - 8PM</Link>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="widget widget_getintuch">
                    <ul>
                      <li className="m-b20">
                        <i className="ti-location-pin"></i>
                        <strong>address</strong> demo address #8901 Marmora Road
                        Chi Minh City, Vietnam{" "}
                      </li>
                      <li className="m-b20">
                        <i className="ti-mobile"></i>
                        <strong>phone</strong>0800-123456 (24/7 Support Line)
                      </li>
                      <li>
                        <i className="ti-email"></i>
                        <strong>email</strong>info@example.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom style-1">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center text-md-left">
                  {" "}
                  <span>
                    Copyright © 2024 Dexignzone. All rights reserved.
                  </span>{" "}
                </div>
                <div className="col-md-6 text-center text-md-right ">
                  <div className="widget-link">
                    <ul>
                      <li>
                        <Link to="/contact"> Help Desk</Link>
                      </li>
                      <li>
                        <Link to="/contact"> Privacy Policy</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer6;
