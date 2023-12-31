import { AiFillPlayCircle } from "react-icons/ai";
import RecommendedBooks from "./RecommendedBooks";
import SuggestedBooks from "./SuggestedBooks";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import SelectedBookSkeleton from "./skeleton/SelectedBookSkeleton";

export default function SelectedBooks() {
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true)

  async function fetchSelectedData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected`
    );
    setSelectedData(data);
    setLoading(false);
  }

  const imageFetched = () => {
    setImageLoading(false)
  }

  useEffect(() => {
    fetchSelectedData();
  }, []);

  return (
    <div className="py-8 md:pl-72 lg:pl-72  px-6 2xl:pl-96 2xl:pr-32">
      <div>
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Selected just for you</h1>
        </div>

        {loading ? (
          <SelectedBookSkeleton/>
        ) : (
          selectedData?.map((book) => (
            <Link key={book.id} href={"/book/" + book.id}>
              <div className="md:flex-row flex-col flex items-start md:justify-start w-full lg:w-[70%] bg-[#fbefd6] rounded-md p-5 space-y-6 cursor-pointer">
                <div className="md:w-[300px] w-full md:pr-10 flex items-center ">
                  <h2 className="md:text-[16px] text-sm md:text-md w-full flex  ">
                    {book.subTitle}
                  </h2>
                </div>
                <span className="hidden md:flex w-[1px] h-[140px] mr-2 bg-[#bac8ce] "></span>

                <div className="flex w-full md:justify-center">
                  <figure className={`max-w-[140px] flex  justify-center items-start `}>
                    <img 
                    onLoad={imageFetched}
                    className={`${imageLoading && "w-100px h-110px bg-[#f0efef]"}`} 
                    src={book.imageLink} alt="" />
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
            </Link>
          ))
        )}
      </div>

      <RecommendedBooks
        title={"Recommended For You"}
        subtitle={"We think you'll like these"}
      />
      <SuggestedBooks
        title={"Suggested Books"}
        subtitle={"Browse those books"}
      />
    </div>
  );
}
