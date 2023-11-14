import SearchBar from "@/components/SearchBar";
import SideNav from "@/components/SideNav";
import AudioPlayer from "@/components/audio/AudioPlayer";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaFont } from "react-icons/fa";

// export async function getServerSideProps()
// {
//     const { id }  = router.query
//     const router = useRouter()

//     return {
//         props: {
//             id: id
//         }
//     }
// }
export default function Player() {
  const [books, setBooks] = useState("");
  const router = useRouter();
  const { id } = router.query;

  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBooks(data);
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="relative">
      <SideNav padding={"pb-[100px]"} sidebarelement={<SideBarElement/>} />

      <SearchBar />
      <div className="py-8 px-6 md:pl-72 2xl:pl-96 2xl:pr-32 flex lg:justify-center pb-[120px]">
        <div className="flex flex-col items-start w-full lg:max-w-[750px]">
          <div className="border-b pb-5 flex ">
            <h1 className="text-2xl font-bold">{books.title}</h1>
          </div>

          <div className="whitespace-pre-line pt-8 ">
            <p>{books.summary}</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0  bg-[#142330] w-full h-[100px] z-10">
        <div className="flex py-4 px-10 justify-between text-white">
          <div className="flex">
              <div className="flex flex-col text-sm">
                  <h1>{books.title}</h1>
                  <span className="text-[#BAC8CE]">{books.author}</span>
              </div>
          </div>

          <AudioPlayer data={books}/>
        </div>
      </div>
    </div>
  );
}


export function SideBarElement()
{
  return (
    <div className={`flex items-center py-5 `}>
      <div className=" relative flex items-center">
        <i className="text-md mx-4 cursor-pointer"><FaFont /></i>
        <i className="text-lg mx-4 cursor-pointer"><FaFont /></i>
        <i className="text-xl mx-4 cursor-pointer"><FaFont /></i>
        <i className="text-2xl mx-4 cursor-pointer"><FaFont /></i>
        
      </div>
    </div>
  )
}