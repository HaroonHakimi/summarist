export default function BookSkeleton({ w, h, rw, rh }) {
  return (
    <div className="px-2 py-10 space-y-1 flex flex-col items-start justify-start">
      <div className="w-[172px] h-[172px] bg-[#f0efef]"></div>
      <div className=" flex flex-col items-start justify-center space-y-1">
        <h2 className="w-[172px] h-[10px] bg-[#f0efef]"></h2>
        <h2 className="w-[90px] h-[20px] bg-[#f0efef]"></h2>
        <h2 className="w-[172px] h-[10px] bg-[#f0efef]"></h2>
        <div className="w-[170px] h-[20px] bg-[#f0efef]"></div>
      </div>
    </div>
  );
}


