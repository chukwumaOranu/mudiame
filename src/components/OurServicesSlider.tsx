import { Swiper, SwiperSlide } from "swiper/react"
import { IMAGE } from "../constent/theme"
import { Link } from "react-router-dom"
import { Pagination } from "swiper/modules"


const SlideImage = [
  { img: IMAGE.our_servicesPic1, icon: 'flaticon-woman-1', name: 'MASSAGES' },
  { img: IMAGE.our_servicesPic2, icon: 'flaticon-lotus', name: 'COSMATIC' },
  { img: IMAGE.our_servicesPic3, icon: 'flaticon-candle', name: 'HAIRDRASING' },
  { img: IMAGE.our_servicesPic4, icon: 'flaticon-candle-1', name: 'BODY TRITMENTS' },
  { img: IMAGE.our_servicesPic1, icon: 'flaticon-woman-1', name: 'MASSAGES' },
  { img: IMAGE.our_servicesPic2, icon: 'flaticon-lotus', name: 'COSMATIC' },
  { img: IMAGE.our_servicesPic3, icon: 'flaticon-candle', name: 'HAIRDRASING' },
  { img: IMAGE.our_servicesPic4, icon: 'flaticon-candle-1', name: 'BODY TRITMENTS' },
  { img: IMAGE.our_servicesPic1, icon: 'flaticon-woman-1', name: 'MASSAGES' },
  { img: IMAGE.our_servicesPic2, icon: 'flaticon-lotus', name: 'COSMATIC' },
]

const OurServicesSlider = () => {

  return (
    <>
      <Swiper className="img-carousel owl-carousel owl-theme owl-none owl-dots-primary-big owl-btn-center-lr owl-loade m-b30"
        slidesPerView={4}
        spaceBetween={30}
        speed={1700}
        loop={true}
        modules={[Pagination]}
        slidesPerGroup={4}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 2
          },
          990: {
            slidesPerView: 3,
            slidesPerGroup: 1
          }, 775: {
            slidesPerView: 2
          }, 240: {
            slidesPerView: 1
          }
        }}
      >
        {SlideImage.map((item, index) => (
          <SwiperSlide className="item" key={index}>
            <div className="service-box text-center">
              <div className="service-images m-b15">
                <img width="300" height="300" src={item.img} alt="" />
                <i className={item.icon}></i>
              </div>
              <div className="service-content">
                <h6 className="text-uppercase"><Link to="/services-details" className="text-primary">{item.name}</Link></h6>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page.</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>
      <div className="text-center">
        <Link to="/services" className="site-button outline">See all Services</Link>
      </div>
    </>
  )
}

export default OurServicesSlider