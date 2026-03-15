import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const BookingPage1 = () => {
  const [category, setCategory] = useState("Select category");
  const [product, setProduct] = useState("Select product");
  const [consultant, setConsultant] = useState("Any consultant");
  const [startFrom, setStartFrom] = useState("9:00 am");
  const [finishBy, setFinishBy] = useState("6:00 pm");

  const categories = ["Nails", "Lips", "Eyes", "Self-Care"];
  const products = [
    "Gel Nail Polish",
    "Lip Gloss",
    "Eyeshadow Palette",
    "Lip Pencil",
    "Face Mask",
    "Foot Mask",
    "Hair Oil",
    "Body Oil",
  ];
  const consultants = ["Any consultant", "Ada", "Tosin", "Chioma", "Mira"];
  const timeOptions = [
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm",
  ];

  return (
    <div id="time" className="wizard-box tab-pane step-content">
      <h6 className="m-b30">Select your preferred product booking details:</h6>
      <form className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 form-group">
          <label>Category</label>
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              className="dropdown-basic booking-options booking-option-1"
              style={{ gap: "40%" }}
            >
              {category}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((item) => (
                <Dropdown.Item key={item} onClick={() => setCategory(item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-6 form-group">
          <label>Product</label>
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              className="dropdown-basic booking-options"
              style={{ gap: "40%" }}
            >
              {product}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {products.map((item) => (
                <Dropdown.Item key={item} onClick={() => setProduct(item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-6 form-group">
          <label>Beauty Consultant</label>
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              className="dropdown-basic booking-options"
              style={{ gap: "40%" }}
            >
              {consultant}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {consultants.map((item) => (
                <Dropdown.Item key={item} onClick={() => setConsultant(item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-6 form-group">
          <label>Preferred date</label>
          <input
            name="booking_date"
            className="form-control"
            placeholder="Select Date"
            type="date"
          />
        </div>

        <div className="col-lg-4 col-md-6 col-sm-6 form-group">
          <label>Start from</label>
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              className="dropdown-basic booking-options"
              style={{ gap: "40%" }}
            >
              {startFrom}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {timeOptions.map((item) => (
                <Dropdown.Item key={item} onClick={() => setStartFrom(item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-6 form-group">
          <label>Finish by</label>
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              className="dropdown-basic booking-options"
              style={{ gap: "40%" }}
            >
              {finishBy}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {timeOptions.map((item) => (
                <Dropdown.Item key={item} onClick={() => setFinishBy(item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </form>
    </div>
  );
};

export default BookingPage1;
