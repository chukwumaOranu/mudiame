import { Link } from "react-router-dom";
import Home4Paricing from "../components/Home4Paricing";
import { IMAGE } from "../constent/theme";
import Home4Portfolio from "../components/Home4Portfolio";
import Home4OurServices from "../components/Home4OurServices";
import Home4Testimonial from "../components/Home4Testimonial";
import { useEffect } from "react";
import Home4Slider from "../components/Home4Slider";

export const Home4 = () => {
  useEffect(() => {
    document.body.setAttribute("data-theme-color", "color_3");
  }, []);
  return (
    <>
      <div className="page-content bg-white">
        <Home4Slider />
        <div className="section-full bg-white content-inner-2 spa-about-bx">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="spa-bx-img">
                  <img src={IMAGE.aboutImg4} />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 spa-about-content">
                <h2>
                  Not Your <br />
                  Everyday Spa
                </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took Link galley of type and scrambled it to make Link
                  type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
                <Link
                  to="/about-us"
                  className="site-button radius-no button-effect1"
                >
                  Read More<span></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* pricing */}
        <div className="section-full content-inner-3 spa-price-bx">
          <div className="container">
            <div className="section-head text-black text-center">
              <h5 className="text-primary">Best Deal</h5>
              <h2 className="m-b10">Special Pricing</h2>
            </div>
            <Home4Paricing />
          </div>
        </div>
        {/* postfolio */}
        <div
          className="section-full content-inner-2 spa-our-portfolio"
          style={{
            backgroundImage: `url(${IMAGE.bg9})`,
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div className="section-head text-black text-center">
              <h5 className="text-primary">Portfolio</h5>
              <h2 className="m-b10">Our Portfolio</h2>
            </div>
            <Home4Portfolio />
          </div>
        </div>
        {/* our services */}
        <div className="section-full content-inner-3 spa-price-bx">
          <div className="container">
            <div className="section-head text-black text-center">
              <h5 className="text-primary">Services</h5>
              <h2 className="m-b0">Our Service</h2>
            </div>
            <Home4OurServices />
          </div>
        </div>
        {/* testimonial */}
        <div className="section-full content-inner-2 spa-testimonial">
          <div className="container">
            <div className="section-head text-black text-center">
              <h5 className="text-primary">Our Client</h5>
              <h2 className="m-b0">Our Testimonial</h2>
            </div>
            <Home4Testimonial />
          </div>
        </div>
      </div>
    </>
  );
};
