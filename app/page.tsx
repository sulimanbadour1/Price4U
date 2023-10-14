import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import React from "react";
// Background Image
//bg-[url('/assets/sul-src/two.png')] bg-no-repeat bg-full bg-center
const page = () => {
  return (
    <>
      <section className="px-6 md:px-20 pt-12 py-4 rounded-xl ">
        <div className="flex max-xl:flex-col gap-36">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Your Budget's Best Friend
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text text-5xl font-bold">
              Shop Smarter, Save Bigger with
              <span className="text-primary "> Price4U.</span>
            </h1>
            <p className="mt-6 font-semibold ">
              Real-time price tracking across online stores.
              <br />
              Shop smart and save with every deal.
            </p>
            <SearchBar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Apple Iphone", "Book", "iPad"].map((product) => (
            <div>{product}</div>
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
