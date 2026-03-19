# Paystack Flow Guide

This guide explains the Paystack payment flow used in this project, step by step.

## Big Picture

Most payment gateways follow this pattern:

1. Frontend sends a request to your backend.
2. Backend creates a booking or order.
3. Backend initializes a payment with the gateway.
4. Gateway returns a checkout URL.
5. Customer pays on the gateway page.
6. Gateway sends the customer back to your app with a callback URL.
7. Backend verifies the payment with the gateway.
8. Gateway also sends a webhook to the backend for reliable confirmation.
9. Backend updates the database.

That same pattern is what this project now uses with Paystack.

## Files To Study

Read these files in this order:

1. [server/src/utils/paystack.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/utils/paystack.js)
2. [server/src/controllers/booking.controller.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/controllers/booking.controller.js)
3. [server/src/models/booking.model.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/models/booking.model.js)
4. [server/src/routes/booking.routes.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/routes/booking.routes.js)
5. [src/pages/Booking.tsx](/Users/chukwumaoranu/Desktop/Projects/mudiame/src/pages/Booking.tsx)
6. [src/api/bookingApi.ts](/Users/chukwumaoranu/Desktop/Projects/mudiame/src/api/bookingApi.ts)

## Step 1: Frontend Starts The Booking

The user fills the booking form in:

- [src/pages/Booking.tsx](/Users/chukwumaoranu/Desktop/Projects/mudiame/src/pages/Booking.tsx)

When the user submits:

- the form data is collected
- the frontend calls `createBookingRequest(...)`
- that function lives in [src/api/bookingApi.ts](/Users/chukwumaoranu/Desktop/Projects/mudiame/src/api/bookingApi.ts)

This sends a `POST` request to:

```txt
/api/bookings
```

At this point, the frontend is basically saying:

```txt
Backend, create this booking and start payment if needed.
```

## Step 2: Backend Receives The Booking Request

The route is defined in:

- [server/src/routes/booking.routes.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/routes/booking.routes.js)

Important line:

```js
router.post('/', bookingValidation, createPublicBooking);
```

This means:

1. validate the request
2. run `createPublicBooking`

## Step 3: Controller Creates The Booking

The main logic lives in:

- [server/src/controllers/booking.controller.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/controllers/booking.controller.js)

Inside `createPublicBooking(...)`, the backend:

- validates times
- finds the product price
- creates the booking record
- decides whether payment is needed

The database insert happens through:

- [server/src/models/booking.model.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/models/booking.model.js)

Important idea:

- the booking is created before payment is completed

That means you already have a booking record even before Paystack finishes processing the card.

## Step 4: Backend Initializes Paystack

If the customer selected `card_payment`, the controller calls:

```js
initializePaystackTransaction(...)
```

That helper is in:

- [server/src/utils/paystack.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/utils/paystack.js)

This helper sends a request to Paystack with:

- `email`
- `amount`
- `reference`
- `callback_url`
- `metadata`

### Important Fields

`amount`

- Paystack expects amount in kobo
- so `7000 NGN` becomes `700000`

`reference`

- your unique payment identifier
- in this project it is tied closely to the booking reference

`callback_url`

- where Paystack sends the customer back after payment

`metadata`

- extra booking details attached to the transaction

## Step 5: Paystack Returns Checkout Data

Paystack responds with values like:

- `authorization_url`
- `access_code`
- `reference`

The controller saves important payment fields into the booking record:

- `payment_reference`
- `payment_authorization_url`

So the booking now knows which payment attempt belongs to it.

## Step 6: Frontend Redirects To Paystack

Back in:

- [src/pages/Booking.tsx](/Users/chukwumaoranu/Desktop/Projects/mudiame/src/pages/Booking.tsx)

if the backend response says payment is required, the frontend redirects the browser to:

- `authorization_url`

That means the user leaves your website temporarily and lands on Paystack’s hosted checkout page.

This is a hosted payment flow.

## Step 7: Customer Pays On Paystack

On Paystack’s side:

- customer enters card details
- Paystack processes the transaction
- your frontend does not directly handle the raw card details

That is one reason hosted payment pages are common and safer.

## Step 8: Paystack Redirects The User Back

After payment, Paystack sends the customer back to the callback URL set by your backend.

In this project the callback looks like:

```txt
/booking?reference=BOOKING_REFERENCE&payment=callback
```

This returns the customer to your frontend booking page.

## Step 9: Frontend Detects The Callback

In:

- [src/pages/Booking.tsx](/Users/chukwumaoranu/Desktop/Projects/mudiame/src/pages/Booking.tsx)

the page reads the query string.

If it sees:

- `reference`
- `payment=callback`

it calls:

```js
verifyBookingPayment(reference)
```

That function is in:

- [src/api/bookingApi.ts](/Users/chukwumaoranu/Desktop/Projects/mudiame/src/api/bookingApi.ts)

This sends a request to:

```txt
/api/bookings/verify/:reference
```

Important lesson:

- the frontend does not trust the callback alone
- it asks the backend to verify the payment properly

## Step 10: Backend Verifies With Paystack

The verify route is defined in:

- [server/src/routes/booking.routes.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/routes/booking.routes.js)

It runs:

```js
verifyPublicBookingPayment
```

Inside the controller, the backend:

1. finds the booking by reference
2. calls `verifyPaystackTransaction(reference)`
3. Paystack returns the real payment result
4. booking payment status is updated

Verification helper:

- [server/src/utils/paystack.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/utils/paystack.js)

If Paystack says the transaction succeeded:

- `payment_status` becomes `paid`
- booking `status` becomes `confirmed` if it was still pending

This is the part that makes the system trustworthy.

## Step 11: Webhook Also Confirms Payment

This project also now supports a webhook:

```txt
POST /api/bookings/webhook/paystack
```

This is different from callback.

### Callback

- browser to frontend
- mainly for user experience

### Webhook

- Paystack server to backend
- mainly for reliability

The webhook handler:

- checks the Paystack signature
- verifies the event is authentic
- finds the related booking
- updates payment state

That means:

- even if the user closes the browser
- even if the callback never completes
- your backend can still receive the payment event

## Step 12: Signature Validation

The webhook must not be trusted blindly.

In:

- [server/src/utils/paystack.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/utils/paystack.js)

the code calculates an HMAC hash of the raw request body using:

- `PAYSTACK_SECRET_KEY`

Then it compares that hash with:

- `x-paystack-signature`

If they match:

- the webhook is considered authentic

If they do not match:

- the request is rejected

This protects you from fake webhook calls.

## Step 13: Raw Request Body Is Needed For Webhooks

In:

- [server/index.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/index.js)

Express JSON parsing was updated to keep the raw request body.

That matters because webhook signature validation must use the exact raw payload.

Without raw body support:

- signature checking can fail

## Step 14: Database Updates

Database work happens in:

- [server/src/models/booking.model.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/models/booking.model.js)

Important fields stored in the booking:

- `booking_reference`
- `payment_reference`
- `payment_status`
- `payment_authorization_url`
- `status`

Important model functions:

- create booking
- get booking by id
- get booking by reference
- update payment info
- update booking status

So the model file is where business decisions are finally saved into MySQL.

## Step 15: Final Frontend Result

After successful verification, the frontend shows the completion step.

That UI is in:

- [src/element/BookingPage5.tsx](/Users/chukwumaoranu/Desktop/Projects/mudiame/src/element/BookingPage5.tsx)

If verification does not show a successful payment:

- the page stays out of the final confirmed state
- the user sees an error or pending message instead

That is the correct behavior.

## Mental Model

Think of each file like this:

### Frontend UI

- [src/pages/Booking.tsx](/Users/chukwumaoranu/Desktop/Projects/mudiame/src/pages/Booking.tsx)

The page the user interacts with.

### Frontend API Layer

- [src/api/bookingApi.ts](/Users/chukwumaoranu/Desktop/Projects/mudiame/src/api/bookingApi.ts)

Turns frontend actions into backend requests.

### Route Layer

- [server/src/routes/booking.routes.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/routes/booking.routes.js)

Maps URLs to controller functions.

### Controller Layer

- [server/src/controllers/booking.controller.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/controllers/booking.controller.js)

Contains the payment and booking logic.

### Gateway Layer

- [server/src/utils/paystack.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/utils/paystack.js)

Handles communication with Paystack.

### Database Layer

- [server/src/models/booking.model.js](/Users/chukwumaoranu/Desktop/Projects/mudiame/server/src/models/booking.model.js)

Reads and writes booking data.

## One Variable To Trace While Learning

The best variable to trace is:

```txt
reference
```

Watch it move through the system:

1. booking is created
2. reference is sent to Paystack
3. Paystack returns with the reference
4. frontend sends the reference to backend verify route
5. backend verifies the reference with Paystack
6. backend updates the booking tied to that reference

If you understand the life of `reference`, the payment flow becomes much easier to understand.

## Why We Do Not Trust The Frontend Alone

Never mark a booking as paid only because:

- the frontend says payment succeeded
- the browser returned from Paystack

Always verify on the backend.

Best practice:

- callback for user experience
- webhook for reliability
- backend verification for trust

## How This Compares To Other Gateways

Paystack, Stripe, Flutterwave, and similar gateways usually follow the same structure:

1. backend creates payment session or transaction
2. user pays on hosted gateway UI
3. gateway returns the user to your app
4. backend verifies the final result
5. webhook confirms it server-to-server

The names may differ, but the architecture is very similar.

## What To Practice Next

To learn deeply, do this:

1. Open the booking page in the browser.
2. Submit a card payment booking.
3. Watch where the request goes in `Booking.tsx`.
4. Follow it into `bookingApi.ts`.
5. Follow it into `booking.routes.js`.
6. Follow it into `createPublicBooking` in the controller.
7. Follow the Paystack helper call.
8. Follow the callback back into the verify flow.
9. Follow the final database update.

## Suggested Study Order

Do not try to memorize everything at once.

Study in this order:

1. `server/src/utils/paystack.js`
2. `server/src/controllers/booking.controller.js`
3. `server/src/models/booking.model.js`
4. `server/src/routes/booking.routes.js`
5. `src/api/bookingApi.ts`
6. `src/pages/Booking.tsx`

## Final Summary

This project now uses a proper payment flow:

- booking is created first
- Paystack transaction is initialized
- customer pays on Paystack
- callback returns customer to frontend
- backend verifies with Paystack
- webhook provides reliable server confirmation
- database is updated with payment and booking status

If you understand that end-to-end cycle, you understand the core payment architecture used by most modern gateways.
