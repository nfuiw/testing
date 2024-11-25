interface ProgressIndicatorProps {
  currentStep: number; // 1: Grade, 2: Subject, 3: StudentCount, 4: VRExperience
  totalSteps: number;
}

export const ProgressIndicator = ({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) => {
  return (
    <div className="fixed top-8 right-8 flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-8 rounded-full transition-all duration-300 ${
            index < currentStep ? "bg-blue-500" : "bg-blue-100"
          }`}
        />
      ))}
    </div>
  );
};
