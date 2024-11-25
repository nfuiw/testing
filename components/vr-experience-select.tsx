"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Slider } from "@/components/ui/slider";
import { TypedMessage } from "./typed-message";

interface VRExperienceSelectProps {
  studentCount: string;
  onSelect: (hasExperience: boolean) => void;
}

export const VRExperienceSelect = ({
  studentCount,
  onSelect,
}: VRExperienceSelectProps) => {
  const [step, setStep] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [hasExperience, setHasExperience] = useState<boolean | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<number>(3);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [confirmationTypingDone, setConfirmationTypingDone] = useState(false);

  const getConfirmationMessage = (count: string) => {
    if (count === "15명 이하") {
      return "15명 이하의 작은 학급에서 근무하시는군요!";
    }
    // Add other conditions if needed
    return `${count}의 학급에서 근무하시는군요`;
  };

  useEffect(() => {
    if (step === 1 && confirmationTypingDone) {
      // Start fading out only after typing is complete and 700ms have passed
      const timer = setTimeout(() => {
        setShowConfirmation(false);
        // Show next message after fade
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

  const handleExperienceSelect = (value: boolean) => {
    setHasExperience(value);
    if (!value) {
      onSelect(false);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setExperienceLevel(value[0]);
    onSelect(true);
  };

  return (
    <div className="space-y-6">
      {step === 1 && (
        <div
          className={`transition-opacity duration-300 ${
            showConfirmation ? "opacity-100" : "opacity-0"
          }`}
        >
          <TypedMessage
            message={getConfirmationMessage(studentCount)}
            onComplete={handleConfirmationComplete}
          />
        </div>
      )}

      {step === 2 && (
        <>
          <TypedMessage
            message="이제 마지막 질문입니다! 수업에서 VR을 활용한 경험이 있으신가요?"
            onComplete={() => setShowOptions(true)}
          />

          {showOptions && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {["예", "아니오"].map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleExperienceSelect(option === "예")}
                    className={`
                      py-8 text-xl font-medium rounded-xl transition-all duration-300 transform hover:scale-105
                      ${
                        hasExperience === (option === "예")
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-white text-gray-800 hover:bg-blue-50"
                      }
                    `}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {hasExperience && (
                <div className="bg-white rounded-xl p-6 space-y-4 transition-all duration-300">
                  <p className="text-lg text-gray-800">
                    수업에서 VR을 잘 활용하고 계신가요?
                  </p>
                  <Slider
                    defaultValue={[3]}
                    max={5}
                    min={1}
                    step={1}
                    value={[experienceLevel]}
                    onValueChange={handleSliderChange}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>아직 잘 사용하지 못해요</span>

                    <span>아주 잘 사용하고 있어요</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
