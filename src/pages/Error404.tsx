import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"
import CommonBanner from "../element/CommonBanner"
import Seo from "../components/Seo"

const Error404 = () => {
    return (
        <>
            <div className="page-content bg-white">
                <Seo
                    title="Page Not Found"
                    description="The page you are looking for could not be found."
                    noindex={true}
                />
                <CommonBanner title={'Error 404'} image={IMAGE.banner1} />
                <div className="section-full content-inner-3 error-page" style={{ backgroundImage: `url(${IMAGE.backgroundBg6})`, backgroundSize: 'cover' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 m-b30 align-self-center text-center">
                                <h2 className="dz_error text-secondry">404</h2>
                                <h3>OOPS!</h3>
                                <h4>Page Not Found</h4>
                                <Link to="/" className="site-button">Back To Home</Link>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <img src={IMAGE.collegePic} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error404
