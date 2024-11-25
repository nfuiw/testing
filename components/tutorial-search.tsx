import React from "react";
import { Search, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const TutorialSearch = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("검색어:", searchTerm);
  };

  const handleAdvancedSearch = () => {
    router.push("/main/detailed-search");
  };

  return (
    <>
      <style jsx global>{`
        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 20px 10px rgba(255, 204, 0, 0.2);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 204, 0, 0);
          }
        }
        .glow-effect {
          animation: glowPulse 1s ease-in-out 30;
        }
      `}</style>

      <div className="min-h-[50vh] w-full flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-4xl mx-auto px-4 pt-44">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="어떤 콘텐츠를 찾고 계신가요?"
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-4 text-lg font-medium bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              검색
            </button>

            <button
              type="button"
              onClick={handleAdvancedSearch}
              className="glow-effect flex items-center gap-2 px-6 py-4 text-lg font-medium border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Plus className="h-6 w-6" />
              <span>상세 검색</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TutorialSearch;
