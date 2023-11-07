import { closeLoginModal, openLoginModal, openSignupModal } from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import SignupModal from "./SignupModal";

export default function LoginModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.loginModalOpen);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleLogin() {}

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div className="relative bg-white w-[400px] h-[400px] pt-[48px] px-[32px] pb-[24px]">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-[#032b41] text-xl font-bold mb-6">
              Log in to Summarist
            </h1>
            <button className="flex justify-center items-center relative bg-[#3a579d] hover:bg-[#25396B] text-[#fff]  w-full h-[40px]">
              <BsFillPersonFill className="absolute left-2 text-2xl" />
              <div className="text-[16px]">Login as a Guest</div>
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
              Login
            </button>
            <div className=" absolute bottom-0 w-full bg-[#f1f6f4] flex justify-center items-center p-2 hover:bg-[#E1E9E8]">
              <button 
              onClick={() => dispatch(openSignupModal())} 
              className=" text-[#116be9]">
                Don't have an Account?
              </button>
              <SignupModal />
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
