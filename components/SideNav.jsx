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

export default function SideNav() {
  const router = useRouter()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  

  async function logout()
  {
    await signOut(auth)
    dispatch(signOutUser())
    dispatch(openLoginModal())
  }

  return (
    <div className="hidden md:flex  w-[250px] h-full  flex-col justify-between bg-[#f7faf9] fixed transition-all delay-300 ">
      <div className="flex flex-col justify-center items-start pt-4">
        <div className="px-4 pb-10">
          <img className="w-[160px] h-[40px]" src="/assets/logo.png" />
        </div>
        <div className="w-full">
          <NavList
            icon={<AiOutlineHome />}
            title={"For you"}
            className={" bg-green-400"}
          />

          <NavList icon={<BsBookmark />} title={"My Library"} />
          <NavList icon={<LiaMarkerSolid />} title={"Highlights"} nodrop={"cursor-not-allowed"}/>
          <NavList icon={<HiOutlineMagnifyingGlass />} title={"Search"} nodrop={"cursor-not-allowed"} />
        </div>
      </div>
      <div className="text-[#032b41] flex flex-col justify-between">
        <div className="text-[#032b41] mt-12 ">
          <div>
            <NavList icon={<AiOutlineSetting />} title={"Settings"} />
            <NavList icon={<AiOutlineQuestionCircle />} title={"Help & Support"} nodrop={"cursor-not-allowed"} />

            <div onClick={logout}>
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
