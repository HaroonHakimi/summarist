import { closeLoginModal, closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./LoginModal";

export default function SignupModal() {

const dispatch = useDispatch()
const isOpen = useSelector(state => state.modals.signupModalOpen)

function signUp()
{
    dispatch(closeLoginModal())
    dispatch(openSignupModal())
}

  return (
    <>
      <button 
      onClick={signUp}
      className=" text-[#116be9]">Don't have an Account?
      </button>

      <Modal
      open={isOpen}
      onClose={() => dispatch(closeSignupModal())}
      >
        <div className="relative bg-white w-[400px] h-[400px] pt-[48px] px-[32px] pb-[24px]">
                <div className="flex justify-center flex-col items-center">
                    <h1 className="text-[#032b41] text-xl font-bold mb-6">Log in to Summarist</h1>
                    
                    <div>
                        <input type="email" 
                        placeholder="Email"
                        className="border border-[#bac8ce] w-full  text-[#39454] text-sm p-2 rounded-md mb-4 focus:outline-[#2BD97C]"
                        />
                        <input type="password"
                        placeholder="Password"
                        className="border border-[#bac8ce] w-full  text-[#39454] text-sm p-2 rounded-md mb-4 focus:outline-[#2BD97C]"
                        />
                    </div>
                    <button 
                    className="btn home__cta--btn "
                    >
                        Sign Up
                    </button>
                    <div className=" absolute bottom-0 w-full bg-[#f1f6f4] flex justify-center items-center p-2 hover:bg-[#E1E9E8]">
                    </div>
                    <div 
                    className="absolute top-5 right-5 text-lg cursor-pointer"
                    onClick={() => dispatch(closeSignupModal())}
                    ><GrClose/></div>
                </div>
            </div>
      </Modal>

    </>
  );
}
