import {
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import initializeStripe from "./initializeStripe";

export async function createYearlyCheckout(uid) {
  let checkoutSessionRef;

  try {
    const firestore = getFirestore();

    checkoutSessionRef = await addDoc(
      collection(doc(firestore, "users", uid), "checkout_sessions"),
      {
        price: "price_1ODfIjDueGWaYjB3usXPgm90",
        success_url: window.location.origin + "/settings",
        cancel_url: window.location.origin + "/for-you",
      }
    );

    console.log("Document added with ID: ", checkoutSessionRef.id);

    onSnapshot(checkoutSessionRef, (snap) => {
      const { sessionId } = snap.data();
      if (sessionId) {
        initializeStripe().then((stripe) => {
          stripe.redirectToCheckout({ sessionId });
        });
      }
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}


