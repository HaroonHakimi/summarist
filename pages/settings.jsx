import SearchBar from "@/components/SearchBar";
import SideNav from "@/components/SideNav";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user);
  const isPremium = useSelector((state) => state.user.premium);

  console.log(isPremium)

  function sendToChoosePlan() {
    if (user.plan === "basic") {
      router.push("/choose-plan");
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (!currUser) return;
      dispatch(
        setUser({
          email: currUser.email,
          uid: currUser.uid,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <SideNav />
      <SearchBar />

      <div className="py-8 md:pl-72 lg:pl-72  px-6 2xl:pl-96 2xl:pr-32">
        <div className=" pb-3">
          <h1 className="text-2xl md:text-[32px] font-bold">Settings</h1>
        </div>
        {user ? (
          <>
            <div className="py-6 border-y border[#e1e7ea] space-y-1">
              <h1 className="font-bold text-lg">Your Subscription Plan</h1>
              {isPremium ? <h2>Premium</h2> : <h2>Basic</h2>}
              {!isPremium && (
                <button
                  onClick={sendToChoosePlan}
                  className="btn max-w-[180px]"
                >
                  Upgrade to Premium
                </button>
              )}
            </div>
            <div className="pt-6">
              <h1 className="font-bold text-lg">Email</h1>
              <h1>{user.email.email}</h1>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center flex-col space-y-2">
            <figure>
              <img className="w-[460px]" src="/assets/logo.png" />
            </figure>
            <div className="space-y-2 flex justify-center">
              <h1 className="text-[24px] font-bold">
                Log in to see your account details
              </h1>
              <button button>Login</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
