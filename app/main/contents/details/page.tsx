"use client";
import { CompactChat } from "@/components/compact-message";
import ContentDetails from "@/components/content-details";
import ContentDetails2 from "@/components/content-details2";
import { useState } from "react";

interface ChatScenario {
  message: string;
  component?: React.ComponentType;
}

const CHAT_SCENARIOS: ChatScenario[] = [
  {
    message: "VR 콘텐츠 원본에 대해 자세히 볼 수 있는 뷰어 페이지입니다!",
    component: ContentDetails,
  },
  {
    message: "뷰어 페이지에 대해 조금 더 설명드리겠습니다!",
    component: ContentDetails2,
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
    <>
      <style jsx global>{`
        @keyframes glowPulse {
          0%,
          50% {
            box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.4);
          }
          90% {
            box-shadow: 0 0 20px 10px rgba(255, 204, 0, 0.2);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 204, 0, 0);
          }
        }
        .glow-effect {
          animation: glowPulse 1.5s ease-in-out 30;
        }
      `}</style>

      <main className="h-screen flex flex-col relative">
        <div className="flex-1 bg-gray-50 overflow-auto pb-48">
          {CurrentComponent && <CurrentComponent />}
        </div>

        {/* Backdrop overlay - stays dark for first message */}
        <div
          className={`fixed inset-0 bg-black pointer-events-none transition-opacity duration-300 ${
            currentMessageIndex === 0 || isTyping
              ? "bg-opacity-20"
              : "bg-opacity-0"
          }`}
        />

        {/* Chat Message Popup */}
        <div
          className={`fixed bottom-0 left-0 right-0 flex justify-center px-6 transition-all duration-300 ease-in-out ${
            isMinimized ? "mb-4" : "mb-12"
          }`}
        >
          <div
            className={`max-w-4xl w-full bg-white rounded-3xl shadow-2xl transform transition-all duration-300 relative border-2 border-blue-100 ${
              isMessageVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            } ${isMinimized ? "h-16" : ""}`}
          >
            {/* Minimize/Maximize button */}
            <button
              onClick={toggleMinimize}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
            >
              {isMinimized ? "" : ""}
            </button>

            <div
              className={`transition-all duration-300 ${
                isMinimized
                  ? "p-4 overflow-hidden"
                  : "p-8 flex items-center justify-between gap-8"
              }`}
            >
              <CompactChat
                message={CHAT_SCENARIOS[currentMessageIndex].message}
                className={`flex-1 text-xl font-medium leading-relaxed text-gray-800 ${
                  isMinimized ? "line-clamp-1" : ""
                }`}
                onComplete={handleTypingComplete}
              />
              {!isMinimized &&
                currentMessageIndex < CHAT_SCENARIOS.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="glow-effect px-8 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors duration-200 flex-shrink-0 font-medium text-lg shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    다음
                  </button>
                )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
