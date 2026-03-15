import { Link } from "react-router-dom";
import SidebarRightContent from "../components/SidebarRightContent";
import { IMAGE } from "../constent/theme";
import CommonBanner2 from "../element/CommonBanner2";
import { useClassicBlogPostsQuery } from "../hooks/useClassicBlog";

const BlogGridSidebar = () => {
  const blogQuery = useClassicBlogPostsQuery(1, 12);
  const posts = blogQuery.data?.items || [];

  const formatDate = (value: string | null) => {
    if (!value) {
      return "Unpublished";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="page-content bg-white">
      <CommonBanner2 title={"Blog Grid Sidebar"} img={IMAGE.banner1} />
      <div className="content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7 col-sm-12">
              {blogQuery.isLoading && <p>Loading blog posts...</p>}
              {blogQuery.isError && (
                <p style={{ color: "#9f1c1c" }}>Unable to load blog posts right now.</p>
              )}

              <div id="masonry" className="dlab-blog-grid-3 row">
                {posts.map((post) => (
                  <div className="post card-container col-lg-6 col-md-6 col-sm-6" key={post.id}>
                    <div className="blog-post blog-grid blog-style-1">
                      <div className="dlab-post-media dlab-img-effect radius-sm">
                        <Link to={`/blog-details?slug=${encodeURIComponent(post.slug)}`}>
                          <img src={post.featured_image_url || IMAGE.blog_gridPic1} alt={post.title} />
                        </Link>
                      </div>
                      <div className="dlab-info">
                        <div className="dlab-post-meta">
                          <ul className="d-flex align-items-center">
                            <li className="post-date">{formatDate(post.published_at)}</li>
                            <li className="post-comment">
                              <Link to={`/blog-details?slug=${encodeURIComponent(post.slug)}`}>
                                {post.metrics.comment_count}
                              </Link>{" "}
                            </li>
                          </ul>
                        </div>
                        <div className="dlab-post-title ">
                          <h5 className="post-title font-20">
                            <Link to={`/blog-details?slug=${encodeURIComponent(post.slug)}`}>
                              {post.title}
                            </Link>
                          </h5>
                        </div>
                        <div className="dlab-post-readmore blog-share">
                          <Link
                            to={`/blog-details?slug=${encodeURIComponent(post.slug)}`}
                            title="READ MORE"
                            rel="bookmark"
                            className="site-button-link border-link black"
                          >
                            READ MORE
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <SidebarRightContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogGridSidebar;
