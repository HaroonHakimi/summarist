import SearchBar from "@/components/SearchBar";
import SideNav from "@/components/SideNav";

export default function Settings()
{
    return (
        <>
        <SideNav/>
        <SearchBar/>
        <div className="py-8 md:pl-72 lg:pl-72  px-6 2xl:pl-96 2xl:pr-32">
            <div>
                <h1>Settings</h1>
            </div>
        </div>
        </>
    )
}