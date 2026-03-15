import ModalVideo from "react-modal-video";
import Home3slider from "../components/Home3slider";
import { IMAGE } from "../constent/theme";
import Home3ModalVideo from "../element/Home3ModalVideo";
import { useEffect, useState } from "react";
import Home3OurServices from "../components/Home3OurServices";
import Home3PricingTable from "../element/Home3PricingTable";
import Home3Blog from "../element/Home3Blog";
import { Link } from "react-router-dom";

const Home3 = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.setAttribute("data-theme-color", "color_2");
  }, []);

  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={open}
        videoId="rICXf0UH7Cg"
        onClose={() => setOpen(false)}
      />

      <div className="page-content bg-white">
        <div className="rev-slider-full">
          <Home3slider />
        </div>
        {/* about us */}
        <div
          className="section-full about-hair-beauty content-inner-1"
          style={{
            backgroundImage: `url(${IMAGE.bg4})`,
            backgroundPosition: "top 50px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-lg-7 col-md-12 about-hair-content">
                <h4>About Us</h4>
                <h2 className="text-primary text-uppercase">
                  Beauty <br /> Salon
                </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Ipsum has been the industry's standard
                  dummy text ever since the 1500s, when an unknown printer took
                  Link galley of type and scrambled it to make Link type
                  specimen book. It has survived not only five centuries Lorem
                  Ipsum is simply dummy text of the printing and typesetting
                  industry.
                </p>
                <Link
                  to="/about-us"
                  className="site-button-link line-link black m-b20"
                >
                  Read More <span></span>
                </Link>
              </div>
              <div className="col-lg-5 col-md-12">
                <div
                  className="about-hair-bx"
                  style={{
                    backgroundImage: `url(${IMAGE.bg3})`,
                    backgroundPosition: "right bottom",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div>
                    <div className="text-black">
                      <h2>Come Experience the Real Delight</h2>
                      <h4 className="text-primary">Appointment Now</h4>
                      <Link to="/booking" className="site-button">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Home3ModalVideo setOpen={setOpen} />
          </div>
        </div>

        {/* our services */}
        <div
          className="section-full content-inner-3 hair-srbx"
          style={{
            backgroundImage: `url(${IMAGE.bg5})`,
            backgroundPosition: "top 50px",
          }}
        >
          <div className="container">
            <div className="section-head hair-head text-center">
              <h4>Our Services</h4>
              <h2 className="text-primary text-uppercase">Our Services</h2>
            </div>
            <Home3OurServices />
          </div>
        </div>
        {/* pricing table */}
        <div
          className="section-full content-inner"
          style={{
            backgroundImage: `url(${IMAGE.bg4})`,
            backgroundPosition: "top 50px",
          }}
        >
          <div className="container">
            <div className="section-head hair-head text-center">
              <h4>Price Table</h4>
              <h2 className="text-primary text-uppercase">Our Membership</h2>
            </div>
            <Home3PricingTable />
          </div>
        </div>
        {/* our latest blog */}
        <div className="section-full content-inner blog-hair-bx">
          <div className="container">
            <div className="section-head hair-head text-center">
              <h4>Our News</h4>
              <h2 className="text-primary text-uppercase">Latest Blog</h2>
            </div>
            <Home3Blog />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home3;
