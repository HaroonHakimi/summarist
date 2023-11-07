import { openLoginModal } from "@/redux/modalSlice";
import { useDispatch } from "react-redux";
import LoginModal from "./modals/LoginModal";

export default function Nav() {
  const dispatch = useDispatch()

  return (
    <nav class="nav">
      <div class="nav__wrapper">
        <figure class="nav__img--mask">
          <img class="nav__img" src="/assets/logo.png" alt="logo" />
        </figure>
        <ul class="nav__list--wrapper">
          <li
          onClick={() => dispatch(openLoginModal())}
           class="nav__list nav__list--login"
           >Login</li>
           <LoginModal/>
          <li class="nav__list nav__list--mobile">About</li>
          <li class="nav__list nav__list--mobile">Contact</li>
          <li class="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}
