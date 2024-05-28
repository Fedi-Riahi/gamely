import React from "react";
import Hero from "@/components/hero/Hero";
import FeaturedProducts from "@/components/featuredProducts/FeaturedProducts";
import FeaturedProduct from "@/components/featuredProduct/FeaturedProduct";
import BestDeals from "@/components/bestDeals/BestDeals";
import Newsletter from "@/components/newsLetter/NewsLetter";

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <FeaturedProducts />
      <BestDeals />
      <Newsletter />
      <FeaturedProduct />
    </main>
  );
}
