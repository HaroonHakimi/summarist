import SearchBar from "@/components/SearchBar";
import  SideNav  from "@/components/SideNav";

export default function ForYouPage()
{
    return (
        <div className="flex">
        <SideNav/>
        <div className="flex flex-col w-full">
            <div className="px-10 py-6 border-b border-[#e1e7ea]">
                <SearchBar/>
            </div>
            <div className="py-10 px-6">
                <div>
                    <h1 className="font-bold text-xl">Selected just for you</h1>
                </div>
                <div className="w-full bg-[#fbefd6]">
                    <h2>How Cons</h2>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        </div>
    )
}