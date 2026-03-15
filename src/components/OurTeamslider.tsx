import { Swiper, SwiperSlide } from "swiper/react";
import { IMAGE } from "../constent/theme";
import { Autoplay, Pagination } from "swiper/modules";

const teameSlider = [
  { img: IMAGE.our_teamePic1, name: "Charlotte", text: "Make Up Artist" },
  { img: IMAGE.our_teamePic2, name: "Jennifer", text: "Cosmetologist" },
  { img: IMAGE.our_teamePic3, name: "Roxie Burton", text: "Make Up Artist" },
  {
    img: IMAGE.our_teamePic4,
    name: "Evelyn Martinez",
    text: "Fashion Designer",
  },
  { img: IMAGE.our_teamePic5, name: "Diane Mateo", text: "Fashion Designer" },
  { img: IMAGE.our_teamePic1, name: "Charlotte", text: "Make Up Artist" },
  { img: IMAGE.our_teamePic2, name: "Jennifer", text: "Cosmetologist" },
  { img: IMAGE.our_teamePic3, name: "Roxie Burton", text: "Make Up Artist" },
  {
    img: IMAGE.our_teamePic4,
    name: "Evelyn Martinez",
    text: "Fashion Designer",
  },
  { img: IMAGE.our_teamePic1, name: "Charlotte", text: "Make Up Artist" },
  { img: IMAGE.our_teamePic5, name: "Diane Mateo", text: "Fashion Designer" },
];

const OurTeamslider = () => {
  return (
    <>
      <Swiper
        className="team-carousel owl-carousel owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-dots-primary-full owl-loaded owl-drag"
        slidesPerView={5}
        loop={true}
        speed={1200}
        slidesPerGroup={1}
        centeredSlides={true}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        breakpoints={{
          1200: { slidesPerView: 5 },
          950: { slidesPerView: 3 },
          500: { slidesPerView: 2 },
          240: { slidesPerView: 1 },
        }}
      >
        {teameSlider.map((item, index) => (
          <SwiperSlide className="item" key={index} style={{ height: "400px" }}>
            <div className="dlab-box text-center team-box">
              <div className="dlab-media">
                <img src={item.img} alt="" />
              </div>
              <div className="dlab-title-bx p-a10">
                <h5 className="text-black m-a0">{item.name}</h5>
                <span className="clearfix">{item.text}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-pagination"></div>
      </Swiper>
    </>
  );
};

export default OurTeamslider;
