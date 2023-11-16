import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Accordion({ title, description }) {
  const [chosenPoint, setChosenPoint] = useState(false);

  return (
    <div className="flex flex-col items-start border-b border-[#39454] w-full">
      <div
        onClick={() => setChosenPoint(!chosenPoint)}
        className="flex justify-between items-center py-4 text-[#032b41]  cursor-pointer w-full transition-all 300ms ease"
      >
        <h1 className="text-[20px] md:text-2xl font-semibold">{title}</h1>
        <div>
        {chosenPoint ? (
          <IoIosArrowDown />
        ) : (
          <IoIosArrowDown className="rotate-180" />
        )}
        </div>
      </div>
      <div className="text-sm text-[#394547] pb-6">
        {chosenPoint && <p className="md:text-[16px] text-[#394547]">{description}</p>}
      </div>
    </div>
  );
}
