import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { IMAGE } from "../constent/theme"
import { useRef } from "react"
import { Link } from "react-router-dom"


const aboutServiceBlog = [
    {
        img: IMAGE.blog_gridPic1,
        icon: 'flaticon-woman',
        slug: 'gel-nail-polish',
        title: 'Gel Nail Polish',
        description: 'Vegan, cruelty-free, high-gloss color built for long wear and everyday confidence.',
    },
    {
        img: IMAGE.blog_gridPic2,
        icon: 'flaticon-makeup',
        slug: 'lip-glosses',
        title: 'Lip Glosses',
        description: 'Shine-focused glosses designed for comfortable all-day wear across soft and bold looks.',
    },
    {
        img: IMAGE.blog_gridPic3,
        icon: 'flaticon-makeup-1',
        slug: 'eye-shadow-palette',
        title: 'Eyeshadow Palette',
        description: 'Richly pigmented matte, shimmer, and metallic shades with smooth blendability.',
    },
    {
        img: IMAGE.blog_gridPic1,
        icon: 'flaticon-candle-1',
        slug: 'lip-pencil',
        title: 'Lip Pencil + Self-Care',
        description: 'Precision lip definition plus face masks, hair oils, and body oils for complete care.',
    },

]


const AboutServices = () => {
    const swiperRef = useRef<SwiperRef | null>(null)
    return (
        <>
            <Swiper className="blog-carousel owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-btn-center-lr owl-btn-1 owl-loaded owl-drag"
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                speed={1500}
                ref={swiperRef}
                breakpoints={{
                    990: {
                        slidesPerView: 3
                    },
                    500: {
                        slidesPerView: 2
                    },
                    200: {
                        slidesPerView: 1
                    }
                }}
            >
                {aboutServiceBlog.map((item, index) => (
                    <SwiperSlide className="item" key={index}>
                        <div className="dlab-box service-iconbox">
                            <div className="dlab-media dlab-img-overlay5"> <Link to={`/services/${encodeURIComponent(item.slug)}`}>
                                <img src={item.img} alt="" /></Link> </div>
                            <div className="dlab-info p-a30 p-t60 border-1 bg-white text-center">
                                <div className="icon-bx-sm radius bg-white m-b20"> <Link to={`/services/${encodeURIComponent(item.slug)}`} className="icon-cell">
                                    <i className={`${item.icon}`}></i></Link> </div>
                                <h5 className="dlab-title m-t0"><Link to={`/services/${encodeURIComponent(item.slug)}`}>{item.title}</Link></h5>
                                <p className="m-b15">{item.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-nav">
                <div onClick={() => { swiperRef.current?.swiper.slidePrev() }} className="swiper-prev"><i className="ti-angle-left"></i></div>
                <div onClick={() => { swiperRef.current?.swiper.slideNext() }} className="swiper-next"><i className="ti-angle-right"></i></div>
            </div>
        </>
    )
}

export default AboutServices
