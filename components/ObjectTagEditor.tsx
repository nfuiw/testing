import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Search, Link2, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

interface ObjectTagEditorProps {
  element: EditorElement;
  onUpdate: (element: EditorElement) => void;
}

interface TagContent {
  title?: string;
  description?: string;
  media?: {
    type: string;
    url: string;
  };
}

const ObjectTagEditor: React.FC<ObjectTagEditorProps> = ({
  element,
  onUpdate,
}) => {
  const content = element.content
    ? (JSON.parse(element.content) as TagContent)
    : {};

  const updateContent = (newContent: Partial<TagContent>) => {
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
      <h2 className="text-xl font-semibold">태그 설정</h2>

      <Tabs defaultValue="text">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">텍스트 추가</TabsTrigger>
          <TabsTrigger value="media">미디어 추가</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">제목</label>
            <Input
              value={content.title || ""}
              onChange={(e) => updateContent({ title: e.target.value })}
              placeholder="제목을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">설명</label>
            <textarea
              className="w-full p-2 border rounded"
              value={content.description || ""}
              onChange={(e) => updateContent({ description: e.target.value })}
              placeholder="설명을 입력하세요"
              rows={4}
            />
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <div>
            <h3 className="font-medium mb-4">미디어 파일</h3>
            <div className="flex gap-4 justify-center mb-6">
              <Upload className="w-6 h-6 cursor-pointer" />
              <Search className="w-6 h-6 cursor-pointer" />
              <Link2 className="w-6 h-6 cursor-pointer" />
              <Mic className="w-6 h-6 cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">썸네일</h3>
            <div className="flex gap-4">
              <div className="w-32 h-32 border-2 border-dashed rounded flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  직접 업로드
                </Button>
                <Button variant="outline" className="w-full">
                  자동 생성하기
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ObjectTagEditor;
