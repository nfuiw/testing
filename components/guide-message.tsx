"use client";
import { useState, useEffect } from "react";
import { MessageCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuideMessageProps {
  onComplete: () => void;
}

export const GuideMessage = ({ onComplete }: GuideMessageProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    // Animate in sequence
    setTimeout(() => setShowMessage(true), 500);
    setTimeout(() => setShowButton(true), 1500);
    setTimeout(() => setShowFinal(true), 2500);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 space-y-4">
      {/* First message */}
      <div
        className={`transform transition-all duration-500 ${
          showMessage ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-start gap-6">
          <div className="flex-shrink-0 bg-blue-500 rounded-full p-3">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-grow">
            <p
              className="text-2xl leading-relaxed text-gray-800 font-medium"
              style={{ wordBreak: "keep-all" }}
            >
              XR 돌고래를 이용해서 XR 교육용 콘텐츠를 제작해보세요!
            </p>
          </div>
        </div>
      </div>

      {/* Help button message */}
      {showButton && (
        <div
          className={`transform transition-all duration-500 ${
            showButton ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 flex items-start gap-6">
            <div className="flex-shrink-0 bg-blue-500 rounded-full p-3">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-grow">
              <p
                className="text-2xl leading-relaxed text-gray-800 font-medium"
                style={{ wordBreak: "keep-all" }}
              >
                콘텐츠 제작 중 도움이 필요할 때는 언제든지
                <span className="inline-flex items-center mx-2 bg-blue-100 text-blue-500 px-4 py-2 rounded-xl">
                  <HelpCircle className="w-6 h-6 mr-2" />
                  도움말
                </span>
                버튼을 눌러 가이드와 팁을 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Final message with button */}
      {showFinal && (
        <div
          className={`transform transition-all duration-500 ${
            showFinal ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 flex items-start gap-6">
            <div className="flex-shrink-0 bg-blue-500 rounded-full p-3">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-grow space-y-6">
              <p
                className="text-2xl leading-relaxed text-gray-800 font-medium"
                style={{ wordBreak: "keep-all" }}
              >
                XR 돌고래가 여러분의 창의적인 교육 콘텐츠 제작을 지원합니다!
              </p>
              <Button
                onClick={onComplete}
                className="w-full py-6 text-xl bg-blue-500 hover:bg-blue-600 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                시작하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
