import Link from "next/link";
import React from "react";

const Intro = () => {
  return (
    <div className="bg-black w-full px-40 py-10">
        <Link href="/" className="text-white ">
            Back to home
        </Link>
      <h1 className="text-6xl w-2/3 font-bold text-white mt-10">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Digital Gaming
        </span>
      </h1>
      <p className="text-white mt-4 w-1/2">
        Welcome to Gamely Marketplace! Explore a world of gaming delights with
        our wide range of game keys and accessories. Find your next gaming
        thrill here!
      </p>
    </div>
  );
};

export default Intro;
