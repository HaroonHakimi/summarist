export default function InnerBookSkeleton() {
  return (
    <>
      <div className="lg:flex-row flex-col-reverse flex">
        <div>
          <div className="flex flex-col justify-start space-y-3  pb-4">
            <div className="flex space-x-3">
              <h1 className="w-[570px] h-[60px] bg-[#f0efef]"></h1>
            </div>
            <h2 className="w-[30%] h-10 bg-[#f0efef]"></h2>
            <h3 className="w-[40%] h-10 bg-[#f0efef]"></h3>
          </div>

          <div className="w-[50%] h-[50px] "></div>

          <div className="space-y-6 mt-6">
            <div className="w-[50%] h-[40px] bg-[#f0efef]"></div>

            <div className=" bg-[#f0efef] w-[40%] h-[40px] "></div>
          </div>

          <div className="w-full h-[50%] bg-[#f0efef] my-5"></div>

          <div className="w-full h-[50%] bg-[#f0efef] my-5"></div>
        </div>

        <div className="pl-6 w-[300px] h-[300px] bg-[#f0efef] mb-4 ml-4">
          <figure className="w-[300px]">
            <div className=""></div>
          </figure>
        </div>
      </div>
    </>
  );
}
