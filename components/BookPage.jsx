import { openLoginModal } from "@/redux/modalSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import { BiMicrophone } from "react-icons/bi";
import { BsBook, BsBookmark } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./modals/LoginModal";
import { FaBookmark } from "react-icons/fa";

export default function BookPage() {
  const [bookData, setBookData] = useState([]);
  const [addBook, setAddBook] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function buttonDestination() {
    if (!user.currentUser) {
      return dispatch(openLoginModal());
    }

    if (bookData.subscriptionRequired && !user.subscribed) {
      router.push("/choose-plan");
    } else if (!bookData.subscriptionRequired || user.subscribed) {
      router.push(`/player/${id}`);
    }
  }

  function addBookToLibrary() {
    if (user.currentUser) {
      setAddBook(true);
    }
  }

  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBookData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-8 px-6 md:pl-72 2xl:pl-96 2xl:pr-32">
      {
        <div className="lg:flex-row flex-col-reverse flex text-[#032b41]">
          <div>
            <div className="flex flex-col justify-start space-y-3 border-b border-[#e1e7ea] pb-4">
              <div className="flex space-x-3">
                <h1 className="text-[24px] md:text-[32px] font-bold">
                  {bookData.title}
                </h1>
                {bookData.subscriptionRequired && (
                  <h1 className="text-[24px] md:text-[32px] font-bold">
                    (Premium)
                  </h1>
                )}
              </div>
              <h2 className="text-[14px] md:text-[16px] font-bold">
                {bookData.author}
              </h2>
              <h3 className="text-lg md:text-xl font-thin">
                {bookData.subTitle}
              </h3>
            </div>

            <div className="w-full border-b border-[#e1e7ea]">
              <div className="flex flex-wrap justify-between w-[400px] py-4  ">
                <InnerBookRating
                  icon={<AiOutlineStar />}
                  text={`${bookData.averageRating} (${bookData.totalRating} ratings)`}
                />
                <InnerBookRating
                  icon={<AiOutlineClockCircle />}
                  text={"03:24"}
                />
                <InnerBookRating icon={<BiMicrophone />} text={bookData.type} />
                <InnerBookRating
                  icon={<HiOutlineLightBulb />}
                  text={`${bookData.keyIdeas} Key Ideas`}
                />
              </div>
            </div>

            <div className="space-y-6 mt-6">
              <div className="flex space-x-4">
                <button 
                onClick={buttonDestination}
                className="flex justify-center items-center text-lg space-x-2 px-8 py-2 bg-[#032b41] text-[#fff] rounded-md  hover:opacity-80 ">
                  <i>
                    <BsBook />
                  </i>
                  <span className="text-[18px] md-text-[16px]">Read</span>
                </button>
                <button 
                onClick={buttonDestination}
                className="flex justify-center items-center text-lg space-x-2 px-8 py-2 bg-[#032b41] text-[#fff] rounded-md text-[24px] hover:opacity-80 ">
                  <i>
                    <BiMicrophone />
                  </i>
                  <span className="text-[18px] md-text-[16px]">Listen</span>
                </button>
              </div>

              {user.currentUser ? (
                <div
                  onClick={addBookToLibrary}
                  className="text-[#0365f2]  text-lg flex items-center space-x-2 hover:text-[black] cursor-pointer"
                >
                  {addBook ? (
                    <>
                      <FaBookmark />
                      <h1>Saved to my Library</h1>
                    </>
                  ) : (
                    <>
                      <BsBookmark />
                      <h1>Add Title to my Library</h1>
                    </>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => dispatch(openLoginModal())}
                  className="text-[#0365f2]  text-lg flex items-center space-x-2 hover:text-[black] cursor-pointer"
                >
                  <BsBookmark />
                  <h1>Add Title to my Library</h1>
                </div>
              )}
            </div>

            <div className="mt-8">
              <div className="flex flex-col space-y-4 mb-5">
                <h1 className="text-lg font-bold">Whats it about?</h1>
                <div className="flex space-x-4">
                  {bookData.tags && bookData.tags[0] && (
                    <div className="p-3 rounded-md bg-[#f1f6f4] cursor-no-drop">
                      {bookData.tags[0]}
                    </div>
                  )}
                  {bookData.tags && bookData.tags[1] && (
                    <div className="p-3 rounded-md bg-[#f1f6f4] cursor-no-drop">
                      {bookData.tags[1]}
                    </div>
                  )}
                </div>
                <p className="text-[16px] md:text-[18px]">
                  {bookData.bookDescription}
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <h1 className="text-lg font-bold">About the author</h1>
                <p className="text-[16px] md:text-[18px]">
                  {bookData.authorDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="pl-6 flex justify-center">
            <figure className="w-[300px]">
              <img className="" src={bookData.imageLink} />
            </figure>
          </div>
        </div>
      }
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
