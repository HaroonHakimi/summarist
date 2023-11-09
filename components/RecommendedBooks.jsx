import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";

export default function RecommendedBooks({ title, subtitle }) {
  return (
    <div className="mt-6  ">
      <div className="mb-4">
        <h1 className="font-bold text-xl mb-2">{title}</h1>
        <h3 className="text-[#394547] text-md">{subtitle}</h3>
      </div>
      <div className="flex w-full  flex-wrap ">
        <RecommendedBook />
      </div>
    </div>
  );
}

export function RecommendedBook() {
  const [recommendedData, setRecommendedData] = useState([]);
  const router = useRouter();

  async function fetchRecommendedData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended`
    );
    setRecommendedData(data);
  }

  useEffect(() => {
    fetchRecommendedData();
  }, []);

  return (
    <>
      {recommendedData?.map((book) => (
        <div
          onClick={() => router.push(`/book/${book.id}`)}
          className="relative cursor-pointer w-[25%]  px-2 py-10 space-y-1 hover:bg-[#f0efef] flex flex-col items-start justify-start"
        >
          <figure className=" flex items-center">
            <img src={book.imageLink} alt="" className="w-[172px]" />
          </figure>
          <div className="flex flex-col items-start justify-center space-y-1">
            <h2 className="font-bold text-md leading-5">{book.title}</h2>
            <h2 className="text-sm text-[#6b757b]">{book.author}</h2>
            <h2 className="text-sm text-[#394547]">{book.subTitle}</h2>
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
          {
            book.subscriptionRequired && (
              <div className="text-white text-[8px] rounded-2xl py-1 px-2 bg-[#032b41] absolute top-1 right-1">
            <span>Premium</span>
          </div>
            )
          }
          
        </div>
      ))}
    </>
  );
}