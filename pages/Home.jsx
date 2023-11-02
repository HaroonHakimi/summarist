import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import Nav from "@/components/Nav";
import Numbers from "@/components/Numbers";
import Reviews from "@/components/Reviews";

export default function Home()
{
    return (
        <>
        <Nav/>
        <Landing/>
        <Features/>
        <Numbers/>
        <Reviews/>
        <Footer />
        </>
    )
}