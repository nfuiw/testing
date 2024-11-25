"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypedMessage } from "./typed-message";
interface StudentCountSelectProps {
  subjects: string[];
  onSelect: (count: string) => void;
}

export const StudentCountSelect = ({
  subjects,
  onSelect,
}: StudentCountSelectProps) => {
  const [step, setStep] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState<number[]>([]);
  const [selectedCount, setSelectedCount] = useState<string>("");
  const [customCount, setCustomCount] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const options = ["15명 이하", "15명 이상", "기타"];

  const getSubjectMessage = (subjects: string[]) => {
    if (subjects.length === 1) {
      return `세상을 탐구하는 ${subjects[0]} 과목에서 XR을 활용하는 데 관심이 있으시군요!`;
    } else {
      const lastSubject = subjects[subjects.length - 1];
      const otherSubjects = subjects.slice(0, -1).join(", ");
      return `${otherSubjects}, ${lastSubject} 과목에서 XR을 활용하는 데 관심이 있으시군요!`;
    }
  };

  const handleFirstMessageComplete = () => {
    setTimeout(() => {
      setStep(2);
    }, 700);
  };

  const handleSecondMessageComplete = () => {
    setShowOptions(true);
    options.forEach((_, index) => {
      setTimeout(() => {
        setVisibleOptions((prev) => [...prev, index]);
      }, index * 150);
    });
  };

  const handleSelect = (option: string) => {
    if (option === "기타") {
      setShowCustomInput(true);
      setSelectedCount(option);
    } else {
      setShowCustomInput(false);
      setSelectedCount(option);
      onSelect(option);
    }
  };

  const handleCustomCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCount(value);
    if (value) {
      onSelect(`${value}명`);
    }
  };

  return (
    <div className="space-y-6">
      {step === 1 && (
        <div className="transform transition-opacity duration-500">
          <TypedMessage
            message={getSubjectMessage(subjects)}
            onComplete={handleFirstMessageComplete}
          />
        </div>
      )}

      {step === 2 && (
        <>
          <TypedMessage
            message="선생님의 학급당 학생 수를 알려주세요."
            onComplete={handleSecondMessageComplete}
          />

          {showOptions && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 w-full">
              {options.map((option, index) => (
                <div
                  key={option}
                  className={`transform transition-all duration-500 ${
                    visibleOptions.includes(index)
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <div className="flex flex-col">
                    <Button
                      onClick={() => handleSelect(option)}
                      className={`
                        w-full py-8 text-xl font-medium rounded-xl transition-all duration-300 transform hover:scale-105
                        ${
                          selectedCount === option
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-white text-gray-800 hover:bg-blue-50"
                        }
                      `}
                    >
                      {option}
                    </Button>
                    {option === "기타" && showCustomInput && (
                      <div className="mt-2 transition-all duration-300 ease-in-out">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            value={customCount}
                            onChange={handleCustomCountChange}
                            placeholder="학생 수 입력"
                            className="text-base py-4 px-4 rounded-lg border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                          <p className="text-sm text-gray-500 whitespace-nowrap">
                            {customCount ? `${customCount}명` : ""}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
