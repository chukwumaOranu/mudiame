import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import { featuredServiceItems } from "../data/services";

const HomeCards = () => {
  return (
    <div
      className="section-full content-inner-3 services-box bg-pink-light"
      style={{
        backgroundImage: `url(${IMAGE.backgroundBg5})`,
        backgroundPosition: "bottom",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="row">
          {featuredServiceItems.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30" key={item.slug}>
              <div className="icon-bx-wraper p-lr15 p-b30 p-t20 bg-white center fly-box-ho">
                <div className="icon-lg m-b10">
                  <span className="icon-cell text-primary">
                    <i className={item.icon}></i>
                  </span>
                </div>
                <div className="icon-content">
                  <h6 className="dlab-tilte">{item.shortTitle}</h6>
                  <p>{item.summary}</p>
                  <Link
                    to={`/services/${encodeURIComponent(item.slug)}`}
                    className="site-button-secondry"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
