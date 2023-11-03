import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function LoginModal()
{
    const dispatch = useDispatch()
    const isOpen = useSelector((state) => state.modals.loginModalOpen)

    return (
        <>
        <button 
        onClick={() => dispatch(openLoginModal())}
        className="btn home__cta--btn"
        >
            Login
        <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        >
            <h1 className="text-blue-500" >
                john
            </h1>
        </Modal>
        </button>
        </>

    )
}
