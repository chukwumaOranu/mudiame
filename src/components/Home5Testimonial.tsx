import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { IMAGE } from "../constent/theme";
import { Pagination } from "swiper/modules";
import { useRef } from "react";

const slideImg = [
  { img: IMAGE.imageGalleryImg1, name: "David Matin" },
  { img: IMAGE.imageGalleryImg5, name: "" },
  { img: IMAGE.imageGalleryImg7, name: "David Matin" },
];

const Home5Testimonial = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  return (
    <div style={{ position: "relative" }}>
      <Swiper
        loop={true}
        speed={1200}
        modules={[Pagination]}
        ref={swiperRef}
        pagination={{
          el: ".owl-dots",
          clickable: true,
        }}
        className="testimonial-one owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-dots-primary-full owl-loaded owl-drag"
      >
        {slideImg.map((item, ind) => (
          <SwiperSlide className="item" key={ind}>
            <div className="testimonial-1">
              <div className="testimonial-pic radius shadow">
                <img src={item.img} width="100" height="100" alt="" />
              </div>
              <div className="testimonial-text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the when an printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                </p>
              </div>
              <div className="testimonial-detail">
                {" "}
                <strong className="testimonial-name">David Matin</strong>{" "}
                <span className="testimonial-position">Client</span>{" "}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="owl-dots home_pagination_dots"></div>
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
  );
};

export default Home5Testimonial;
