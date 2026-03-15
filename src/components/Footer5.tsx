import { useRef } from "react";
import { Link } from "react-router-dom";

const Footer5 = () => {
  const focusRef = useRef<Array<HTMLDivElement | null>>([]);
  focusRef.current = [];

  function allFocusRef(el: HTMLDivElement | null) {
    if (el && !focusRef.current.includes(el)) {
      focusRef.current.push(el);
    }
    focusRef.current.forEach((curEle) => {
      curEle?.addEventListener("focusin", function () {
        curEle.classList.add("focused");
      });
      curEle?.addEventListener("focusout", function () {
        curEle.classList.remove("focused");
      });
    });
  }


  return (
    <footer className="site-footer footer-white bridal-footer">
      <div className="footer-top">
        <div className="container">
          <div className="section-head text-center bridal-head">
            <h2 className="m-b10">Contact us</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the.
            </p>
          </div>
          <div className="footer-contact contact-form-bx">
            <div className="dezPlaceAni">
              <form className="dzForm" method="POST">
                <div className="dzFormMsg"></div>
                <input
                  type="hidden"
                  className="form-control"
                  name="dzToDo"
                  value="Contact"
                />
                <input
                  type="hidden"
                  className="form-control"
                  name="reCaptchaEnable"
                />
                <div className="row">
                  <div className="col-lg-4 col-md-5 col-sm-12">
                    <div
                      className="form-group"
                      ref={(el) => {
                        allFocusRef(el);
                      }}
                    >
                      <div className="input-group">
                        <label>Your Name</label>
                        <input
                          name="dzName"
                          type="text"
                          required
                          autoComplete="off"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div
                      className="form-group"
                      ref={(el) => {
                        allFocusRef(el);
                      }}
                    >
                      {" "}
                      <div className="input-group">
                        <label>Your Email Address</label>
                        <input
                          name="dzEmail"
                          type="email"
                          className="form-control"
                          required
                          autoComplete="off"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div
                      className="form-group"
                      ref={(el) => {
                        allFocusRef(el);
                      }}
                    >
                      {" "}
                      <div className="input-group">
                        <label>Phone</label>
                        <input
                          name="dzPhoneNumber"
                          type="text"
                          required
                          autoComplete="off"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-7 col-sm-12">
                    <div
                      className="form-group"
                      ref={(el) => {
                        allFocusRef(el);
                      }}
                    >
                      {" "}
                      <div className="input-group">
                        <label>Your Message...</label>
                        <textarea
                          name="dzMessage"
                          rows={4}
                          className="form-control"
                          required
                          autoComplete="off"
                          placeholder=""
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                    <button
                      name="submit"
                      type="submit"
                      value="Submit"
                      className="site-button black button-md m-t10 radius-no"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Submit Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="dlab-divider bg-gray-dark">
              <i className="icon-dot c-square"></i>
            </div>
            <div className="row d-flex align-items-center">
              <div className="col-xl-3 col-12 col-lg-3 col-md-6 col-sm-6">
                <div className="widget">
                  <h6>Phone &amp; E-mail</h6>
                  <ul>
                    <li>
                      +91 800-123456 <br /> office@example.com
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-12 col-lg-3 col-md-6 col-sm-6">
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
              <div className="col-xl-4 col-12 col-lg-3 col-md-6 col-sm-6">
                <div className="widget">
                  <h6>Opening Times</h6>
                  <ul>
                    <li>
                      +91 800-123456 <br /> office@example.com
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-12 col-lg-3 col-md-6 col-sm-6">
                <div className="widget">
                  <Link to="/booking" className="site-button radius-no">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer5;
