"use client";
import React from "react";
import {
  Star,
  Clock,
  Users,
  ThumbsUp,
  Search,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration: number;
  grade: number;
  usageCount: number;
  rating: number;
  difficulty: "easy" | "medium" | "hard";
  imageUrl: string;
}

const MOCK_CONTENTS: ContentItem[] = [
  {
    id: "1",
    title: "소화기관으로 떠나는 신기한 XR버스",
    description: "소화기관의 구조와 기능을 실감나는 XR 체험으로 알아봅니다.",
    tags: ["생물", "우리몸", "소화", "소화기관"],
    duration: 15,
    grade: 5,
    usageCount: 1200,
    rating: 4.9,
    difficulty: "medium",
    imageUrl: "/results_0.png",
  },
  {
    id: "2",
    title: "소화 기관 탐험하기",
    description:
      "인체 소화 기관을 실감나게 직접 체험하며 배우는 몰입형 VR 콘텐츠",
    tags: ["소화", "위장", "장기", "소화액"],
    duration: 20,
    grade: 5,
    usageCount: 1200,
    rating: 4.8,
    difficulty: "medium",
    imageUrl: "/results_2.png",
  },
  {
    id: "3",
    title: "영양소의 소화 과정",
    description:
      "음식물이 소화되는 전 과정을 VR로 직접 들여다보고 학습하는 콘텐츠",
    tags: ["영양소", "소화효소", "흡수", "분해"],
    duration: 15,
    grade: 5,
    usageCount: 850,
    rating: 4.6,
    difficulty: "easy",
    imageUrl: "/results_1.png",
  },
  {
    id: "4",
    title: "소화기관 역할 체험하기",
    description:
      "각 소화기관의 역할과 소화효소의 작용을 실감나게 체험하는 VR 시뮬레이션",
    tags: ["소화기관", "효소", "기관별역할"],
    duration: 25,
    grade: 5,
    usageCount: 950,
    rating: 4.9,
    difficulty: "hard",
    imageUrl: "/results_3.png",
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "bg-emerald-50 text-emerald-600";
    case "medium":
      return "bg-purple-100 text-purple-700";
    case "hard":
      return "bg-rose-50 text-rose-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
};

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "쉬움";
    case "medium":
      return "보통";
    case "hard":
      return "어려움";
    default:
      return "";
  }
};

const ContentsResults = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/main/contents/details");
  };

  return (
    <>
      <style jsx global>{`
        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 20px 10px rgba(255, 204, 0, 0.2);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 204, 0, 0);
          }
        }
        .glow-effect {
          animation: glowPulse 1s ease-in-out 30;
        }
      `}</style>

      <div className="container mx-auto p-6 max-w-5xl">
        {/* 검색 조건 표시 */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">검색 조건</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                <Search className="w-4 h-4" />
                검색 조건 다시 설정하기
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="space-y-2">
                <span className="text-gray-500 text-sm">학년 / 과목</span>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">5학년 / 과학</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-gray-500 text-sm">
                  단원 / 주제 / 키워드
                </span>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">소화</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-gray-500 text-sm">수업 차시</span>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">1차시</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-gray-500 text-sm">XR 종류</span>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">가상현실(VR)</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-gray-500 text-sm">사용 기기</span>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">Meta Quest 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="space-y-4">
          {MOCK_CONTENTS.map((content, index) => (
            <div
              key={content.id}
              className="bg-white rounded-lg overflow-hidden shadow flex h-64"
            >
              {/* 이미지 섹션 */}
              <div className="w-96 flex-shrink-0">
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 콘텐츠 정보 섹션 */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{content.title}</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-lg text-yellow-600">
                      {content.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-3">{content.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {content.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{content.duration}분</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="flex items-center justify-center w-6 h-6 bg-sky-50 text-sky-600 rounded-full text-sm">
                      <GraduationCap className="w-4 h-4" />
                    </span>
                    <span className="text-sky-600">{content.grade}학년</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{content.usageCount}회 사용됨</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(
                      content.difficulty
                    )}`}
                  >
                    {getDifficultyText(content.difficulty)}
                  </span>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    className={`w-full py-2 border rounded-lg hover:bg-blue-100 transition ${
                      index === 0 ? "glow-effect" : ""
                    }`}
                    onClick={handleClick}
                  >
                    콘텐츠 상세보기
                  </button>
                  <button className="w-full py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-100 transition">
                    수업에 활용하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContentsResults;
