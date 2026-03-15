import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import { useState } from "react";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const lightgalleryImg1 = [
  { img: IMAGE.galleryImg1, img2: IMAGE.galleryImg2, categary: "Haircuts" },
];
const lightgalleryImg2 = [
  { img: IMAGE.galleryImg3, img2: "", categary: "Coloring" },
];
const lightgalleryImg3 = [
  { img: IMAGE.galleryImg4, img2: IMAGE.galleryImg5, categary: "Highlights" },
];
const OurPortfolio = () => {
  const [items, setItems] = useState([
    lightgalleryImg1,
    lightgalleryImg2,
    lightgalleryImg3,
  ]);
  const [addactive, setActive] = useState("All");

  const filterGallery = (filterItem: string) => {
    const upadateItem = lightgalleryImg1.filter((categery) => {
      return categery.categary == filterItem;
    });
    const upadateItem2 = lightgalleryImg2.filter((categery) => {
      return categery.categary == filterItem;
    });
    const upadateItem3 = lightgalleryImg3.filter((categery) => {
      return categery.categary == filterItem;
    });
    setItems([upadateItem, upadateItem2, upadateItem3]);
    setActive(filterItem);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="site-filters style1 clearfix center">
            <ul className="filters" data-toggle="buttons">
              <li
                onClick={() => {
                  filterGallery("All");
                  setItems([
                    lightgalleryImg1,
                    lightgalleryImg2,
                    lightgalleryImg3,
                  ]);
                }}
                className={`btn ${addactive == "All" ? "active" : ""}`}
              >
                <Link to="#">
                  <span>All</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  filterGallery("Haircuts");
                }}
                className={`btn ${addactive == "Haircuts" ? "active" : ""}`}
              >
                <Link to="#">
                  <span>Haircuts</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  filterGallery("Coloring");
                }}
                className={`btn ${addactive == "Coloring" ? "active" : ""}`}
              >
                <Link to="#">
                  <span>Coloring</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  filterGallery("Highlights");
                }}
                className={`btn ${addactive == "Highlights" ? "active" : ""}`}
              >
                <Link to="#">
                  <span>Highlights</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="clearfix">
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          thumbnail={true}
          elementClassNames="portfolio-box dlab-gallery-listing gallery-grid-4 gallery row lightgallery"
        >
          {items[0].map((item, index) => (
            <Link
              to={`${item.img}`}
              className="image-1 image-4 card-container col-lg-3 col-md-3 col-sm-3"
              key={index}
            >
              <div className="dlab-box">
                <div className="dlab-media dlab-img-overlay9 dlab-img-effect zoom">
                  <img width="385" height="385" src={item.img} alt="" />
                  <div className="overlay-bx">
                    <div className="overlay-icon">
                      <span
                        data-exthumbimage="images/gallery/middle/thumb/pic1.jpg"
                        data-src="images/gallery/image-1.jpg"
                        className="icon-bx-xs check-km"
                        title="Image Title Come Here 1"
                      >
                        <i className="ti-fullscreen"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dlab-box p-tb30 image-2">
                <div className="dlab-media dlab-img-overlay9 dlab-img-effect zoom">
                  <img width="385" height="385" src={item.img2} alt="" />
                  <div className="overlay-bx">
                    <div className="overlay-icon">
                      <span
                        data-exthumbimage="images/gallery/middle/thumb/pic2.jpg"
                        data-src="images/gallery/image-2.jpg"
                        className="icon-bx-xs check-km"
                        title="Image Title Come Here 1"
                      >
                        <i className="ti-fullscreen"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {items[1].map((item, index) => (
            <Link
              to={`${item.img}`}
              className="image-2 card-container col-lg-6 col-md-6 col-sm-6"
              key={index}
            >
              <div className="dlab-box m-b30">
                <div className="dlab-media dlab-img-overlay9 dlab-img-effect zoom">
                  <img src={item.img} alt="" />
                  <div className="overlay-bx">
                    <div className="overlay-icon">
                      <span
                        data-exthumbimage="images/gallery/middle/thumb/pic3.jpg"
                        data-src="images/gallery/image-3.jpg"
                        className="icon-bx-xs check-km"
                        title="Image Title Come Here 1"
                      >
                        <i className="ti-fullscreen"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {items[2].map((i, ind) => (
            <Link
              to={`${i.img}`}
              className="image-1 image-4 card-container col-lg-3 col-md-3 col-sm-3"
              key={ind}
            >
              <div className="dlab-box">
                <div className="dlab-media dlab-img-overlay9 dlab-img-effect zoom">
                  <img width="385" height="385" src={i.img} alt="" />
                  <div className="overlay-bx">
                    <div className="overlay-icon">
                      <span
                        data-exthumbimage="images/gallery/middle/thumb/pic1.jpg"
                        data-src="images/gallery/image-1.jpg"
                        className="icon-bx-xs check-km"
                        title="Image Title Come Here 1"
                      >
                        <i className="ti-fullscreen"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dlab-box p-tb30 image-2">
                <div className="dlab-media dlab-img-overlay9 dlab-img-effect zoom">
                  <img width="385" height="385" src={i.img2} alt="" />
                  <div className="overlay-bx">
                    <div className="overlay-icon">
                      <span
                        data-exthumbimage="images/gallery/middle/thumb/pic2.jpg"
                        data-src="images/gallery/image-2.jpg"
                        className="icon-bx-xs check-km"
                        title="Image Title Come Here 1"
                      >
                        <i className="ti-fullscreen"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </LightGallery>
      </div>
    </>
  );
};

export default OurPortfolio;
