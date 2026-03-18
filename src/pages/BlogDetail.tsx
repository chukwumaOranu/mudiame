import { Link, useParams, useSearchParams } from "react-router-dom";
import SidebarRightContent from "../components/SidebarRightContent";
import { IMAGE } from "../constent/theme";
import CommonBanner2 from "../element/CommonBanner2";
import { useClassicBlogPostQuery } from "../hooks/useClassicBlog";
import Seo from "../components/Seo";

const BlogDetail = () => {
  const { slug: slugParam } = useParams();
  const [searchParams] = useSearchParams();
  const slug = slugParam || searchParams.get("slug");
  const postQuery = useClassicBlogPostQuery(slug);
  const post = postQuery.data?.item;

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
        title={post?.title || "Beauty Blog"}
        description={post?.excerpt || "Read beauty tips, product guides, and self-care insights from Mudiame Lush."}
        canonicalPath={post ? `/blog/${post.slug}` : "/blog"}
        type="article"
        keywords={post?.categories.map((category) => category.name)}
        jsonLd={
          post
            ? {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.excerpt || post.content || undefined,
                datePublished: post.published_at || undefined,
                dateModified: post.updated_at,
                author: {
                  "@type": "Person",
                  name: post.author.display_name,
                },
              }
            : undefined
        }
      />
      <CommonBanner2 title={post?.title || "Blog Details"} img={IMAGE.banner1} />
      <div className="content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7 m-b10">
              {postQuery.isLoading && <p>Loading blog details...</p>}
              {postQuery.isError && (
                <p style={{ color: "#9f1c1c" }}>Unable to load this blog post right now.</p>
              )}
              {!slug && <p style={{ color: "#9f1c1c" }}>No blog slug provided.</p>}

              {post && (
                <div className="blog-post blog-single blog-style-1">
                  <div className="dlab-post-meta">
                    <ul className="d-flex align-items-center">
                      <li className="post-date">{formatDate(post.published_at)}</li>
                      <li className="post-author">
                        By <Link to="#">{post.author.display_name}</Link>{" "}
                      </li>
                      <li className="post-comment">
                        <Link to="#">{post.metrics.comment_count}</Link>{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="dlab-post-title">
                    <h4 className="post-title m-t0">{post.title}</h4>
                  </div>
                  <div className="dlab-post-media dlab-img-effect zoom-slow m-t20">
                    <img src={post.featured_image_url || IMAGE.blogPic2} alt={post.title} />
                  </div>
                  <div className="dlab-post-text">
                    {post.content ? (
                      <p>{post.content}</p>
                    ) : (
                      <p>{post.excerpt || "No additional content provided for this post yet."}</p>
                    )}
                  </div>
                  {post.categories.length > 0 && (
                    <div className="dlab-post-tags clear">
                      <div className="post-tags">
                        {post.categories.map((category) => (
                          <Link key={category.id} to="#">
                            {category.name}{" "}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <SidebarRightContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
