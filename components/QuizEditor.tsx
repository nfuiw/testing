import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuizContent {
  question: string;
  options: string[];
  correctAnswer: number;
}
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

interface QuizEditorProps {
  element: EditorElement;
  onUpdate: (element: EditorElement) => void;
}

const QuizEditor: React.FC<QuizEditorProps> = ({ element, onUpdate }) => {
  const content = element.content
    ? (JSON.parse(element.content) as QuizContent)
    : {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      };

  const updateContent = (newContent: Partial<QuizContent>) => {
    onUpdate({
      ...element,
      content: JSON.stringify({
        ...content,
        ...newContent,
      }),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">퀴즈 만들기</h2>

      <div className="space-y-4">
        <div>
          <Label>문제</Label>
          <textarea
            className="w-full p-2 border rounded mt-2"
            value={content.question}
            onChange={(e) => updateContent({ question: e.target.value })}
            placeholder="문제를 입력하세요"
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <div className="flex">
            <Label>선택지 </Label>
            <Label className="text-gray-400 ml-2">
              - 선택된 항목이 정답으로 처리됩니다.
            </Label>
          </div>

          <RadioGroup
            value={content.correctAnswer.toString()}
            onValueChange={(value) =>
              updateContent({ correctAnswer: parseInt(value) })
            }
          >
            {content.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...content.options];
                    newOptions[index] = e.target.value;
                    updateContent({ options: newOptions });
                  }}
                  placeholder={`선택지 ${index + 1}`}
                  className="flex-1"
                />
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default QuizEditor;
