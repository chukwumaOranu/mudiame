import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { IMAGE } from "../constent/theme";
import { Autoplay, Navigation } from "swiper/modules";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useClassicBlogPostsQuery } from "../hooks/useClassicBlog";

const fallbackImage = IMAGE.blog_gridPic1;

const OurBlogSlider = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const blogQuery = useClassicBlogPostsQuery(1, 8);
  const blogItems = blogQuery.data?.items || [];

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
    <>
      <div style={{ position: "relative" }}>
        {blogQuery.isError && (
          <p style={{ marginBottom: "20px", color: "#9f1c1c" }}>
            Unable to load blog posts right now.
          </p>
        )}
        <Swiper
          className="blog-carousel owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-btn-1"
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          modules={[Navigation, Autoplay]}
          ref={swiperRef}
          speed={2000}
          autoplay={{ delay: 1500 }}
          breakpoints={{
            1100: { slidesPerView: 3 },
            700: { slidesPerView: 2 },
            200: { slidesPerView: 1 },
          }}
        >
          {blogItems.map((item) => (
            <SwiperSlide className="item" key={item.id}>
              <div className="blog-post blog-grid blog-style-1">
                <div className="dlab-post-media dlab-img-effect radius-sm">
                  <Link to={`/blog/${encodeURIComponent(item.slug)}`}>
                    <img
                      width="700"
                      height="500"
                      src={item.featured_image_url || fallbackImage}
                      alt={item.title}
                    />
                  </Link>{" "}
                </div>
                <div className="dlab-info">
                  <div className="dlab-post-meta">
                    <ul className="d-flex align-items-center">
                      <li className="post-date">{formatDate(item.published_at)}</li>
                      <li className="post-comment">
                        <Link to={`/blog/${encodeURIComponent(item.slug)}`}>
                          {item.metrics.comment_count}
                        </Link>{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="dlab-post-title ">
                    <h5 className="post-title font-20">
                      <Link to={`/blog/${encodeURIComponent(item.slug)}`}>
                        {item.title}
                      </Link>
                    </h5>
                  </div>
                  <div className="dlab-post-readmore blog-share">
                    <Link
                      to={`/blog/${encodeURIComponent(item.slug)}`}
                      title="READ MORE"
                      rel="bookmark"
                      className="site-button-link border-link black"
                    >
                      READ MORE
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="owl-nav">
          <div
            onClick={() => {
              swiperRef.current?.swiper.slidePrev();
            }}
            className="owl-prev"
          >
            <i className="ti-angle-left"></i>
          </div>
          <div
            onClick={() => {
              swiperRef.current?.swiper.slideNext();
            }}
            className="owl-next"
          >
            <i className="ti-angle-right"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurBlogSlider;
