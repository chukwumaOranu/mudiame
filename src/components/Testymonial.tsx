import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { IMAGE } from "../constent/theme";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";

const testymonial = [
  {
    img: IMAGE.testymonial,
    name: "Adaeze",
    skill: "Beauty Enthusiast",
    quote:
      "The gel nail polish lasts beautifully and the colors are exactly as shown. Mudiame Lush has become my go-to for everyday glam.",
  },
  {
    img: IMAGE.testymonial2,
    name: "Tosin",
    skill: "Makeup Artist",
    quote:
      "Their eyeshadow palette blends so smoothly and the pigment payoff is impressive. Great quality at a very fair price.",
  },
  {
    img: IMAGE.testymonial3,
    name: "Chioma",
    skill: "Lifestyle Creator",
    quote:
      "I love the lip gloss and lip pencil combo. It is comfortable to wear, looks polished all day, and works for both soft and bold looks.",
  },
];

const Testymonial = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  return (
    <>
      <div style={{ position: "relative" }}>
        <Swiper
          className="mySwiper testimonial-two-dots owl-carousel owl-theme owl-dots-primary-full owl-btn-center-lr owl-btn-3"
          slidesPerView={3}
          centeredSlides={false}
          navigation={true}
          speed={1500}
          slidesPerGroup={3}
          spaceBetween={20}
          loop={false}
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          ref={swiperRef}
          breakpoints={{
            992: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            800: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            300: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
          }}
        >
          {testymonial.map((item, index) => (
            <SwiperSlide className="item p-a5" key={index}>
              <div className="testimonial-9">
                <div className="testimonial-pic radius style1">
                  <img src={item.img} width="100" height="100" alt="" />
                </div>
                <div className="testimonial-text">
                  <p>
                    {item.quote}
                  </p>
                </div>
                <div className="testimonial-detail">
                  {" "}
                  <strong className="testimonial-name">{item.name}</strong>
                  <span className="testimonial-position">
                    {item.skill}
                  </span>{" "}
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
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

export default Testymonial;
