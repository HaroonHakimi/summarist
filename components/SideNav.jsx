import {
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { RxExit } from "react-icons/rx";
import { LiaMarkerSolid } from "react-icons/lia";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { setUser, signOutUser } from "@/redux/userSlice";
import { auth } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SideNav({ padding, sideColor, display, isOpen }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const path = usePathname()
  
  const user = useSelector((state) => state.user);

  async function logOut() {
    await signOut(auth);
    dispatch(signOutUser());
  }

  function logIn() {
    dispatch(openLoginModal());
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
      <div
        className={`${display} ${isOpen ? "flex" && "w-[70%]" : "hidden"}  z-10 md:flex   w-[250px] h-full  flex-col justify-between bg-[#f7faf9] fixed transition-all delay-600 ease-in-out ${padding}`}
      >
        <div className="flex flex-col justify-center items-start pt-4">
          <div className="px-4 pb-10">
            <img className="w-[160px] h-[40px]" src="/assets/logo.png" />
          </div>
          <div className="w-full">
            <Link href={"/for-you"}>
              <NavList
                icon={<AiOutlineHome />}
                title={"For you"}
                className={path === "/for-you" && "bg-green-400"}
              />
            </Link>

            <NavList 
            icon={<BsBookmark />} 
            title={"My Library"} 
            nodrop={"cursor-not-allowed"}
            />
            
            <NavList
              icon={<LiaMarkerSolid />}
              title={"Highlights"}
              nodrop={"cursor-not-allowed"}
            />
            <NavList
              icon={<HiOutlineMagnifyingGlass />}
              title={"Search"}
              nodrop={"cursor-not-allowed"}
            />
            {/* {sidebarelement} */}
          </div>
        </div>
        <div className="text-[#032b41] flex flex-col justify-between">
          <div className="text-[#032b41] mt-12 ">
            <div>
              <Link href={"/settings"}>
                <NavList 
                icon={<AiOutlineSetting />} 
                title={"Settings"}
                className={path === "/settings" && "bg-green-400"}
                 />
              </Link>

              <NavList
                icon={<AiOutlineQuestionCircle />}
                title={"Help & Support"}
                nodrop={"cursor-not-allowed"}
              />

              <div className="cursor-pointer">
                {user ? (
                  <NavList
                    onClick={logOut}
                    icon={<RxExit />}
                    title={"Logout"}
                  />
                ) : (
                  <NavList onClick={logIn} icon={<RxExit />} title={"Login"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function NavList({ title, icon, className, nodrop }) {
  return (
    <div
      className={`flex items-center py-5  ${nodrop}  hover:bg-[#f0efef] `}
    >
      <div className=" relative flex items-center">
        <i className="text-2xl mx-4">{icon}</i>
        <h2>{title}</h2>
        <div
          className={`absolute left-0  content-none w-[5px] h-[56px] ${className}`}
        ></div>
      </div>
    </div>
  );
}
