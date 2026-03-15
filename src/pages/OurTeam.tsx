import { Link } from "react-router-dom"
import OurTeamslider from "../components/OurTeamslider"
import { IMAGE } from "../constent/theme"
import AboutOurTeam from "../components/AboutOurTeam"




const cards = [
    { icon: 'flaticon-woman', title: 'We are Professional' },
    { icon: 'flaticon-mortar', title: 'Lux Cosmetic' },
    { icon: 'flaticon-candle', title: 'Medical Education' },
    { icon: 'flaticon-sauna-1', title: 'The Newest Equipment' },
]


const OurTeam = () => {
    return (
        <>
            <div className="page-content bg-white">
                <div className="dlab-bnr-inr dlab-bnr-inr overlay-primary bg-pt" style={{ backgroundImage: `url(${IMAGE.banner3})` }}>
                    <div className="container">
                        <div className="dlab-bnr-inr-entry">
                            <h1 className="text-white">Our Team</h1>
                            <div className="breadcrumb-row">
                                <ul className="list-inline">
                                    <li><Link to="/">Home</Link></li>
                                    <li>Our Team</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-full content-inner-2 overlay-white-middle" style={{ backgroundImage: `url(${IMAGE.backgroundBg1}), url(${IMAGE.backgroundBg2})`, backgroundPosition: 'bottom, top', backgroundSize: ' 100%', backgroundRepeat: 'no-repeat' }}>
                    <div className="container">
                        <div className="section-head text-black text-center">
                            <h2 className="text-primary m-b10">Our Professional Team</h2>
                            <div className="dlab-separator-outer m-b0">
                                <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</p>
                        </div>
                        <OurTeamslider />
                    </div>
                </div>
                <div className="section-full content-inner-3 services-box bg-pink-light" style={{ backgroundImage: `url(${IMAGE.backgroundBg5})`, backgroundPosition: 'bottom', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
                    <div className="container">
                        <div className="row">
                            {cards.map((item, index) => (
                                <div className="col-lg-3 col-md-6 col-sm-6 m-b30" key={index}>
                                    <div className="icon-bx-wraper p-lr15 p-b30 p-t20 bg-white center fly-box-ho">
                                        <div className="icon-lg m-b10"><span className="icon-cell text-primary"><i className={item.icon}></i></span> </div>
                                        <div className="icon-content">
                                            <h6 className="dlab-tilte">{item.title}</h6>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            <Link to="/services-details" className="site-button-secondry">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="section-full bg-white content-inner">
                    <div className="container">
                        <div className="section-head text-black text-center">
                            <h2 className="text-primary m-b10">Our Professional Team</h2>
                            <div className="dlab-separator-outer m-b0">
                                <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</p>
                        </div>
                        <AboutOurTeam />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurTeam