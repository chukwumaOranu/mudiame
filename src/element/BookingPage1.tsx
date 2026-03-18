import { Dropdown } from "react-bootstrap";

const BookingPage1 = ({
  form,
  setForm,
  products,
}: {
  form: {
    category: string;
    product: string;
    consultant: string;
    preferredDate: string;
    startFrom: string;
    finishBy: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  products: Array<{ category: string; name: string }>;
}) => {
  const categories = Array.from(new Set(products.map((item) => item.category)));
  const productOptions = products.filter((item) => item.category === form.category);
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
              {form.category}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((item) => (
                <Dropdown.Item
                  key={item}
                  onClick={() =>
                    setForm((prev: any) => ({
                      ...prev,
                      category: item,
                      product: products.find((product) => product.category === item)?.name || prev.product,
                    }))
                  }
                >
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
              {form.product}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {productOptions.map((item) => (
                <Dropdown.Item key={item.name} onClick={() => setForm((prev: any) => ({ ...prev, product: item.name }))}>
                  {item.name}
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
              {form.consultant}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {consultants.map((item) => (
                <Dropdown.Item key={item} onClick={() => setForm((prev: any) => ({ ...prev, consultant: item }))}>
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
            value={form.preferredDate}
            onChange={(event) => setForm((prev: any) => ({ ...prev, preferredDate: event.target.value }))}
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
              {form.startFrom}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {timeOptions.map((item) => (
                <Dropdown.Item key={item} onClick={() => setForm((prev: any) => ({ ...prev, startFrom: item }))}>
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
              {form.finishBy}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {timeOptions.map((item) => (
                <Dropdown.Item key={item} onClick={() => setForm((prev: any) => ({ ...prev, finishBy: item }))}>
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
