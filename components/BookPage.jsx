import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import { BiMicrophone } from "react-icons/bi";
import { BsBook, BsBookmark } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi2";

export default function BookPage({ id }) {
  const [data, setData] = useState([]);

  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-8 px-6 md:pl-72 2xl:pl-96 2xl:pr-32">
      <div className="flex-col-reverse md:flex text-[#032b41]">
        <div>
          <div className="flex flex-col justify-start space-y-3 border-b border-[#e1e7ea] pb-4">
            <h1 className="text-[32px] font-bold">
              How to win friends and influecne people in the digital age
            </h1>
            <h2 className="text-[16px] font-bold">Dale Carnegie</h2>
            <h3 className="text-xl">Time tested advice for the digital age</h3>
          </div>

          <div className="w-full border-b border-[#e1e7ea]">
            <div className="flex flex-wrap justify-between w-[400px] py-4  ">
              <InnerBookRating icon={<AiOutlineStar />} text={"4.4 (608 ratings)"} />
              <InnerBookRating icon={<AiOutlineClockCircle />} text={"03:24"} />
              <InnerBookRating icon={<BiMicrophone />} text={"Audio & Text"} />
              <InnerBookRating icon={<HiOutlineLightBulb />} text={"8 Key Ideas"} />
            </div>
          </div>

          <div className="space-y-6 mt-6">
            <div className="flex space-x-4">
              <button className="flex justify-center items-center text-lg space-x-2 px-8 py-2 bg-[#032b41] text-[#fff] rounded-md text-[24px] hover:opacity-80 ">
                <i>
                  <BsBook />
                </i>
                <span>Read</span>
              </button>

              <button className="flex justify-center items-center text-lg space-x-2 px-8 py-2 bg-[#032b41] text-[#fff] rounded-md text-[24px] hover:opacity-80 ">
                <i>
                  <BiMicrophone />
                </i>
                <span>Listen</span>
              </button>
            </div>

            <div className="text-[#0365f2]  text-lg flex items-center space-x-2 cursor-pointer">
              <BsBookmark />
              <h1>Add Title to my Library</h1>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-col space-y-4 mb-5">
              <h1 className="text-lg font-bold">Whats it about?</h1>
              <div className="flex space-x-4">
                <div className="p-3 rounded-md from-neutral-800 bg-[#f1f6f4]">
                  Communication Skills
                </div>
                <div className="p-3 rounded-md bg-[#f1f6f4]">
                  Technology & the Future
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt, consectetur adipisci quae sed et suscipit dicta,
                voluptatem hic officia itaque quasi facilis, consequatur quas
                labore aut distinctio fugiat molestiae porro ratione? Cumque
                iusto tempora eos hic, quis aut, ipsa voluptates voluptatum
                ipsam reiciendis eum molestias natus optio. Explicabo, excepturi
                nemo?
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="text-lg font-bold">Whats it about?</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et
                unde deserunt fuga nesciunt ab magnam iure ipsam officia fugiat
                id reiciendis cum sapiente repudiandae hic repellat, magni quia
                ea, minima praesentium quo quae? Quibusdam, dolore? Quisquam
                delectus quam quas, eum dolorem odio omnis expedita nesciunt
                laudantium architecto. Unde, non ab?
              </p>
            </div>
          </div>
        </div>

        <div className="pl-6 flex justify-center">
          <figure className="w-[300px]">
            <img className="" src="/assets/book.png" />
          </figure>
        </div>
      </div>
    </div>
  );
}

export function InnerBookRating({ icon, text }) {
  return (
    <div className="flex mr-2 mb-3 justify-between w-[150px]">
      <div className="flex justify-start items-start  text-[#032b41] font-semibold  space-x-2">
        <i className="text-[24px]">{icon}</i>
        <span className="text-sm">{text}</span>
      </div>
    </div>
  );
}
