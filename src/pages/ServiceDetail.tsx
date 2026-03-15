import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { useReducer, useRef } from "react"
import CommonBanner2 from "../element/CommonBanner2"


const slider = [
    { img: IMAGE.blog_gridPic1, icon: 'flaticon-woman' },
    { img: IMAGE.blog_gridPic2, icon: 'flaticon-mortar' },
    { img: IMAGE.blog_gridPic3, icon: 'flaticon-candle' },
    { img: IMAGE.blog_gridPic1, icon: 'flaticon-woman' },
    { img: IMAGE.blog_gridPic2, icon: 'flaticon-mortar' },
    { img: IMAGE.blog_gridPic3, icon: 'flaticon-candle' },

]



const ServiceDetail = () => {

    const swiperRef = useRef<SwiperRef | null>(null)
    return (
        <>
            <div className="page-content bg-white">
                <CommonBanner2 title={'Services Details'} img={IMAGE.banner3} />
                <div className="content-block">
                    <div className="section-full content-inner-2">
                        <div className="container">
                            <div className="row" >
                                <div className="col-lg-3 col-md-4" style={{ zIndex: 2 }}>
                                    <div className="sticky-top">
                                        <ul className="service-list m-b30">
                                            <li className="active"><Link to="/services-details">Haircut & Styling</Link></li>
                                            <li><Link to="/services-details">Makeup</Link></li>
                                            <li><Link to="/services-details">Manicure & Pedicure  </Link></li>
                                            <li><Link to="/services-details">Skin Care</Link></li>
                                            <li><Link to="/services-details">Body Treatment</Link></li>
                                            <li><Link to="/services-details">Massage</Link></li>
                                        </ul>
                                        <div className="download-brochure m-b30 ">
                                            <h4>Brochure</h4>
                                            <p>Working from home meant we could vary snack and coffee breaks.</p>
                                            <Link to="/" className="site-button">Download PDF</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                    <h2 className="m-t0 m-b10 fw6">Service Details</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <Swiper className="blog-carousel mfp-gallery owl-loaded owl-theme owl-carousel gallery owl-btn-center-lr owl-btn-1 primary m-b30"
                                        slidesPerView={3}
                                        spaceBetween={30}
                                        speed={1500}
                                        loop={true}
                                        ref={swiperRef}
                                        breakpoints={{
                                            1200: {
                                                slidesPerView: 3
                                            },
                                            600: {
                                                slidesPerView: 2
                                            },
                                            240: {
                                                slidesPerView: 1
                                            },
                                        }}
                                    >
                                        {slider.map((item, index) => (
                                            <SwiperSlide className="item" key={index}>
                                                <div className="dlab-box service-iconbox">
                                                    <div className="dlab-media dlab-img-overlay5"> <Link to="/services-details">
                                                        <img src={item.img} alt="" /></Link> </div>
                                                    <div className="dlab-info p-a30 p-t60 border-1 bg-white text-center">
                                                        <div className="icon-bx-sm radius bg-white m-b20"> <Link to="/services-details" className="icon-cell">
                                                            <i className={item.icon}></i></Link> </div>
                                                        <h6 className="dlab-title m-t0"><Link to="/services-details">We are Professional</Link></h6>
                                                        <p className="m-b15">Lorem ipsum dolor Fusce varius euismod lacus eget feugiat rorem.</p>
                                                    </div>
                                                </div>

                                            </SwiperSlide>
                                        ))}
                                        <div className="light-carousel-buttons">
                                            <div onClick={() => { swiperRef.current?.swiper.slidePrev() }} className="button-prev"><i className="ti-angle-left"></i></div>
                                            <div onClick={() => { swiperRef.current?.swiper.slideNext() }} className="button-next"><i className="ti-angle-right"></i></div>
                                        </div>
                                    </Swiper>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <p className="m-b20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <AccordionAndCards />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}



const accordionArray = [
    { title: '  1. Web design aorem apsum dolor sit amet?', subtitle: 'Web design aorem apsum dolor sit amet, adipiscing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.' },
    { title: '   2. Graphic design aorem apsum dolor ?', subtitle: ' Graphic design aorem apsum dolor sit amet, adipiscing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.' },
    { title: '   3. Developement aorem apsum dolor sit amet ?', subtitle: 'Developement aorem apsum dolor sit amet, adipiscing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ' },
    { title: '  4. True Responsiveness consectetuer adipiscing ? ', subtitle: 'Developement aorem apsum dolor sit amet, adipiscing elit, sed diam nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ' },
]
const cards = [
    { title: 'Haircut & Styling', icon: 'flaticon-barbershop' },
    { title: 'Makeup', icon: 'flaticon-makeup' },
    { title: 'Manicure & Pedicure', icon: 'flaticon-makeup-1' },
    { title: 'Skin Care', icon: 'flaticon-woman-1' },
    { title: 'Body Treatment', icon: 'flaticon-woman' },
    { title: 'Massage', icon: 'flaticon-candle-1' },
]
export function AccordionAndCards() {

    const reducer = (previousState: any, updatedState: any) => ({
        ...previousState,
        ...updatedState,
    });
    const initialState = {
        activeSubmenu: 0,
    }

    const [state, setState] = useReducer(reducer, initialState);
    const accordianHandler = (status: any) => {
        setState({ activeSubmenu: status })
        if (state.activeSubmenu === status) {
            setState({ activeSubmenu: "" })
        }
    }
    return (
        <>

            <div className="m-tb20">
                <div className="accordion no-gap" id="accordion1">
                    {accordionArray.map((item, index) => (
                        <div className="panel" key={index}>
                            <div className="acod-head">
                                <h6 className="acod-title">
                                    <Link onClick={() => { accordianHandler(index) }}
                                        to="#" className={`${state.activeSubmenu === index ? "" : 'collapsed'}`}>
                                        {item.title}</Link> </h6>
                            </div>
                            <div className={`acod-body collapse ${state.activeSubmenu === index ? "show" : ''}`}>
                                <div className="acod-content">{item.subtitle}</div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="row m-lr0">
                {cards.map((i, ind) => (
                    <div className="col-lg-4 col-md-6 col-sm-6 p-lr0" key={ind}>
                        <div className="icon-bx-wraper center p-a30 bg-gray">
                            <div className="icon-lg radius m-b20">
                                <Link to="/services-details" className="icon-cell"><i className={i.icon}></i></Link> </div>
                            <div className="icon-content">
                                <h6 className="dez-tilte"><Link to="/services-details">{i.title}</Link></h6>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh..</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default ServiceDetail