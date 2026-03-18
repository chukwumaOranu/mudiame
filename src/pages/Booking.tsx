import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { IMAGE } from "../constent/theme";
import { Step, Stepper } from "react-form-stepper";
import CommonBanner from "../element/CommonBanner";
import BookingPage1 from "../element/BookingPage1";
import BookingPage2 from "../element/BookingPage2";
import BookingPage3 from "../element/BookingPage3";
import BookingPage4 from "../element/BookingPage4";
import BookingPage5 from "../element/BookingPage5";
import {
  BOOKING_PAYMENT_OPTIONS,
  FALLBACK_BOOKING_OPTIONS,
  createBookingRequest,
  getPublicBookingOptions,
} from "../api/bookingApi";

const convertDisplayTimeToSqlTime = (value: string) => {
  const twentyFourHourMatch = value.trim().match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (twentyFourHourMatch) {
    const [, hoursText, minutesText, secondsText = "00"] = twentyFourHourMatch;
    return `${hoursText}:${minutesText}:${secondsText}`;
  }

  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!match) {
    return value;
  }

  const [, hoursText, minutesText = "00", meridiemText] = match;
  let hours = Number(hoursText) % 12;
  if (meridiemText.toLowerCase() === "pm") {
    hours += 12;
  }

  return `${String(hours).padStart(2, "0")}:${minutesText}:00`;
};

const buildSelectedSlot = (preferredDate: string, selectedSlot: string) => {
  if (!preferredDate || !selectedSlot) {
    return null;
  }

  const sqlTime = convertDisplayTimeToSqlTime(selectedSlot);
  return /^\d{2}:\d{2}:\d{2}$/.test(sqlTime) ? `${preferredDate} ${sqlTime}` : null;
};

const Booking = () => {
  const [stepper, setStepper] = useState(0);
  const [form, setForm] = useState({
    category: "",
    product: "",
    consultant: "Any consultant",
    preferredDate: "",
    startFrom: "9:00 am",
    finishBy: "6:00 pm",
    selectedSlot: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerNote: "",
    paymentMethod: "pay_on_pickup" as const,
  });
  const [submitError, setSubmitError] = useState("");
  const bookingOptionsQuery = useQuery({
    queryKey: ["booking", "options"],
    queryFn: getPublicBookingOptions,
  });

  const bookingProducts =
    bookingOptionsQuery.data?.items?.length ? bookingOptionsQuery.data.items : FALLBACK_BOOKING_OPTIONS;

  const bookingMutation = useMutation({
    mutationFn: () =>
      createBookingRequest({
        customer_name: form.customerName,
        customer_phone: form.customerPhone,
        customer_email: form.customerEmail,
        product_category: form.category,
        product_name: form.product,
        consultant_preference: form.consultant,
        preferred_date: form.preferredDate,
        start_time: convertDisplayTimeToSqlTime(form.startFrom),
        finish_time: convertDisplayTimeToSqlTime(form.finishBy),
        selected_slot: buildSelectedSlot(form.preferredDate, form.selectedSlot),
        payment_method: form.paymentMethod,
        customer_note: form.customerNote,
      }),
    onSuccess: (data) => {
      setSubmitError("");
      if (data.payment.required && data.payment.authorization_url) {
        window.open(data.payment.authorization_url, "_blank", "noopener,noreferrer");
      }
      setStepper(4);
    },
    onError: (error) => setSubmitError((error as Error).message),
  });

  const selectedProduct = bookingProducts.find((item) => item.name === form.product);

  useEffect(() => {
    if (!bookingProducts.length) {
      return;
    }

    setForm((previous) => {
      const currentProduct = bookingProducts.find((item) => item.name === previous.product);
      if (currentProduct) {
        return previous;
      }

      return {
        ...previous,
        category: bookingProducts[0].category,
        product: bookingProducts[0].name,
      };
    });
  }, [bookingProducts]);

  function goToPreviousStep() {
    setStepper(() => (stepper > 0 ? stepper - 1 : stepper));
  }

  async function goToNextStep() {
    if (stepper === 3) {
      await bookingMutation.mutateAsync();
      return;
    }

    setStepper(() => (stepper < 4 ? stepper + 1 : stepper));
  }

  const StepperButtons = (action: number) => {
    setStepper(action);
    const stepeContainer = document.querySelectorAll("#smartwizard>div>div");
    for (let x = 0; x < stepeContainer.length; x++) {
      stepeContainer[x].classList.remove("stape-completed");
    }
    for (let i = 0; i < action; i++) {
      stepeContainer[i].classList.add("stape-completed");
    }
  };
  useEffect(() => {
    const stepeContainer = document.querySelectorAll("#smartwizard>div>div");
    for (let i = 0; i < stepeContainer.length; i++) {
      stepeContainer[i].classList.remove("stape");
      stepeContainer[stepper].classList.remove("stape-completed");
    }
    stepeContainer[stepper].classList.add("stape");
    if (stepper > 0) {
      stepeContainer[stepper - 1].classList.add("stape-completed");
    }
  }, [stepper]);

  return (
    <>
      <div className="page-content bg-white">
        <CommonBanner title={"Product Booking"} image={IMAGE.banner1} />
        <div className="content-block">
          <div className="section-full content-inner-2">
            <div className="container">
              <div id="smartwizard">
                {bookingOptionsQuery.isLoading && <p>Loading booking options...</p>}
                {bookingOptionsQuery.isError && (
                  <p className="admin-form-error">
                    Live booking options could not be loaded, so fallback products are being shown.
                  </p>
                )}
                {!bookingOptionsQuery.isLoading && bookingProducts.length === 0 && (
                  <p className="admin-form-error">No booking products are available right now.</p>
                )}
                {bookingProducts.length > 0 && (
                <>
                <Stepper activeStep={stepper}>
                  <Step
                    onClick={() => {
                      StepperButtons(0);
                    }}
                    className="flex-fill"
                    label="Time"
                  />
                  <Step
                    onClick={() => {
                      StepperButtons(1);
                    }}
                    className="flex-fill"
                    label="Product"
                  />
                  <Step
                    onClick={() => {
                      StepperButtons(2);
                    }}
                    className="flex-fill"
                    label="Details"
                  />
                  <Step
                    onClick={() => {
                      StepperButtons(3);
                    }}
                    className="flex-fill"
                    label="Payment"
                  />
                  <Step
                    onClick={() => {
                      StepperButtons(4);
                    }}
                    className="flex-fill"
                    label="Done"
                  />
                </Stepper>
                <div>
                  {stepper === 0 && <BookingPage1 form={form} setForm={setForm} products={bookingProducts} />}
                  {stepper === 1 && <BookingPage2 form={form} setForm={setForm} />}
                  {stepper === 2 && <BookingPage3 form={form} setForm={setForm} amountNgn={selectedProduct?.amount_ngn || null} />}
                  {stepper === 3 && <BookingPage4 form={form} setForm={setForm} paymentOptions={BOOKING_PAYMENT_OPTIONS} amountNgn={selectedProduct?.amount_ngn || null} />}
                  {stepper === 4 && <BookingPage5 bookingResult={bookingMutation.data?.booking || null} />}
                </div>
                </>
                )}
              </div>
              {submitError && <p className="admin-form-error m-t15">{submitError}</p>}
              <div className="btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-end bg-gray">
                <div className="btn-group mr-2 sw-btn-group d-flex justify-content-between w-100 p-l10 p-t10 p-b10">
                  <button
                    onClick={goToPreviousStep}
                    className="site-button-secondry sw-btn-prev disabled"
                    type="button"
                  >
                    Previous
                  </button>
                  <button
                    onClick={goToNextStep}
                    className="site-button sw-btn-next"
                    type="button"
                    disabled={bookingMutation.isPending}
                  >
                    {stepper === 3 ? (bookingMutation.isPending ? "Submitting..." : "Submit Booking") : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
