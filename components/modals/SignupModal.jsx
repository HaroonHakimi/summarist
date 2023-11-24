import {
  closeLoginModal,
  closeSignupModal,
  openLoginModal,
  openSignupModal,
} from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { setUser } from "@/redux/userSlice";
import LoginModal from "./LoginModal";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function SignupModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const router = useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState(false);

  function login() {
    dispatch(closeSignupModal());
    dispatch(openLoginModal());
  }

  function pushToForYouPage() {
    router.push("/for-you");
  }

  function closeModal() {
    dispatch(closeSignupModal());
    setSignUpError(false);
  }

  async function createUser(e) {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          uid: user.uid,
        });
      }

      dispatch(closeSignupModal());
      setSignUpError(false);
      pushToForYouPage();
    } catch (error) {
      setSignUpError(true);
      console.error('Firebase Auth Error:', error.code, error.message);
      console.log(email, password);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      //handle redux actions
      dispatch(
        setUser({
          email: currentUser.email,
          password: currentUser.password,
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
        <div className="relative bg-white w-[400px] h-[350px] pt-[48px] px-[32px] pb-[24px] rounded-md overflow-hidden">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-[#032b41] text-xl font-bold mb-6">
              Sign up to Summarist
            </h1>
            {signUpError && (
              <h1 className=" text-red-500 text-sm  mb-3">
                FirebaseError: Firebase: Error (auth/missing-email)
              </h1>
            )}
            <form className="flex flex-col items-center">
              <div>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="border border-[#bac8ce] w-full  text-[#394547] text-sm p-2 rounded-md mb-4 focus:outline-[#2BD97C]"
                />
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="border border-[#bac8ce] w-full  text-[#394547] text-sm p-2 rounded-md mb-4 focus:outline-[#2BD97C]"
                />
              </div>
              <button className="btn home__cta--btn " onClick={createUser}>
                Sign Up
              </button>
            </form>
            <div className=" absolute bottom-0 w-full bg-[#f1f6f4] flex justify-center items-center p-2 hover:bg-[#E1E9E8]">
              <button onClick={login} className=" text-[#116be9]">
                Already have an account?
              </button>
            </div>
            <div
              className="absolute top-5 right-5 text-lg cursor-pointer"
              onClick={() => dispatch(closeSignupModal())}
            >
              <GrClose />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
