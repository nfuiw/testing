"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

// 타입 정의
interface VRModel {
  label: string;
  value: string;
  models?: string[];
  needsInput?: boolean;
}

interface VRDevice {
  label: string;
  value: string;
  subOptions?: VRModel[];
}

const GRADES = [1, 2, 3, 4, 5, 6];

const CONTENT_DATES = [
  { label: "이번 주", value: "thisWeek" },
  { label: "이번 달", value: "thisMonth" },
  { label: "최근 3개월", value: "last3Months" },
  { label: "올해", value: "thisYear" },
];

const CONTENT_LENGTHS = [
  { label: "5분 미만", value: "under5" },
  { label: "5~10분", value: "5to10" },
  { label: "10~20분", value: "10to20" },
  { label: "20분 초과", value: "over20" },
];

// 상수 정의
const VR_DEVICES: VRDevice[] = [
  {
    label: "VR 헤드셋",
    value: "headset",
    subOptions: [
      {
        label: "Meta Quest",
        value: "meta",
        models: ["Meta Quest 3", "Meta Quest 2", "Meta Quest Pro"],
      },
      {
        label: "PICO",
        value: "pico",
        models: ["PICO 4", "PICO Neo 3", "기타 PICO"],
      },
      {
        label: "기타 기기",
        value: "other",
        needsInput: true,
      },
    ],
  },
  { label: "스마트폰", value: "smartphone" },
  { label: "태블릿", value: "tablet" },
  { label: "데스크톱", value: "desktop" },
  { label: "노트북", value: "laptop" },
];

const XR_TYPES = [
  { label: "가상현실(VR)", value: "VR" },
  { label: "증강현실(AR)", value: "AR" },
  { label: "혼합현실(MR)", value: "MR" },
];

const CLASS_HOURS = ["1차시", "2차시", "3차시", "4차시 이상"];

const SUBJECTS = [
  "국어",
  "수학",
  "과학",
  "사회",
  "영어",
  "음악",
  "미술",
  "체육",
];

export default function ContentsSearchForm() {
  const router = useRouter();

  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [unit, setUnit] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(
    null
  );
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [selectedXRType, setSelectedXRType] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [selectedHours, setSelectedHours] = useState<string | null>(null);

  const [selectedVRHeadset, setSelectedVRHeadset] = useState<string | null>(
    null
  );
  const [selectedVRModel, setSelectedVRModel] = useState<string | null>(null);
  const [otherVRDevice, setOtherVRDevice] = useState("");

  // VR 헤드셋 관련 선택을 초기화하는 함수
  const resetVRHeadsetSelections = () => {
    setSelectedVRHeadset(null);
    setSelectedVRModel(null);
    setOtherVRDevice("");
  };

  // VR 기기 선택 시 호출되는 함수
  const handleDeviceSelect = (device: string) => {
    setSelectedDevice(device);
    if (device !== "headset") {
      resetVRHeadsetSelections();
    }
  };

  const renderVRDeviceSelection = () => {
    const headsetDevice = VR_DEVICES.find((d) => d.value === "headset");
    const selectedManufacturer = headsetDevice?.subOptions?.find(
      (m) => m.value === selectedVRHeadset
    );

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">↳ 활용 기기</h3>
        <div className="flex gap-2">
          {VR_DEVICES.map((device) => (
            <button
              key={device.value}
              onClick={() => handleDeviceSelect(device.value)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  selectedDevice === device.value
                    ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
            >
              {device.label}
            </button>
          ))}
        </div>

        {/* VR 헤드셋 선택 시 추가 옵션 */}
        {selectedDevice === "headset" && headsetDevice?.subOptions && (
          <div className="mt-4 space-y-4">
            <h4 className="text-sm font-medium text-gray-600">
              ↳ VR 헤드셋 선택
            </h4>
            <div className="flex gap-2">
              {headsetDevice.subOptions.map((manufacturer) => (
                <button
                  key={manufacturer.value}
                  onClick={() => {
                    setSelectedVRHeadset(manufacturer.value);
                    setSelectedVRModel(null);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      selectedVRHeadset === manufacturer.value
                        ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {manufacturer.label}
                </button>
              ))}
            </div>

            {/* Meta Quest나 PICO 선택 시 모델 선택 */}
            {selectedManufacturer?.models && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-600">
                  ↳ 모델 상세
                </h4>
                <div className="flex gap-2">
                  {selectedManufacturer.models.map((model) => (
                    <button
                      key={model}
                      onClick={() => setSelectedVRModel(model)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          selectedVRModel === model
                            ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 기타 기기 선택 시 입력 필드 */}
            {selectedVRHeadset === "other" && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-600">기기명</h4>
                <input
                  type="text"
                  value={otherVRDevice}
                  onChange={(e) => setOtherVRDevice(e.target.value)}
                  placeholder="VR 기기명을 입력하세요"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const handleSearch = () => {
    router.push("/main/contents");
  };

  const firstRowGrades = GRADES.slice(0, 3);
  const secondRowGrades = GRADES.slice(3);
  const firstRowSubjects = SUBJECTS.slice(0, 4);
  const secondRowSubjects = SUBJECTS.slice(4);
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {/* 학년 & 과목 선택 섹션 */}
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          {/* 학년 선택 */}
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-medium text-gray-700">학년</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                {firstRowGrades.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            selectedGrade === grade
                              ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                  >
                    {grade}학년
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {secondRowGrades.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            selectedGrade === grade
                              ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                  >
                    {grade}학년
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 과목 선택 */}
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-medium text-gray-700">과목</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                {firstRowSubjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            selectedSubject === subject
                              ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {secondRowSubjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            selectedSubject === subject
                              ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 단원 입력 */}
        <div className="p-6 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            단원 / 주제 / 키워드
          </h3>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="예) 2단원 - 태양계와 별"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
        </div>

        {/* 수업 차시 */}
        <div className="p-6 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">수업 차시</h3>
          <div className="flex gap-2">
            {CLASS_HOURS.map((hour) => (
              <button
                key={hour}
                onClick={() => setSelectedHours(hour)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        selectedHours === hour
                          ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-100">
          {/* 콘텐츠 생성 기간 */}
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-medium text-gray-700">
              콘텐츠 생성 기간
            </h3>
            <div className="flex gap-2">
              {CONTENT_DATES.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setSelectedDateRange(value)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      selectedDateRange === value
                        ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>{" "}
          {/* 콘텐츠 길이 */}
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-medium text-gray-700">콘텐츠 길이</h3>
            <div className="flex gap-2">
              {CONTENT_LENGTHS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setSelectedLength(value)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      selectedLength === value
                        ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* XR 유형 & 기기 선택 */}
        <div className="p-6 space-y-6">
          {/* XR 유형 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">XR 유형</h3>
            <div className="flex gap-2">
              {XR_TYPES.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => {
                    setSelectedXRType(value);
                    if (value !== "VR") {
                      setSelectedDevice(null);
                      resetVRHeadsetSelections();
                    }
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  selectedXRType === value
                    ? "bg-blue-500 text-white ring-2 ring-blue-500/20"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {selectedXRType === "VR" && renderVRDeviceSelection()}
        </div>

        {/* 추가 조건 & 검색 버튼 */}
        <div className="p-6 flex items-center justify-between gap-4">
          <div></div>
          {/* <button
            onClick={() => setShowAdditionalOptions(!showAdditionalOptions)}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-500 transition-colors duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            조건 추가
          </button> */}
          <button
            onClick={handleSearch}
            className="flex-1 max-w-xs px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />이 조건으로 콘텐츠 찾기
          </button>
        </div>
      </div>
    </div>
  );
}
