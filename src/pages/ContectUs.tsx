import { Link } from "react-router-dom";
// import { createRef } from "react";
// import ReCAPTCHA from "react-google-recaptcha";

const QuickContect = [
  {
    icon: "ti-location-pin",
    title: "Address:",
    subtitle: "123 West Street, Melbourne Victoria 3000 Australia",
  },
  { icon: "ti-email", title: "Email:", subtitle: "info@example.com" },
  { icon: "ti-mobile", title: "PHONE:", subtitle: "+91 987 654 3210" },
];
const ContectUs = () => {
  // const recaptchaRef = createRef();
  return (
    <>
      <div className="section-full content-inner bg-white contact-style-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="p-a30 border m-b30 contact-area border-1 align-self-stretch">
                <h4 className="m-b10">Quick Contact</h4>
                <p>
                  If you have any questions simply use the following contact
                  details.
                </p>
                <ul className="no-margin">
                  {QuickContect.map((item, index) => (
                    <li className="icon-bx-wraper left m-b30" key={index}>
                      <div className="icon-bx-xs border-1">
                        <span className="icon-cell text-primary">
                          <i className={item.icon}></i>
                        </span>{" "}
                      </div>
                      <div className="icon-content">
                        <h6 className="text-uppercase m-tb0 dlab-tilte">
                          {item.title}
                        </h6>
                        <p>{item.subtitle}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="m-t20">
                  <ul className="dlab-social-icon dlab-social-icon-lg">
                    <li>
                      <Link
                        target="_blank"
                        to="https://www.facebook.com/"
                        className="fa fa-facebook bg-primary"
                      ></Link>
                    </li>
                    <li className="m-l5">
                      <Link
                        target="_blank"
                        to="https://twitter.com/"
                        className="fa fa-twitter bg-primary"
                      ></Link>
                    </li>
                    <li className="m-l5">
                      <Link
                        target="_blank"
                        to="https://www.linkedin.com/"
                        className="fa fa-linkedin bg-primary"
                      ></Link>
                    </li>
                    <li className="m-l5">
                      <Link
                        target="_blank"
                        to="https://www.instagram.com/"
                        className="fa fa-instagram bg-primary"
                      ></Link>
                    </li>
                    <li className="m-l5">
                      <Link
                        target="_blank"
                        to="https://www.google.com/"
                        className="fa fa-google-plus bg-primary"
                      ></Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 m-b30">
              <div className="p-a30 bg-gray clearfix">
                <h4>Send Message Us</h4>
                <div className="dzFormMsg"></div>
                <form
                  method="post"
                  className="dzForm"
                  // action="script/contact_smtp.php"
                  // onSubmit={() => {
                  //   recaptchaRef.current.execute();
                  // }}
                >
                  <input type="hidden" value="Contact" name="dzToDo" />
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            name="dzName"
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            name="dzEmail"
                            type="email"
                            className="form-control"
                            placeholder="Your Email Id"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="input-group">
                          <textarea
                            name="dzMessage"
                            rows={4}
                            className="form-control"
                            placeholder="Your Message..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="input-group">
                          <div className="g-recaptcha">
                            {/* <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey="Your client site key"
                             //   onChange={onChange}
                            /> */}
                          </div>
                          {/* <input
                            className="form-control d-none"
                            data-recaptcha="true"
                            data-error="Please complete the Captcha"
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button type="button" className="site-button ">
                        {" "}
                        <span>Submit</span>{" "}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 d-flex m-b30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.3825624477!2d75.65046970649679!3d26.88544791796718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C+Rajasthan!5e0!3m2!1sen!2sin!4v1500819483219"
                className="align-self-stretch "
                style={{ border: 0, width: "100%", height: "100%" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContectUs;
