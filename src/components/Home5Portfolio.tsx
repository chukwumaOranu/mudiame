import { useState } from "react";
import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const masonryImg = [
  { img: IMAGE.imageGalleryImg1, categery: "all three" },
  { img: IMAGE.imageGalleryImg8, categery: "all tow" },
  { img: IMAGE.imageGalleryImg2, categery: "all tow" },
  { img: IMAGE.imageGalleryImg5, categery: "all four" },
  { img: IMAGE.imageGalleryImg3, categery: "all three" },
  { img: IMAGE.imageGalleryImg6, categery: "all three" },
  { img: IMAGE.imageGalleryImg4, categery: "all tow" },
  { img: IMAGE.imageGalleryImg7, categery: "all four" },
];
const Home5Portfolio = () => {
  const [ind, setInd] = useState(1);
  const [masonry, setMasonry] = useState(masonryImg);
  const masonryButton = (index: number, categery: string) => {
    setInd(index);
    const updateItem = masonryImg.filter((ell) => {
      return ell.categery.includes(categery);
    });
    setMasonry(updateItem);
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="site-filters style1 clearfix center">
            <ul className="filters">
              <li
                onClick={() => {
                  masonryButton(1, "all");
                }}
                className={`btn ${ind === 1 ? "active" : ""}`}
              >
                <Link to="#">
                  <span>All</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  masonryButton(2, "tow");
                }}
                className={`btn ${ind === 2 ? "active" : ""}`}
              >
                <Link to="#">
                  <span>Bridal Makeup</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  masonryButton(3, "three");
                }}
                className={`btn ${ind === 3 ? "active" : ""}`}
              >
                <Link to="#">
                  <span>Birthday Makeup</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  masonryButton(4, "four");
                }}
                className={`btn ${ind === 4 ? "active" : ""}`}
              >
                <Link to="#">
                  <span>Party Makeup</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="clearfix">
        <ul id="masonry" className="home5_masnary_box">
          <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
            {masonry.map((item, ind) => (
              <Link to={item.img} key={ind}>
                <li className="aroma card-container">
                  <div className="dlab-box">
                    <div className="dlab-media">
                      <img className="m-t20" src={item.img} alt="" />
                      <div className="overlay-bx">
                        <div className="spa-port-bx m-t10">
                          <div>
                            <h4 className="text-white">Bridal Makeup</h4>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                            </p>
                            <span className="check-km">
                              <i className="ti-fullscreen"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </LightGallery>
        </ul>
      </div>
    </>
  );
};

export default Home5Portfolio;
