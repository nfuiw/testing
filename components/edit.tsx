import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useDrag, useDrop } from "react-dnd";
import LearningGoalEditor from "./LearningGoalEditor";
import ObjectTagEditor from "./ObjectTagEditor";
import QuizEditor from "./QuizEditor";
import SafetyGuideEditor from "./SafetyGuideEditor";

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

const ELEMENTS = [
  { type: "learningGoal", label: "학습 목표", color: "#FF6B6B" },
  { type: "objectTag", label: "물체 태그", color: "#4ECDC4" },
  { type: "subtitle", label: "자막", color: "#45B7D1" },
  { type: "quiz", label: "퀴즈", color: "#96CEB4" },
  { type: "notice", label: "공지사항", color: "#FFEEAD" },
  { type: "safetyGuide", label: "안전 관련 안내", color: "#D4A5A5" },
] as const;

const IMAGES = [
  "/images/scene1.jpg",
  "/images/scene2.jpg",
  "/images/scene3.jpg",
  "/images/scene4.jpg",
  "/images/scene5.jpg",
  "/images/scene6.jpg",
];

export default function EditPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<EditorElement | null>(
    null
  );

  const dropRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<EditorElement, void, any>({
    accept: "element",
    drop: (item: EditorElement, monitor) => {
      const offset = monitor.getClientOffset();
      const imageContainer = document.getElementById("imageContainer");
      if (offset && imageContainer) {
        const rect = imageContainer.getBoundingClientRect();
        const x = offset.x - rect.left;
        const y = offset.y - rect.top;

        const elementConfig = ELEMENTS.find((el) => el.type === item.type);
        const newElement = {
          ...item,
          position: { x, y },
          imageIndex: currentImage,
          color: elementConfig?.color || "#000000",
        };

        setElements((prev) => {
          const filteredElements = prev.filter(
            (el) => el.imageIndex !== currentImage
          );
          return [...filteredElements, newElement];
        });
        setSelectedElement(newElement);
      }
    },
  });

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const imageContainer = document.getElementById("imageContainer");
    if (imageContainer) {
      setContainerWidth(imageContainer.clientWidth);
    }
  }, []);

  useEffect(() => {
    drop(dropRef);
  }, [drop]);

  useEffect(() => {
    const currentElement = elements.find(
      (el) => el.imageIndex === currentImage
    );
    setSelectedElement(currentElement || null);
  }, [currentImage, elements]);

  // 수정할 곳
  const renderElementContent = (element: EditorElement) => {
    if (!element.content) return element.type;

    switch (element.type) {
      case "learningGoal":
        return (
          <div className="backdrop-blur-sm bg-white/30 rounded-lg p-3">
            <div className="text-sm font-semibold mb-1.5 opacity-90">
              학습목표
            </div>
            <div className="text-sm leading-snug">{element.content}</div>
          </div>
        );

      case "objectTag":
        const tagContent = JSON.parse(element.content);
        return (
          <div className="backdrop-blur-sm bg-white/30 rounded-lg p-3">
            <div className="text-sm font-bold mb-1">{tagContent.title}</div>
            <div className="text-xs leading-snug opacity-90">
              {tagContent.description}
            </div>
          </div>
        );

      case "subtitle":
      case "notice":
      case "safetyGuide":
        const labels = {
          subtitle: "자막",
          notice: "공지사항",
          safetyGuide: "안전 관련 안내",
        };
        return (
          <div className="backdrop-blur-sm bg-white/30 rounded-lg p-3">
            <div className="text-sm font-semibold mb-1.5 opacity-90">
              {labels[element.type]}
            </div>
            <div className="text-sm leading-snug">{element.content}</div>
          </div>
        );

      case "quiz":
        const quizContent = JSON.parse(element.content);
        return (
          <div className="backdrop-blur-sm bg-white/30 rounded-lg p-3">
            <div className="text-sm font-semibold mb-2">
              Q. {quizContent.question}
            </div>
            <div className="space-y-1">
              {quizContent.options.map((option: string, i: number) => (
                <label
                  key={i}
                  className="flex items-center gap-2 p-1.5 bg-white/50 rounded cursor-pointer hover:bg-white/70 transition-colors"
                >
                  <input
                    type="radio"
                    className="w-3 h-3"
                    name="quizOption"
                    value={i}
                  />
                  <span className="text-xs">{option}</span>
                </label>
              ))}
            </div>
            <button className="mt-2 w-full py-1 text-xs bg-white/80 hover:bg-white rounded transition-colors">
              제출
            </button>
          </div>
        );

      default:
        return element.content;
    }
  };

  const handleElementUpdate = (updatedElement: EditorElement) => {
    setSelectedElement(updatedElement);
    setElements((prev) =>
      prev.map((el) => (el === selectedElement ? updatedElement : el))
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 overflow-y-auto">
        <div
          id="imageContainer"
          ref={dropRef}
          className="relative w-full h-96 bg-gray-100 overflow-hidden"
        >
          <img
            src={IMAGES[currentImage]}
            alt={`Content ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />
          {elements
            .filter((element) => element.imageIndex === currentImage)
            .map(
              (element, index) =>
                element.position && (
                  <div
                    key={index}
                    className="absolute p-2 border rounded shadow max-h-[calc(100%-16px)] overflow-y-auto"
                    style={{
                      left: Math.min(element.position.x, containerWidth - 280),
                      top: element.position.y,
                      backgroundColor: element.color,
                      color: getContrastColor(element.color),
                      maxWidth: "256px",
                    }}
                    onClick={() => setSelectedElement(element)}
                  >
                    {renderElementContent(element)}
                  </div>
                )
            )}
        </div>

        <div className="mt-4">
          <CustomSlider
            value={currentImage}
            onChange={setCurrentImage}
            elements={elements}
          />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">요소 삽입</h3>
          <p className="text-sm text-gray-500 mb-4">
            삽입하고 싶은 요소가 적힌 블록을 클릭하고, 원하는 위치로 드래그 &
            드랍 해주세요.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {ELEMENTS.map((element) => (
              <DraggableElement key={element.type} {...element} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-1/2 p-4 border-l">
        {selectedElement &&
          (selectedElement.type === "learningGoal" ? (
            <LearningGoalEditor
              element={selectedElement}
              onUpdate={handleElementUpdate}
            />
          ) : selectedElement.type === "objectTag" ? (
            <ObjectTagEditor
              element={selectedElement}
              onUpdate={handleElementUpdate}
            />
          ) : selectedElement.type === "safetyGuide" ? (
            <SafetyGuideEditor
              element={selectedElement}
              onUpdate={handleElementUpdate}
            />
          ) : selectedElement.type === "quiz" ? (
            <QuizEditor
              element={selectedElement}
              onUpdate={handleElementUpdate}
            />
          ) : (
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">
                {ELEMENTS.find((e) => e.type === selectedElement.type)?.label}{" "}
                편집
              </h3>
              <textarea
                className="w-full p-2 border rounded"
                value={selectedElement.content || ""}
                onChange={(e) => {
                  handleElementUpdate({
                    ...selectedElement,
                    content: e.target.value,
                  });
                }}
                placeholder="내용을 입력하세요"
                rows={4}
              />
            </Card>
          ))}
      </div>
    </div>
  );
}

const CustomSlider = ({
  value,
  onChange,
  elements,
}: {
  value: number;
  onChange: (value: number) => void;
  elements: EditorElement[];
}) => {
  return (
    <div className="relative">
      <Slider
        value={[value]}
        max={5}
        step={1}
        onValueChange={(v) => onChange(v[0])}
        className="cursor-pointer"
      />
      {elements.map((element) => (
        <div
          key={element.imageIndex}
          className="absolute w-3 h-3 rounded-full -translate-y-1/2"
          style={{
            backgroundColor: element.color,
            left: `${(element.imageIndex / 5) * 100}%`,
            top: "50%",
          }}
        />
      ))}
    </div>
  );
};

interface DraggableElementProps {
  type: string;
  label: string;
  color: string;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  type,
  label,
  color,
}) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag<
    EditorElement,
    unknown,
    { isDragging: boolean }
  >({
    type: "element",
    item: { type } as EditorElement,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    drag(dragRef);
  }, [drag]);

  return (
    <div
      ref={dragRef}
      className={`p-3 rounded cursor-move hover:opacity-80 
        ${isDragging ? "opacity-50" : ""}`}
      style={{
        backgroundColor: color,
        color: getContrastColor(color),
      }}
    >
      {label}
    </div>
  );
};

// 배경색에 따라 텍스트 색상을 자동으로 조정하는 유틸리티 함수
function getContrastColor(hexcolor: string) {
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff";
}
