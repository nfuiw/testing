import { RefreshCw } from "lucide-react";
import { useState } from "react";

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

interface SafetyGuideEditorProps {
  element: EditorElement;
  onUpdate: (element: EditorElement) => void;
}

const DEFAULT_GUIDES = [
  [
    "지금부터 속도가 빨라집니다. 유의해주세요.",
    "멀미가 나는 학생은 손을 들어주세요.",
    "친구와 부딪히지 않게 조심합니다.",
    "고소공포증이 있는 학생은 잠시 눈을 감아도 됩니다.",
    "도움이 필요한 학생은 손을 들어주세요.",
  ],
  [
    "3D 화면에 현기증이 날 수 있습니다.",
    "눈이 피로한 경우 잠시 휴식하세요.",
    "화면과 적정 거리를 유지해주세요.",
    "주변 친구들과 충분한 간격을 확보하세요.",
    "불편함을 느끼면 선생님께 알려주세요.",
  ],
  [
    "갑작스러운 소리가 발생할 수 있습니다.",
    "장비를 조심히 다뤄주세요.",
    "움직임이 클 수 있으니 주변을 확인하세요.",
    "어지러움이 느껴지면 즉시 알려주세요.",
    "안전 거리를 반드시 지켜주세요.",
  ],
];

const SafetyGuideEditor: React.FC<SafetyGuideEditorProps> = ({
  element,
  onUpdate,
}) => {
  const [currentGuideSet, setCurrentGuideSet] = useState(0);

  const handleRefresh = () => {
    setCurrentGuideSet((prev) => (prev + 1) % DEFAULT_GUIDES.length);
  };

  const handleGuideSelect = (guide: string) => {
    onUpdate({
      ...element,
      content: guide,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">안전 관련 안내</h2>
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">안전 안내 예시</h3>
          <div className="space-y-2">
            {DEFAULT_GUIDES[currentGuideSet].map((guide, index) => (
              <div
                key={index}
                onClick={() => handleGuideSelect(guide)}
                className="p-2 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
              >
                {guide}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="pl-2 text-sm font-medium mb-2">
            자유롭게 수정해보세요
          </h3>
          <textarea
            className="w-full p-2 border rounded-md"
            value={element.content || ""}
            onChange={(e) =>
              onUpdate({
                ...element,
                content: e.target.value,
              })
            }
            placeholder="안전 관련 안내 내용을 입력하세요"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default SafetyGuideEditor;
