"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PairProgramming = () => {
  const [taskID, setTaskID] = useState("");
  const router = useRouter();

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-10 text-gray-800">
          Select experiment type assigned
        </h2>
        <div className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center">
          <Button
            className="w-[200px] h-[150px] sm:w-[250px] sm:h-[200px] md:w-[300px] md:h-[250px] lg:w-[400px] lg:h-[300px] 
                     text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                     font-bold bg-indigo-600 hover:bg-indigo-700 transition-colors"
            onClick={() => router.push("/pair-programming/a")}
          >
            A
          </Button>
          <Button
            className="w-[200px] h-[150px] sm:w-[250px] sm:h-[200px] md:w-[300px] md:h-[250px] lg:w-[400px] lg:h-[300px]
                     text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                     font-bold bg-emerald-600 hover:bg-emerald-700 transition-colors"
            onClick={() => router.push("/pair-programming/b")}
          >
            B
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PairProgramming;
