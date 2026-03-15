import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"
import CommonBanner from "../element/CommonBanner"
import { HomeCards } from "./Home"
import OurTeamslider from "../components/OurTeamslider"
import { useState } from "react"
import ModalVideo from "react-modal-video"
import OurBlogSlider from "../components/OurBlogSlider"


const cards = [
    {
        title: 'Gel Nail Polish',
        icon: 'flaticon-barbershop',
        description: 'Vegan, cruelty-free salon-quality formula with high-gloss color and up to 3 weeks wear.',
    },
    {
        title: 'Lip Glosses',
        icon: 'flaticon-makeup',
        description: 'High-shine glosses created for comfortable all-day wear and effortless beauty.',
    },
    {
        title: 'Eyeshadow Palette',
        icon: 'flaticon-makeup-1',
        description: 'Matte, shimmer, and metallic shades with strong pigment payoff and smooth blendability.',
    },
    {
        title: 'Lip Pencil',
        icon: 'flaticon-woman-1',
        description: 'Smooth-glide precision lip pencil for shape, definition, and longer-lasting lipstick wear.',
    },
    {
        title: 'Face & Foot Masks',
        icon: 'flaticon-woman',
        description: 'Nourishing mask options selected to support complete beauty and self-care routines.',
    },
    {
        title: 'Hair & Body Oils',
        icon: 'flaticon-candle-1',
        description: 'Revitalizing oils for healthy-looking hair, soft skin, and everyday confidence.',
    },
]
const Services = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <ModalVideo
                channel="youtube"
                isOpen={open}
                videoId="rICXf0UH7Cg"
                onClose={() => setOpen(false)}
            />
            <div className="page-content bg-white">
                <CommonBanner title={'Our Services'} image={IMAGE.banner1} />
                <div className="content-block">
                    <div className="section-full content-inner-2 bg-white hair-services">
                        <div className="container">
                            <div className="section-head text-black text-center">
                                <h2 className="text-primary m-b10">Our Services</h2>
                                <div className="dlab-separator-outer m-b0">
                                    <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                                </div>
                                <p>
                                    Mudiame Lush offers branded beauty essentials and self-care products designed for bold expression,
                                    effortless elegance, and real everyday results.
                                </p>
                            </div>
                            <div className="row">
                                {cards.map((item, index) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6 p-lr0" key={index}>
                                        <div className="icon-bx-wraper center p-a30">
                                            <div className="icon-lg radius m-b20"> <Link to="/services-details" className="icon-cell">
                                                <i className={item.icon}></i></Link> </div>
                                            <div className="icon-content">
                                                <h5 className="dez-tilte"><Link to="/services-details">{item.title}</Link></h5>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <HomeCards />
                <div className="section-full content-inner-2 overlay-white-middle" style={{ backgroundImage: `url(${IMAGE.backgroundBg1}), url(${IMAGE.backgroundBg2})`, backgroundPosition: 'bottom, top', backgroundSize: ' 100%', backgroundRepeat: 'no-repeat' }}>
                    <div className="container">
                        <div className="section-head text-black text-center">
                            <h2 className="text-primary m-b10">Our Professional Team</h2>
                            <div className="dlab-separator-outer m-b0">
                                <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                            </div>
                            <p>
                                Our team focuses on product quality, performance, and customer satisfaction so every Mudiame Lush
                                experience reflects confidence and care.
                            </p>
                        </div>
                        <OurTeamslider />
                    </div>
                </div>
                <div className="section-full video-presentation overlay-black-dark bg-img-fix" style={{ backgroundImage: `url(${IMAGE.backgroundBgImg})` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 text-white text-center">
                                <h2>Brand Presentation</h2>
                                <p className="max-w700 m-auto">
                                    Discover how Mudiame Lush combines creativity, quality, and affordability to deliver beauty
                                    essentials that fit every mood, skin tone, and occasion.
                                </p>
                                <div className="video-play-icon m-t50" onClick={() => { setOpen(true) }}>
                                    <Link to="#" className="popup-youtube video"><i className="ti-control-play"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-full content-inner overlay-white-middle" style={{ backgroundImage: `url(${IMAGE.backgroundBg1}), url(${IMAGE.backgroundBg2})`, backgroundPosition: 'bottom, top', backgroundSize: '100%', backgroundRepeat: 'no-repeat', position: "relative" }}>
                    <div className="container">
                        <div className="section-head text-black text-center">
                            <h2 className="text-primary m-b10">Our Latest Blog</h2>
                            <div className="dlab-separator-outer m-b0">
                                <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                            </div>
                            <p>
                                Read practical beauty tips, product guides, and self-care insights from Mudiame Lush.
                            </p>
                        </div>
                        <OurBlogSlider />
                    </div>
                </div>





            </div>
        </>
    )
}

export default Services
