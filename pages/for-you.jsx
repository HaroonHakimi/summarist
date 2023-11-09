import SearchBar from "@/components/SearchBar";
import SideNav from "@/components/SideNav";
import SelectedBooks from "@/components/SelectedBooks";



export default function ForYouPage() {
  return (
    <div className="flex ">
      <SideNav />
      <div className="flex flex-col  w-full">
        <div className="px-10 py-6 border-b border-[#e1e7ea]">
          <SearchBar />
        </div>
        <SelectedBooks/>
      </div>
    </div>
  );
}

// 