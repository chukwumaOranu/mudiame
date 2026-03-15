import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";

const Footer3 = () => {
  return (
    <>
      <footer className="site-footer hair-footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-md-12 sub-bx">
                <h4 className="head-sub">
                  Want to get updates on Spa & Wellness news?
                </h4>
                <div className="subscribe-form m-b20">
                  <form className="dzSubscribe" method="post">
                    <div className="dzSubscribeMsg"></div>
                    <div className="input-group">
                      <input
                        name="dzEmail"
                        required
                        className="form-control"
                        placeholder="Your Email Address"
                        type="email"
                      />
                      <span className="input-group-btn">
                        <button
                          name="submit"
                          value="Submit"
                          type="submit"
                          className="site-button"
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <i className="fa fa-paper-plane-o"></i>
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <ul className="list-inline  text-center">
                  <li>
                    <Link
                      target="_blank"
                      to="https://www.facebook.com/"
                      className="site-button-link"
                    >
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      to="https://www.google.com/"
                      className="site-button-link"
                    >
                      <i className="fa fa-google-plus"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      to="https://www.linkedin.com/"
                      className="site-button-link"
                    >
                      <i className="fa fa-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      to="https://www.instagram.com/"
                      className="site-button-link"
                    >
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      to="https://twitter.com/"
                      className="site-button-link"
                    >
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row d-flex align-items-center">
              <div className="col-xl-4 col-12 col-lg-3 col-md-12 col-sm-12">
                <div className="footer-logo widget text-center">
                  <Link to="/">
                    <img src={IMAGE.logo3} alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-2 col-6 col-lg-2 col-md-3 col-sm-4">
                <div className="widget">
                  <h6>Phone & E-mail</h6>
                  <ul>
                    <li>
                      +91 800-123456 <br /> office@example.com
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-6 col-lg-3 col-md-3 col-sm-4 footer-col-4">
                <div className="widget">
                  <h6>Address</h6>
                  <ul>
                    <li>
                      #8901 Marmora Road
                      <br /> Chi Minh City, Vietnam{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-6 col-lg-2 col-md-3 col-sm-4 footer-col-4">
                <div className="widget">
                  <h6>Opening Times</h6>
                  <ul>
                    <li>
                      +91 800-123456 <br /> office@example.com
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-6 col-lg-2 col-md-3 col-sm-12">
                <div className="widget text-right">
                  <Link to="/booking" className="site-button radius-no">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer3;
