"use client";
import { CompactChat } from "@/components/compact-message";
import ContentDetails from "@/components/content-details";
import { useState, useEffect } from "react";

interface ChatScenario {
  message: string;
  component?: React.ComponentType;
}

const CHAT_SCENARIOS: ChatScenario[] = [
  {
    message:
      "이번에는 이 VR 콘텐츠를 활용하여 다른 선생님들이 제작한 버전을 확인해볼까요?",
    component: ContentDetails,
  },
  {
    message:
      "왼쪽 하단의 [ 다른 선생님이 편집한 버전 보기 ] 버튼을 눌러주세요!",
    component: ContentDetails,
  },
];

export default function ContentsDetail2() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const handleNext = () => {
    if (currentMessageIndex < CHAT_SCENARIOS.length - 1) {
      setIsTyping(true);
      setCurrentMessageIndex((prev) => prev + 1);
    }
  };

  const handleTypingComplete = () => {
    if (currentMessageIndex !== 0) {
      setIsTyping(false);
    }
  };

  const CurrentComponent = CHAT_SCENARIOS[currentMessageIndex].component;

  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Backdrop overlay */}
      <div
        className={`
          fixed inset-0 bg-black pointer-events-none transition-opacity duration-300
          ${
            isTyping || currentMessageIndex === 0
              ? "bg-opacity-20"
              : "bg-opacity-0"
          }
        `}
      />

      <div className="flex-1 bg-gray-50">
        {/* 메인 컴포넌트 */}
        {CurrentComponent && <CurrentComponent />}
      </div>

      {/* 채팅 메시지 영역 - 화면 하단 오른쪽에 고정 */}
      <div className="fixed bottom-6 right-6 max-w-2xl w-full px-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between gap-8">
            <CompactChat
              message={CHAT_SCENARIOS[currentMessageIndex].message}
              className="text-xl font-medium leading-relaxed text-gray-800"
              onComplete={handleTypingComplete}
            />
            {currentMessageIndex < CHAT_SCENARIOS.length - 1 && (
              <button
                onClick={handleNext}
                className="shrink-0 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 font-medium text-lg"
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
