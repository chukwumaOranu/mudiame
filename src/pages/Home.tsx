import { Link } from "react-router-dom";
import Home_slider from "../components/Home_slider";
import OurServicesSlider from "../components/OurServicesSlider";
import OurPortfolio from "../components/OurPortfolio";
import { IMAGE } from "../constent/theme";
import ModalVideo from "react-modal-video";
import { useEffect, useState } from "react";
import OurTeamslider from "../components/OurTeamslider";
import Testymonial from "../components/Testymonial";
import OurBlogSlider from "../components/OurBlogSlider";

const cards = [
  { icon: "flaticon-woman", title: "We are Professional" },
  { icon: "flaticon-mortar", title: "Lux Cosmetic" },
  { icon: "flaticon-candle", title: "Medical Education" },
  { icon: "flaticon-sauna-1", title: "The Newest Equipment" },
];
const Home = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.setAttribute("data-theme-color", "color_1");
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
        <Home_slider />
        <div
          className="section-full bg-white content-inner-2 overlay-white-middle"
          style={{
            backgroundImage: `url(${IMAGE.backgroundBg1}), url(${IMAGE.backgroundBg2})`,
            backgroundPosition: " bottom, top",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="section-head text-black text-center">
              <h2 className="text-primary m-b10">Our Services</h2>
              <h6 className="m-b10">
                You Will Like To Look Like Goddes Every Day!
              </h6>
              <div className="dlab-separator-outer m-b0">
                <div className="dlab-separator text-primary style-icon">
                  <i className="flaticon-spa text-primary"></i>
                </div>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the.
              </p>
            </div>
            <OurServicesSlider />
          </div>
        </div>
        <HomeCards />
        <div
          className="section-full content-inner-2 our-portfolio"
          style={{
            backgroundImage: `url(${IMAGE.backgroundBg6})`,
            backgroundSize: " cover",
          }}
        >
          <div className="container">
            <div className="section-head text-black text-center m-b20">
              <h2 className="text-primary m-b10">Our Portfolio</h2>
              <div className="dlab-separator-outer m-b0">
                <div className="dlab-separator text-primary style-icon">
                  <i className="flaticon-spa text-primary"></i>
                </div>
              </div>
              <p className="m-b0">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the.
              </p>
            </div>
            <OurPortfolio />
          </div>
        </div>
        <div
          className="section-full video-presentation overlay-black-dark bg-img-fix"
          style={{
            backgroundImage: `url(${IMAGE.backgroundBgImg})`,
            height: "auto",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 text-white text-center">
                <h2>Video Presentation </h2>
                <p className="max-w700 m-auto">
                  In this video, our staff members tell about their work at
                  Solari, how they achieve the best results for their clients
                  every day and more. Click the Play button below to watch this
                  presentation.
                </p>
                <div
                  className="video-play-icon m-t50"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <Link to="#" className="popup-youtube video">
                    <i className="ti-control-play"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="section-full content-inner-2 overlay-white-middle"
          style={{
            backgroundImage: `url(${IMAGE.backgroundBg1}), url(${IMAGE.backgroundBg2})`,
            backgroundPosition: "bottom, top",
            backgroundSize: " 100%",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "auto",
          }}
        >
          <div className="container">
            <div className="section-head text-black text-center">
              <h2 className="text-primary m-b10">Our Professional Team</h2>
              <div className="dlab-separator-outer m-b0">
                <div className="dlab-separator text-primary style-icon">
                  <i className="flaticon-spa text-primary"></i>
                </div>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the.
              </p>
            </div>
            <OurTeamslider />
          </div>
        </div>
        <div
          className="section-full content-inner-2"
          style={{
            backgroundImage: `url(${IMAGE.backgroundBg4})`,
            backgroundPosition: " bottom",
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          <div className="container">
            <div className="section-head text-black text-center">
              <h2 className="text-primary m-b10">
                Testimonials Of Our Clients
              </h2>
              <div className="dlab-separator-outer m-b0">
                <div className="dlab-separator text-primary style-icon">
                  <i className="flaticon-spa text-primary"></i>
                </div>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the.
              </p>
            </div>
            <Testymonial />
          </div>
        </div>
        <div
          className="section-full content-inner overlay-white-middle"
          style={{
            backgroundImage: `url(${IMAGE.backgroundBg1}), url(${IMAGE.backgroundBg2})`,
            backgroundPosition: "bottom, top",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <div className="container">
            <div className="section-head text-black text-center">
              <h2 className="text-primary m-b10">Our Latest Blog</h2>
              <div className="dlab-separator-outer m-b0">
                <div className="dlab-separator text-primary style-icon">
                  <i className="flaticon-spa text-primary"></i>
                </div>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the.
              </p>
            </div>
            <OurBlogSlider />
          </div>
        </div>
      </div>
    </>
  );
};

export const HomeCards = () => {
  return (
    <>
      <div
        className="section-full content-inner-3 services-box bg-pink-light"
        style={{
          backgroundImage: `url(${IMAGE.backgroundBg5})`,
          backgroundPosition: "bottom",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            {cards.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 m-b30" key={index}>
                <div className="icon-bx-wraper p-lr15 p-b30 p-t20 bg-white center fly-box-ho">
                  <div className="icon-lg m-b10">
                    <span className="icon-cell text-primary">
                      <i className={item.icon}></i>
                    </span>{" "}
                  </div>
                  <div className="icon-content">
                    <h6 className="dlab-tilte">{item.title}</h6>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                    <Link
                      to="/services-details"
                      className="site-button-secondry"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
