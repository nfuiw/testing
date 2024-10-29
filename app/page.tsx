"use client";
import React from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="text-center space-y-8 px-6 max-w-xl mx-auto">
        <h1 className="text-4xl font-light text-gray-900">Experiments</h1>

        <button
          onClick={() => router.push("/menu")}
          className="group px-8 py-3 text-lg text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center mx-auto space-x-2"
        >
          <span>Start</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
