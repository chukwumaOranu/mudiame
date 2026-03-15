import { Link } from "react-router-dom"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { IMAGE } from "../constent/theme"
import { Autoplay } from "swiper/modules"
import { useRef } from "react"



const ourTeam = [
    { img: IMAGE.ourTeamPic6, title: 'Charlotte', subtile: 'Sr. Nail  artist' },
    { img: IMAGE.ourTeamPic7, title: 'Jennifer', subtile: 'Nail art designer' },
    { img: IMAGE.ourTeamPic8, title: 'Charlotte', subtile: 'Expert' },
    { img: IMAGE.ourTeamPic9, title: 'Diane Mateo', subtile: 'Sr. Nail  artist' },
    { img: IMAGE.ourTeamPic6, title: 'Charlotte', subtile: 'Sr. Nail  artist' },
    { img: IMAGE.ourTeamPic7, title: 'Jennifer', subtile: 'Nail art designer' },
    { img: IMAGE.ourTeamPic8, title: 'Charlotte', subtile: 'Expert' },
    { img: IMAGE.ourTeamPic9, title: 'Diane Mateo', subtile: 'Sr. Nail  artist' },
]
const Home6Ourteam = () => {

    const swiperRef = useRef<SwiperRef | null>(null)

    return (
        <div style={{ position: 'relative' }}>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                loop={true}
                speed={1200}
                modules={[Autoplay]}
                ref={swiperRef}
                autoplay={{
                    delay: 3000
                }}
                breakpoints={{
                    991: { slidesPerView: 4 },
                    775: { slidesPerView: 3 },
                    575: { slidesPerView: 2 },
                    240: { slidesPerView: 1 },
                }}
                className="team-carousel2 owl-carousel owl-theme owl-dots-primary-full owl-btn-center-lr owl-btn-3"
            >
                {ourTeam.map((item, ind) => (
                    <SwiperSlide className="item" key={ind}>
                        <div className="team-bx style-1">
                            <div className="dz-media">
                                <img src={item.img} alt="" />
                                <div className="dz-social-icon text-center">
                                    <ul>
                                        <li><Link target="_blank" className="rounded-md btn-primary" to="https://www.facebook.com/"><i className="fa fa-facebook"></i></Link></li>
                                        <li><Link target="_blank" className="rounded-md btn-primary" to="https://www.instagram.com/"><i className="fa fa-instagram"></i></Link></li>
                                        <li><Link target="_blank" className="rounded-md btn-primary" to="https://twitter.com/"><i className="fa fa-twitter"></i></Link></li>
                                        <li><Link target="_blank" className="rounded-md btn-primary" to="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="dz-info">
                                <h5 className="name">{item.title}</h5>
                                <h6 className="position">{item.subtile}</h6>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="owl-nav">
                <div
                    onClick={() => { swiperRef.current?.swiper.slidePrev() }}
                    className="owl-prev"
                ><i className="ti-angle-left"></i></div>
                <div
                    onClick={() => { swiperRef.current?.swiper.slideNext() }}
                    className="owl-next"
                ><i className="ti-angle-right"></i></div>
            </div>
        </div>
    )
}

export default Home6Ourteam