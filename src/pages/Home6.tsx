import { useEffect } from "react";
import Home6AboutUs from "../components/Home6AboutUs";
import Home6Ourteam from "../components/Home6Ourteam";
import Home6Portfolio from "../components/Home6Portfolio";
import { IMAGE } from "../constent/theme";
import Home6BrandProduct from "../element/Home6BrandProduct";
import HomeBanner from "../element/HomeBanner";
import OurPartner from "../element/OurPartner";

const Home6 = () => {
  useEffect(() => {
    document.body.setAttribute("data-theme-color", "color_1");
  }, []);

  return (
    <>
      <div className="page-content bg-white style-1 font-poppins">
        <HomeBanner />
        {/* about us */}
        <div
          className="section-full bg-white content-inner-2 overlay-white-middle section-wrapper1"
          id="dzServices"
        >
          <div className="container">
            <div className="row about-us-inner style-1 align-items-center">
              <div className="col-lg-6 dz-inner-1">
                <div className="section-head text-black style-1">
                  <h6 className="text-primary m-b10">About Us </h6>
                  <h2 className=" m-b10">
                    Keep Calm <br />& Paint Your Nails
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="counter-box style-1">
                      <div className="box-inner">
                        <h2>12+</h2>
                        <p>Years experience</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="counter-box style-1">
                      <div className="box-inner">
                        <h2>6K+</h2>
                        <p>Happy Customer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Home6AboutUs />
            </div>
          </div>
        </div>
        <Ourservices />
        {/* portfolio */}
        <div className="section-full content-inner-2 portfolio-wrapper1">
          <div className="container">
            <div className="section-head text-center style-1">
              <h2>
                Let us help keep <br />
                Your Nails Beautiful.
              </h2>
            </div>
            <Home6Portfolio />
          </div>
        </div>
        {/* our team */}
        <div className="section-full our-team">
          <div className="container">
            <div className="section-head text-center style-1">
              <h2>
                Our Professionals <br />
                will make you Beautiful.
              </h2>
            </div>
            <Home6Ourteam />
          </div>
        </div>
        <CustomerReviw />
        {/* brand products */}
        <div className="section-full content-inner-2 product-box-wrapper style-1">
          <div className="container">
            <div className="section-head text-center style-1">
              <h2>Branded Products</h2>
            </div>
            <Home6BrandProduct />
          </div>
        </div>
        <OurPartner />
      </div>
    </>
  );
};

export default Home6;

export function Ourservices() {
  const serviceDetail = [
    { img: IMAGE.serviceNailArt1 },
    { img: IMAGE.serviceNailArt2 },
    { img: IMAGE.serviceNailArt3 },
    { img: IMAGE.serviceNailArt4 },
  ];
  return (
    <>
      <div
        className="section-full services-wrapper1"
        style={{
          backgroundImage: `url(${IMAGE.bg11})`,
          backgroundPosition: "center right",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <div className="row service-inner m-0">
                {serviceDetail.map((item, ind) => (
                  <div className="col-sm-6 p-0" key={ind}>
                    <div className="icon-bx-wraper center style-1">
                      <div className="icon-lg m-b30">
                        <img src={item.img} alt="" />{" "}
                      </div>
                      <div className="icon-content">
                        <h6 className="dlab-tilte">Nail Art</h6>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const CustomerReviw = () => {
  const animatBg = [
    { img: IMAGE.imgEvenlope, className: "circle1 slideskew5" },
    { img: IMAGE.imgLike, className: "circle2 slideskew6" },
    { img: IMAGE.imgSmile, className: "circle3 slideskew7" },
    { img: IMAGE.imgShare, className: "circle4 slideskew8" },
    { img: IMAGE.imgChat, className: "circle5 slideskew9" },
  ];
  return (
    <>
      <div className="section-full content-inner-2 customers-review-wrapper">
        <div className="container">
          <img src={IMAGE.start1} className="star-1 slideskew" alt="" />
          <img src={IMAGE.start2} className="star-2 slideskew" alt="" />
          <div className="animated-background">
            <svg
              className="big-star  rotate-360"
              width="384"
              height="370"
              viewBox="0 0 384 370"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_115_175)">
                <path
                  d="M175.832 27.7599C180.921 12.0976 203.079 12.0976 208.168 27.7599L232.188 101.686C234.464 108.69 240.991 113.433 248.356 113.433L326.086 113.433C342.555 113.433 349.402 134.506 336.079 144.186L273.194 189.875C267.235 194.204 264.742 201.877 267.018 208.881L291.038 282.807C296.127 298.47 278.201 311.494 264.878 301.814L201.992 256.125C196.034 251.796 187.966 251.796 182.008 256.125L119.122 301.814C105.799 311.494 87.8731 298.47 92.962 282.807L116.982 208.881C119.258 201.877 116.765 194.204 110.806 189.875L47.9212 144.186C34.5981 134.506 41.4452 113.433 57.9135 113.433L135.644 113.433C143.009 113.433 149.536 108.69 151.812 101.686L175.832 27.7599Z"
                  fill="#FDEEE9"
                />
                <path
                  d="M185.343 30.85C187.438 24.4008 196.562 24.4009 198.657 30.85L208.168 27.7599L198.657 30.85L222.677 104.776C226.292 115.901 236.659 123.433 248.356 123.433L326.086 123.433C332.868 123.433 335.687 132.11 330.201 136.096L267.316 181.785C257.853 188.66 253.893 200.847 257.507 211.972L281.527 285.898C283.623 292.347 276.241 297.71 270.755 293.724L207.87 248.035C198.407 241.16 185.593 241.16 176.13 248.035L113.244 293.724C107.759 297.71 100.377 292.347 102.473 285.898L126.493 211.972C130.107 200.847 126.147 188.66 116.684 181.785L53.799 136.096C48.313 132.11 51.1325 123.433 57.9135 123.433L135.644 123.433C147.341 123.433 157.708 115.901 161.323 104.776L185.343 30.85Z"
                  stroke="white"
                  strokeWidth="20"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_115_175"
                  x="0.880859"
                  y="0.0131836"
                  width="382.238"
                  height="369.125"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="24" />
                  <feGaussianBlur stdDeviation="20" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_115_175"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_115_175"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            {animatBg.map((item, ind) => (
              <div className={item.className} key={ind}>
                <img src={item.img} className="icons-1" alt="" />
              </div>
            ))}
          </div>
          <div className="review-inner">
            <div className="section-head text-center style-1">
              <h2>Our Happy Customer Reviews</h2>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="dz-reviews review-1 slideskew1">
                  <div className="dz-profile">
                    <div className="profile-pic">
                      <img src={IMAGE.testymonial} alt="" />
                    </div>
                    <h5 className="profile-name text-primary">Charlotte</h5>
                  </div>
                  <p className="review">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{" "}
                  </p>
                  <div className="triangle"></div>
                </div>
                <div className="dz-reviews review-2 slideskew2">
                  <div className="dz-profile">
                    <div className="profile-pic">
                      <img src={IMAGE.testymonial2} alt="" />
                    </div>
                    <h5 className="profile-name text-primary">Jennifer</h5>
                  </div>
                  <p className="review">
                    Lorem Ipsum is simply dummy text of the printing.
                  </p>
                  <div className="triangle"></div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="dz-reviews review-3 slideskew3">
                  <div className="dz-profile">
                    <div className="profile-pic">
                      <img src={IMAGE.testymonial3} alt="" />
                    </div>
                    <h5 className="profile-name text-primary">Charlotte</h5>
                  </div>
                  <p className="review">
                    Lorem Ipsum is simply dummy text of the printing.
                  </p>
                  <div className="triangle-2"></div>
                </div>
                <div className="dz-reviews review-4 slideskew4">
                  <div className="dz-profile">
                    <div className="profile-pic">
                      <img src={IMAGE.testymonial} alt="" />
                    </div>
                    <h5 className="profile-name text-primary">Jennifer</h5>
                  </div>
                  <p className="review">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <div className="triangle-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
