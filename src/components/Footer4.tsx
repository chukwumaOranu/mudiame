import { Swiper, SwiperSlide } from "swiper/react"
import { IMAGE } from "../constent/theme"
import { Autoplay } from "swiper/modules"
import { Link } from "react-router-dom"
import { useState } from "react"





const galleryBlog = [
    { img: IMAGE.gallery_thumbPic1 },
    { img: IMAGE.gallery_thumbPic2 },
    { img: IMAGE.gallery_thumbPic3 },
    { img: IMAGE.gallery_thumbPic4 },
    { img: IMAGE.gallery_thumbPic5 },
    { img: IMAGE.gallery_thumbPic6 },
    { img: IMAGE.gallery_thumbPic7 },
    { img: IMAGE.gallery_thumbPic8 },
    { img: IMAGE.gallery_thumbPic1 },
    { img: IMAGE.gallery_thumbPic2 },
    { img: IMAGE.gallery_thumbPic3 },
    { img: IMAGE.gallery_thumbPic4 },
    { img: IMAGE.gallery_thumbPic5 },
    { img: IMAGE.gallery_thumbPic6 },
    { img: IMAGE.gallery_thumbPic7 },
    { img: IMAGE.gallery_thumbPic8 },
]


const galleryImage = [IMAGE.image_galleryPic1, IMAGE.image_galleryPic2, IMAGE.image_galleryPic3, IMAGE.image_galleryPic4, IMAGE.image_galleryPic5, IMAGE.image_galleryPic6, IMAGE.image_galleryPic7, IMAGE.image_galleryPic8, IMAGE.image_galleryPic1, IMAGE.image_galleryPic2, IMAGE.image_galleryPic3, IMAGE.image_galleryPic4, IMAGE.image_galleryPic5, IMAGE.image_galleryPic6, IMAGE.image_galleryPic7, IMAGE.image_galleryPic8]


const Footer4 = () => {

    const [ind, setInd] = useState(0);

    function swiperGalleryBtn(e: number) {
        setInd(e)
        document.querySelector('.image_gallery_div')?.classList.add('image_gallery');
        document.querySelector('.all_images')?.setAttribute('src', galleryImage[ind])
    }

    function removeClassHandler() {
        document.querySelector('.image_gallery_div')?.classList.remove('image_gallery');
    }

    const prevHandler = () => {
        setInd((ind) => ind > 0 ? ind - 1 : 15)
        document.querySelector('.all_images')?.setAttribute('src', galleryImage[ind])
    }
    const nextHandler = () => {
        setInd((ind) => ind < 15 ? ind + 1 : 0);
        console.log(ind);

        document.querySelector('.all_images')?.setAttribute('src', galleryImage[ind])
    }



    return (
        <>
            <footer className="site-footer text-uppercase footer-white spa-footer">
                <FooterTop />
                <div className="portfolio-gallery ">
                    <div className="container-fluid">
                        <div className="row">
                            <Swiper
                                slidesPerView={10}
                                speed={1500}
                                modules={[Autoplay]}
                                autoplay={{
                                    delay: 1200,
                                }}
                                loop={true}
                                breakpoints={{
                                    1188: { slidesPerView: 10 },
                                    1100: { slidesPerView: 9 },
                                    1000: { slidesPerView: 8 },
                                    900: { slidesPerView: 7 },
                                    800: { slidesPerView: 6 },
                                    700: { slidesPerView: 5 },
                                    200: { slidesPerView: 4 },
                                }}
                                className="carousel-gallery dots-none owl-none owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-btn-center-lr owl-btn-1 mfp-gallery"
                            >
                                {galleryBlog.map((item, index) => (
                                    <SwiperSlide className="swiper-slide" key={index}>
                                        <Link onClick={() => { swiperGalleryBtn(index) }} to={'#'} className="dynamic-gallery-demo swiper-slide mfp-link  dlab-media dlab-img-overlay3">
                                            <img className="footer-slide-image" src={item.img} alt="" />
                                        </Link>
                                    </SwiperSlide>
                                ))}

                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="image_gallery_div">
                    <div className="overlay" onClick={removeClassHandler}></div>
                    <div className="mfp">
                        <button
                            onClick={removeClassHandler}
                            className="mfp-close"
                        ><i className="ti-close"></i></button>
                        <img className="all_images" alt="" />
                    </div>
                    <div className="galleryButtons">
                        <div onClick={prevHandler} className="prev mfp-arrow mfp-arrow-left mfp-prevent-close"></div>
                        <div onClick={nextHandler} className="next mfp-arrow mfp-arrow-right mfp-prevent-close"></div>
                    </div>
                </div>
            </footer >
        </>
    )
}

export default Footer4




export const FooterTop = () => {
    return (
        <>
            <div className="footer-top">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-xl-3 col-12 col-lg-3 col-md-6 col-sm-6">
                            <div className="widget">
                                <h6>Phone &amp; E-mail</h6>
                                <ul>
                                    <li>+91 800-123456 <br /> office@example.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-12 col-lg-3 col-md-6 col-sm-6">
                            <div className="widget">
                                <h6>Address</h6>
                                <ul>
                                    <li>#8901 Marmora Road<br />  Chi Minh City, Vietnam </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-12 col-lg-3 col-md-6 col-sm-6">
                            <div className="widget">
                                <h6>Opening Times</h6>
                                <ul>
                                    <li>+91 800-123456 <br /> office@example.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-12 col-lg-3 col-md-6 col-sm-6">
                            <div className="widget">
                                <Link to="/booking" className="site-button radius-no">Book Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}