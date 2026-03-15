
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { IMAGE } from "../constent/theme"
import { Navigation } from "swiper/modules"
import { useRef } from "react"
import { Link } from "react-router-dom"

const blog_grid = [
    { img: IMAGE.hairPic4 },
    { img: IMAGE.hairPic3 },
    { img: IMAGE.hairPic2 },
    { img: IMAGE.hairPic1 },
    { img: IMAGE.hairPic4 },
    { img: IMAGE.hairPic3 },
    { img: IMAGE.hairPic2 },
    { img: IMAGE.hairPic1 },
];


const Home3Blog = () => {


    const swiperRef = useRef<SwiperRef | null>(null)
    return (
        <>
            <div style={{ position: 'relative' }}>
                <Swiper className="blog-carousel owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-btn-center-lr owl-btn-1"
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    modules={[Navigation]}
                    ref={swiperRef}
                    speed={1500}
                    breakpoints={{
                        1100: {
                            slidesPerView: 3
                        },
                        700: {
                            slidesPerView: 2
                        },
                        200: {
                            slidesPerView: 1
                        },
                    }}
                >
                    {blog_grid.map((item, index) => (
                        <SwiperSlide className="item" key={index}>
                            <div className="blog-post blog-grid blog-style-1">
                                <div className="dlab-post-media dlab-img-effect radius-sm">
                                    <Link to="/blog-details">
                                        <img width="700" height="500" src={item.img} alt="" /></Link> </div>
                                <div className="dlab-info">
                                    <div className="dlab-post-meta">
                                        <ul className="d-flex align-items-center">
                                            <li className="post-date">September 18, 2021</li>
                                            <li className="post-comment"><Link to="/blog-details">5k</Link> </li>
                                        </ul>
                                    </div>
                                    <div className="dlab-post-title ">
                                        <h5 className="post-title font-20"><Link to="/blog-details">Spring is in the Air and and So Our These Amazing Spa Offers</Link></h5>
                                    </div>
                                    <div className="dlab-post-readmore blog-share">
                                        <Link to="/blog-details" title="READ MORE" rel="bookmark" className="site-button-link border-link black">READ MORE</Link>
                                    </div>
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
        </>

    )
}

export default Home3Blog



