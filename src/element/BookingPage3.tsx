const BookingPage3 = ({
  form,
  setForm,
  amountNgn,
}: {
  form: {
    product: string;
    selectedSlot: string;
    preferredDate: string;
    startFrom: string;
    paymentMethod: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerNote: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  amountNgn: number | null;
}) => {
  return (
    <div id="details" className="tab-pane step-content">
      <h6 className="m-b5">Customer Details</h6>
      <p className="m-b0">
        You selected <b className="text-black">{form.product}</b> for{" "}
        <b className="text-black">{form.selectedSlot || form.startFrom || "your preferred slot"}</b> on{" "}
        <b className="text-black">{form.preferredDate || "your selected date"}</b>.
      </p>
      <p className="m-b30">
        {form.paymentMethod === "card_payment"
          ? `Amount to pay now: NGN ${amountNgn?.toLocaleString() || "0"}.`
          : `Service price: NGN ${amountNgn?.toLocaleString() || "0"}. Payment will be made after service.`} Enter your details below to complete your Mudiame Lush booking.
      </p>
      <form className="row">
        <div className="col-lg-4 col-md-4 form-group">
          <label>Name</label>
          <input
            className="form-control"
            placeholder="Your Name"
            type="text"
            value={form.customerName}
            onChange={(event) => setForm((prev: any) => ({ ...prev, customerName: event.target.value }))}
          />
        </div>
        <div className="col-lg-4 col-md-4 form-group">
          <label>Phone</label>
          <input
            className="form-control"
            placeholder="Phone Number"
            type="text"
            value={form.customerPhone}
            onChange={(event) => setForm((prev: any) => ({ ...prev, customerPhone: event.target.value }))}
          />
        </div>
        <div className="col-lg-4 col-md-4 form-group">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="you@example.com"
            type="email"
            value={form.customerEmail}
            onChange={(event) => setForm((prev: any) => ({ ...prev, customerEmail: event.target.value }))}
          />
        </div>
        <div className="col-lg-12 form-group">
          <label>Note</label>
          <textarea
            className="form-control"
            placeholder="Add any booking note"
            rows={3}
            value={form.customerNote}
            onChange={(event) => setForm((prev: any) => ({ ...prev, customerNote: event.target.value }))}
          />
        </div>
      </form>
    </div>
  );
};

export default BookingPage3
