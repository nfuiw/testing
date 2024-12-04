"use client";

import { CompactChat } from "@/components/compact-message";
import TutorialSearch from "@/components/tutorial-search";
import { useState } from "react";

interface ChatScenario {
  message: string;
  component?: React.ComponentType;
}

const CHAT_SCENARIOS: ChatScenario[] = [
  {
    message:
      "좋아요! 먼저 연습삼아 5학년 과학 VR 콘텐츠를 찾아볼까요? [ + 상세 검색 ] 버튼을 눌러주세요!",
    component: TutorialSearch,
  },
];

export default function MainPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  const handleNext = () => {
    if (currentMessageIndex < CHAT_SCENARIOS.length - 1) {
      setIsMessageVisible(false);
      setIsTyping(true);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
        setIsMessageVisible(true);
      }, 300);
    }
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
  };

  const CurrentComponent = CHAT_SCENARIOS[currentMessageIndex].component;

  return (
    <main className="h-screen flex flex-col relative">
      <div className="flex-1 bg-gray-50 overflow-auto">
        {CurrentComponent && <CurrentComponent />}
      </div>

      {/* Backdrop overlay - only visible during typing */}
      <div
        className={`
          fixed inset-0 bg-black pointer-events-none transition-opacity duration-300
          ${isTyping ? "bg-opacity-20" : "bg-opacity-0"}
        `}
      />

      {/* Chat Message Popup */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center mb-12 px-6">
        <div
          className={`
            max-w-4xl w-full bg-white rounded-3xl shadow-2xl transform transition-all duration-300
            border-2 border-blue-100
            ${
              isMessageVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }
          `}
        >
          <div className="p-8 flex items-center justify-between gap-8">
            <CompactChat
              message={CHAT_SCENARIOS[currentMessageIndex].message}
              className="flex-1 text-xl font-medium leading-relaxed text-gray-800"
              onComplete={handleTypingComplete}
            />
            {currentMessageIndex < CHAT_SCENARIOS.length - 1 && (
              <button
                onClick={handleNext}
                className="
                  px-8 py-4 bg-blue-500 text-white rounded-2xl 
                  hover:bg-blue-600 transition-colors duration-200 
                  flex-shrink-0 font-medium text-lg
                  shadow-md hover:shadow-lg transform hover:scale-105
                "
              >
                다음
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
