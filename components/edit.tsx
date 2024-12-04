// import React, { useState, useRef, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Slider } from "@/components/ui/slider";
// import { useDrag, useDrop } from "react-dnd";
// import LearningGoalEditor from "./LearningGoalEditor";
// import ObjectTagEditor from "./ObjectTagEditor";
// import QuizEditor from "./QuizEditor";
// import SafetyGuideEditor from "./SafetyGuideEditor";

// interface EditorElement {
//   type:
//     | "learningGoal"
//     | "objectTag"
//     | "subtitle"
//     | "quiz"
//     | "notice"
//     | "safetyGuide";
//   content?: string;
//   position?: { x: number; y: number };
//   imageIndex: number;
//   color: string;
// }

// const ELEMENTS = [
//   { type: "learningGoal", label: "학습 목표", color: "#FF6B6B" },
//   { type: "objectTag", label: "물체 태그", color: "#4ECDC4" },
//   { type: "subtitle", label: "자막", color: "#45B7D1" },
//   { type: "quiz", label: "퀴즈", color: "#96CEB4" },
//   { type: "notice", label: "공지사항", color: "#FFEEAD" },
//   { type: "safetyGuide", label: "안전 관련 안내", color: "#D4A5A5" },
// ] as const;

// const IMAGES = [
//   "/edit_screen.png",
//   "/edit_screen.png",
//   "/edit_screen.png",
//   "/edit_screen.png",
//   "/edit_screen.png",
//   "/edit_screen.png",
// ];

// export default function EditPage() {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [elements, setElements] = useState<EditorElement[]>([]);
//   const [selectedElement, setSelectedElement] = useState<EditorElement | null>(
//     null
//   );

//   const dropRef = useRef<HTMLDivElement>(null);
//   const [, drop] = useDrop<EditorElement, void>({
//     accept: "element",
//     drop: (item: EditorElement, monitor) => {
//       const offset = monitor.getClientOffset();
//       const imageContainer = document.getElementById("imageContainer");
//       if (offset && imageContainer) {
//         const rect = imageContainer.getBoundingClientRect();
//         const x = offset.x - rect.left;
//         const y = offset.y - rect.top;

//         const elementConfig = ELEMENTS.find((el) => el.type === item.type);
//         const newElement = {
//           ...item,
//           position: { x, y },
//           imageIndex: currentImage,
//           color: elementConfig?.color || "#000000",
//         };

//         setElements((prev) => {
//           const filteredElements = prev.filter(
//             (el) => el.imageIndex !== currentImage
//           );
//           return [...filteredElements, newElement];
//         });
//         setSelectedElement(newElement);
//       }
//     },
//   });

//   const [containerWidth, setContainerWidth] = useState(0);

//   useEffect(() => {
//     const imageContainer = document.getElementById("imageContainer");
//     if (imageContainer) {
//       setContainerWidth(imageContainer.clientWidth);
//     }
//   }, []);

//   useEffect(() => {
//     drop(dropRef);
//   }, [drop]);

//   useEffect(() => {
//     const currentElement = elements.find(
//       (el) => el.imageIndex === currentImage
//     );
//     setSelectedElement(currentElement || null);
//   }, [currentImage, elements]);

//   const handleDeleteElement = (elementToDelete: EditorElement) => {
//     setElements((prev) => prev.filter((el) => el !== elementToDelete));
//     if (selectedElement === elementToDelete) {
//       setSelectedElement(null);
//     }
//   };

//   const renderElementContent = (element: EditorElement) => {
//     const renderDeleteButton = () => (
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           handleDeleteElement(element);
//         }}
//         className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
//         aria-label="Delete element"
//       >
//         <svg
//           width="12"
//           height="12"
//           viewBox="0 0 12 12"
//           fill="none"
//           stroke="white"
//           strokeWidth="2"
//           strokeLinecap="round"
//         >
//           <line x1="2" y1="2" x2="10" y2="10" />
//           <line x1="2" y1="10" x2="10" y2="2" />
//         </svg>
//       </button>
//     );

//     if (!element.content)
//       return (
//         <div className="relative pt-4 pr-8">
//           {renderDeleteButton()}
//           <span>{element.type}</span>
//         </div>
//       );

//     switch (element.type) {
//       case "learningGoal":
//         return (
//           <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
//             {renderDeleteButton()}
//             <div className="text-sm font-semibold mb-1.5 opacity-90">
//               학습목표
//             </div>
//             <div className="text-sm leading-snug">{element.content}</div>
//           </div>
//         );

//       case "objectTag":
//         const tagContent = JSON.parse(element.content);
//         return (
//           <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
//             {renderDeleteButton()}
//             <div className="text-sm font-bold mb-1">{tagContent.title}</div>
//             <div className="text-xs leading-snug opacity-90">
//               {tagContent.description}
//             </div>
//           </div>
//         );

//       case "subtitle":
//       case "notice":
//       case "safetyGuide":
//         const labels = {
//           subtitle: "자막",
//           notice: "공지사항",
//           safetyGuide: "안전 관련 안내",
//         };
//         return (
//           <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
//             {renderDeleteButton()}
//             <div className="text-sm font-semibold mb-1.5 opacity-90">
//               {labels[element.type]}
//             </div>
//             <div className="text-sm leading-snug">{element.content}</div>
//           </div>
//         );

//       case "quiz":
//         const quizContent = JSON.parse(element.content);
//         return (
//           <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
//             {renderDeleteButton()}
//             <div className="text-sm font-semibold mb-2">
//               Q. {quizContent.question}
//             </div>
//             <div className="space-y-1">
//               {quizContent.options.map((option: string, i: number) => (
//                 <label
//                   key={i}
//                   className="flex items-center gap-2 p-1.5 bg-white/50 rounded cursor-pointer hover:bg-white/70 transition-colors"
//                 >
//                   <input
//                     type="radio"
//                     className="w-3 h-3"
//                     name="quizOption"
//                     value={i}
//                   />
//                   <span className="text-xs">{option}</span>
//                 </label>
//               ))}
//             </div>
//             <button className="mt-2 w-full py-1 text-xs bg-white/80 hover:bg-white rounded transition-colors">
//               제출
//             </button>
//           </div>
//         );

//       default:
//         return element.content;
//     }
//   };

//   const handleElementUpdate = (updatedElement: EditorElement) => {
//     setSelectedElement(updatedElement);
//     setElements((prev) =>
//       prev.map((el) => (el === selectedElement ? updatedElement : el))
//     );
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="w-1/2 p-4 overflow-y-auto">
//         <div
//           id="imageContainer"
//           ref={dropRef}
//           className="relative w-full h-96 bg-gray-100 overflow-hidden"
//         >
//           <img
//             src={IMAGES[currentImage]}
//             alt={`Content ${currentImage + 1}`}
//             className="w-full h-full object-cover"
//           />
//           {elements
//             .filter((element) => element.imageIndex === currentImage)
//             .map(
//               (element, index) =>
//                 element.position && (
//                   <div
//                     key={index}
//                     className="absolute p-2 border rounded shadow max-h-[calc(100%-16px)] overflow-y-auto"
//                     style={{
//                       left: Math.min(element.position.x, containerWidth - 280),
//                       top: element.position.y,
//                       backgroundColor: element.color,
//                       color: getContrastColor(element.color),
//                       maxWidth: "256px",
//                     }}
//                     onClick={() => setSelectedElement(element)}
//                   >
//                     {renderElementContent(element)}
//                   </div>
//                 )
//             )}
//         </div>

//         <div className="mt-4">
//           <CustomSlider
//             value={currentImage}
//             onChange={setCurrentImage}
//             elements={elements}
//           />
//         </div>

//         <div className="mt-8">
//           <h3 className="text-lg font-semibold">요소 삽입</h3>
//           <p className="text-sm text-gray-500 mb-4">
//             삽입하고 싶은 요소가 적힌 블록을 클릭하고, 원하는 위치로 드래그 &
//             드랍 해주세요.
//           </p>

//           <div className="grid grid-cols-2 gap-4">
//             {ELEMENTS.map((element) => (
//               <DraggableElement key={element.type} {...element} />
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="w-1/2 p-4 border-l">
//         {selectedElement &&
//           (selectedElement.type === "learningGoal" ? (
//             <LearningGoalEditor
//               element={selectedElement}
//               onUpdate={handleElementUpdate}
//             />
//           ) : selectedElement.type === "objectTag" ? (
//             <ObjectTagEditor
//               element={selectedElement}
//               onUpdate={handleElementUpdate}
//             />
//           ) : selectedElement.type === "safetyGuide" ? (
//             <SafetyGuideEditor
//               element={selectedElement}
//               onUpdate={handleElementUpdate}
//             />
//           ) : selectedElement.type === "quiz" ? (
//             <QuizEditor
//               element={selectedElement}
//               onUpdate={handleElementUpdate}
//             />
//           ) : (
//             <Card className="p-4">
//               <h3 className="text-lg font-semibold mb-4">
//                 {ELEMENTS.find((e) => e.type === selectedElement.type)?.label}{" "}
//                 편집
//               </h3>
//               <textarea
//                 className="w-full p-2 border rounded"
//                 value={selectedElement.content || ""}
//                 onChange={(e) => {
//                   handleElementUpdate({
//                     ...selectedElement,
//                     content: e.target.value,
//                   });
//                 }}
//                 placeholder="예. 소장에서는 영양소의 대부분이 흡수됩니다."
//                 rows={4}
//               />
//             </Card>
//           ))}
//       </div>
//     </div>
//   );
// }

// const CustomSlider = ({
//   value,
//   onChange,
//   elements,
// }: {
//   value: number;
//   onChange: (value: number) => void;
//   elements: EditorElement[];
// }) => {
//   return (
//     <div className="relative">
//       <Slider
//         value={[value]}
//         max={5}
//         step={1}
//         onValueChange={(v) => onChange(v[0])}
//         className="cursor-pointer"
//       />
//       {elements.map((element) => (
//         <div
//           key={element.imageIndex}
//           className="absolute w-3 h-3 rounded-full -translate-y-1/2"
//           style={{
//             backgroundColor: element.color,
//             left: `${(element.imageIndex / 5) * 100}%`,
//             top: "50%",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// interface DraggableElementProps {
//   type: string;
//   label: string;
//   color: string;
// }

// const DraggableElement: React.FC<DraggableElementProps> = ({
//   type,
//   label,
//   color,
// }) => {
//   const dragRef = useRef<HTMLDivElement>(null);
//   const [{ isDragging }, drag] = useDrag<
//     EditorElement,
//     unknown,
//     { isDragging: boolean }
//   >({
//     type: "element",
//     item: { type } as EditorElement,
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   useEffect(() => {
//     drag(dragRef);
//   }, [drag]);

//   return (
//     <div
//       ref={dragRef}
//       className={`p-3 rounded cursor-move hover:opacity-80
//         ${isDragging ? "opacity-50" : ""}`}
//       style={{
//         backgroundColor: color,
//         color: getContrastColor(color),
//       }}
//     >
//       {label}
//     </div>
//   );
// };

// function getContrastColor(hexcolor: string) {
//   const r = parseInt(hexcolor.slice(1, 3), 16);
//   const g = parseInt(hexcolor.slice(3, 5), 16);
//   const b = parseInt(hexcolor.slice(5, 7), 16);
//   const yiq = (r * 299 + g * 587 + b * 114) / 1000;
//   return yiq >= 128 ? "#000000" : "#ffffff";
// }

// import React, { useState, useRef, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Slider } from "@/components/ui/slider";
// import { useDrag, useDrop } from "react-dnd";
// import LearningGoalEditor from "./LearningGoalEditor";
// import ObjectTagEditor from "./ObjectTagEditor";
// import QuizEditor from "./QuizEditor";
// import SafetyGuideEditor from "./SafetyGuideEditor";

// interface EditorElement {
//   type:
//     | "learningGoal"
//     | "objectTag"
//     | "subtitle"
//     | "quiz"
//     | "notice"
//     | "safetyGuide";
//   content?: string;
//   position?: { x: number; y: number };
//   imageIndex: number;
//   color: string;
// }

// interface ImageBrightness {
//   [key: number]: number;
// }

// const ELEMENTS = [
//   { type: "learningGoal", label: "학습 목표", color: "#FF6B6B" },
//   { type: "objectTag", label: "물체 태그", color: "#4ECDC4" },
//   { type: "subtitle", label: "자막", color: "#45B7D1" },
//   { type: "quiz", label: "퀴즈", color: "#96CEB4" },
//   { type: "notice", label: "공지사항", color: "#FFEEAD" },
//   { type: "safetyGuide", label: "안전 관련 안내", color: "#D4A5A5" },
// ] as const;

// const IMAGES = [
//   "/edit_screen.png",
//   "/edit_screen.png",
//   "/edit_screen.png",
//   "/edit_screen.png",
//   "/edit_screen.png",
//   "/edit_screen.png",
// ];

// export default function EditPage() {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [elements, setElements] = useState<EditorElement[]>([]);
//   const [selectedElement, setSelectedElement] = useState<EditorElement | null>(
//     null
//   );
//   const [brightness, setBrightness] = useState<ImageBrightness>(
//     Object.fromEntries(IMAGES.map((_, i) => [i, 50]))
//   );

//   const dropRef = useRef<HTMLDivElement>(null);
//   const [, drop] = useDrop<EditorElement, void>({
//     accept: "element",
//     drop: (item: EditorElement, monitor) => {
//       const offset = monitor.getClientOffset();
//       const imageContainer = document.getElementById("imageContainer");
//       if (offset && imageContainer) {
//         const rect = imageContainer.getBoundingClientRect();
//         const x = offset.x - rect.left;
//         const y = offset.y - rect.top;

//         const elementConfig = ELEMENTS.find((el) => el.type === item.type);
//         const newElement = {
//           ...item,
//           position: { x, y },
//           imageIndex: currentImage,
//           color: elementConfig?.color || "#000000",
//         };

//         setElements((prev) => {
//           const filteredElements = prev.filter(
//             (el) => el.imageIndex !== currentImage
//           );
//           return [...filteredElements, newElement];
//         });
//         setSelectedElement(newElement);
//       }
//     },
//   });

//   const [containerWidth, setContainerWidth] = useState(0);

//   useEffect(() => {
//     const imageContainer = document.getElementById("imageContainer");
//     if (imageContainer) {
//       setContainerWidth(imageContainer.clientWidth);
//     }
//   }, []);

//   useEffect(() => {
//     drop(dropRef);
//   }, [drop]);

//   useEffect(() => {
//     const currentElement = elements.find(
//       (el) => el.imageIndex === currentImage
//     );
//     setSelectedElement(currentElement || null);
//   }, [currentImage, elements]);

//   const handleDeleteElement = (elementToDelete: EditorElement) => {
//     setElements((prev) => prev.filter((el) => el !== elementToDelete));
//     if (selectedElement === elementToDelete) {
//       setSelectedElement(null);
//     }
//   };

//   const renderElementContent = (element: EditorElement) => {
//     const renderDeleteButton = () => (
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           handleDeleteElement(element);
//         }}
//         className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
//         aria-label="Delete element"
//       >
//         <svg
//           width="12"
//           height="12"
//           viewBox="0 0 12 12"
//           fill="none"
//           stroke="white"
//           strokeWidth="2"
//           strokeLinecap="round"
//         >
//           <line x1="2" y1="2" x2="10" y2="10" />
//           <line x1="2" y1="10" x2="10" y2="2" />
//         </svg>
//       </button>
//     );

//     if (!element.content)
//       return (
//         <div className="relative pt-4 pr-8">
//           {renderDeleteButton()}
//           <span>{element.type}</span>
//         </div>
//       );

//     switch (element.type) {
//       case "learningGoal":
//         return (
//           <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
//             {renderDeleteButton()}
//             <div className="text-sm font-semibold mb-1.5 opacity-90">
//               학습목표
//             </div>
//             <div className="text-sm leading-snug">{element.content}</div>
//           </div>
//         );

//       case "objectTag":
//         const tagContent = JSON.parse(element.content);
//         return (
//           <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
//             {renderDeleteButton()}
//             <div className="text-sm font-bold mb-1">{tagContent.title}</div>
//             <div className="text-xs leading-snug opacity-90">
//               {tagContent.description}
//             </div>
//           </div>
//         );

//       case "subtitle":
//       case "notice":
//       case "safetyGuide":
//         const labels = {
//           subtitle: "자막",
//           notice: "공지사항",
//           safetyGuide: "안전 관련 안내",
//         };
//         return (
//           <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
//             {renderDeleteButton()}
//             <div className="text-sm font-semibold mb-1.5 opacity-90">
//               {labels[element.type]}
//             </div>
//             <div className="text-sm leading-snug">{element.content}</div>
//           </div>
//         );

//       case "quiz":
//         const quizContent = JSON.parse(element.content);
//         return (
//           <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
//             {renderDeleteButton()}
//             <div className="text-sm font-semibold mb-2">
//               Q. {quizContent.question}
//             </div>
//             <div className="space-y-1">
//               {quizContent.options.map((option: string, i: number) => (
//                 <label
//                   key={i}
//                   className="flex items-center gap-2 p-1.5 bg-white/50 rounded cursor-pointer hover:bg-white/70 transition-colors"
//                 >
//                   <input
//                     type="radio"
//                     className="w-3 h-3"
//                     name="quizOption"
//                     value={i}
//                   />
//                   <span className="text-xs">{option}</span>
//                 </label>
//               ))}
//             </div>
//             <button className="mt-2 w-full py-1 text-xs bg-white/80 hover:bg-white rounded transition-colors">
//               제출
//             </button>
//           </div>
//         );

//       default:
//         return element.content;
//     }
//   };

//   const handleElementUpdate = (updatedElement: EditorElement) => {
//     setSelectedElement(updatedElement);
//     setElements((prev) =>
//       prev.map((el) => (el === selectedElement ? updatedElement : el))
//     );
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="w-1/2 p-4 overflow-y-auto">
//         <div
//           id="imageContainer"
//           ref={dropRef}
//           className="relative w-full h-96 bg-gray-100 overflow-hidden"
//         >
//           <img
//             src={IMAGES[currentImage]}
//             alt={`Content ${currentImage + 1}`}
//             className="w-full h-full object-cover transition-all duration-200"
//             style={{
//               filter: `brightness(${brightness[currentImage] / 50})`,
//             }}
//           />
//           {elements
//             .filter((element) => element.imageIndex === currentImage)
//             .map(
//               (element, index) =>
//                 element.position && (
//                   <div
//                     key={index}
//                     className="absolute p-2 border rounded shadow max-h-[calc(100%-16px)] overflow-y-auto"
//                     style={{
//                       left: Math.min(element.position.x, containerWidth - 280),
//                       top: element.position.y,
//                       backgroundColor: element.color,
//                       color: getContrastColor(element.color),
//                       maxWidth: "256px",
//                     }}
//                     onClick={() => setSelectedElement(element)}
//                   >
//                     {renderElementContent(element)}
//                   </div>
//                 )
//             )}
//         </div>

//         <div className="mt-4">
//           <CustomSlider
//             value={currentImage}
//             onChange={setCurrentImage}
//             elements={elements}
//           />
//         </div>

//         <div className="mt-8">
//           <h3 className="text-lg font-semibold">요소 삽입</h3>
//           <p className="text-sm text-gray-500 mb-4">
//             삽입하고 싶은 요소가 적힌 블록을 클릭하고, 원하는 위치로 드래그 &
//             드랍 해주세요.
//           </p>

//           <div className="grid grid-cols-2 gap-4 mb-8">
//             {ELEMENTS.map((element) => (
//               <DraggableElement key={element.type} {...element} />
//             ))}
//           </div>

//           <div className="mt-8 border-t pt-6">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-lg font-semibold">콘텐츠 밝기 조절</h3>
//               <span className="text-sm text-gray-500">
//                 {brightness[currentImage]}%
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 className="text-gray-400"
//               >
//                 <circle cx="12" cy="12" r="5" />
//                 <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
//               </svg>
//               <Slider
//                 value={[brightness[currentImage]]}
//                 max={100}
//                 min={0}
//                 step={1}
//                 className="flex-1"
//                 onValueChange={(newValue) => {
//                   setBrightness((prev) => ({
//                     ...prev,
//                     [currentImage]: newValue[0],
//                   }));
//                 }}
//               />
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 className="text-gray-400"
//               >
//                 <circle cx="12" cy="12" r="5" />
//                 <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-1/2 p-4 border-l">
//         {selectedElement &&
//           (selectedElement.type === "learningGoal" ? (
//             <LearningGoalEditor
//               element={selectedElement}
//               onUpdate={handleElementUpdate}
//             />
//           ) : selectedElement.type === "objectTag" ? (
//             <ObjectTagEditor
//               element={selectedElement}
//               onUpdate={handleElementUpdate}
//             />
//           ) : selectedElement.type === "safetyGuide" ? (
//             <SafetyGuideEditor
//               element={selectedElement}
//               onUpdate={handleElementUpdate}
//             />
//           ) : selectedElement.type === "quiz" ? (
//             <QuizEditor
//               element={selectedElement}
//               onUpdate={handleElementUpdate}
//             />
//           ) : (
//             <Card className="p-4">
//               <h3 className="text-lg font-semibold mb-4">
//                 {ELEMENTS.find((e) => e.type === selectedElement.type)?.label}{" "}
//                 편집
//               </h3>
//               <textarea
//                 className="w-full p-2 border rounded"
//                 value={selectedElement.content || ""}
//                 onChange={(e) => {
//                   handleElementUpdate({
//                     ...selectedElement,
//                     content: e.target.value,
//                   });
//                 }}
//                 placeholder="예. 소장에서는 영양소의 대부분이 흡수됩니다."
//                 rows={4}
//               />
//             </Card>
//           ))}
//       </div>
//     </div>
//   );
// }

// const CustomSlider = ({
//   value,
//   onChange,
//   elements,
// }: {
//   value: number;
//   onChange: (value: number) => void;
//   elements: EditorElement[];
// }) => {
//   return (
//     <div className="relative">
//       <Slider
//         value={[value]}
//         max={5}
//         step={1}
//         onValueChange={(v) => onChange(v[0])}
//         className="cursor-pointer"
//       />
//       {elements.map((element) => (
//         <div
//           key={element.imageIndex}
//           className="absolute w-3 h-3 rounded-full -translate-y-1/2"
//           style={{
//             backgroundColor: element.color,
//             left: `${(element.imageIndex / 5) * 100}%`,
//             top: "50%",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// interface DraggableElementProps {
//   type: string;
//   label: string;
//   color: string;
// }

// const DraggableElement: React.FC<DraggableElementProps> = ({
//   type,
//   label,
//   color,
// }) => {
//   const dragRef = useRef<HTMLDivElement>(null);
//   const [{ isDragging }, drag] = useDrag<
//     EditorElement,
//     unknown,
//     { isDragging: boolean }
//   >({
//     type: "element",
//     item: { type } as EditorElement,
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   useEffect(() => {
//     drag(dragRef);
//   }, [drag]);

//   return (
//     <div
//       ref={dragRef}
//       className={`p-3 rounded cursor-move hover:opacity-80
//         ${isDragging ? "opacity-50" : ""}`}
//       style={{
//         backgroundColor: color,
//         color: getContrastColor(color),
//       }}
//     >
//       {label}
//     </div>
//   );
// };

// function getContrastColor(hexcolor: string) {
//   const r = parseInt(hexcolor.slice(1, 3), 16);
//   const g = parseInt(hexcolor.slice(3, 5), 16);
//   const b = parseInt(hexcolor.slice(5, 7), 16);
//   const yiq = (r * 299 + g * 587 + b * 114) / 1000;
//   return yiq >= 128 ? "#000000" : "#ffffff";
// }

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
  { type: "objectTag", label: "물체 설명", color: "#4ECDC4" },
  { type: "subtitle", label: "자막", color: "#45B7D1" },
  { type: "quiz", label: "퀴즈", color: "#96CEB4" },
  { type: "notice", label: "공지사항", color: "#FFEEAD" },
  { type: "safetyGuide", label: "안전 관련 안내", color: "#D4A5A5" },
] as const;

const IMAGES = [
  "/edit_screen.png",
  "/edit_screen.png",
  "/edit_screen.png",
  "/edit_screen.png",
  "/edit_screen.png",
  "/edit_screen.png",
];

export default function EditPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<EditorElement | null>(
    null
  );
  const [globalBrightness, setGlobalBrightness] = useState(50);

  const dropRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<EditorElement, void>({
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

  const handleDeleteElement = (elementToDelete: EditorElement) => {
    setElements((prev) => prev.filter((el) => el !== elementToDelete));
    if (selectedElement === elementToDelete) {
      setSelectedElement(null);
    }
  };

  const renderElementContent = (element: EditorElement) => {
    const renderDeleteButton = () => (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteElement(element);
        }}
        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
        aria-label="Delete element"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="2" y1="2" x2="10" y2="10" />
          <line x1="2" y1="10" x2="10" y2="2" />
        </svg>
      </button>
    );

    if (!element.content)
      return (
        <div className="relative pt-4 pr-8">
          {renderDeleteButton()}
          <span>
            {element.type === "learningGoal"
              ? "학습 목표"
              : element.type === "objectTag"
              ? "물체 설명"
              : element.type === "subtitle"
              ? "자막"
              : element.type === "quiz"
              ? "퀴즈"
              : element.type === "notice"
              ? "공지사항"
              : element.type === "safetyGuide"
              ? "안전 관련 안내"
              : element.type}
          </span>
        </div>
      );

    switch (element.type) {
      case "learningGoal":
        return (
          <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
            {renderDeleteButton()}
            <div className="text-sm font-semibold mb-1.5 opacity-90">
              학습목표
            </div>
            <div className="text-sm leading-snug">{element.content}</div>
          </div>
        );

      case "objectTag":
        const tagContent = JSON.parse(element.content);
        return (
          <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
            {renderDeleteButton()}
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
          <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
            {renderDeleteButton()}
            <div className="text-sm font-semibold mb-1.5 opacity-90">
              {labels[element.type]}
            </div>
            <div className="text-sm leading-snug">{element.content}</div>
          </div>
        );

      case "quiz":
        const quizContent = JSON.parse(element.content);
        return (
          <div className="relative backdrop-blur-sm bg-white/30 rounded-lg p-3 pt-4 pr-8">
            {renderDeleteButton()}
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
            className="w-full h-full object-cover transition-all duration-200"
            style={{
              filter: `brightness(${globalBrightness / 50})`,
            }}
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

          <div className="grid grid-cols-2 gap-4 mb-8">
            {ELEMENTS.map((element) => (
              <DraggableElement key={element.type} {...element} />
            ))}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">콘텐츠 밝기 조절</h3>
              <span className="text-sm text-gray-500">{globalBrightness}%</span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <Slider
                value={[globalBrightness]}
                max={100}
                min={0}
                step={1}
                className="flex-1"
                onValueChange={(newValue) => {
                  setGlobalBrightness(newValue[0]);
                }}
              />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </div>
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
          ) : selectedElement.type === "subtitle" ? (
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
                placeholder="예. 소장에서는 영양소의 대부분이 흡수됩니다."
                rows={4}
              />
            </Card>
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
                placeholder="예. 특히 음식물의 크기가 어떻게 작아지는지를 관찰해 보세요!"
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

function getContrastColor(hexcolor: string) {
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff";
}
