import { Swiper, SwiperSlide } from "swiper/react";
import Home5Portfolio from "../components/Home5Portfolio";
import Home5Pricind from "../components/Home5Pricind";
import Home5ServicesSlider from "../components/Home5ServicesSlider";
import Home5Testimonial from "../components/Home5Testimonial";
import { IMAGE } from "../constent/theme";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Home5Slider from "../components/Home5Slider";

const Home5 = () => {
  useEffect(() => {
    document.body.setAttribute("data-theme-color", "color_2");
  }, []);

  return (
    <>
      <div className="page-content bg-white">
        <Home5Slider />
        <div
          className="section-full bg-white content-inner-2 bridal-about"
          style={{ backgroundImage: `url(${IMAGE.bg10})` }}
        >
          <div className="container">
            <div className="section-head text-black text-center bridal-head">
              <h5 className="text-primary">Welcome To Bridal Makeup</h5>
              <h2 className="m-b10">Our Makeup Services</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the.
              </p>
            </div>
            <Home5ServicesSlider />
          </div>
        </div>
        {/* our pricing */}
        <div className="section-full bridal-price">
          <div className="container-fuild">
            <div className="row m-lr0">
              <div className="col-lg-5 col-md-12 col-sm-12 bridal-primg-bx">
                <div className="primg">
                  <img src={IMAGE.aboutPriceImg} />
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12 content-inner-2">
                <div className="max-w700 m-auto">
                  <div className="section-head text-black bridal-head">
                    <h2>Services & Pricing </h2>
                    <p className="m-b10">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy.
                    </p>
                  </div>
                  <Home5Pricind />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* port folio */}
        <div
          className="section-full content-inner-1 bridal-portfolio"
          style={{
            backgroundImage: `url(${IMAGE.bg10})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container-fluid">
            <div className="section-head text-black text-center bridal-head">
              <h5 className="text-primary">Bridal Portfolio</h5>
              <h2 className="m-b10">Our Portfolio</h2>
              <p className="m-b0">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the.
              </p>
            </div>
            <Home5Portfolio />
          </div>
        </div>
        {/* testimonial */}
        <div
          className="section-full content-inner-2 bridal-testimonial"
          style={{
            backgroundImage: `url(${IMAGE.bg10})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="section-head text-black text-center bridal-head">
              <h5 className="text-primary">Our Client</h5>
              <h2 className="m-b0">Our Testimonial</h2>
            </div>
            <Home5Testimonial />
          </div>
        </div>
        {/* our team */}
        <OurprofationalTeam />
      </div>
    </>
  );
};

export default Home5;

const cards = [
  { img: IMAGE.blogGridPic1 },
  { img: IMAGE.blogGridPic1 },
  { img: IMAGE.blogGridPic1 },
  { img: IMAGE.blogGridPic1 },
  { img: IMAGE.blogGridPic1 },
  { img: IMAGE.blogGridPic1 },
  { img: IMAGE.blogGridPic1 },
  { img: IMAGE.blogGridPic1 },
];
export const OurprofationalTeam = () => {
  return (
    <>
      <div className="section-full">
        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          loop={true}
          breakpoints={{
            1275: { slidesPerView: 4 },
            991: { slidesPerView: 3 },
            775: { slidesPerView: 2 },
            240: { slidesPerView: 1 },
          }}
          className="news-post owl-carousel owl-none p-lr15"
        >
          {cards.map((item, ind) => (
            <SwiperSlide className="item" key={ind}>
              <div className="blog-post blog-style-2 ">
                <div className="dlab-post-media dlab-img-effect zoom-slow radius-sm">
                  <Link to="/blog-details">
                    <img src={item.img} alt="" />
                  </Link>
                </div>
                <div className="dlab-info">
                  <div>
                    <div className="dlab-post-meta">
                      <ul>
                        <li className="post-date">September 18, 2024</li>
                      </ul>
                    </div>
                    <div className="dlab-post-title ">
                      <h4 className="post-title font-24">
                        <Link to="/blog-details">
                          Spring is in the Air and and So Our These Amazing Spa
                          Offers
                        </Link>
                      </h4>
                    </div>
                    <div className="dlab-post-readmore blog-share">
                      <Link
                        to="/blog-details"
                        className="site-button-link border-link white"
                      >
                        READ MORE
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
