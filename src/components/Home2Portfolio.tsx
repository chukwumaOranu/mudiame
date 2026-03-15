import { useMemo, useState } from 'react';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { usePortfolioItemsQuery } from '../hooks/usePortfolio';

const Home2Portfolio = () => {
  const portfolioQuery = usePortfolioItemsQuery(1, 100);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const remote = portfolioQuery.data?.categories || [];
    return ['All', ...remote];
  }, [portfolioQuery.data?.categories]);

  const items = useMemo(() => {
    const allItems = portfolioQuery.data?.items || [];
    if (activeCategory === 'All') {
      return allItems;
    }
    return allItems.filter((item) => item.category === activeCategory);
  }, [portfolioQuery.data?.items, activeCategory]);

  return (
    <>
      <div className="site-filters style1 clearfix center">
        <ul className="filters">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`btn ${activeCategory === category ? 'active' : ''}`}
            >
              <a href="#" onClick={(event) => event.preventDefault()}>
                <span>{category}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {portfolioQuery.isLoading && <p style={{ textAlign: 'center' }}>Loading portfolio...</p>}
      {portfolioQuery.isError && (
        <p style={{ textAlign: 'center', color: '#b42318' }}>Unable to load portfolio items.</p>
      )}

      <div className="clearfix">
        <ul id="masonry" className="masonry-box-container-2" style={{ listStyle: 'none' }}>
          <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
            {items.map((item) => (
              <a href={item.image_url} key={item.id}>
                <li className="web design card-container">
                  <div className="dlab-box dlab-gallery-box">
                    <div className="dlab-media dlab-img-overlay1 dlab-img-effect">
                      <img src={item.image_url} alt={item.title} />
                      <div className="overlay-bx">
                        <div className="overlay-icon">
                          <span className="icon-bx-xs check-km" title={item.title}>
                            <i className="ti-fullscreen"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </a>
            ))}
          </LightGallery>
        </ul>
      </div>
    </>
  );
};

export default Home2Portfolio;
