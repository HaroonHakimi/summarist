import { AiOutlineHome, AiOutlineQuestionCircle, AiOutlineSetting } from "react-icons/ai";
import { BsBookmark,  } from "react-icons/bs";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { RxExit } from "react-icons/rx"
import { LiaMarkerSolid } from 'react-icons/lia'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { signOutUser } from "@/redux/userSlice";
import { auth } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import Link from "next/link";

export default function SideNav({ padding, sidename, sidebarelement }) {
  const router = useRouter()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  

  async function logOut()
  {
    await signOut(auth)
    dispatch(signOutUser())
    dispatch(openLoginModal())

    if (!user)
    {
      dispatch(openLoginModal())
    }
  }

  return (
    <div className={` hidden md:flex   w-[250px] h-full  flex-col justify-between bg-[#f7faf9] fixed transition-all delay-300 ease-in ${padding}`}>
      <div className="flex flex-col justify-center items-start pt-4">
        <div className="px-4 pb-10">
          <img className="w-[160px] h-[40px]" src="/assets/logo.png" />
        </div>
        <div className="w-full">
          <Link href={"/for-you"}>
          <NavList
            icon={<AiOutlineHome />}
            title={"For you"}
            className={sidename}
          />
          </Link>

          <NavList icon={<BsBookmark />} title={"My Library"} />
          <NavList icon={<LiaMarkerSolid />} title={"Highlights"} nodrop={"cursor-no-drop"}/>
          <NavList icon={<HiOutlineMagnifyingGlass />} title={"Search"} nodrop={"cursor-no-drop"} />
          {/* {sidebarelement} */}
        </div>
      </div>
      <div className="text-[#032b41] flex flex-col justify-between">
        <div className="text-[#032b41] mt-12 ">
          <div>
            <Link href={"/settings"}>
            <NavList icon={<AiOutlineSetting />} title={"Settings"} />
            </Link>

            <NavList icon={<AiOutlineQuestionCircle />} title={"Help & Support"} nodrop={"cursor-no-drop"} />

            <div onClick={logOut}>
              {
                user ? (
                  <NavList icon={<RxExit />} title={"Logout"} />
                )
                : (
                  <NavList icon={<RxExit />} title={"Login"}/>
                )
              }
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavList({ title, icon, className, nodrop }) {
  return (
    <div className={`flex items-center py-5 cursor-pointer ${nodrop} hover:bg-[#f0efef] `}>
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
