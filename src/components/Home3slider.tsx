// import { IMAGE } from "../constent/theme"
import bgImg from '../assets/images/main-slider/slide5.jpg'
import mainSliderPic1 from '../assets/images/main-slider/pic-1.png'

const Home3slider = () => {
    return (
        <>
            <div className="main-bnr-three">
                <div className="banner-inner"
                    style={{ backgroundImage: `url(${bgImg})` }}

                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="banner-media">
                                    <img src={mainSliderPic1} className="main-img wow fadeInUp" alt="" />
                                    <div className="frame"></div>
                                    <h2 className="data-text style-1 wow fadeInUp" data-wow-delay="0.4s">
                                        <span>H</span>
                                        <span>A</span>
                                        <span>I</span>
                                        <span>R</span>
                                        <span>B</span>
                                        <span>E</span>
                                        <span>A</span>
                                        <span>U</span>
                                        <span>T</span>
                                        <span>Y</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home3slider