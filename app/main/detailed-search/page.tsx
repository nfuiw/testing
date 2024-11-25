"use client";

import { CompactChat } from "@/components/compact-message";
import ContentsSearchForm from "@/components/contents-search-form";
import { useState } from "react";

// 채팅 시나리오 타입 정의
interface ChatScenario {
  message: string;
  component?: React.ComponentType;
}

// 채팅 시나리오 정의
const CHAT_SCENARIOS: ChatScenario[] = [
  {
    message:
      "5학년 과학 '소화'와 관련된 수업을 준비하기 위한 VR 콘텐츠를 검색해주세요!",
    component: ContentsSearchForm, // 두 번째 메시지에서 SearchForm 표시
  },
];

export default function MainPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleNext = () => {
    if (currentMessageIndex < CHAT_SCENARIOS.length - 1) {
      setCurrentMessageIndex((prev) => prev + 1);
    }
  };

  // 현재 시나리오에 해당하는 컴포넌트 가져오기
  const CurrentComponent = CHAT_SCENARIOS[currentMessageIndex].component;

  return (
    <main className="h-screen flex flex-col">
      <div className="h-20 bg-white border-b">
        <div className="h-full max-w-screen-xl mx-auto px-6 flex items-center">
          <div className="flex items-center justify-between gap-6 w-full">
            <CompactChat
              message={CHAT_SCENARIOS[currentMessageIndex].message}
              className="flex-1"
            />
            {currentMessageIndex < CHAT_SCENARIOS.length - 1 && (
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-blue-50 text-blue-600 text-sm rounded-lg hover:bg-blue-100 transition-colors duration-200 flex-shrink-0 font-medium"
              >
                다음
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 overflow-auto">
        {/* 현재 시나리오에 해당하는 컴포넌트 조건부 렌더링 */}
        {CurrentComponent && <CurrentComponent />}
      </div>
    </main>
  );
}
