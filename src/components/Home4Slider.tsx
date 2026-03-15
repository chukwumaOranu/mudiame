import bgImg from '../assets/images/main-slider/slide6.jpg'

const Home4Slider = () => {
    return (
        <>
            <div className="main-bnr-four">
                <div className="banner-inner"
                    style={{ backgroundImage: `url(${bgImg})` }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="banner-content">
                                    <h1 className="title wow fadeInUp" data-wow-delay="0.2s">Spa Salon</h1>
                                    <h2 className="sub-title wow fadeInUp" data-wow-delay="0.4s">Asthetic & Pleasing</h2>
                                    <p className="text wow fadeInUp" data-wow-delay="0.6s">The Lasting Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home4Slider