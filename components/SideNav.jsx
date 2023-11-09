import { AiOutlineHome, AiOutlineQuestionCircle, AiOutlineSetting } from "react-icons/ai";
import { BsBookmark,  } from "react-icons/bs";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { RxExit } from "react-icons/rx"
import { LiaMarkerSolid } from 'react-icons/lia'

export default function SideNav() {
  return (
    <div className="hidden md:flex  w-[250px] h-full  flex-col justify-between bg-[#f7faf9] fixed ">
      <div className="flex flex-col justify-center items-start pt-4">
        <div className="px-4">
          <img className="w-[160px] h-[40px]" src="/assets/logo.png" />
        </div>
        <div>
          <NavList
            icon={<AiOutlineHome />}
            title={"For you"}
            className={" bg-green-400"}
          />

          <NavList icon={<BsBookmark />} title={"My Library"} />
          <NavList icon={<LiaMarkerSolid />} title={"Highlights"} />
          <NavList icon={<HiOutlineMagnifyingGlass />} title={"Search"} />
        </div>
      </div>
      <div className="text-[#032b41] flex flex-col justify-between">
        <div className="text-[#032b41] mt-12 ">
          <div>
            <NavList icon={<AiOutlineSetting />} title={"Settings"} />
            <NavList icon={<AiOutlineQuestionCircle />} title={"Help & Support"} />
            <NavList icon={<RxExit />} title={"Logout"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavList({ title, icon, className }) {
  return (
    <div className="flex items-center my-10">
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
