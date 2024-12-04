import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

interface EditorElement {
  type:
    | "learningGoal"
    | "objectTag"
    | "subtitle"
    | "quiz"
    | "notice"
    | "safetyGuide";
  content?: string;
  position?: { x: number; y: number };
  imageIndex: number;
  color: string;
}

interface LearningGoalEditorProps {
  element: EditorElement;
  onUpdate: (element: EditorElement) => void;
}

const GRADES = [
  { value: "1-2", label: "1-2학년" },
  { value: "3-4", label: "3-4학년" },
  { value: "5-6", label: "5-6학년" },
];

const SUBJECTS = [
  { value: "korean", label: "국어" },
  { value: "math", label: "수학" },
  { value: "english", label: "영어" },
  { value: "social", label: "사회" },
  { value: "moral", label: "도덕" },
  { value: "science", label: "과학" },
  { value: "pe", label: "체육" },
  { value: "music", label: "음악" },
  { value: "art", label: "미술" },
  { value: "practical", label: "실과" },
];

const UNITS = [
  { value: "strata", label: "지층과 화석" },
  { value: "light", label: "빛의 성질" },
  { value: "solution", label: "용해와 용액" },
  { value: "body", label: "우리 몸의 구조와 기능" },
  { value: "mixture", label: "혼합물의 분리" },
];

const ACHIEVEMENT_STANDARDS = [
  {
    unit: "우리 몸의 구조와 기능",
    code: "[6과04-01]",
    content:
      "뼈와 근육의 생김새를 관찰하고 모형을 만들어 몸이 움직이는 원리를 설명할 수 있다.",
  },
  {
    unit: "우리 몸의 구조와 기능",
    code: "[6과04-02]",
    content:
      "소화, 순환, 호흡, 배설 기관의 구조와 기능을 알아보고, 우리 몸의 여러 기관이 서로 관련되어 있음을 설명할 수 있다.",
  },
  {
    unit: "우리 몸의 구조와 기능",
    code: "[6과04-03]",
    content:
      "우리 몸의 여러 기관과 관련된 질병을 조사하고, 건강을 유지하기 위한 생활 방식을 실천할 수 있다.",
  },
];

const LearningGoalEditor: React.FC<LearningGoalEditorProps> = ({
  element,
  onUpdate,
}) => {
  const [grade, setGrade] = useState("5-6");
  const [subject, setSubject] = useState("science");
  const [unit, setUnit] = useState("body");
  const [showStandards, setShowStandards] = useState(false);
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);

  useEffect(() => {
    if (selectedStandards.length > 0) {
      onUpdate({
        ...element,
        content: selectedStandards.join("\n\n"),
      });
    }
  }, [selectedStandards]);

  const handleStandardSelect = (content: string) => {
    setSelectedStandards((prev) =>
      prev.includes(content)
        ? prev.filter((std) => std !== content)
        : [...prev, content]
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">학습 목표 설정</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">성취목표 조회하기</h3>

        <div className="space-y-4">
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger>
              <SelectValue placeholder="학년군 선택" />
            </SelectTrigger>
            <SelectContent>
              {GRADES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="과목 선택" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger>
              <SelectValue placeholder="영역(단원) 선택" />
            </SelectTrigger>
            <SelectContent>
              {UNITS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => setShowStandards(true)} className="w-full">
            <Search className="mr-2 h-4 w-4" />
            조회
          </Button>
        </div>

        {showStandards && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">선택</TableHead>
                <TableHead>영역(단원)</TableHead>
                <TableHead className="w-[100px]">성취기준 코드</TableHead>
                <TableHead>성취기준명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ACHIEVEMENT_STANDARDS.map((standard) => (
                <TableRow key={standard.code}>
                  <TableCell>
                    <Checkbox
                      checked={selectedStandards.includes(standard.content)}
                      onCheckedChange={() =>
                        handleStandardSelect(standard.content)
                      }
                    />
                  </TableCell>
                  <TableCell>{standard.unit}</TableCell>
                  <TableCell>{standard.code}</TableCell>
                  <TableCell>{standard.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {selectedStandards.length > 0 && (
          <div className="rounded-lg overflow-hidden">
            <h3 className="pl-2 text-sm font-medium mb-2">
              선택한 학습 목표를 자유롭게 수정해 보세요
            </h3>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-b-lg resize-none"
              value={element.content || selectedStandards.join("\n\n")}
              onChange={(e) =>
                onUpdate({ ...element, content: e.target.value })
              }
              rows={Math.max(4, selectedStandards.length * 2)}
              placeholder="내용을 입력하세요..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningGoalEditor;
