import SearchBar from "@/components/SearchBar";
import SideNav from "@/components/SideNav";
import SelectedBooks from "@/components/SelectedBooks";



export default function ForYouPage() {
  return (
    <div className="flex ">
      <SideNav />
      <div className="flex flex-col  w-full">
          <SearchBar />
        <SelectedBooks/>
      </div>
    </div>
  );
}

// 