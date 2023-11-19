import {
  closeLoginModal,
  openLoginModal,
  openSignupModal,
} from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import SignupModal from "./SignupModal";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/userSlice";
import { error } from "jquery";
import { doc, setDoc } from "firebase/firestore";

export default function LoginModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  function signUp() {
    dispatch(closeLoginModal());
    dispatch(openSignupModal());
    dispatch(setUser());
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log(email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          uid: user.uid,
        });
      }
      console.log(error.code, error.message)
      dispatch(closeLoginModal());
      setLoginError(false);
      setLoginLoading(false);
      router.push("/for-you");
    } catch (error) {
      console.log(error.code, error.message)
      setLoginError(true);
      setLoginLoading(false);
    }
  }

  async function guestSignIn() {
    e.preventDefault();
    setLoginLoading(true);
    try {

    await signInWithEmailAndPassword(
      auth,
      "guest1234567891705@gmail.com",
      "123456"
    );

    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
      });
    }

    router.push("/for-you");
    setLoginLoading(false);
    dispatch(closeLoginModal());
    } catch {
      console.log(error.code, error.message)
      setLoginError(true);
      setLoginLoading(false);
    }
  }

  function closeModal() {
    dispatch(closeLoginModal());
    setLoginError(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (!currUser) return;
      //handle redux actions
      dispatch(
        setUser({
          email: currUser.email,
          password: currUser.password,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeModal}
        className="flex justify-center items-center "
      >
        <div className="relative bg-white w-[400px] h-[430px] pt-[48px] px-[32px] pb-[24px] rounded-md overflow-hidden">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-[#032b41] text-xl font-bold mb-6">
              Log in to Summarist
            </h1>
            {loginError && (
              <h1 className=" text-red-500 text-sm  mb-3">
                FirebaseError: Firebase: Error (auth/missing-email)
              </h1>
            )}
            <button className="flex justify-center items-center relative bg-[#3a579d] hover:bg-[#25396B] text-[#fff]  w-full h-[40px]">
              {loginLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="spin__animation text-white" />
                </>
              ) : (
                <>
                  <BsFillPersonFill className="absolute left-2 text-2xl" />
                  <div onClick={guestSignIn} className="text-[16px]">
                    Login as a Guest
                  </div>
                </>
              )}
            </button>
            <h3 className="text-sm loginModal__sub--title my-4">or</h3>
            <div>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border border-[#bac8ce] w-full  text-[#39454] text-sm p-2 rounded-md mb-4 focus:outline-[#2BD97C]"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border border-[#bac8ce] w-full  text-[#39454] text-sm p-2 rounded-md mb-4 focus:outline-[#2BD97C]"
              />
            </div>
            <button onClick={handleLogin} className="btn home__cta--btn ">
              {loginLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="spin__animation" />
                </>
              ) : (
                "Login"
              )}
            </button>

            <div className=" absolute bottom-0 w-full bg-[#f1f6f4] flex justify-center items-center p-2 hover:bg-[#E1E9E8]">
              <button onClick={signUp} className=" text-[#116be9]">
                Don't have an Account?
              </button>
            </div>
            <div
              className="absolute top-5 right-5 text-lg cursor-pointer"
              onClick={() => dispatch(closeLoginModal())}
            >
              <GrClose />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
