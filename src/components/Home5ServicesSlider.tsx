import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const slider = [
  {
    info1: (
      <div className="dlab-info text-center">
        <h2>01</h2>
        <h6 className="dlab-title">
          <Link to="/services-details">Bridal Makeup</Link>
        </h6>
      </div>
    ),
    img: IMAGE.serviceBridalPic1,
  },
  {
    img: IMAGE.serviceBridalPic2,
    info2: (
      <div className="dlab-info text-center">
        <h2>02</h2>
        <h6 className="dlab-title">
          <Link to="/services-details">Bridal Makeup</Link>
        </h6>
      </div>
    ),
  },
  {
    info1: (
      <div className="dlab-info text-center">
        <h2>03</h2>
        <h6 className="dlab-title">
          <Link to="/services-details">Bridal Makeup</Link>
        </h6>
      </div>
    ),
    img: IMAGE.serviceBridalPic3,
  },
  {
    img: IMAGE.serviceBridalPic4,
    info2: (
      <div className="dlab-info text-center">
        <h2>04</h2>
        <h6 className="dlab-title">
          <Link to="/services-details">Bridal Makeup</Link>
        </h6>
      </div>
    ),
  },
  {
    info1: (
      <div className="dlab-info text-center">
        <h2>05</h2>
        <h6 className="dlab-title">
          <Link to="/services-details">Bridal Makeup</Link>
        </h6>
      </div>
    ),
    img: IMAGE.serviceBridalPic1,
  },
  {
    img: IMAGE.serviceBridalPic2,
    info2: (
      <div className="dlab-info text-center">
        <h2>06</h2>
        <h6 className="dlab-title">
          <Link to="/services-details">Bridal Makeup</Link>
        </h6>
      </div>
    ),
  },
  {
    info1: (
      <div className="dlab-info text-center">
        <h2>07</h2>
        <h6 className="dlab-title">
          <Link to="/services-details">Bridal Makeup</Link>
        </h6>
      </div>
    ),
    img: IMAGE.serviceBridalPic3,
  },
  {
    img: IMAGE.serviceBridalPic4,
    info2: (
      <div className="dlab-info text-center">
        <h2>01</h2>
        <h6 className="dlab-title">
          <Link to="/services-details">Bridal Makeup</Link>
        </h6>
      </div>
    ),
  },
];

const Home5ServicesSlider = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        modules={[Pagination, Navigation]}
        navigation={true}
        pagination={{
          el: ".owl-dots",
        }}
        breakpoints={{
          1200: { slidesPerView: 4 },
          991: { slidesPerView: 3 },
          775: { slidesPerView: 2 },
          240: { slidesPerView: 1 },
        }}
        className="img-carousel owl-carousel owl-theme owl-btn-3 owl-dots-primary-big owl-btn-center-lr owl-loade owl-loaded owl-drag"
      >
        {slider.map((item, ind) => (
          <SwiperSlide className="item" key={ind}>
            <div className="dlab-box bridal-serbx">
              {item?.info2}
              <div className="dlab-media">
                <Link to="/services-details">
                  <img src={item.img} alt="" />
                </Link>
                <div className="dlab-media-info">
                  <h6 className="dlab-title">
                    <Link to="/services-details">Bridal Makeup</Link>
                  </h6>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
              {item?.info1}
            </div>
          </SwiperSlide>
        ))}

        <div className="owl-dots" id="home5_pagination_dots"></div>
      </Swiper>
    </>
  );
};

export default Home5ServicesSlider;
