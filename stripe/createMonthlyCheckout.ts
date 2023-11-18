import {
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import initializeStripe from "./initializeStripe";


export async function createMonthlyCheckout(uid: string) {

  const firestore = getFirestore();
  // Create a new checkout session in the subollection inside this users document
  

  const checkoutSessionRef = await addDoc(
    collection(doc(firestore, "users", uid), "checkout_sessions"),
    {
      price: "price_1ODfHmDueGWaYjB35b45Vl1B",
      success_url: window.location.origin + "/settings",
      cancel_url: window.location.origin + "/for-you",
    }
  )
  
  

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