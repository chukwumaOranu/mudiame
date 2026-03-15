

const BookingPage4 = () => {
  return (
    <div id="payment" className="tab-pane step-content">
      <h6>Please choose your preferred payment method:</h6>
      <form>
        <div className="custom-control custom-radio">
          <input
            type="radio"
            className="custom-control-input"
            id="payOnPickup"
            name="paymentMethod"
          />
          <label className="custom-control-label" htmlFor="payOnPickup">
            Pay on pickup
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input
            type="radio"
            className="custom-control-input"
            id="bankTransfer"
            name="paymentMethod"
          />
          <label className="custom-control-label" htmlFor="bankTransfer">
            Bank transfer
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input
            type="radio"
            className="custom-control-input"
            id="cardPayment"
            name="paymentMethod"
          />
          <label className="custom-control-label" htmlFor="cardPayment">
            Card payment
          </label>
        </div>
      </form>
    </div>
  );
}

export default BookingPage4
