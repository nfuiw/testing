import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SaveModal = () => {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const handleLibraryClick = () => {
    router.push("/my-library");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="font-bold">
              XR 콘텐츠 편집 내용이 저장되었습니다.
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center text-sm text-gray-600">
          추가할 요소가 있으면 편집 화면으로 돌아가 계속하실 수 있습니다.
          <br />
          XR 콘텐츠 편집을 완료하였으면, 라이브러리로 이동하여 공유할 수
          있습니다.
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setOpen(false)}
          >
            계속 편집하기
          </Button>
          <Button className="flex-1" onClick={handleLibraryClick}>
            마이 라이브러리로 이동
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveModal;
