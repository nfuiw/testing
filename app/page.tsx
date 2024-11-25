import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-blue-800">XR 돌고래</h1>
        <Link href="/login">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg">
            로그인
          </Button>
        </Link>
      </div>
    </div>
  );
}
