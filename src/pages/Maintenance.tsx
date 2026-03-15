import { IMAGE } from "../constent/theme"

const Maintenance = () => {
    return (
        <>
            <div className="bg-white">
                <div className="under-construction" style={{ backgroundImage: `url(${IMAGE.constructionImg})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: '100%', backgroundPosition: 'bottom' }}>
                    <div className="container">
                        <div className="row full-height">
                            <div className="col-md-12 col-lg-12 text-center header-ind">
                                <div className="">
                                    <div className="logo-header">
                                        <img src={IMAGE.logoBlack} alt="" />
                                    </div>
                                </div>
                                <h2>
                                    <span>Site Under</span> <br /> Maintenance
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Maintenance 