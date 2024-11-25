import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock,
  Users,
  GraduationCap,
  Download,
  Play,
  Edit,
  Users2,
  ArrowLeft,
  BookOpen,
  Target,
  FileText,
  ClipboardCheck,
} from "lucide-react";
import Link from "next/link";

const ContentDetails = () => {
  const router = useRouter();
  const handleVersionClick = () => {
    router.push("/main/contents/details/edited-versions");
  };
  const handleEditClick = () => {
    router.push("/main/edit");
  };
  const content = {
    id: "1",
    title: "소화기관으로 떠나는 신기한 XR버스",
    description: "소화기관의 구조와 기능을 실감나는 XR 체험으로 알아봅니다.",
    tags: ["생물", "우리몸", "소화", "소화기관"],
    duration: 15,
    grade: 5,
    usageCount: 1200,
    rating: 4.9,
    difficulty: "medium",
    imageUrl: "/results_0.png",
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/test.txt";
    link.download = "test.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-[1400px]">
        <Link
          href="/main/contents"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          콘텐츠 목록으로 돌아가기
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽 섹션: 이미지와 콘텐츠 정보 */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-0">
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="space-y-3">
                    {" "}
                    {/* 상단 부분의 간격만 더 좁게 조정 */}
                    <div className="flex flex-wrap gap-2">
                      {content.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-bold">{content.title}</h1>
                      <div className="flex items-center">
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        <span className="ml-2 text-xl text-yellow-600">
                          {content.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{content.duration}분</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{content.grade}학년</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{content.usageCount}회 사용됨</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-6">
                    {" "}
                    {/* 나머지 부분은 기존 간격 유지 */}
                    <div className="flex flex-col gap-3 pt-4">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        콘텐츠 시작하기
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleEditClick}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        콘텐츠 편집하기
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleVersionClick}
                      >
                        <Users2 className="w-4 h-4 mr-2" />
                        다른 선생님이 편집한 버전 보기
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽 섹션: 탭 컨텐츠 */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <Tabs defaultValue="overview" className="h-full">
                <TabsList className="w-full grid grid-cols-4 p-1 bg-gray-50 h-14">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-white rounded-lg h-10"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    콘텐츠 개요
                  </TabsTrigger>
                  <TabsTrigger
                    value="objectives"
                    className="data-[state=active]:bg-white rounded-lg h-10"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    학습 목표
                  </TabsTrigger>
                  <TabsTrigger
                    value="guide"
                    className="data-[state=active]:bg-white rounded-lg h-10"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    교사 가이드
                  </TabsTrigger>
                  <TabsTrigger
                    value="evaluation"
                    className="data-[state=active]:bg-white rounded-lg h-10"
                  >
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    평가 자료
                  </TabsTrigger>
                </TabsList>

                <div className="p-6 h-[calc(100%-60px)] overflow-y-auto">
                  <TabsContent value="overview" className="mt-0 h-full">
                    <h2 className="text-xl font-bold m-4 ml-1 pb-2">
                      콘텐츠 소개
                    </h2>
                    <div className="space-y-8">
                      <div>
                        {/* <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                          <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                          콘텐츠 소개
                        </h3> */}
                        <p className="text-gray-600 leading-relaxed pl-3">
                          {content.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                          <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                          콘텐츠 주요 특징
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-700 mb-2">
                              소장 내부 구조의 입체적 관찰
                            </h4>
                            <p className="text-sm text-blue-600">
                              실제 크기로 확대된 소장 내부를 360도로 관찰할 수
                              있습니다.
                            </p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-medium text-green-700 mb-2">
                              영양소 흡수 과정을 간접 체험
                            </h4>
                            <p className="text-sm text-green-600">
                              영양소가 흡수되는 과정을 실감나게 체험할 수
                              있습니다.
                            </p>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-medium text-purple-700 mb-2">
                              소화 기관 시스템 이해
                            </h4>
                            <p className="text-sm text-purple-600">
                              각 소화 기관의 역할과 연결성을 이해할 수 있습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="objectives" className="mt-0 h-full">
                    <h2 className="text-xl font-bold m-4 ml-1 pb-2">
                      학습 목표
                    </h2>
                    <div className="space-y-8">
                      <div>
                        {/* <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                          <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                          학습 목표
                        </h3> */}
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-gray-800">
                            소화 기관의 구조와 기능을 설명할 수 있다.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                          <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                          학습 주제
                        </h3>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-gray-800">
                            음식물은 우리 몸속에서 어떻게 될까요?
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                          <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                          관련 역량
                        </h3>
                        <div className="flex gap-3">
                          <div className="flex-1 p-4 bg-green-50 rounded-lg">
                            <h4 className="font-medium text-green-700 mb-2">
                              과학적 문제 해결 역량
                            </h4>
                            <p className="text-sm text-green-600">
                              실험과 관찰을 통한 문제 해결
                            </p>
                          </div>
                          <div className="flex-1 p-4 bg-yellow-50 rounded-lg">
                            <h4 className="font-medium text-yellow-700 mb-2">
                              의사소통 역량
                            </h4>
                            <p className="text-sm text-yellow-600">
                              과학적 의사소통 능력 향상
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="guide" className="mt-0 h-full">
                    <h2 className="text-xl font-bold m-4 ml-1">교사 가이드</h2>
                    <div>
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-gray-800">
                          수업 진행에 필요한 가이드와 자료를 다운로드 할 수
                          있습니다.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        {[
                          {
                            title: "수업 지도안",
                            desc: "좀 더 상세한 설명을 주세요..",
                          },
                          {
                            title: "교과서",
                            desc: "좀 더 상세한 설명을 주세요..",
                          },
                          {
                            title: "실험 관찰",
                            desc: "좀 더 상세한 설명을 주세요..",
                          },
                          {
                            title: "활동지",
                            desc: "좀 더 상세한 설명을 주세요..",
                          },
                          {
                            title: "PPT 자료",
                            desc: "좀 더 상세한 설명을 주세요..",
                          },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className={`flex mt-2.5 items-center justify-between p-4 border-2 rounded-lg border-blue-100 hover:bg-blue-50 transition-colors`}
                          >
                            <div className="flex">
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="ml-2 font-medium text-gray-400">
                                - {item.desc}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleDownload}
                              className="border-2"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              다운로드
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="evaluation" className="mt-0 h-full">
                    <div>
                      <h2 className="text-xl font-bold m-4 ml-1">평가 자료</h2>
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-gray-800">
                          수행평가, 단원평가 등 다양한 평가 자료를 다운로드 할
                          수 있습니다.
                        </p>
                      </div>
                      <div className="space-y-8 pt-3">
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                            <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                            수행평가
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border-2 border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">수행평가 1</h4>
                                </div>
                                <div className="flex">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2 mr-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    문항
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    답안
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 border-2 border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium">수행평가 2</h4>
                                </div>
                                <div className="flex">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2 mr-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    문항
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    답안
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                            <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                            단원평가
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border-2 border-green-100 rounded-lg hover:bg-green-50 transition-colors">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium">단원평가 1</h4>
                                </div>
                                <div className="flex">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2 mr-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    문항
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    답안
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 border-2 border-green-100 rounded-lg hover:bg-green-50 transition-colors">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium">단원평가 2</h4>
                                </div>
                                <div className="flex">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2 mr-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    문항
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    답안
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                            <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                            퀴즈
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border-2 border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium">퀴즈 1</h4>
                                </div>
                                <div className="flex">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2 mr-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    문항
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    답안
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 border-2 border-purple-100 rounded-lg hover:bg-purple-50 transition-colors">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium">퀴즈 2</h4>
                                </div>
                                <div className="flex">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2 mr-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    문항
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="border-2"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    답안
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
