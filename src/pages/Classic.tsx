import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import CommonBanner2 from "../element/CommonBanner2";
import { useClassicBlogPostsQuery } from "../hooks/useClassicBlog";
import { useState } from "react";
import Seo from "../components/Seo";

const Classic = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const blogQuery = useClassicBlogPostsQuery(page, pageSize);
  const posts = blogQuery.data?.items || [];
  const total = blogQuery.data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

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
      <Seo
        title="Beauty Blog"
        description="Read beauty tips, product guides, and self-care insights from Mudiame Lush."
        canonicalPath="/blog"
        keywords={["beauty blog", "Mudiame Lush blog", "beauty tips Nigeria", "self-care blog"]}
      />
      <CommonBanner2 title={"Beauty Blog"} img={IMAGE.banner1} />
      <div className="content-area">
        <div className="container max-w900">
          {blogQuery.isLoading && <p>Loading blog posts...</p>}
          {blogQuery.isError && (
            <p style={{ color: "#9f1c1c" }}>Unable to load blog posts right now.</p>
          )}

          {posts.map((post) => (
            <div className="blog-post blog-lg blog-style-1" key={post.id}>
              <div className="dlab-post-media dlab-img-effect zoom-slow radius-sm">
                <Link to={`/blog/${encodeURIComponent(post.slug)}`}>
                  <img src={post.featured_image_url || IMAGE.blogPic1} alt={post.title} />
                </Link>
              </div>
              <div className="dlab-info">
                <div className="dlab-post-meta">
                  <ul className="d-flex align-items-center">
                    <li className="post-date">{formatDate(post.published_at)}</li>
                    <li className="post-author">
                      By{" "}
                      <Link to={`/blog/${encodeURIComponent(post.slug)}`}>
                        {post.author.display_name}
                      </Link>
                    </li>
                    <li className="post-comment">
                      <Link to={`/blog/${encodeURIComponent(post.slug)}`}>
                        {post.metrics.comment_count}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dlab-post-title ">
                  <h4 className="post-title font-24">
                    <Link to={`/blog/${encodeURIComponent(post.slug)}`}>
                      {post.title}
                    </Link>
                  </h4>
                </div>
                <div className="dlab-post-text">
                  <p>
                    {post.excerpt ||
                      (post.content
                        ? `${post.content.slice(0, 240)}${post.content.length > 240 ? "..." : ""}`
                        : "Read more from Mudiame Lush beauty tips and self-care insights.")}
                  </p>
                </div>
                <div className="dlab-post-readmore blog-share">
                  <Link
                    to={`/blog/${encodeURIComponent(post.slug)}`}
                    title="READ MORE"
                    rel="bookmark"
                    className="site-button-link border-link black"
                  >
                    READ MORE
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="pagination-bx clearfix text-center">
              <ul className="pagination">
                <li className={`previous ${page === 1 ? "disabled" : ""}`}>
                  <Link
                    to="#"
                    onClick={(event) => {
                      event.preventDefault();
                      if (page > 1) setPage((prev) => prev - 1);
                    }}
                  >
                    <i className="ti-arrow-left"></i> Prev
                  </Link>
                </li>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const value = index + 1;
                  return (
                    <li key={value} className={page === value ? "active" : ""}>
                      <Link
                        to="#"
                        onClick={(event) => {
                          event.preventDefault();
                          setPage(value);
                        }}
                      >
                        {value}
                      </Link>
                    </li>
                  );
                })}
                <li className={`next ${page === totalPages ? "disabled" : ""}`}>
                  <Link
                    to="#"
                    onClick={(event) => {
                      event.preventDefault();
                      if (page < totalPages) setPage((prev) => prev + 1);
                    }}
                  >
                    Next <i className="ti-arrow-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Pagination = () => (
  <div className="pagination-bx clearfix text-center">
    <ul className="pagination">
      <li className="previous">
        <Link to="#">
          <i className="ti-arrow-left"></i> Prev
        </Link>
      </li>
      <li className="active">
        <Link to="#">1</Link>
      </li>
      <li>
        <Link to="#">2</Link>
      </li>
      <li>
        <Link to="#">3</Link>
      </li>
      <li className="next">
        <Link to="#">
          Next <i className="ti-arrow-right"></i>
        </Link>
      </li>
    </ul>
  </div>
);

export default Classic;
