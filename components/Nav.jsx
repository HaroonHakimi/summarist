import { openLoginModal } from "@/redux/modalSlice";
import { useDispatch } from "react-redux";
import LoginModal from "./modals/LoginModal";

export default function Nav() {
  const dispatch = useDispatch()

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <img className="nav__img" src="/assets/logo.png" alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li
          onClick={() => dispatch(openLoginModal())}
           className="nav__list nav__list--login"
           >Login</li>
           <LoginModal/>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}
