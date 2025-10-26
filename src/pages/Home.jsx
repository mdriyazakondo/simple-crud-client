import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
  return (
    <main className="flex-grow flex flex-col items-center max-w-7xl mx-auto w-full">
      {/* Top Button */}
      <button
        className="mt-16 mb-6 flex items-center space-x-2 border border-indigo-600 text-indigo-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-indigo-50 transition"
        type="button"
      >
        <span>Explore how we help grow brands.</span>
        <span className="flex items-center justify-center size-6 p-1 rounded-full bg-indigo-600 text-white">
          <HiArrowRight className="text-xs" />
        </span>
      </button>

      {/* Heading */}
      <h1 className="text-center text-gray-900 font-bold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
        Preferred choice of leaders in{" "}
        <span className="text-indigo-600">every industry</span>
      </h1>

      {/* Paragraph */}
      <p className="mt-4 text-center text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
        Learn why professionals trust our solution to complete their customer
        journey.
      </p>

      {/* Bottom Button */}
      <button
        className="mt-8 bg-indigo-600 text-white px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-indigo-700 transition"
        type="button"
      >
        <span>Read Success Stories</span>
        <FaArrowRightLong />
      </button>

      {/* Image */}
      <img
        className="rounded-[50px] mt-16 h-72 w-full object-cover rounded-b-none max-w-5xl"
        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1074&auto=format&fit=crop"
        alt="Team work"
      />
    </main>
  );
};

export default Home;
