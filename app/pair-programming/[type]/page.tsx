"use client";

import PairProgrammingA from "@/components/PairProgrammingA";
import PairProgrammingB from "@/components/PairProgrammingB";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";

const ProgrammingType = () => {
  const params = useParams();
  const type = params.type as string;

  // Redirect if not 'a' or 'b'
  if (type !== "a" && type !== "b") {
    redirect("/pair-programming");
  }

  // Different content based on type
  if (type === "a") {
    return <PairProgrammingA />;
  }

  // type === "b"
  return <PairProgrammingB />;
};

export default ProgrammingType;
