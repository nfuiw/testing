"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

interface TypedMessageProps {
  message: string;
  subtitle?: string;
  onComplete?: () => void;
  className?: string;
}

export const TypedMessage = ({
  message,
  subtitle,
  onComplete,
  className = "",
}: TypedMessageProps) => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const isTypingComplete = useRef(false);

  useEffect(() => {
    let currentIndex = 0;
    let intervalId: NodeJS.Timeout | null = null;

    if (!isTypingComplete.current) {
      intervalId = setInterval(() => {
        if (currentIndex <= message.length) {
          setText(message.slice(0, currentIndex));
          currentIndex++;
        } else {
          if (intervalId) {
            clearInterval(intervalId);
          }
          if (!isTypingComplete.current) {
            isTypingComplete.current = true;
            setShowSubtitle(true);
            onComplete?.();
          }
        }
      }, 50);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [message, onComplete]);

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
    <div className="relative">
      <div
        className={`bg-white rounded-2xl shadow-lg p-8 flex items-start gap-6 ${className}`}
      >
        {subtitle && showSubtitle && (
          <div className="absolute right-2 -top-6">
            <p className="text-blue-500 text-sm transition-opacity duration-300">
              {subtitle}
            </p>
          </div>
        )}
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
