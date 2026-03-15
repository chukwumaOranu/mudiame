import bgImg from '../assets/images/main-slider/slide8.jpg'
import mainSlideImg from '../assets/images/main-slider/slide7.png'
import { Link } from 'react-router-dom'

const Home5Slider = () => {
    return (
        <>
            <div className="main-bnr-five">
                <div className="banner-inner"
                    style={{ backgroundImage: `url(${bgImg})` }}
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="banner-content">
                                    <h1 className="title wow fadeInUp" data-wow-delay="0.2s">Bridal</h1>
                                    <h2 className="sub-title wow fadeInUp" data-wow-delay="0.2s">Bridal Makeup</h2>
                                    <p className="text wow fadeInUp" data-wow-delay="0.4s">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the.</p>
                                    <div className="d-flex align-items-center wow fadeInUp justify-content-md-center justify-content-sm-center m-b30" data-wow-delay="0.6s">
                                        <Link to="/about-us" className="site-button m-r30">AboutUs</Link>
                                        <Link to="/booking" className="site-button">booking</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="banner-media">
                                    <img src={mainSlideImg} className="main-img" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home5Slider