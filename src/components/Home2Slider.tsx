import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { IMAGE } from "../constent/theme"
import { Autoplay, EffectFade, Navigation } from "swiper/modules"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"


const home_bannerImg = [
    { img: IMAGE.mudiameBanner1 },
    { img: IMAGE.mudiameBanner2 },
]

const Home2Slider = () => {
    const swiperRef = useRef<SwiperRef | null>(null)
    const navigat = useNavigate();
    return (
        <>
            <Swiper className="home-banner-slider"
                effect="fade"
                modules={[EffectFade, Navigation, Autoplay]}
                autoplay={{
                    delay: 1222
                }}
                speed={3000}
                ref={swiperRef}
            >
                {home_bannerImg.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="home-banner-media">
                            <img src={item.img} alt="" />
                            <div className="home-banner-content home2-banner-content">
                                <h1>Beauty, Tailored to You</h1>
                                <h1><span></span>Glow Starts Here</h1>
                                <p>Discover expert skincare, flawless makeup, and signature hair styling in one
                                    place where your confidence comes first.</p>

                                <div className="home-banner-button">
                                    <button>Get A Qutoe</button>
                                    <button onClick={() => { navigat('/about-us') }}>About Us</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <button onClick={() => { swiperRef.current?.swiper.slidePrev() }} className="home-banner-slide-arrow-left"><i className="fa fa-chevron-left"></i></button>
                <button onClick={() => { swiperRef.current?.swiper.slideNext() }} className="home-banner-slide-arrow-right"><i className="fa fa-chevron-right"></i></button>
            </Swiper >
        </>
    )
}

export default Home2Slider
