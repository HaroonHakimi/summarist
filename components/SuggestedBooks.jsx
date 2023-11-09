import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";

export async function getServerSideProps() {
  const [suggestedData, setSuggestedData] = useState([])
    
  async function fetchSuggestedData()
  {
    const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested`)
    setSuggestedData(data)
  }

  useEffect(() =>{
    fetchSuggestedData()
  },[])

  return {
    props: {
        suggested : suggestedData
    }
  }
}

export default function SuggestedBooks({ title, subtitle}) {
  return (
    <div className="mt-6  ">
      <div className="mb-4">
        <h1 className="font-bold text-xl mb-2">{title}</h1>
        <h3 className="text-[#394547] text-md">{subtitle}</h3>
      </div>
      <SuggestedBook/>
    </div>
  );
}

export function SuggestedBook({ info })
{
    return (
        <div className="w-[20%]  px-2 py-10 space-y-1">
        <figure className="max-w-[64px]">
          <img src="/assets/google.png" alt="" />
        </figure>
        <h2 className="font-bold text-md leading-5">
          How to win freinds and influence people in the digital age
        </h2>
        <h2 className="text-sm text-[#6b757b]">Dale Carnegie</h2>
        <h2 className="text-sm text-[#394547]">
          Time tested advice for the digital age
        </h2>
        <div className="text-[#6b757b] text-sm flex space-x-2 ">
          <div className="flex items-center justify-center">
            <CiClock2 />
            <span>03:24</span>
          </div>
          <div className="flex items-center justify-center">
            <AiOutlineStar />
            <span>4.4</span>
          </div>
        </div>
      </div>
    )
}
