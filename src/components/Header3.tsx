import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import { useReducer, useState } from "react";
import { MenuItemes1 } from "../element/Menu2";

const Header3 = () => {
  const [scrollVal, setScrollVal] = useState(Number);
  const [toggleNave, setToggleNav] = useState(false);

  window.onscroll = () => {
    setScrollVal(window.scrollY);
  };

  const reducer = (previousState: any, updatedState: any) => ({
    ...previousState,
    ...updatedState,
  });
  const initialState = {
    activeSubmenu: "",
  };
  const [state, setState] = useReducer(reducer, initialState);
  const menuHandler = (status: string) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" });
    }
  };

  return (
    <>
      <header className="site-header header mo-left style-1">
        <div className="top-bar bg-white text-black">
          <div className="container">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="logo-header">
                <Link to="/" className="dez-page">
                  <img src={IMAGE.logo2} alt="" />
                </Link>
              </div>
              <div className="dlab-topbar-left">
                <div className="widget widget_getintuch">
                  <ul className="d-flex align-items-center">
                    <li>
                      <i className="ti-location-pin"></i>
                      <strong>Our Location</strong>Lekki, Lagos State, Nigeria
                    </li>
                    <li>
                      <i className="ti-mobile"></i>
                      <strong>Phone Number</strong>
                      <a href="tel:08098866406">08098866406</a>
                    </li>
                    <li>
                      <i className="ti-email"></i>
                      <strong>Email</strong>
                      <a href="mailto:mudiamelush@gmail.com">mudiamelush@gmail.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`sticky-header main-bar-wraper navbar-expand-lg ${
            scrollVal > 80 ? "is-fixed" : ""
          }`}
        >
          <div className="main-bar bg-primary clearfix ">
            <div className="container clearfix style-1">
              <div className="logo-header mostion">
                <Link to="/" className="dez-page">
                  <img src={IMAGE.logoWhite} alt="" />
                </Link>
              </div>
              <button
                onClick={() => {
                  toggleNave === false
                    ? setToggleNav(true)
                    : setToggleNav(false);
                }}
                className={`navbar-toggler collapsed navicon justify-content-end ${
                  toggleNave === true ? "open" : ""
                }`}
                type="button"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div
                className={`header-nav navbar-collapse collapse justify-content-start ${
                  toggleNave === true ? "show" : ""
                }`}
                id="navbarNavDropdown"
              >
                <div className="logo-header">
                  <Link id="home2_header_logo" to="/" className="dez-page">
                    <img src={IMAGE.logoBlack} alt="" />
                  </Link>
                </div>
                <ul className="nav navbar-nav">
                  {MenuItemes1.map((item, ind) => {
                    return (
                      <li
                        key={ind}
                        className={` ${
                          state.activeSubmenu === item.MenuLinks ? "open" : ""
                        }`}
                      >
                        <Link
                          onClick={() => {
                            menuHandler(item.MenuLinks);
                          }}
                          to="#"
                        >
                          {item.MenuLinks}
                          <i className="fa fa-chevron-down"></i>
                        </Link>
                        <ul className="sub-menu">
                          {item.sub_menu.map((item2, index) => {
                            return (
                              <li key={index}>
                                <Link to={item2.link} className="dez-page">
                                  {item2.sub_menu_item}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="dz-nav-button">
                <Link to="/booking" className="site-button style-1 radius-no">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;
