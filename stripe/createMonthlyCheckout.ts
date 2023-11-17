import initializeStripe from "./initializeStripe";
import { getFirestore } from "firebase/firestore";
import { collection,
    addDoc,
    doc,
    onSnapshot
 } from "firebase/firestore"

export async function createMonthlyCheckout(uid: string) {

  const firestore = getFirestore();
  // Create a new checkout session in the subollection inside this users document
  const checkoutSessionRef = await addDoc(
    collection(firestore, "users", uid, "checkout_sessions"),
    {
      price: "price_1ODELIDueGWaYjB3DCkfzQls",
      success_url: window.location.origin + "/success",
      cancel_url: window.location.origin + "/settings",
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
  });;
}