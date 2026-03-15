import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useRef } from "react";

const services = [
  { img: IMAGE.blog_gridPic1 },
  { img: IMAGE.blog_gridPic2 },
  { img: IMAGE.blog_gridPic3 },
  { img: IMAGE.blog_gridPic4 },
];

const Home4OurServices = () => {
  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <>
      <div style={{ position: "relative" }}>
        <Swiper
          slidesPerView={2}
          loop={true}
          speed={1200}
          spaceBetween={30}
          modules={[Pagination]}
          pagination={{
            el: ".owl-dots",
            clickable: true,
          }}
          breakpoints={{
            991: { slidesPerView: 2 },
            240: { slidesPerView: 1 },
          }}
          ref={swiperRef}
          className="carousel-service owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-dots-primary-full owl-loaded owl-drag"
        >
          {services.map((item, ind) => (
            <SwiperSlide className="item" key={ind}>
              <div className="dlab-box spa-ser-bx">
                <div className="dlab-media">
                  <Link to="/services-details">
                    <img src={item.img} alt="" />
                  </Link>
                </div>
                <div className="dlab-info">
                  <div className="dlab-info-bx">
                    <h6 className="dlab-title m-t0">
                      <Link to="/services-details">Medical Education</Link>
                    </h6>
                    <Link
                      to="/booking"
                      className="site-button radius-no ml-auto"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="owl-dots" id="home_four_pagination"></div>
        </Swiper>
        <div className="owl-nav">
          <div
            onClick={() => {
              swiperRef.current?.swiper.slidePrev();
            }}
            className="owl-prev"
          >
            <i className="ti-angle-left"></i>
          </div>
          <div
            onClick={() => {
              swiperRef.current?.swiper.slideNext();
            }}
            className="owl-next"
          >
            <i className="ti-angle-right"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home4OurServices;
