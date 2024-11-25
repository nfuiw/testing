"use client";
import React from "react";
import {
  Search,
  Clock,
  Edit,
  Archive,
  Bookmark,
  File,
  Trash,
  Home,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const MyLibraryPage = () => {
  const router = useRouter();
  const navItems = [
    { icon: Clock, label: "최근", href: "/my-library/recent" },
    {
      icon: Edit,
      label: "내가 편집한 콘텐츠",
      href: "/my-library/edited",
      active: true,
    },
    { icon: Archive, label: "내 아카이브", href: "/my-library/archive" },
    { icon: File, label: "즐겨찾기", href: "/my-library/favorites" },
    { icon: Trash, label: "휴지통", href: "/my-library/trash" },
  ];

  const handleHomeClick = () => {
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <nav className="w-64 border-r bg-white p-4 flex flex-col gap-4">
        <div className="flex">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={handleHomeClick}
          >
            <Home size={20} />
          </Button>
          <div className="mt-1.5 font-bold">마이 라이브러리</div>
        </div>
        {/* <Button
          variant="ghost"
          className="justify-start"
          onClick={handleHomeClick}
        >
          <Home size={20} />
          <span>마이 라이브러리</span>
        </Button> */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="마이 라이브러리 검색" className="pl-8" />
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className="justify-start gap-2"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">내가 편집한 콘텐츠</h1>
          <Button variant="outline" className="gap-2">
            이름순
            <ChevronDown size={16} />
          </Button>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.01] cursor-pointer">
          <div className="flex items-center p-4 gap-4">
            <div className="relative w-32 h-20">
              <img src="results_0.png" alt="" className="w-full h-full" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-lg">
                소화기관으로 떠나는 신기한 XR 버스
              </h3>
              <p className="text-sm text-gray-500">편집한지 5초</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyLibraryPage;
