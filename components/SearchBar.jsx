import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchBar() {
  return (
    <div className="px-10 py-6 border-b border-[#e1e7ea]">

    <div className="flex justify-end items-center">
      <input
        className="bg-[#F1f6F4] px-4 py-3 w-[320px] text-xs outline-none border border-[#e1e7ea] rounded-md relative"
        placeholder="Search for books"
        type="text"
      />
      <div className=" absolute p-2 border-l border-[#e1e7ea]">
        <HiMagnifyingGlass className="text-xl" />
      </div>
    </div>
    </div>
  );
}
