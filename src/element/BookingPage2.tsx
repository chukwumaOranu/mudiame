const slotColumns = [
  {
    day: "Tue Mar 03",
    times: ["9:00 am", "10:00 am", "11:00 am", "1:00 pm", "3:00 pm"],
  },
  {
    day: "Wed Mar 04",
    times: ["10:00 am", "11:30 am", "12:30 pm", "2:00 pm", "4:00 pm"],
  },
  {
    day: "Thu Mar 05",
    times: ["9:30 am", "11:00 am", "12:00 pm", "2:30 pm", "5:00 pm"],
  },
  {
    day: "Fri Mar 06",
    times: ["10:00 am", "12:00 pm", "1:00 pm", "3:00 pm", "5:30 pm"],
  },
];

const BookingPage2 = () => {
  return (
    <div id="service" className="step-content">
      <h6 className="m-b5">Available Time Slots</h6>
      <p className="m-b30">
        Choose a preferred slot for your selected Mudiame Lush product booking.
      </p>
      <div className="book-time row">
        {slotColumns.map((column) => (
          <div
            key={column.day}
            className="btn-group d-flex flex-column m-b10 col-lg-3 col-md-6 col-sm-6 col-6"
            data-toggle="buttons"
          >
            <label className="btn active active-time">
              <input type="checkbox" /> {column.day}
            </label>
            {column.times.map((time) => (
              <label className="btn" key={time}>
                {" "}
                {time}
                <input type="checkbox" />
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage2;
