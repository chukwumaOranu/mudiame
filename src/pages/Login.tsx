import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"
import { useState } from "react"

const Login = () => {

    const [addActive, setActive] = useState(false);


    return (
        <>
            <div className="page-content bg-white">
                <div className="dlab-bnr-inr overlay-primary bg-pt" style={{ backgroundImage: `url(${IMAGE.banner2})` }}>
                    <div className="container">
                        <div className="dlab-bnr-inr-entry">
                            <h1 className="text-white">Login</h1>
                            <div className="breadcrumb-row">
                                <ul className="list-inline">
                                    <li><Link to="/">Home</Link></li>
                                    <li>Login</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-full content-inner shop-account" >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="font-weight-700 m-t0 m-b20">Login Your Account</h3>
                            </div>
                        </div>
                        <div>
                            <div className="max-w500 m-auto m-b30">
                                <div className="p-a30 border-1 seth">
                                    <div className="tab-content nav">
                                        <form id="login" className={`tab-pane col-12 p-a0 ${addActive === false ? 'active show' : ''}`}>
                                            <h4 className="font-weight-700">LOGIN</h4>
                                            <p className="font-weight-600">If you have an account with us, please log in.</p>
                                            <div className="form-group">
                                                <label className="font-weight-700">E-MAIL *</label>
                                                <input name="dzName" className="form-control" placeholder="Your Email Id" type="email" />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-weight-700">PASSWORD *</label>
                                                <input name="dzName" className="form-control " placeholder="Type Password" type="password" />
                                            </div>
                                            <div className="text-left">
                                                <button type="button" className="site-button m-r5 button-lg radius-no">login</button>
                                                <Link onClick={() => { setActive(true) }} to="#" className="m-l5"><i className="fa fa-unlock-alt"></i> Forgot Password</Link>
                                            </div>
                                        </form>
                                        <form id="forgot-password" className={`tab-pane fade   col-12 p-a0 ${addActive === true ? 'active show' : ''}`}>
                                            <h4 className="font-weight-700">FORGET PASSWORD ?</h4>
                                            <p className="font-weight-600">We will send you an email to reset your password. </p>
                                            <div className="form-group">
                                                <label className="font-weight-700">E-MAIL *</label>
                                                <input name="dzName" className="form-control" placeholder="Your Email Id" type="email" />
                                            </div>
                                            <div className="text-left">
                                                <Link onClick={() => { setActive(false) }} className="site-button outline gray button-lg radius-no" to="#">Back</Link>
                                                <button type="button" className="site-button pull-right button-lg radius-no">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Offers />
            </div>

        </>
    )
}

export const Offers = () => {
    return (
        <>
            <div className="section-full p-t50 p-b20 bg-primary-dark text-white shop-action">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="icon-bx-wraper left m-b30">
                                <div className="icon-md text-black radius">
                                    <Link to="#" className="icon-cell text-white"><i className="fa fa-gift"></i></Link>
                                </div>
                                <div className="icon-content">
                                    <h5 className="dlab-tilte font-20">Free shipping on orders $60+</h5>
                                    <p className="font-14">Order more than 60$ and you will get free shippining Worldwide. More info.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="icon-bx-wraper left m-b30">
                                <div className="icon-md text-black radius">
                                    <Link to="#" className="icon-cell text-white"><i className="fa fa-plane"></i></Link>
                                </div>
                                <div className="icon-content">
                                    <h5 className="dlab-tilte font-20">Worldwide delivery</h5>
                                    <p className="font-14">We deliver to the following countries: USA, Canada, Europe, Australia</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="icon-bx-wraper left m-b30">
                                <div className="icon-md text-black radius">
                                    <Link to="#" className="icon-cell text-white"><i className="fa fa-history"></i></Link>
                                </div>
                                <div className="icon-content">
                                    <h5 className="dlab-tilte font-20">60 days money back guranty!</h5>
                                    <p className="font-14">Not happy with our product, feel free to return it, we will refund 100% your money!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login