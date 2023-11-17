import initializeStripe from "./initializeStripe";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";

export async function createYearlyCheckout(uid: string) {
  const firestore = getFirestore();
  // Create a new checkout session in the subollection inside this users document
  const checkoutSessionRef = await addDoc(
    collection(doc(firestore, "users", uid), "checkout_sessions"),
    {
      price: "price_1ODFOLDueGWaYjB3EocZGxoh",
      success_url: window.location.origin + "/settings",
      cancel_url: window.location.origin + "/for-you",
    }
  );

  // Wait for the CheckoutSession to get attached by the extension
  onSnapshot(checkoutSessionRef, (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      initializeStripe().then((stripe) => {
        stripe.redirectToCheckout({ sessionId });
      });
    }
  });
}