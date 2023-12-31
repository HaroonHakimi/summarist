import { Modal } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import SideNav from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBarModal, openSideBarModal } from "@/redux/modalSlice";

export default function SearchBar() {
  const [searchData, setSearchData] = useState([]);
  const [booksWrapper, setBooksWrapper] = useState(false);
  const [searching, setSearching] = useState(false);
  const [closeMark, setCloseMark] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.openSideBar);

  async function userSearch(e) {
    setError(false);
    setSearch(e.target.value);

    if (search.length > 0) {
      setSearching(true);
      setCloseMark(true);
      setBooksWrapper(true);

      setTimeout(async () => {
        try {
          const { data } = await axios.get(
            `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
          );
          setSearchData(data);
        } catch (error) {
          setError(true);
        } finally {
          setSearching(false);
        }
      }, 500);
    } else {
      setBooksWrapper(false);
      setCloseMark(false);
      setSearchData([]);
    }
  }

  function closeSearch() {
    setSearch("");
    setSearchData([]);
    setBooksWrapper(false);
    setCloseMark(false);
  }

  

  return (
    <div className="px-4">
      <div className="px-10 py-6 border-b border-[#e1e7ea] flex justify-end relative">
        <div className="flex justify-between w-[340px] items-center">
          <div className="flex justify-end items-center">
            <input
              className="bg-[#F1f6F4] px-4 py-3 w-[290px] text-xs outline-none border border-[#e1e7ea] rounded-md relative"
              placeholder="Search for books"
              type="text"
              onChange={(e) => userSearch(e)}
              value={search}
            />
            <div className=" absolute p-2 border-l border-[#e1e7ea]">
              {closeMark ? (
                <IoIosClose
                  onClick={closeSearch}
                  className="text-3xl cursor-pointer"
                />
              ) : (
                <HiMagnifyingGlass className="text-xl" />
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden ml-2 flex items-center">
          <FaBars
            onClick={() => dispatch(openSideBarModal())}
            className="text-2xl cursor-pointer"
          />
          <Modal open={isOpen} onClose={() => dispatch(closeSideBarModal())}>
            <div className="absolute left-0">
              {isOpen && <SideNav display={"flex"} isOpen={isOpen}/>}
            </div>
          </Modal>
        </div>
      </div>

      {booksWrapper && search.length > 0 && (
        <div
          className={`w-full md:w-[440px] max-h-[640px] ${
            searchData.length > 1 ? "overflow-y-scroll" : "overflow-y-hidden"
          }  shadow-lg p-4 md:absolute md:top-[13%] md:right-6 bg-[#fff] z-10 `}
        >
          {searching ? (
            new Array(5)
              .fill(0)
              .map((_, index) => (
                <div className="bg-[#e1e7ea] w-full h-[120px] mb-[8px]"></div>
              ))
          ) : searchData.length === 0 ? (
            <div>No Books Found</div>
          ) : (
            searchData.map((book) => (
              <Link
                key={book.id}
                href={"/book/" + book.id}
                className="p-4 border-b last:border-none border-[#e1e7ea] flex items-center"
              >
                <figure className="flex items-center">
                  <img src={book.imageLink} className="w-[80px]" alt="" />
                </figure>

                <div className="md:max-w-[270px] pl-4">
                  <h1 className="text-[16px] font-bold text-[#032b41]">
                    {book.title}
                  </h1>
                  <span className="text-sm text-[#6B757B]">{book.author}</span>
                  <div className="flex items-center text-sm space-x-2 text-[#6B757B]">
                    <i>
                      <CiClock2 />
                    </i>
                    <span>03:24</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
