import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"

const OurClient = () => {
    return (
        <>
            <div className="col-lg-5 m-b30 align-self-center">
                <div className="dis-tbl-cell  m-b30">
                    <h2 className="m-t0 m-b10">Why Choose Mudiame Lush</h2>
                    <h6 className="fw7 m-b15">
                        At Mudiame Lush, we believe beauty should be empowering, expressive, and accessible.
                        Every product we offer is thoughtfully created and carefully selected to help you look
                        and feel your absolute best every single day.
                    </h6>
                    <ul className="list-angle-right">
                        <li><strong>Proudly Nigerian Brand</strong> - Rooted in Nigeria and inspired by bold beauty, creativity, and confidence.</li>
                        <li><strong>Quality You Can Trust</strong> - High-performance, long-lasting products crafted with care and attention to detail.</li>
                        <li><strong>Vegan &amp; Cruelty-Free Options</strong> - Beauty that's kind to you and conscious of the world around you.</li>
                        <li><strong>Inclusive for Every Style &amp; Skin Tone</strong> - From soft everyday looks to bold glam, there's something for everyone.</li>
                        <li><strong>Complete Beauty &amp; Self-Care Destination</strong> - From makeup essentials to nourishing self-care products, all in one place.</li>
                    </ul>
                    <Link to="/about-us" className="site-button m-r15">About Us <i className="ti-arrow-right m-l10"></i></Link>
                    <Link to="/about-us" className="site-button-secondry ">Read More <i className="ti-arrow-right m-l10"></i></Link>
                </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
                <div className="img-collage">
                    <div className="coll-1"><img src={IMAGE.collegePic1} alt="" /></div>
                    <div className="coll-2"><img src={IMAGE.collegePic2} alt="" /></div>
                    <div className="coll-3"><img src={IMAGE.collegePic3} alt="" /></div>
                    <div className="coll-4"><img src={IMAGE.collegePic4} alt="" /></div>
                </div>
            </div>
        </>
    )
}

export default OurClient
