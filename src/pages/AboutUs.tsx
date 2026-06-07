import AboutServices from "../components/AboutServices"
import OurBlogSlider from "../components/OurBlogSlider"
import OurPricing from "../components/OurPricing"
import Testymonial from "../components/Testymonial"
import { IMAGE } from "../constent/theme"
import CommonBanner from "../element/CommonBanner"
import Seo from "../components/Seo"

const AboutUs = () => {
    return (
        <>
            <div className="page-content bg-white">
                <Seo
                    title="About Mudiame Lush"
                    description="Learn about Mudiame Lush, a vibrant Nigerian beauty brand rooted in quality, creativity, confidence, and complete self-care."
                    canonicalPath="/about-us"
                    keywords={["About Mudiame Lush", "beauty brand Nigeria", "Lekki beauty brand", "self-care products Lagos"]}
                />
                <CommonBanner title={'About Us'} image={IMAGE.banner1} />
                <div className="content-block">
                    <div className="section-full content-inner overlay-white-middle" style={{ backgroundImage: `url(${IMAGE.backgroundBg1}), url(${IMAGE.backgroundBg2})`, backgroundPosition: 'bottom, top', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
                        <div className="container">
                            <div className="section-head text-black text-center">
                                <h2 className="text-primary m-b10">About Mudiame Lush</h2>
                                <h6 className="m-b10">Proudly Nigerian. Boldly Beautiful.</h6>
                                <div className="dlab-separator-outer m-b0">
                                    <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                                </div>
                                <p>
                                    Mudiame Lush is a proudly Nigerian beauty brand dedicated to enhancing natural beauty through quality makeup and skincare products.
                                    Founded by a passionate Nigerian entrepreneur, the brand has been serving beauty lovers for several years, building a reputation for 
                                    excellence, authenticity, and customer satisfaction.

                                    At Mudiame Lush, we believe that beauty is confidence. Our carefully curated products are designed to nourish the skin, elevate every 
                                    makeup look, and help our customers feel their best every day. With a commitment to quality, innovation, and inclusivity, we continue 
                                    to provide beauty solutions that celebrate the uniqueness of every individual.
                                </p>
                            </div>
                            <AboutServices />
                        </div>
                    </div>
                    <div className="section-full content-inner bg-blue-light" style={{ backgroundImage: `url(${IMAGE.backgroundBg5})`, backgroundPosition: 'bottom', backgroundSize: ' cover', backgroundRepeat: 'no-repeat' }}>
                        <div className="container">
                            <div className="section-head text-black text-center">
                                <h2 className="text-primary m-b10">Our Pricing</h2>
                                <div className="dlab-separator-outer m-b0">
                                    <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                                </div>
                                <p>
                                    Transparent pricing across our signature range: gel nail polish, lip glosses, eyeshadow palettes, and lip pencils.
                                    Beauty products you can trust for everyday confidence.
                                </p>
                            </div>
                            <OurPricing />
                        </div>
                    </div>
                    <div className="section-full bg-white content-inner">
                        <div className="container">
                            <div className="section-head text-black text-center">
                                <h2 className="text-primary m-b10">Our Brand Commitment</h2>
                                <div className="dlab-separator-outer m-b0">
                                    <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                                </div>
                                <p>
                                    Behind Mudiame Lush is a focused team committed to product quality, customer trust, and creative beauty experiences.
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 m-b30">
                                    <div className="service-box text-center p-a30">
                                        <h5 className="text-primary">Product Development</h5>
                                        <p className="m-b0">
                                            We select and refine products to deliver strong pigmentation, smooth application, and dependable performance.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 m-b30">
                                    <div className="service-box text-center p-a30">
                                        <h5 className="text-primary">Quality Assurance</h5>
                                        <p className="m-b0">
                                            Every item is reviewed for quality, safety, and consistency so customers receive results they can trust.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 m-b30">
                                    <div className="service-box text-center p-a30">
                                        <h5 className="text-primary">Customer Experience</h5>
                                        <p className="m-b0">
                                            Our team supports beauty lovers with practical guidance, curated selections, and complete self-care solutions in one place.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-full content-inner-2" style={{ backgroundImage: `url(${IMAGE.backgroundBg4})`, backgroundPosition: ' bottom', backgroundSize: 'cover', position: 'relative' }}>
                        <div className="container" >
                            <div className="section-head text-black text-center">
                                <h2 className="text-primary m-b10">What Our Customers Say</h2>
                                <div className="dlab-separator-outer m-b0">
                                    <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                                </div>
                                <p>
                                    Real feedback from beauty lovers who choose Mudiame Lush for quality products, confident looks, and complete self-care.
                                </p>
                            </div>
                            <Testymonial />
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
                                    Explore beauty tips, product usage guides, and self-care ideas to help you look and feel your best every day.
                                </p>
                            </div>
                            <OurBlogSlider />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs;
