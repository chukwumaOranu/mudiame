import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"
import CommonBanner2 from "../element/CommonBanner2"
import { Pagination } from "./Classic"



const imageGallery = [
    { img: IMAGE.blog_gridPic1 },
    { img: IMAGE.blog_gridPic2 },
    { img: IMAGE.blog_gridPic3 },
    { img: IMAGE.blog_gridPic4 },
    { img: IMAGE.blog_gridPic1 },
    { img: IMAGE.blog_gridPic2 },
]

const DetailGrid = () => {
    return (
        <>
            <div className="page-content bg-white">
                <CommonBanner2 title={'Blog Grid 3'} img={IMAGE.banner1} />
                <div className="content-area">
                    <div className="container">
                        <div className="dlab-blog-grid-3 row" id="masonry">
                            {imageGallery.map((item, index) => (
                                <div className="post card-container col-lg-4 col-md-6 col-sm-6" key={index}>
                                    <div className="blog-post blog-grid blog-style-1">
                                        <div className="dlab-post-media dlab-img-effect radius-sm">
                                            <Link to="/blog-details"><img src={item.img} alt="" /></Link> </div>
                                        <div className="dlab-info">
                                            <div className="dlab-post-meta">
                                                <ul className="d-flex align-items-center">
                                                    <li className="post-date">September 18, 2017</li>
                                                    <li className="post-comment"><Link to="/blog-details">5k</Link> </li>
                                                </ul>
                                            </div>
                                            <div className="dlab-post-title ">
                                                <h5 className="post-title font-20"><Link to="/blog-details">Spring is in the Air
                                                    and and So Our These Amazing Spa Offers</Link></h5>
                                            </div>
                                            <div className="dlab-post-readmore blog-share">
                                                <Link to="/blog-details" title="READ MORE" rel="bookmark"
                                                    className="site-button-link border-link black">READ MORE</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                            <Pagination />
                    </div>
                </div>
            </div>

        </>
    )
}

export default DetailGrid