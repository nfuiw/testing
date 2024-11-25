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
    message:
      "이번에는 이 VR 콘텐츠를 활용하여 다른 선생님들이 제작한 버전을 확인해볼까요? 왼쪽 하단의 '다른 선생님이 편집한 버전 보기' 버튼을 눌러주세요! ",
    component: ContentDetails,
  },
];

export default function ContentsDetail2() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleNext = () => {
    if (currentMessageIndex < CHAT_SCENARIOS.length - 1) {
      setCurrentMessageIndex((prev) => prev + 1);
    }
  };

  const CurrentComponent = CHAT_SCENARIOS[currentMessageIndex].component;

  return (
    <>
      <style jsx global>{`
        @keyframes glowPulse {
          0%,
          50% {
            /* 80%까지는 초기 상태 유지 */
            box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.4);
          }
          90% {
            /* 80%에서 90% 사이에 반짝임 효과 */
            box-shadow: 0 0 20px 10px rgba(255, 204, 0, 0.2);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 204, 0, 0);
          }
        }
        .glow-effect {
          animation: glowPulse 1.5s ease-in-out 30; /* 전체 길이를 5초로 늘리고, 80%인 4초까지는 대기 */
        }
      `}</style>

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
                  className="px-5 py-2 bg-blue-50 text-blue-600 text-sm rounded-lg hover:bg-blue-100 transition-colors duration-200 flex-shrink-0 font-medium relative"
                >
                  다음
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gray-50 overflow-auto">
          {CurrentComponent && <CurrentComponent />}
        </div>
      </main>
    </>
  );
}