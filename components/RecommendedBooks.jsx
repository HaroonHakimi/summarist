import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";

export async function getServerSideProps()
{
  const [recommendedData, setRecommendedData] = useState([])

    async function fetchRecommendedData()
  {
    const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended`)
    setRecommendedData(data)
  }

  useEffect(() => {
    fetchRecommendedData()
  },[])

  return {
    props: {
        recommended : recommendedData
    }
  }
}

export default function RecommendedBooks({ title, subtitle }) {
  return (
    <div className="mt-6  ">
      <div className="mb-4">
        <h1 className="font-bold text-xl mb-2">{title}</h1>
        <h3 className="text-[#394547] text-md">{subtitle}</h3>
      </div>
      <RecommendedBook />
    </div>
  );
}

export function RecommendedBook({ recommended }) {
  return (
    <>
      {recommended?.map((book) => (
        <div className="w-[20%]  px-2 py-10 space-y-1">
          <figure className="max-w-[64px]">
            <img src={book.imageLink} alt="" />
          </figure>
          <h2 className="font-bold text-md leading-5">
            {book.title}
          </h2>
          <h2 className="text-sm text-[#6b757b]">{book.author}</h2>
          <h2 className="text-sm text-[#394547]">
            {book.subTitle}
          </h2>
          <div className="text-[#6b757b] text-sm flex space-x-2 ">
            <div className="flex items-center justify-center">
              <CiClock2 />
              <span>03:24</span>
            </div>
            <div className="flex items-center justify-center">
              <AiOutlineStar />
              <span>{book.averageRating}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
