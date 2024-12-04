"use client";
import { CompactChat } from "@/components/compact-message";
import ContentVersions from "@/components/content-versions";
import { useState } from "react";

interface ChatScenario {
  message: string;
  component?: React.ComponentType;
}

const CHAT_SCENARIOS: ChatScenario[] = [
  {
    message:
      "어떠신가요? 다른 선생님들께서 편집하신 콘텐츠 수정 버전입니다! 자유롭게 활용하실 수 있어요.",
    component: ContentVersions,
  },
  {
    message:
      "그럼 다시 원본 콘텐츠 상세 페이지로 돌아가볼까요? 왼쪽 상단 [ 원본 콘텐츠로 돌아가기 ] 버튼을 눌러주세요!",
    component: ContentVersions,
  },
];

export default function ContentsDetails() {
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
    // 첫 번째 메시지(다음 버튼이 있는 상태)에서는 타이핑이 끝나도 어두운 상태 유지
    if (currentMessageIndex !== 0) {
      setIsTyping(false);
    }
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

      {/* Backdrop overlay - stays dark for first message */}
      <div
        className={`
          fixed inset-0 bg-black pointer-events-none transition-opacity duration-300
          ${
            currentMessageIndex === 0 || isTyping
              ? "bg-opacity-20"
              : "bg-opacity-0"
          }
        `}
      />

      {/* Chat Message Popup */}
      <div
        className={`
        fixed bottom-0 left-0 right-0 flex justify-center px-6
        transition-all duration-300 ease-in-out
        ${isMinimized ? "mb-4" : "mb-12"}
      `}
      >
        <div
          className={`
            max-w-4xl w-full bg-white rounded-3xl shadow-2xl 
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
