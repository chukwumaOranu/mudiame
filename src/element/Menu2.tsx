import { Link, useLocation } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";

export const MenuItemes1 = [
    {
        MenuLinks: 'Home',
        className: 'sub-menu-down',
        sub_menu: [
            { sub_menu_item: 'Home', link: '/' },
        ]
    },
    {
        MenuLinks: 'Pages',
        className: 'sub-menu-down',
        sub_menu: [
            { sub_menu_item: 'About Us', link: '/about-us' },
            { sub_menu_item: 'Booking', link: '/booking' },
            { sub_menu_item: 'Contact Us', link: '/contact-us' },
        ]
    },
    {
        MenuLinks: 'Our Service',
        className: 'sub-menu-down',
        sub_menu: [
            { sub_menu_item: 'Services', link: '/services' },
        ]
    },
    {
        MenuLinks: 'Blog',
        sub_menu: [
            { sub_menu_item: 'Beauty Blog', link: '/blog' },
        ]
    },
    {
        MenuLinks: 'Our Portfolio',
        sub_menu: [
            { sub_menu_item: 'Portfolio', link: '/portfolio' },
        ]
    },
];



interface setLogo {
    img: string,
    img2: string,
    button?: any,
    menuLinks?: Array<{
        label: string;
        link: string;
    }>
}


const Menu2 = (props: setLogo) => {

    const [addActive, setActive] = useState('');
    const [scrollVal, setScrollVal] = useState(Number)
    const location = useLocation().pathname;
    const [toggleNave, setToggleNav] = useState(false);

    useEffect(() => {
        if (props.menuLinks && props.menuLinks.length > 0) {
            const current = props.menuLinks.find((item) => item.link === location);
            setActive(current ? current.label : "");
            return;
        }

        MenuItemes1.map((data) => {
            data.sub_menu.map((ele) => {
                if (ele.link === location) {
                    setActive(data.MenuLinks)
                }
            })
        })
    }, [location, props.menuLinks]);

    window.onscroll = () => {
        setScrollVal(window.scrollY)
    }



    const reducer = (previousState: Element, updatedState: any) => {
        return {
            ...previousState,
            ...updatedState
        }
    };
    const initialState = {
        activeSubmenu: "",
    }
    const [state, setState] = useReducer(reducer, initialState);
    const menuHandler = (status: string) => {
        setState({ activeSubmenu: status })
        if (state.activeSubmenu === status) {
            setState({ activeSubmenu: "" })
        }
    }

    return (
        <>
            <div className={`sticky-header main-bar-wraper navbar-expand-lg ${scrollVal > 80 ? 'is-fixed' : ''}`}>
                <div className="main-bar clearfix ">
                    <div className="container clearfix">
                        <div className="logo-header mostion">
                            <Link to="/" className="dez-page"><img src={props.img} alt="" /></Link>
                        </div>
                        <button
                            onClick={() => { toggleNave === false ? setToggleNav(true) : setToggleNav(false) }}
                            className={`navbar-toggler collapsed navicon justify-content-end ${toggleNave === true ? 'open' : ''}`}
                            type="button">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        {props.button}
                        <div className={`header-nav navbar-collapse collapse justify-content-end  ${toggleNave === true ? 'show' : ''}`} id="navbarNavDropdown"
                        >
                            <div className="logo-header mostion" id="header_2Logo">
                                <Link id="home2_header_logo" to="/" className="dez-page"><img src={props.img2} alt="" /></Link>
                            </div>
                            <ul className="nav navbar-nav">
                                {props.menuLinks && props.menuLinks.length > 0 ? (
                                    <>
                                        {props.menuLinks.map((item, ind) => (
                                            <li key={ind} className={addActive === item.label ? "active" : ""}>
                                                <Link to={item.link} className="dez-page">
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {MenuItemes1.map((item, ind) => {
                                            return (
                                                <li key={ind} className={`${addActive == item.MenuLinks ? 'active' : ''} ${state.activeSubmenu === item.MenuLinks ? 'open' : ''}`}>
                                                    <Link onClick={() => { menuHandler(item.MenuLinks) }} to="#">{item.MenuLinks}

                                                        <i className="fa fa-chevron-down"></i>
                                                    </Link>
                                                    <ul className="sub-menu">
                                                        {item.sub_menu.map((item2, index) => {
                                                            return (
                                                                <li key={index}><Link to={item2.link} className="dez-page">{item2.sub_menu_item}</Link></li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            )
                                        })}
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu2
