import type { BookingRecord } from "../types/booking";

const BookingPage5 = ({
  bookingResult,
  paymentMessage,
}: {
  bookingResult: BookingRecord | null;
  paymentMessage?: string;
}) => {
  return (
    <div id="done" className="tab-pane step-content">
      <div className="successful-box text-center">
        <div className="successful-check">
          <i className="ti-check"></i>
        </div>
        <h2>Booking Confirmed</h2>
        <p className="m-b0">
          Thank you for choosing Mudiame Lush. We will contact you shortly with
          your final booking details.
        </p>
        {paymentMessage && <p className="m-t15">{paymentMessage}</p>}
        {bookingResult && (
          <p className="m-t15">
            Reference: <b>{bookingResult.booking_reference}</b>
          </p>
        )}
      </div>
    </div>
  );
}

export default BookingPage5
