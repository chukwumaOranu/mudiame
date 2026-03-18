import { Link } from "react-router-dom";
import Menu2 from "../element/Menu2";
import { IMAGE } from "../constent/theme";

const Header2 = () => {
  return (
    <header className="site-header header mo-left" style={{ zIndex: 9 }}>
      <div className="top-bar bg-primary text-white">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="dlab-topbar-left">
              <ul>
                <li>
                  <i className="fa fa-phone m-r5"></i>
                  <a href="tel:08098866406" className="text-white">08098866406</a>
                </li>
                <li>
                  <i className="fa fa-map-marker m-r5"></i> Lekki, Lagos State,
                  Nigeria
                </li>
                <li>
                  <i className="fa fa-envelope m-r5"></i>
                  <a href="mailto:mudiamelush@gmail.com" className="text-white">mudiamelush@gmail.com</a>
                </li>
              </ul>
            </div>
            <div className="dlab-topbar-right topbar-social">
              <ul>
                <li>
                  <Link
                    target="_blank"
                    to="https://www.facebook.com/"
                    className="site-button-link facebook hover"
                  >
                    <i className="fa fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to="https://www.google.com/"
                    className="site-button-link google-plus hover"
                  >
                    <i className="fa fa-google-plus"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to="https://twitter.com/"
                    className="site-button-link twitter hover"
                  >
                    <i className="fa fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to="https://www.instagram.com/"
                    className="site-button-link instagram hover"
                  >
                    <i className="fa fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to="https://www.linkedin.com/"
                    className="site-button-link linkedin hover"
                  >
                    <i className="fa fa-linkedin"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to="https://www.youtube.com/"
                    className="site-button-link youtube hover"
                  >
                    <i className="fa fa-youtube-play"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Menu2
        img={IMAGE.logo2}
        img2={IMAGE.logoBlack}
        menuLinks={[
          { label: "HomePage", link: "/" },
          { label: "About us", link: "/about-us" },
          { label: "Book Now", link: "/booking" },
          { label: "Services", link: "/services" },
          { label: "Blog", link: "/blog" },
          { label: "Our Works", link: "/portfolio" },
          { label: "Contact Us", link: "/contact-us" },
        ]}
      />
    </header>
  );
};

export default Header2;
