import SearchBar from "@/components/SearchBar";
import SideNav from "@/components/SideNav";
import AudioPlayer from "@/components/audio/AudioPlayer";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaFont } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Player() {
  const [books, setBooks] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("normal");

  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBooks(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative">
      <SideNav padding={"pb-[100px]"} />

      <SearchBar />

      <div className=" hidden md:flex pl-2 fixed top-[39%] z-20">
        <div className={`flex items-center py-5 `}>
          <div className=" flex items-center">
            <i
              onClick={() => setSize("small")}
              className="text-md mx-4 cursor-pointer"
            >
              <FaFont />
            </i>
            <i
              onClick={() => setSize("medium")}
              className="text-lg mx-4 cursor-pointer"
            >
              <FaFont />
            </i>
            <i
              onClick={() => setSize("large")}
              className="text-xl mx-4 cursor-pointer"
            >
              <FaFont />
            </i>
            <i
              onClick={() => setSize("extraLarge")}
              className="text-2xl mx-4 cursor-pointer"
            >
              <FaFont />
            </i>
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="w-20 h-20 spin__animation" />
          </div>
        ) : (
          <div className="py-8 px-6 md:pl-72 2xl:pl-96 2xl:pr-32 flex lg:justify-center pb-[200px] md:pb-[120px] text-[#032b41]">
            <div className="flex flex-col items-start w-full lg:max-w-[750px]">
              <div className="border-b pb-5 flex w-full">
                <h1 className="text-2xl font-bold">{books.title}</h1>
              </div>

              <div
                className={`whitespace-pre-line pt-8 ${
                  size === "small" && "text-md"
                } ${size === "medium" && "text-lg"} ${
                  size === "large" && "text-xl"
                } ${size === "extraLarge" && "text-2xl"}`}
              >
                <p>{books.summary}</p>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-0   bg-[#142330] w-full h-[180px] md:h-[100px] z-10">
          <div className=" flex flex-col md:flex-row py-4 px-10 items-center md:justify-between text-white">
            <AudioPlayer data={books} />
          </div>
        </div>
      </div>
    </div>
  );
}

// top-[39%]
