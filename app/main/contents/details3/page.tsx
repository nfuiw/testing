"use client";
import { CompactChat } from "@/components/compact-message";
import ContentDetails from "@/components/content-details";
import { useState } from "react";

interface ChatScenario {
  message: string;
  component?: React.ComponentType;
}

const CHAT_SCENARIOS: ChatScenario[] = [
  {
    message:
      "이번에는 직접 VR 콘텐츠를 편집해볼까요? [ 콘텐츠 편집하기 ] 버튼을 눌러주세요.",
    component: ContentDetails,
  },
];

export default function ContentsDetail3() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

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
    setIsTyping(false); // 타이핑이 끝나면 오버레이를 제거
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const CurrentComponent = CHAT_SCENARIOS[currentMessageIndex].component;

  return (
    <main className="h-screen flex flex-col relative">
      <div className="flex-1 bg-gray-50 overflow-auto">
        {CurrentComponent && <CurrentComponent />}
      </div>

      {/* Backdrop overlay */}
      <div
        className={`
          fixed inset-0 bg-black pointer-events-none transition-opacity duration-300
          ${isTyping ? "bg-opacity-20" : "bg-opacity-0"}
        `}
      />

      {/* Chat Message Popup */}
      <div
        className={`
        fixed bottom-0 left-0 right-0 flex justify-end pr-16 pl-6
        transition-all duration-300 ease-in-out
        ${isMinimized ? "mb-4" : "mb-12"}
      `}
      >
        <div
          className={`
            max-w-2xl w-full bg-white rounded-3xl shadow-2xl 
            transform transition-all duration-300 relative
            border-2 border-blue-100
            ${
              isMessageVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }
            ${isMinimized ? "h-16" : ""}
          `}
        >
          {/* Minimize/Maximize button */}
          <button
            onClick={toggleMinimize}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
          >
            {isMinimized ? "" : ""}
          </button>

          <div
            className={`
            transition-all duration-300
            ${
              isMinimized
                ? "p-4 overflow-hidden"
                : "p-8 flex items-center justify-between gap-8"
            }
          `}
          >
            <CompactChat
              message={CHAT_SCENARIOS[currentMessageIndex].message}
              className={`
                flex-1 text-xl font-medium leading-relaxed text-gray-800
                ${isMinimized ? "line-clamp-1" : ""}
              `}
              onComplete={handleTypingComplete}
            />
            {!isMinimized &&
              currentMessageIndex < CHAT_SCENARIOS.length - 1 && (
                <button
                  onClick={handleNext}
                  className="px-8 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors duration-200 flex-shrink-0 font-medium text-lg shadow-md hover:shadow-lg transform hover:scale-105"
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
