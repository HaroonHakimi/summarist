import {
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import initializeStripe from "./initializeStripe";
import { db } from "@/firebase";

export async function createMonthlyCheckout(uid) {
  let checkoutSessionRef;

  try {
    const firestore = getFirestore();

    checkoutSessionRef = await addDoc(
      collection(db,"users", uid, "checkout_sessions"),
      {
        price: "price_1ODfHmDueGWaYjB35b45Vl1B",
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

