import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Accordion({ title, description }) {
  const [chosenPoint, setChosenPoint] = useState(false);

  return (
      <div className="flex flex-col">
        <button
          onClick={() => setChosenPoint(!chosenPoint)}
          className="flex justify-between py-6 border border-[#bac8ce] text-[#032b41] transition-all duration-300 cursor-pointer"
        >
          <h1 className="text-[20px] font-bold">{title}</h1>
          {
            chosenPoint ? (<IoIosArrowDown/>) : (<IoIosArrowDown className="rotate-180"/>)
          }
          <div className="text-sm text-[#394547]">
            {chosenPoint && (<p>{description}</p>)}
          </div>
        </button>
      </div>
  );
}
