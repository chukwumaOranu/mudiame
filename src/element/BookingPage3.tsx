
const BookingPage3 = () => {
  return (
    <div id="details" className="tab-pane step-content">
      <h6 className="m-b5">Customer Details</h6>
      <p className="m-b0">
        You selected <b className="text-black">Gel Nail Polish</b> for{" "}
        <b className="text-black">3:00 pm</b> on{" "}
        <b className="text-black">March 6, 2026</b>. Product price is{" "}
        <b className="text-black">NGN 7,000</b>.
      </p>
      <p className="m-b30">
        Enter your details below to complete your Mudiame Lush booking.
      </p>
      <form className="row">
        <div className="col-lg-4 col-md-4 form-group">
          <label>Name</label>
          <input className="form-control" placeholder="Your Name" type="text" />
        </div>
        <div className="col-lg-4 col-md-4 form-group">
          <label>Phone</label>
          <input className="form-control" placeholder="Phone Number" type="text" />
        </div>
        <div className="col-lg-4 col-md-4 form-group">
          <label>Email</label>
          <input className="form-control" placeholder="you@example.com" type="email" />
        </div>
      </form>
    </div>
  );
};

export default BookingPage3
