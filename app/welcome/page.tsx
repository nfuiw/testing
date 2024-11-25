// app/welcome/page.tsx
"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { TypedMessage } from "@/components/typed-message";
import { GradeSelect } from "@/components/grade-select";
import { SubjectSelect } from "@/components/subject-select";
import { StudentCountSelect } from "@/components/student-count-select";
import { ProgressIndicator } from "@/components/progress-indicator";
import { VRExperienceSelect } from "@/components/vr-experience-select";

export default function Welcome() {
  const [step, setStep] = useState(1);
  const [showNext, setShowNext] = useState(false);
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedStudentCount, setSelectedStudentCount] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState(false);

  const router = useRouter();
  const getProgressStep = () => {
    if (step === 1) return 0; // Welcome message
    return step - 1; // Adjust step for progress display
  };
  const welcomeMessage =
    "안녕하세요! XR 돌고래에 처음 방문하신 것을 환영합니다!";

  const handleComplete = () => {
    setShowNext(true);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
      setShowNext(false);
    } else if (step === 2 && selectedGrades.length > 0) {
      setStep(3);
      setShowNext(false);
    } else if (step === 3 && selectedSubjects.length > 0) {
      setStep(4);
      setShowNext(false);
    } else if (step === 4 && selectedStudentCount) {
      setStep(5);
      setShowNext(false);
    } else if (step === 5 && selectedStudentCount) {
      router.push("/main");
    }
  };

  const handleGradeSelect = (grades: number[]) => {
    setSelectedGrades(grades);
    setShowNext(grades.length > 0);
  };

  const handleSubjectSelect = (subjects: string[]) => {
    setSelectedSubjects(subjects);
    setShowNext(subjects.length > 0);
  };

  const handleStudentCountSelect = (count: string) => {
    setSelectedStudentCount(count);
    setShowNext(true);
  };

  const handleExperienceSelect = (hasExperience: boolean) => {
    setSelectedExperience(true);
    setShowNext(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative p-8">
      <div className="absolute top-8 left-8">
        <svg viewBox="0 0 100 100" className="w-12 h-12 text-blue-500">
          <path
            fill="currentColor"
            d="M50 5C25.147 5 5 25.147 5 50s20.147 45 45 45 45-20.147 45-45S74.853 5 50 5zm0 80c-19.33 0-35-15.67-35-35s15.67-35 35-35 35 15.67 35 35-15.67 35-35 35z"
          />
          <path
            fill="currentColor"
            d="M65 35c-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zm-5 15c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"
          />
        </svg>
      </div>
      {step > 1 && (
        <ProgressIndicator
          currentStep={getProgressStep()}
          totalSteps={4} // Grade, Subject, StudentCount
        />
      )}

      <div className="w-full max-w-5xl mx-auto relative">
        <div className="space-y-6">
          {step === 1 && (
            <TypedMessage
              message={welcomeMessage}
              onComplete={handleComplete}
            />
          )}
          {step === 2 && <GradeSelect onSelect={handleGradeSelect} />}
          {step === 3 && (
            <SubjectSelect
              grades={selectedGrades}
              onSelect={handleSubjectSelect}
            />
          )}
          {step === 4 && (
            <StudentCountSelect
              subjects={selectedSubjects}
              onSelect={handleStudentCountSelect}
            />
          )}
          {step === 5 && (
            <VRExperienceSelect
              studentCount={selectedStudentCount}
              onSelect={handleExperienceSelect}
            />
          )}
        </div>

        {/* Next button with absolute positioning */}
        {showNext && (
          <div className="absolute -bottom-20 right-2">
            <Button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
