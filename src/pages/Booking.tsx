import { useEffect, useState } from "react";
import { IMAGE } from "../constent/theme";
import { Step, Stepper } from "react-form-stepper";
import CommonBanner from "../element/CommonBanner";
import BookingPage1 from "../element/BookingPage1";
import BookingPage2 from "../element/BookingPage2";
import BookingPage3 from "../element/BookingPage3";
import BookingPage4 from "../element/BookingPage4";
import BookingPage5 from "../element/BookingPage5";

const Booking = () => {
  const [stepper, setStepper] = useState(0);

  function goToPreviousStep() {
    setStepper(() => (stepper > 0 ? stepper - 1 : stepper));
  }

  function goToNextStep() {
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
                  {stepper === 0 && <BookingPage1 />}
                  {stepper === 1 && <BookingPage2 />}
                  {stepper === 2 && <BookingPage3 />}
                  {stepper === 3 && <BookingPage4 />}
                  {stepper === 4 && <BookingPage5 />}
                </div>
              </div>
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
                  >
                    Next
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
