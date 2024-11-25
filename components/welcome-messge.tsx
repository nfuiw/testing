"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

interface WelcomeMessageProps {
  onComplete: () => void;
}

export const WelcomeMessage = ({ onComplete }: WelcomeMessageProps) => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const isTypingComplete = useRef(false);

  const fullText = "안녕하세요! XR 돌고래에 처음 방문하신 것을 환영합니다!";

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    let intervalId: NodeJS.Timeout | null = null;

    if (!isTypingComplete.current) {
      intervalId = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          if (intervalId) {
            clearInterval(intervalId);
          }
          if (!isTypingComplete.current) {
            isTypingComplete.current = true;
            onComplete();
          }
        }
      }, 50);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [onComplete]);

  // Blinking cursor effect
  useEffect(() => {
    if (isTypingComplete.current) {
      setShowCursor(false);
      return;
    }

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex items-start gap-6">
        <div className="flex-shrink-0 bg-blue-500 rounded-full p-3">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-grow">
          <p
            className="text-2xl leading-relaxed text-gray-800 font-medium"
            style={{ wordBreak: "keep-all" }}
          >
            {text}
            {showCursor && !isTypingComplete.current && (
              <span className="animate-pulse ml-1 text-blue-500">|</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
