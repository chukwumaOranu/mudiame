import { Link } from "react-router-dom";
import Menu from "../element/Menu";

const Header = () => {
  return (
    <>
      <header
        className="site-header header center mo-left"
        style={{ zIndex: 9 }}
      >
        <div className="top-bar bg-primary text-white">
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="dlab-topbar-left">
                <ul>
                  <li>
                    <i className="fa fa-phone m-r5"></i> 001 1234 6789
                  </li>
                  <li>
                    <i className="fa fa-map-marker m-r5"></i> 6701 Democracy
                    Blvd, Suite 300, USA
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
        <Menu />
      </header>
    </>
  );
};

export default Header;
