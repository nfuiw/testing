"use client";
import { CompactChat } from "@/components/compact-message";
import EditPage from "@/components/edit";
import ModalPage from "@/components/ModalPage";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface ChatScenario {
  message: string;
  component?: React.ComponentType;
}

const CHAT_SCENARIOS: ChatScenario[] = [
  {
    message:
      "왼쪽 하단에 보이는 요소를 VR 콘텐츠에 드래그 해 보세요! 자유롭게 사용해 보신 뒤 '편집 완료' 버튼을 눌러주세요.",
    component: EditPage,
  },
  {
    message: "",
    component: ModalPage,
  },
];

export default function Edit() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleNext = () => {
    if (currentMessageIndex < CHAT_SCENARIOS.length - 1) {
      setCurrentMessageIndex((prev) => prev + 1);
    }
  };

  // 현재 시나리오에 해당하는 컴포넌트 가져오기
  const CurrentComponent = CHAT_SCENARIOS[currentMessageIndex].component;
  return (
    <DndProvider backend={HTML5Backend}>
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
                  편집 완료
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
    </DndProvider>
  );
}
