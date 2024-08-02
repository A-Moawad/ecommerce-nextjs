import Image from "next/image";
import logo from "../public/logo.svg";
import Hero from "./_components/Hero";
import ProductSection from "./_components/productSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductSection />
    </div>
  );
}
