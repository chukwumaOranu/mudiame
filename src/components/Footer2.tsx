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

const Footer2 = () => {

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
            <footer className="site-footer text-uppercase footer-white">



                <div className="portfolio-gallery ">
                    <div className="container-fluid">
                        <div className="row">
                            <Swiper className="carousel-gallery dots-none owl-none owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-btn-center-lr owl-btn-1 mfp-gallery"
                                slidesPerView={10}
                                speed={1500}
                                modules={[Autoplay]}
                                autoplay={{
                                    delay: 1200,
                                }}
                                loop={true}
                                breakpoints={{
                                    1188: {
                                        slidesPerView: 10
                                    },
                                    1100: {
                                        slidesPerView: 9
                                    },
                                    1000: {
                                        slidesPerView: 8
                                    },
                                    900: {
                                        slidesPerView: 7
                                    },
                                    800: {
                                        slidesPerView: 6
                                    },
                                    700: {
                                        slidesPerView: 5
                                    },
                                    200: {
                                        slidesPerView: 4
                                    },
                                }}
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
                <FooterLinks />
                <BottomFooter />
            </footer >
        </>
    )
}

export default Footer2



export const FooterLinks = () => {
    return (
        <>
            <div className="footer-top">
                <div className="container wow fadeIn" data-wow-delay="0.5s">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-7 col-md-8 col-sm-8 text-center">
                            <div className="max-w200 p-b30 m-auto">
                                <Link to="/">
                                    <img src="images/logo.png" alt="" />
                                </Link>
                            </div>
                            <div className="widget">
                                <h5 className="m-b10 text-capitalize">Subscribe To Our Newsletter</h5>
                                <p className="text-capitalize m-b20">If you have any questions, you can contact with us so that we can give you Link satisfying answer. Subscribe to our newsletter to get our latest products.</p>
                                <div className="subscribe-form m-b20">
                                    <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                                        <div className="dzSubscribeMsg"></div>
                                        <div className="input-group">
                                            <input name="dzEmail" required className="form-control" placeholder="Your Email Address" type="email" />
                                            <span className="input-group-btn">
                                                <button onClick={(e) => { e.preventDefault() }} name="submit" value="Submit" type="submit" className="site-button radius-xl">Subscribe</button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                                <ul className="list-inline m-a0">
                                    <li><Link target="_blank" to="https://www.facebook.com/" className="site-button facebook circle "><i className="fa fa-facebook"></i></Link></li>
                                    <li><Link target="_blank" to="https://www.google.com/" className="site-button google-plus circle "><i className="fa fa-google-plus"></i></Link></li>
                                    <li><Link target="_blank" to="https://www.linkedin.com/" className="site-button linkedin circle "><i className="fa fa-linkedin"></i></Link></li>
                                    <li><Link target="_blank" to="https://www.instagram.com/" className="site-button instagram circle "><i className="fa fa-instagram"></i></Link></li>
                                    <li><Link target="_blank" to="https://twitter.com/" className="site-button twitter circle "><i className="fa fa-twitter"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const BottomFooter = () => {
    return (
        <>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 text-center text-md-left"> <span>Copyright © 2024
                            <Link to="https://dexignzone.com/" className="dzlink" target="_blank">DexignZone</Link></span> </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 text-center text-md-right ">
                            <div className="widget-link ">
                                <ul>
                                    <li><Link to="/contect-us"> Help Desk</Link></li>
                                    <li><Link to="/contect-us"> Privacy Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}