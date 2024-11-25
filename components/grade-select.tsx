"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TypedMessage } from "./typed-message";

interface GradeSelectProps {
  onSelect: (grades: number[]) => void;
}

export const GradeSelect = ({ onSelect }: GradeSelectProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [visibleOptions, setVisibleOptions] = useState<number[]>([]);
  const grades = [1, 2, 3, 4, 5, 6];

  const handleTypingComplete = () => {
    setShowOptions(true);
    grades.forEach((_, index) => {
      setTimeout(() => {
        setVisibleOptions((prev) => [...prev, index]);
      }, index * 150);
    });
  };

  const handleSelect = (grade: number) => {
    const newGrades = selectedGrades.includes(grade)
      ? selectedGrades.filter((g) => g !== grade)
      : [...selectedGrades, grade].sort((a, b) => a - b);

    setSelectedGrades(newGrades);
    // Only call onSelect when we actually update the grades
    onSelect(newGrades);
  };

  return (
    <div className="space-y-10">
      <TypedMessage
        message="선생님의 학년은 몇 학년인가요?"
        subtitle="복수 선택 가능"
        onComplete={handleTypingComplete}
      />

      {showOptions && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 w-full mt-4">
          {grades.map((grade, index) => (
            <div
              key={grade}
              className={`transform transition-all duration-500 ${
                visibleOptions.includes(index)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <Button
                onClick={() => handleSelect(grade)}
                className={`
                  w-full py-8 text-xl font-medium rounded-xl transition-all duration-300 transform hover:scale-105
                  ${
                    selectedGrades.includes(grade)
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-white text-gray-800 hover:bg-blue-50"
                  }
                `}
              >
                {grade}학년
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
