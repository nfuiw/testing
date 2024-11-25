// components/SubjectSelect.tsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TypedMessage } from "./typed-message";

interface SubjectSelectProps {
  grades: number[];
  onSelect: (subjects: string[]) => void;
}

export const SubjectSelect = ({ grades, onSelect }: SubjectSelectProps) => {
  const [step, setStep] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [visibleOptions, setVisibleOptions] = useState<number[]>([]);
  const [confirmationTypingDone, setConfirmationTypingDone] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true);

  const subjects = ["과학", "사회", "수학", "음악", "미술", "체육"];

  const gradeText =
    grades.length > 1 ? `${grades.join(", ")}학년을` : `${grades[0]}학년을`;

  useEffect(() => {
    if (step === 1 && confirmationTypingDone) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
        setTimeout(() => {
          setStep(2);
        }, 300); // Adding 300ms for fade transition
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [step, confirmationTypingDone]);

  const handleConfirmationComplete = () => {
    setConfirmationTypingDone(true);
  };

  const handleTypingComplete = () => {
    setShowOptions(true);
    subjects.forEach((_, index) => {
      setTimeout(() => {
        setVisibleOptions((prev) => [...prev, index]);
      }, index * 150);
    });
  };

  const handleSelect = (subject: string) => {
    const newSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((s) => s !== subject)
      : [...selectedSubjects, subject];

    setSelectedSubjects(newSubjects);
    onSelect(newSubjects);
  };

  return (
    <div className="space-y-10">
      {step === 1 && (
        <div
          className={`transition-opacity duration-300 ${
            showConfirmation ? "opacity-100" : "opacity-0"
          }`}
        >
          <TypedMessage
            message={`에너지가 넘치는 ${gradeText} 맡고 계시는군요!`}
            onComplete={handleConfirmationComplete}
          />
        </div>
      )}

      {step === 2 && (
        <>
          <TypedMessage
            message="특히 XR을 활용하고 싶으신 과목이 있으신가요?"
            subtitle="복수 선택 가능"
            onComplete={handleTypingComplete}
          />

          {showOptions && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 w-full mt-4">
              {subjects.map((subject, index) => (
                <div
                  key={subject}
                  className={`transform transition-all duration-500 ${
                    visibleOptions.includes(index)
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <Button
                    onClick={() => handleSelect(subject)}
                    className={`
                      w-full py-8 text-xl font-medium rounded-xl transition-all duration-300 transform hover:scale-105
                      ${
                        selectedSubjects.includes(subject)
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-white text-gray-800 hover:bg-blue-50"
                      }
                    `}
                  >
                    {subject}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
