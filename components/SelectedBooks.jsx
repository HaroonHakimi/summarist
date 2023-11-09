import { AiFillPlayCircle } from "react-icons/ai";
import RecommendedBooks from "./RecommendedBooks";
import SuggestedBooks from "./SuggestedBooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function SelectedBooks()
{
  const [selectedData, setSelectedData] = useState([])
  const router = useRouter()

  async function fetchSelectedData()
  {
    const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected`)
    setSelectedData(data)
  }
  
  useEffect(() => {
    fetchSelectedData()
  },[])

    return (
        <div className="py-8 md:pl-72 lg:pl-72  px-6 2xl:px-96 ">
          {
                selectedData?.map((book) => (
          <div 
            onClick={() => router.push(`/book/${book.id}`)}
          >
            <div className="mb-4">
              <h1 className="font-bold text-2xl">Selected just for you</h1>
            </div>
            


            <div className=" w-full lg:w-[90%] bg-[#fbefd6] rounded-md p-5 flex  space-y-6 cursor-pointer">
              <div className="w-[300px] mr-2 flex items-center">
                <h2 className="text-[16px] md:text-md w-full ">
                  {book.subTitle}
                </h2>
              </div>
              <div className="hidden md:flex content-none w-[1px] h-[140px] bg-[#bac8ce] mr-2"></div>

              <div className="flex w-full justify-center">
                <figure className="max-w-[140px] flex  justify-center items-start">
                  <img src={book.imageLink} alt="" />
                </figure>
                <div className="ml-6">
                  <h1 className="font-bold mb-1">{book.title}</h1>
                  <h4 className="text-sm mb-2">{book.author}</h4>
                  <div className="flex justify-center items-center ">
                    <AiFillPlayCircle className="text-[40px]" />
                    <h3 className="text-sm font-semibold pl-2">
                      3 Mins 23 secs
                    </h3>
                  </div>
                </div>
              </div>

            </div>

              
          </div>
          ))
        }

            <RecommendedBooks title={"Recommended For You"} subtitle={"We think you'll like these"} />
            <SuggestedBooks title={"Suggested Books"} subtitle={"Browse those books"}/>
        </div>
    )
}