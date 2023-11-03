import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import Nav from "@/components/Nav";
import Numbers from "@/components/Numbers";
import Reviews from "@/components/Reviews";

export default function HomePage()
{
    return (
        <>
        <Nav/>
        <Landing/>
        <Features/>
        <Reviews/>
        <Numbers/>
        <Footer />
        </>
    )
}