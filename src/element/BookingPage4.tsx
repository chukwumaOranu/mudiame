const BookingPage4 = ({
  form,
  setForm,
  paymentOptions,
  amountNgn,
}: {
  form: { paymentMethod: string };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  paymentOptions: Array<{ value: string; label: string }>;
  amountNgn?: number | null;
}) => {
  return (
    <div id="payment" className="tab-pane step-content">
      <h6>Please choose your preferred payment method:</h6>
      <form>
        {paymentOptions.map((option) => (
          <div className="custom-control custom-radio" key={option.value}>
            <input
              type="radio"
              className="custom-control-input"
              id={option.value}
              name="paymentMethod"
              checked={form.paymentMethod === option.value}
              onChange={() => setForm((prev: any) => ({ ...prev, paymentMethod: option.value }))}
            />
            <label className="custom-control-label" htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
        <p className="m-t15 m-b0">
          {form.paymentMethod === "card_payment"
            ? `Amount to pay now: NGN ${amountNgn?.toLocaleString() || "0"}`
            : `Service price: NGN ${amountNgn?.toLocaleString() || "0"}. Payment will be collected after service.`}
        </p>
      </form>
    </div>
  );
}

export default BookingPage4
