"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

interface CompactChatProps {
  message: string;
  subtitle?: string;
  onComplete?: () => void;
  className?: string;
}

export const CompactChat = ({
  message,
  onComplete,
  className = "",
}: CompactChatProps) => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [, setShowSubtitle] = useState(false);
  const isTypingComplete = useRef(false);

  // message prop이 변경될 때마다 상태 초기화
  useEffect(() => {
    setText("");
    setShowCursor(true);
    setShowSubtitle(false);
    isTypingComplete.current = false;
  }, [message]);

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
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="flex-shrink-0 bg-blue-500/10 rounded-full p-2">
        <MessageCircle className="w-5 h-5 text-blue-500" />
      </div>
      <div className="flex-grow pt-1">
        <p
          className="text-base text-gray-800 font-medium leading-relaxed"
          style={{ wordBreak: "keep-all" }}
        >
          {text}
          {showCursor && !isTypingComplete.current && (
            <span className="animate-pulse ml-1 text-blue-500">|</span>
          )}
        </p>
      </div>
    </div>
  );
};
