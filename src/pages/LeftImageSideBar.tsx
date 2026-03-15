import { Link } from "react-router-dom"
import { BlogRightContent } from "../components/SidebarRightContent"
import { IMAGE } from "../constent/theme"
import CommonBanner2 from "../element/CommonBanner2"
import { Pagination } from "./Classic"

const imageBlog = [
    { img: IMAGE.blog_gridPic1 },
    { img: IMAGE.blog_gridPic2 },
    { img: IMAGE.blog_gridPic3 },
    { img: IMAGE.blog_gridPic4 },
    { img: IMAGE.blog_gridPic1 },
    { img: IMAGE.blog_gridPic2 },
    { img: IMAGE.blog_gridPic3 },
    { img: IMAGE.blog_gridPic4 },
    { img: IMAGE.blog_gridPic1 },
    { img: IMAGE.blog_gridPic2 },
    { img: IMAGE.blog_gridPic3 },
    { img: IMAGE.blog_gridPic4 },
]
const LeftImageSideBar = () => {
    return (
        <>
            <div className="page-content bg-white">
                <CommonBanner2 title={'Blog Left Images'} img={IMAGE.banner1} />
                <div className="content-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 col-md-12 m-b10">
                                {imageBlog.map((item, index) => (
                                    <div className="blog-post blog-md clearfix" key={index}>
                                        <div className="dlab-post-media dlab-img-effect zoom-slow radius-sm"> <Link to="/blog-details">
                                            <img src={item.img} alt="" /></Link> </div>
                                        <div className="dlab-post-info">
                                            <div className="dlab-post-meta">
                                                <ul className="d-flex align-items-center">
                                                    <li className="post-date">September 18, 2017</li>
                                                    <li className="post-author">By <Link to="/blog-details">demongo</Link> </li>
                                                    <li className="post-comment"><Link to="/blog-details">5k</Link> </li>
                                                </ul>
                                            </div>
                                            <div className="dlab-post-title ">
                                                <h4 className="post-title font-24"><Link to="/blog-details">Spring is in the Air and and So Our These Amazing Spa Offers</Link></h4>
                                            </div>
                                            <div className="dlab-post-text">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took Link galley of type and scrambled it to make Link type specimen book.</p>
                                            </div>
                                            <div className="dlab-post-readmore blog-share">
                                                <Link to="/blog-details" title="READ MORE" rel="bookmark" className="site-button-link border-link black">READ MORE</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Pagination />
                            </div>
                            <div className="col-lg-3 col-md-12 sticky-top"
                            
                            >
                                <BlogRightContent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftImageSideBar