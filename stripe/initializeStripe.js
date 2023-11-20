import { loadStripe } from "@stripe/stripe-js";

let stripePromise = null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_live_51OCtQFDueGWaYjB3sFsdqHdABUPBMGAD1YjHl9ojyH2utBDIQ3IM6P695FaQMka3mLNZaONar08Ph6mTrzraeOoX00JqBmq1Ym"
    );
  }
  return stripePromise;
};

export default initializeStripe;


