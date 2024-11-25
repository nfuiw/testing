"use client";
import React, { useState } from "react";
import { Search, Plus, Home, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAdvancedSearch = () => {
    // 상세 검색 처리
  };

  const vrContents = [
    {
      title: "우주 탐험 VR 체험",
      description: "태양계를 직접 탐험하며 배우는 가상 현실 교육",
      views: 15240,
      thumbnail: "/api/placeholder/300/200",
    },
    {
      title: "인체 해부학 VR 투어",
      description: "인체의 구조를 3D로 배우는 실감형 콘텐츠",
      views: 12150,
      thumbnail: "/api/placeholder/300/200",
    },
    {
      title: "공룡 시대로의 여행",
      description: "쥐라기 시대를 생생하게 체험하는 VR 콘텐츠",
      views: 10890,
      thumbnail: "/api/placeholder/300/200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/home")}
          >
            <Home className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/my-library")}>
              마이 라이브러리
            </Button>
            <Button variant="outline">로그아웃</Button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-28">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="어떤 콘텐츠를 찾고 계신가요?"
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-4 text-lg font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            검색
          </button>
          <button
            type="button"
            onClick={handleAdvancedSearch}
            className="flex items-center gap-2 px-6 py-4 text-lg font-medium border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Plus className="h-6 w-6" />
            <span>상세 검색</span>
          </button>
        </form>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-4xl mx-auto px-4 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">요즘 인기있는 콘텐츠에요!</h2>
          <Button variant="outline" className="gap-2">
            인기순
            <ChevronDown size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vrContents.map((content, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="relative h-48">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{content.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {content.description}
                </p>
                <p className="text-gray-500 text-sm">
                  조회수 {content.views.toLocaleString()}회
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
