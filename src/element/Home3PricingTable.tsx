import { Link } from "react-router-dom";

const pricingTable = [
  { title: "Basic Membership", price: "$10" },
  { title: "Silver Membership", price: "$12", className: "bg-primary" },
  { title: "Gold Membership", price: "$18" },
  { title: "Luxe Membership", price: "$23" },
];

const Home3PricingTable = () => {
  return (
    <>
      <div className="pricingtable-row hair-membership">
        <div className="row">
          {pricingTable.map((item, ind) => (
            <div className="col-sm-6 col-md-6 col-lg-3 m-b30" key={ind}>
              <div className="pricingtable-wrapper">
                <div className="pricingtable-inner">
                  <div
                    className={`pricingtable-title ${item.className}`}
                    style={{ transition: "all 1s" }}
                  >
                    <h2>{item.title}</h2>
                  </div>
                  <div className="pricingtable-price">
                    <span className="pricingtable-bx">{item.price}</span>{" "}
                    <span className="pricingtable-type">Month</span>{" "}
                  </div>
                  <ul className="pricingtable-features">
                    <li>
                      <i className="fa fa-check"></i> Full Responsive{" "}
                    </li>
                    <li>
                      <i className="fa fa-check"></i> Multi color theme
                    </li>
                    <li>
                      <i className="fa fa-check"></i> With Bootstrap
                    </li>
                    <li>
                      <i className="fa fa-check"></i> Easy to customize
                    </li>
                    <li>
                      <i className="fa fa-check"></i> Many Sortcodes
                    </li>
                  </ul>
                  <div className="pricingtable-footer">
                    {" "}
                    <Link to="/contact" className="site-button ">
                      Contact Us
                    </Link>{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home3PricingTable;
