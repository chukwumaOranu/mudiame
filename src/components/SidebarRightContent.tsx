import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IMAGE } from "../constent/theme";
import {
  getClassicBlogCategories,
  getClassicBlogPosts,
} from "../api/classicBlogApi";

import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
const sidebarBlog = [
    { img: IMAGE.gallery_smallPic1 },
    { img: IMAGE.gallery_smallPic2 },
    { img: IMAGE.gallery_smallPic3 },
    { img: IMAGE.gallery_smallPic4 },
    { img: IMAGE.gallery_smallPic5 },
    { img: IMAGE.gallery_smallPic6 },
]
const SidebarRightContent = () => {
    return (
        <>
            <div className="col-lg-4 col-md-5 col-sm-12 sticky-top">
                <BlogRightContent />
            </div>
        </>
    )
}

export const BlogRightContent = () => {
    const recentPostsQuery = useQuery({
        queryKey: ["classic-blog", "recent-posts", 1, 4],
        queryFn: () => getClassicBlogPosts(1, 4, "published"),
    });

    const categoriesQuery = useQuery({
        queryKey: ["classic-blog", "sidebar-categories"],
        queryFn: getClassicBlogCategories,
    });

    const recentPosts = recentPostsQuery.data?.items || [];
    const categories = categoriesQuery.data?.items || [];

    const formatDate = (value: string | null) => {
        if (!value) {
            return "Unpublished";
        }
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return value;
        }
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <>
            <aside className="side-bar">
                <div className="widget">
                    <h6 className="widget-title style-1">Search</h6>
                    <div className="search-bx style-1">
                        <form role="search" method="post">
                            <div className="input-group">
                                <input name="text" className="form-control" placeholder="Enter your keywords..." type="text" />
                                <span className="input-group-btn">
                                    <button type="button" className="fa fa-search text-primary"></button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="widget recent-posts-entry">
                    <h6 className="widget-title style-1">Recent Posts</h6>
                    <div className="widget-post-bx">
                        {recentPostsQuery.isLoading && <p>Loading recent posts...</p>}
                        {recentPostsQuery.isError && (
                            <p style={{ color: "#9f1c1c" }}>Unable to load recent posts.</p>
                        )}
                        {recentPosts.map((item) => (

                            <div className="widget-post clearfix" key={item.id}>
                                <div className="dlab-post-media">
                                    <img
                                        src={item.featured_image_url || IMAGE.recent_blogPic1}
                                        width="200"
                                        height="143"
                                        alt={item.title}
                                    />
                                </div>
                                <div className="dlab-post-info">
                                    <div className="dlab-post-header">
                                        <h6 className="post-title">
                                            <Link to={`/blog-details?slug=${encodeURIComponent(item.slug)}`}>
                                                {item.title}
                                            </Link>
                                        </h6>
                                    </div>
                                    <div className="dlab-post-meta">
                                        <ul className="d-flex align-items-center">
                                            <li className="post-date">{formatDate(item.published_at)}</li>
                                            <li className="post-comment">
                                                <Link to={`/blog-details?slug=${encodeURIComponent(item.slug)}`}>
                                                    {item.metrics.comment_count}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="widget widget_gallery gallery-grid-3">
                    <h6 className="widget-title style-1">Our Gallery</h6>
                    <ul>
                        <LightGallery
                            speed={500}
                            plugins={[lgThumbnail, lgZoom]}
                        >
                            {sidebarBlog.map((item, index) => (
                                <Link to={item.img} key={index} style={{ display: 'unset' }}>
                                    <li>
                                        <div className="dlab-post-thum">
                                            <samp className="dlab-img-overlay1 dlab-img-effect zoom-slow">
                                                <img src={item.img} alt="" />
                                            </samp>
                                        </div>
                                    </li>
                                </Link>

                            ))}
                        </LightGallery>
                    </ul>
                </div>
                <div className="widget widget_archive">
                    <h6 className="widget-title style-1">Categories List</h6>
                    <ul>
                        {categoriesQuery.isLoading && <li>Loading categories...</li>}
                        {categoriesQuery.isError && (
                            <li style={{ color: "#9f1c1c" }}>Unable to load categories.</li>
                        )}
                        {categories.map((item) => (
                            <li key={item.id}>
                                <Link to={`/classic-sidebar`}>
                                    {item.name} {typeof item.post_count === "number" ? `(${item.post_count})` : ""}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="widget widget-newslatter">
                    <h6 className="widget-title style-1">Newsletter</h6>
                    <div className="news-box">
                        <p>Enter your e-mail and subscribe to our newsletter.</p>
                        <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                            <div className="dzSubscribeMsg"></div>
                            <div className="input-group">
                                <input name="dzEmail" type="email" className="form-control" placeholder="Your Email" />
                                <button type="button" className="site-button btn-block radius-no">Subscribe Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SidebarRightContent
