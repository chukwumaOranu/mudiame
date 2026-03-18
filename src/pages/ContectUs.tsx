import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import CommonBanner from "../element/CommonBanner";
import { IMAGE } from "../constent/theme";
import { sendContactMessage } from "../api/contactApi";
import Seo from "../components/Seo";

const quickContact = [
  {
    icon: "ti-location-pin",
    title: "Address:",
    subtitle: "Lekki, Lagos State, Nigeria",
  },
  {
    icon: "ti-email",
    title: "Email:",
    subtitle: "mudiamelush@gmail.com",
    href: "mailto:mudiamelush@gmail.com",
  },
  {
    icon: "ti-mobile",
    title: "Phone:",
    subtitle: "08098866406",
    href: "tel:08098866406",
  },
];

const ContectUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const contactMutation = useMutation({
    mutationFn: () => sendContactMessage(form),
    onSuccess: (data) => {
      setSuccessMessage(data.message || "Your message has been sent successfully.");
      setErrorMessage("");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    },
    onError: (error) => {
      setErrorMessage((error as Error).message);
      setSuccessMessage("");
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    await contactMutation.mutateAsync();
  };

  return (
    <div className="page-content bg-white">
      <Seo
        title="Contact Us"
        description="Contact Mudiame Lush in Lekki, Lagos for bookings, product enquiries, and beauty support."
        canonicalPath="/contact-us"
        keywords={["contact Mudiame Lush", "Lekki beauty brand", "beauty enquiries Lagos", "Mudiame contact"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Mudiame Lush",
        }}
      />
      <CommonBanner title={"Contact Us"} image={IMAGE.banner1} />
      <div className="section-full content-inner bg-white contact-style-1">
        <div className="container">
          <div className="section-head text-black text-center">
            <h2 className="text-primary m-b10">Let&apos;s Connect</h2>
            <div className="dlab-separator-outer m-b0">
              <div className="dlab-separator text-primary style-icon">
                <i className="flaticon-spa text-primary"></i>
              </div>
            </div>
            <p>
              Reach out to Mudiame Lush for product enquiries, bookings, and beauty support. We are here to help you choose what fits your style and self-care needs.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="p-a30 border m-b30 contact-area border-1 align-self-stretch">
                <h4 className="m-b10">Quick Contact</h4>
                <p>
                  Use the details below to contact Mudiame Lush directly for bookings, product enquiries, and customer support.
                </p>
                <ul className="no-margin">
                  {quickContact.map((item) => (
                    <li className="icon-bx-wraper left m-b30" key={item.title}>
                      <div className="icon-bx-xs border-1">
                        <span className="icon-cell text-primary">
                          <i className={item.icon}></i>
                        </span>
                      </div>
                      <div className="icon-content">
                        <h6 className="text-uppercase m-tb0 dlab-tilte">
                          {item.title}
                        </h6>
                        {item.href ? (
                          <p>
                            <a href={item.href}>{item.subtitle}</a>
                          </p>
                        ) : (
                          <p>{item.subtitle}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="m-t20">
                  <ul className="dlab-social-icon dlab-social-icon-lg">
                    <li>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.instagram.com/"
                        className="fa fa-instagram bg-primary"
                      ></a>
                    </li>
                    <li className="m-l5">
                      <a
                        href="mailto:mudiamelush@gmail.com"
                        className="fa fa-envelope bg-primary"
                      ></a>
                    </li>
                    <li className="m-l5">
                      <a
                        href="tel:08098866406"
                        className="fa fa-phone bg-primary"
                      ></a>
                    </li>
                    <li className="m-l5">
                      <Link
                        to="/booking"
                        className="fa fa-calendar bg-primary"
                      ></Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 m-b30">
              <div className="p-a30 bg-gray clearfix">
                <h4>Send Us a Message</h4>
                <p className="m-b20">
                  Send your enquiry directly from the website and we will forward it to our support inbox.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={(event) =>
                              setForm((previous) => ({ ...previous, name: event.target.value }))
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={(event) =>
                              setForm((previous) => ({ ...previous, email: event.target.value }))
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div className="input-group">
                          <textarea
                            name="message"
                            rows={5}
                            className="form-control"
                            placeholder="Tell us how we can help..."
                            value={form.message}
                            onChange={(event) =>
                              setForm((previous) => ({ ...previous, message: event.target.value }))
                            }
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button type="submit" className="site-button" disabled={contactMutation.isPending}>
                        <span>{contactMutation.isPending ? "Sending..." : "Send Message"}</span>
                      </button>
                      {errorMessage && <p className="m-t15" style={{ color: "#b42318" }}>{errorMessage}</p>}
                      {successMessage && <p className="m-t15" style={{ color: "#0f7b43" }}>{successMessage}</p>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 d-flex m-b30">
              <iframe
                src="https://www.google.com/maps?q=Lekki%2C%20Lagos%20State%2C%20Nigeria&z=13&output=embed"
                title="Mudiame Lush location map"
                className="align-self-stretch"
                style={{ border: 0, width: "100%", height: "100%" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContectUs;
