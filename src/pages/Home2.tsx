import { Link } from "react-router-dom";
import Home2Slider from "../components/Home2Slider";
import { IMAGE } from "../constent/theme";
import OurClient from "../element/OurClient";
import OurPricing from "../components/OurPricing";
import Home2Portfolio from "../components/Home2Portfolio";
import Testymonial from "../components/Testymonial";
import OurBlogSlider from "../components/OurBlogSlider";
import { useEffect } from "react";

const cards = [
  {
    title: "Gel Nail Polish",
    icon: "flaticon-barbershop",
    description:
      "Vegan and cruelty-free gel polish with rich color and long-wear shine built for everyday glam.",
  },
  {
    title: "Lip Glosses",
    icon: "flaticon-makeup",
    description:
      "High-shine lip gloss formulas created for comfortable all-day wear across every look.",
  },
  {
    title: "Eyeshadow Palette",
    icon: "flaticon-makeup-1",
    description:
      "A curated mix of matte, shimmer, and metallic shades with smooth blendability and strong payoff.",
  },
  {
    title: "Lip Pencil",
    icon: "flaticon-woman-1",
    description:
      "Creamy, precise lip pencils designed to define, shape, and help your lipstick last longer.",
  },
  {
    title: "Face & Foot Masks",
    icon: "flaticon-woman",
    description:
      "Nourishing self-care masks selected to refresh skin and support a complete beauty routine.",
  },
  {
    title: "Hair & Body Oils",
    icon: "flaticon-candle-1",
    description:
      "Revitalizing oils that support healthy-looking hair and soft, radiant skin from head to toe.",
  },
];

const Home2 = () => {
  useEffect(() => {
    document.body.setAttribute("data-theme-color", "color_1");
  }, []);
  return (
    <div className="page-content">
      <Home2Slider />
      <div
        className="section-full bg-white content-inner-2"
        style={{
          backgroundImage: `url(${IMAGE.bg7})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row">
            <OurClient />
          </div>
        </div>
      </div>
      {/* services */}
      <div className="section-full about-section bg-white">
        <div className="container-fluid">
          <div className="row equal-wraper">
            <div className="bg-primary col-xl-3 p-a0 col-md-6 col-lg-3 col-xs-12 equal-col dis-tbl">
              <div
                className="p-a30 text-white dis-tbl-cell wow fadeIn"
                data-wow-delay="0.3s"
              >
                <p className="font-weight-600 m-b10">About Mudiame Lush</p>
                <h4 className="font-weight-700">
                  Redefining Everyday Glamour in Nigeria
                </h4>
                <p>
                  Mudiame Lush is a vibrant Nigerian beauty brand focused on
                  quality, creativity, and confidence. We create branded beauty
                  essentials that celebrate bold expression and effortless
                  elegance for every mood and occasion.
                </p>
                <Link
                  to="/services-details"
                  className="site-button white outline outline-2"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 p-a0 col-xs-12 equal-col">
              <img
                src={IMAGE.aboutImg1}
                className="abt-img img-cover equal-col"
                alt=""
                style={{ width: "unset", height: "100%" }}
              />
            </div>
            <div className="bg-primary col-xl-3 p-a0 col-md-6 col-lg-3 col-xs-12 equal-col dis-tbl">
              <div
                className="p-a30 text-white dis-tbl-cell wow fadeIn"
                data-wow-delay="0.6s"
              >
                <p className="font-weight-600 m-b10">What We Offer</p>
                <h4 className="font-weight-700">
                  Branded Essentials + Complete Self-Care
                </h4>
                <p>
                  From richly pigmented nail polishes and lip products to
                  eyeshadow palettes, masks, and nourishing oils, every Mudiame
                  Lush product is selected or formulated for quality,
                  affordability, and visible results.
                </p>
                <Link to="/services-details" className="site-button white">
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 p-a0 col-xs-12 equal-col">
              <img
                src={IMAGE.aboutImg2}
                className="abt-img img-cover equal-col"
                alt=""
                style={{ width: "unset", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section-full content-inner-2 bg-white hair-services">
        <div className="container">
          <div className="section-head text-black text-center">
            <h2 className="text-primary m-b10">Our Services</h2>
            <div className="dlab-separator-outer m-b0">
              <div className="dlab-separator text-primary style-icon">
                <i className="flaticon-spa text-primary"></i>
              </div>
            </div>
            <p>
              Explore our signature beauty range, including long-wear nail
              polish, glosses, palettes, and lip pencils, plus self-care
              essentials designed for confident everyday beauty.
            </p>
          </div>
          <div className="row">
            {cards.map((item, index) => (
              <div className="col-lg-4 col-md-6 col-sm-6 p-lr0" key={index}>
                <div className="icon-bx-wraper center p-a30">
                  <div className="icon-lg radius m-b20">
                    {" "}
                    <Link to="/services-details" className="icon-cell">
                      <i className={item.icon}></i>
                    </Link>{" "}
                  </div>
                  <div className="icon-content">
                    <h5 className="dez-tilte">
                      <Link to="/services-details">{item.title}</Link>
                    </h5>
                    <p>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="section-full content-inner bg-blue-light"
        style={{
          backgroundImage: `url(${IMAGE.backgroundBg5})`,
          backgroundPosition: "bottom",
          backgroundSize: " cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="section-head text-black text-center">
            <h2 className="text-primary m-b10">Our Pricing</h2>
            <div className="dlab-separator-outer m-b0">
              <div className="dlab-separator text-primary style-icon">
                <i className="flaticon-spa text-primary"></i>
              </div>
            </div>
            <p>
              Transparent pricing for our core Mudiame Lush products. Quality
              beauty essentials at accessible prices in naira.
            </p>
          </div>
          <OurPricing />
        </div>
      </div>

      {/* our portfolio */}
      <div className="section-full content-inner-1 bg-white portfolio-box">
        <div className="container-fluid">
          <div className="section-head text-black text-center m-b20">
            <h2 className="text-primary m-b10">Beauty Gallery</h2>
            <div className="dlab-separator-outer m-b0">
              <div className="dlab-separator text-primary style-icon">
                <i className="flaticon-spa text-primary"></i>
              </div>
            </div>
            <p>
              Discover selected Mudiame Lush looks, product showcases, and
              beauty inspirations across our core categories.
            </p>
          </div>
          <Home2Portfolio />
        </div>
      </div>
      {/* our professional teame */}
      <div className="section-full bg-white content-inner">
        <div className="container">
          <div className="section-head text-black text-center">
            <h2 className="text-primary m-b10">Our Professional Team</h2>
            <div className="dlab-separator-outer m-b0">
              <div className="dlab-separator text-primary style-icon">
                <i className="flaticon-spa text-primary"></i>
              </div>
            </div>
            <p>
              Behind Mudiame Lush is a focused team committed to product
              quality, customer trust, and creative beauty experiences.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 m-b30">
              <div className="service-box text-center p-a30">
                <h5 className="text-primary">Product Development</h5>
                <p className="m-b0">
                  We select and refine products to deliver strong pigmentation,
                  smooth application, and dependable performance.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 m-b30">
              <div className="service-box text-center p-a30">
                <h5 className="text-primary">Quality Assurance</h5>
                <p className="m-b0">
                  Every item is reviewed for quality, safety, and consistency
                  so customers receive results they can trust.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 m-b30">
              <div className="service-box text-center p-a30">
                <h5 className="text-primary">Customer Experience</h5>
                <p className="m-b0">
                  Our team supports beauty lovers with practical guidance,
                  curated selections, and complete self-care solutions in one
                  place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* testimonials */}
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
            <h2 className="text-primary m-b10">What Our Customers Say</h2>
            <div className="dlab-separator-outer m-b0">
              <div className="dlab-separator text-primary style-icon">
                <i className="flaticon-spa text-primary"></i>
              </div>
            </div>
            <p>
              Real feedback from beauty lovers who trust Mudiame Lush for
              quality products, confident looks, and complete self-care.
            </p>
          </div>
          <Testymonial />
        </div>
      </div>
      {/* latest blog */}
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
              Read quick beauty guides, product tips, and self-care ideas from
              Mudiame Lush to help you look confident every day.
            </p>
          </div>
          <OurBlogSlider />
        </div>
      </div>
    </div>
  );
};

export default Home2;
