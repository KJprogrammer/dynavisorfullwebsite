import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Technology from "@/components/Technology";
import Partnership from "@/components/Partnership";
import UseCases from "@/components/UseCases";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Technology />
        <Partnership />
        <UseCases />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
