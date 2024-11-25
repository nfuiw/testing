import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Play,
  Edit,
  Eye,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Calendar,
  School,
  User,
} from "lucide-react";

const ContentVersions = () => {
  const versions = [
    {
      id: "1",
      title: "우리 몸 소화기관! 간, 이자, 소장, 대장",
      teacher: "김우주 선생님",
      school: "서울 태양 초등학교",
      views: 238,
      likes: 45,
      comments: 12,
      bookmarks: 52,
      editDate: "2023-12-14",
      description:
        "초등학교 5학년 과학 3단원. 우리 몸의 구조와 긴으 단원의 심화 버전으로, 과학 탐구 활동 중심으로 재구성함.",
      tags: ["5학년", "과학", "소화", "심화"],
      imageUrl: "/result_4.png",
    },
    {
      id: "2",
      title: "소화기관의 생김새와 하는 일!",
      teacher: "이지구 선생님",
      school: "부산바다초등학교",
      views: 156,
      likes: 32,
      comments: 8,
      bookmarks: 41,
      editDate: "2023-12-10",
      description:
        "소화기관이 하는 일을 쉽게 이해할 수 있도록 음식물이 들어갔을 때 소화기관의 움직임을 관찰할 수 있습니다.",
      tags: ["5학년", "과학", "15분", "소화"],
      imageUrl: "/result_5.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-[1200px]">
        <Link
          href="/main/contents/details3"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 bg-white px-4 py-2 rounded-lg shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          원본 콘텐츠로 돌아가기
        </Link>

        <div className="space-y-8">
          {versions.map((version) => (
            <Card key={version.id} className="overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* 이미지 섹션 */}
                <div className="lg:w-2/5 xl:w-1/3 relative">
                  <img
                    src={version.imageUrl}
                    alt={version.title}
                    className="w-full h-full object-cover min-h-[240px]"
                  />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {version.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-blue-50/90 text-blue-600 backdrop-blur-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 콘텐츠 정보 섹션 */}
                <div className="lg:w-3/5 xl:w-2/3 p-6">
                  <div className="flex flex-col h-full">
                    {/* 상단 정보 */}
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold mb-4">
                        {version.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{version.teacher}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                          <School className="w-4 h-4" />
                          <span className="text-sm">{version.school}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{version.editDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* 통계 정보 */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{version.views}</span>
                      </div>
                      <div className="bg-gray-50 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{version.likes}</span>
                      </div>
                      <div className="bg-gray-50 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{version.comments}</span>
                      </div>
                      <div className="bg-gray-50 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                        <Bookmark className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{version.bookmarks}</span>
                      </div>
                    </div>

                    {/* 설명 */}
                    <p className="text-gray-600 mb-6 flex-grow">
                      {version.description}
                    </p>

                    {/* 버튼 */}
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        콘텐츠 시작하기
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        콘텐츠 편집하기
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentVersions;
