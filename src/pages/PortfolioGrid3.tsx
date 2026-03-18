import { useMemo, useState } from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { IMAGE } from "../constent/theme";
import CommonBanner2 from "../element/CommonBanner2";
import { usePortfolioItemsQuery } from "../hooks/usePortfolio";
import Seo from "../components/Seo";

const PortfolioGrid3 = () => {
  const portfolioQuery = usePortfolioItemsQuery(1, 100);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const remote = portfolioQuery.data?.categories || [];
    return ["All", ...remote];
  }, [portfolioQuery.data?.categories]);

  const items = useMemo(() => {
    const allItems = portfolioQuery.data?.items || [];
    if (activeCategory === "All") {
      return allItems;
    }
    return allItems.filter((item) => item.category === activeCategory);
  }, [portfolioQuery.data?.items, activeCategory]);

  return (
    <div className="page-content bg-white">
      <Seo
        title="Portfolio"
        description="Explore Mudiame Lush portfolio highlights, beauty looks, and product showcases from the latest gallery uploads."
        canonicalPath="/portfolio"
        keywords={["Mudiame portfolio", "beauty gallery", "portfolio Lagos", "beauty brand gallery"]}
      />
      <CommonBanner2 title={"Portfolio"} img={IMAGE.banner1} />
      <div className="content-block">
        <div className="section-full content-inner-2 portfolio-box">
          <div className="container">
            <div className="section-head text-black text-center m-b20">
              <h2 className="text-primary m-b10">Our Portfolio</h2>
              <div className="dlab-separator-outer m-b0">
                <div className="dlab-separator text-primary style-icon">
                  <i className="flaticon-spa text-primary"></i>
                </div>
              </div>
              <p>
                Explore beauty moments, product highlights, and signature looks from Mudiame Lush.
              </p>
            </div>

            <div className="site-filters style1 clearfix center">
              <ul className="filters">
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`btn ${activeCategory === category ? "active" : ""}`}
                  >
                    <a href="#" onClick={(event) => event.preventDefault()}>
                      <span>{category}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {portfolioQuery.isLoading && <p style={{ textAlign: "center" }}>Loading portfolio...</p>}
            {portfolioQuery.isError && (
              <p style={{ textAlign: "center", color: "#b42318" }}>Unable to load portfolio items.</p>
            )}

            <div className="clearfix">
              <div className="masonry-box-container-2">
                <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
                  {items.map((item) => (
                    <a className="figure" href={item.image_url} key={item.id}>
                      <div className="dlab-box dlab-gallery-box">
                        <div className="dlab-media dlab-img-overlay1 dlab-img-effect">
                          <img src={item.image_url} alt={item.title} />
                          <div className="overlay-bx">
                            <div className="overlay-icon image-over-icon">
                              <span className="mfp-link">
                                <i className="ti-fullscreen"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </LightGallery>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioGrid3;
