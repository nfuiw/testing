// "use client";
// import React from "react";
// import {
//   Search,
//   Clock,
//   Edit,
//   Archive,
//   File,
//   Trash,
//   Home,
//   ChevronDown,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";

// const MyLibraryPage = () => {
//   const router = useRouter();
//   const navItems = [
//     { icon: Clock, label: "최근", href: "/my-library/recent" },
//     {
//       icon: Edit,
//       label: "내가 편집한 콘텐츠",
//       href: "/my-library/edited",
//       active: true,
//     },
//     { icon: Archive, label: "내 아카이브", href: "/my-library/archive" },
//     { icon: File, label: "즐겨찾기", href: "/my-library/favorites" },
//     { icon: Trash, label: "휴지통", href: "/my-library/trash" },
//   ];

//   const handleHomeClick = () => {
//     router.push("/home");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <nav className="w-64 border-r bg-white p-4 flex flex-col gap-4">
//         <div className="flex">
//           <Button
//             variant="ghost"
//             className="justify-start"
//             onClick={handleHomeClick}
//           >
//             <Home size={20} />
//           </Button>
//           <div className="mt-1.5 font-bold">마이 라이브러리</div>
//         </div>

//         <div className="relative">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
//           <Input placeholder="마이 라이브러리 검색" className="pl-8" />
//         </div>
//         <div className="mt-4 flex flex-col gap-1">
//           {navItems.map((item) => (
//             <Button
//               key={item.label}
//               variant={item.active ? "secondary" : "ghost"}
//               className="justify-start gap-2"
//             >
//               <item.icon size={20} />
//               <span>{item.label}</span>
//             </Button>
//           ))}
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">내가 편집한 콘텐츠</h1>
//           <Button variant="outline" className="gap-2">
//             이름순
//             <ChevronDown size={16} />
//           </Button>
//         </div>

//         {/* Content Card */}
//         <div className="bg-white rounded-lg shadow overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.01] cursor-pointer">
//           <div className="flex items-center p-4 gap-4">
//             <div className="relative w-32 h-20">
//               <img src="results_0.png" alt="" className="w-full h-full" />
//             </div>
//             <div className="flex-1">
//               <h3 className="font-medium text-lg">
//                 소화기관으로 떠나는 신기한 XR 버스
//               </h3>
//               <p className="text-sm text-gray-500">편집한지 5초</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MyLibraryPage;
"use client";
import React from "react";
import {
  Search,
  Clock,
  Edit,
  Archive,
  File,
  Trash,
  Home,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface ContentItem {
  id: string;
  title: string;
  grade: string;
  subject: string;
  editedAt: string;
  duration: string;
  xrType: string;
}

const MOCK_ITEMS: ContentItem[] = [
  {
    id: "1",
    title: "소화기관으로 떠나는 신기한 XR 버스",
    grade: "5학년",
    subject: "과학",
    editedAt: "2024-12-06",
    duration: "15분",
    xrType: "VR",
  },
  // {
  //   id: "2",
  //   title: "영어 단어 학습을 위한 AR 체험",
  //   grade: "4학년",
  //   subject: "영어",
  //   editedAt: "2024-12-04",
  //   duration: "10분",
  //   xrType: "AR",
  // },
  // {
  //   id: "3",
  //   title: "기후변화와 환경보호 VR 체험",
  //   grade: "5학년",
  //   subject: "사회",
  //   editedAt: "2024-12-03",
  //   duration: "20분",
  //   xrType: "VR",
  // },
];

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
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="justify-start gap-2 w-full hover:bg-gray-100"
            onClick={handleHomeClick}
          >
            <Home size={24} />
            <span className="font-semibold">HOME</span>
          </Button>
          <div className="px-2 text-sm text-gray-500 mt-8 font-bold">
            마이 라이브러리
          </div>
        </div>

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

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">내가 편집한 콘텐츠</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              정렬 기준
              <ChevronDown size={16} />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["제목", "학년", "과목", "XR유형", "길이", "편집일"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-1">
                        {header}
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_ITEMS.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.grade}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        item.xrType === "VR"
                          ? "bg-purple-100 text-purple-800"
                          : item.xrType === "AR"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.xrType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.duration}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.editedAt}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MyLibraryPage;
