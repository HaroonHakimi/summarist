import { useEffect } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setPremiumStatus } from "@/redux/userSlice";

export default function usePremiumStatus() {
  const dispatch = useDispatch();
  const premiumStatus = useSelector((state) => state.user.premium);

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (user) {
        
        const tokenResult = await user.getIdTokenResult();
        dispatch(setPremiumStatus(tokenResult.claims.stripeRole === "premium"));
      } else {
        dispatch(setPremiumStatus(false));
      }
    });
  }, []);

  return premiumStatus;
}