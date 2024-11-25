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
      "그럼 다시 원본 콘텐츠 상세 페이지로 돌아가볼까요? '원본 콘텐츠로 돌아가기' 버튼을 눌러주세요!",
    component: ContentVersions,
  },
];

export default function ContentsDetails() {
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