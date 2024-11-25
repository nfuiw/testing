// "use client";

// import { useState } from "react";

// import { PlusCircle, Search } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { CompactChat } from "@/components/compact-message";
// import ContentsSearchForm from "@/components/contents-search-form";

// interface VRModel {
//   label: string;
//   value: string;
//   models?: string[];
//   needsInput?: boolean;
// }

// interface VRDevice {
//   label: string;
//   value: string;
//   subOptions?: VRModel[];
// }

// const CHAT_SCENARIOS = [
//   "먼저 연습삼아 5학년 과학 VR 콘텐츠를 탐색해볼까요?",
//   "할 수 있겠죠?",
//   "이렇게 해주세요.",
// ];

// const GRADES = [1, 2, 3, 4, 5, 6];
// const SUBJECTS = [
//   "국어",
//   "수학",
//   "과학",
//   "사회",
//   "영어",
//   "음악",
//   "미술",
//   "체육",
// ];
// const XR_TYPES = [
//   { label: "가상현실(VR)", value: "VR" },
//   { label: "증강현실(AR)", value: "AR" },
//   { label: "혼합현실(MR)", value: "MR" },
// ];
// const VR_DEVICES: VRDevice[] = [
//   {
//     label: "VR 헤드셋",
//     value: "headset",
//     subOptions: [
//       {
//         label: "Meta Quest",
//         value: "meta",
//         models: ["Meta Quest 3", "Meta Quest 2", "Meta Quest Pro"],
//       },
//       {
//         label: "PICO",
//         value: "pico",
//         models: ["PICO 4", "PICO Neo 3", "기타 PICO"],
//       },
//       {
//         label: "기타 기기",
//         value: "other",
//         needsInput: true,
//       },
//     ],
//   },
//   { label: "스마트폰", value: "smartphone" },
//   { label: "태블릿", value: "tablet" },
//   { label: "데스크톱", value: "desktop" },
//   { label: "노트북", value: "laptop" },
// ];
// const CLASS_HOURS = ["1차시", "2차시", "3차시", "4차시 이상"];

// export default function MainPage() {
//   const router = useRouter();
//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
//   const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
//   const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
//   const [unit, setUnit] = useState("");
//   const [keywords, setKeywords] = useState("");
//   const [selectedXRType, setSelectedXRType] = useState<string | null>(null);
//   const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
//   const [selectedHours, setSelectedHours] = useState<string | null>(null);
//   const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
//   const [selectedVRHeadset, setSelectedVRHeadset] = useState<string | null>(
//     null
//   );
//   const [selectedVRModel, setSelectedVRModel] = useState<string | null>(null);
//   const [otherVRDevice, setOtherVRDevice] = useState("");

//   const handleNext = () => {
//     if (currentMessageIndex < CHAT_SCENARIOS.length - 1) {
//       setCurrentMessageIndex((prev) => prev + 1);
//     }
//   };

//   // VR 헤드셋 관련 선택을 초기화하는 함수
//   const resetVRHeadsetSelections = () => {
//     setSelectedVRHeadset(null);
//     setSelectedVRModel(null);
//     setOtherVRDevice("");
//   };

//   // VR 기기 선택 시 호출되는 함수
//   const handleDeviceSelect = (device: string) => {
//     setSelectedDevice(device);
//     if (device !== "headset") {
//       resetVRHeadsetSelections();
//     }
//   };

//   const renderVRDeviceSelection = () => {
//     const headsetDevice = VR_DEVICES.find((d) => d.value === "headset");
//     const selectedManufacturer = headsetDevice?.subOptions?.find(
//       (m) => m.value === selectedVRHeadset
//     );

//     return (
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-gray-700">활용 기기</h3>
//         <div className="flex gap-2">
//           {VR_DEVICES.map((device) => (
//             <button
//               key={device.value}
//               onClick={() => handleDeviceSelect(device.value)}
//               className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
//                 ${
//                   selectedDevice === device.value
//                     ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
//                     : "bg-gray-50 text-gray-600 hover:bg-gray-100"
//                 }`}
//             >
//               {device.label}
//             </button>
//           ))}
//         </div>

//         {/* VR 헤드셋 선택 시 추가 옵션 */}
//         {selectedDevice === "headset" && headsetDevice?.subOptions && (
//           <div className="mt-4 space-y-4">
//             <h4 className="text-sm font-medium text-gray-600">
//               VR 헤드셋 선택
//             </h4>
//             <div className="flex gap-2">
//               {headsetDevice.subOptions.map((manufacturer) => (
//                 <button
//                   key={manufacturer.value}
//                   onClick={() => {
//                     setSelectedVRHeadset(manufacturer.value);
//                     setSelectedVRModel(null);
//                   }}
//                   className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
//                     ${
//                       selectedVRHeadset === manufacturer.value
//                         ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
//                         : "bg-gray-50 text-gray-600 hover:bg-gray-100"
//                     }`}
//                 >
//                   {manufacturer.label}
//                 </button>
//               ))}
//             </div>

//             {/* Meta Quest나 PICO 선택 시 모델 선택 */}
//             {selectedManufacturer?.models && (
//               <div className="space-y-3">
//                 <h4 className="text-sm font-medium text-gray-600">모델</h4>
//                 <div className="flex gap-2">
//                   {selectedManufacturer.models.map((model) => (
//                     <button
//                       key={model}
//                       onClick={() => setSelectedVRModel(model)}
//                       className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
//                         ${
//                           selectedVRModel === model
//                             ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
//                             : "bg-gray-50 text-gray-600 hover:bg-gray-100"
//                         }`}
//                     >
//                       {model}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* 기타 기기 선택 시 입력 필드 */}
//             {selectedVRHeadset === "other" && (
//               <div className="space-y-3">
//                 <h4 className="text-sm font-medium text-gray-600">기기명</h4>
//                 <input
//                   type="text"
//                   value={otherVRDevice}
//                   onChange={(e) => setOtherVRDevice(e.target.value)}
//                   placeholder="VR 기기명을 입력하세요"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const handleSearch = () => {
//     router.push("/main/contents");
//   };

//   const firstRowGrades = GRADES.slice(0, 3);
//   const secondRowGrades = GRADES.slice(3);
//   const firstRowSubjects = SUBJECTS.slice(0, 4);
//   const secondRowSubjects = SUBJECTS.slice(4);

//   return (
//     <main className="h-screen flex flex-col">
//       <div className="h-20 bg-white border-b">
//         <div className="h-full max-w-screen-xl mx-auto px-6 flex items-center">
//           <div className="flex items-center justify-between gap-6 w-full">
//             <CompactChat
//               message={CHAT_SCENARIOS[currentMessageIndex]}
//               className="flex-1"
//             />
//             {currentMessageIndex < CHAT_SCENARIOS.length - 1 && (
//               <button
//                 onClick={handleNext}
//                 className="px-5 py-2 bg-blue-50 text-blue-600 text-sm rounded-lg hover:bg-blue-100 transition-colors duration-200 flex-shrink-0 font-medium"
//               >
//                 다음
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 bg-gray-50 overflow-auto">
//         <ContentsSearchForm />
//       </div>
//     </main>
//   );
// }

"use client";

import { CompactChat } from "@/components/compact-message";
import ContentsSearchForm from "@/components/contents-search-form";
import Test from "@/components/test";
import TutorialSearch from "@/components/tutorial-search";
import { useState } from "react";

// 채팅 시나리오 타입 정의
interface ChatScenario {
  message: string;
  component?: React.ComponentType;
}

// 채팅 시나리오 정의
const CHAT_SCENARIOS: ChatScenario[] = [
  {
    message:
      "좋아요! 먼저 연습삼아 5학년 과학 VR 콘텐츠를 찾아볼까요? 상세 검색 버튼을 눌러주세요!",
    component: TutorialSearch,
  },
  //   {
  //     message:
  //       "5학년 과학 '소화 기관' 수업을 준비하기 위한 VR 콘텐츠를 검색해주세요. 조건을 선택하고 하단에 [이 조건으로 콘텐츠 찾기] 버튼을 눌러보세요!",
  //     component: ContentsSearchForm, // 두 번째 메시지에서 SearchForm 표시
  //   },
  //   {
  //     message: "이렇게 해주세요.",
  //   },
];

export default function MainPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleNext = () => {
    if (currentMessageIndex < CHAT_SCENARIOS.length - 1) {
      setCurrentMessageIndex((prev) => prev + 1);
    }
  };

  // 현재 시나리오에 해당하는 컴포넌트 가져오기
  const CurrentComponent = CHAT_SCENARIOS[currentMessageIndex].component;

  return (
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
                다음
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
  );
}
