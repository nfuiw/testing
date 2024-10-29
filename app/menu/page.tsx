"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Menu = () => {
  const router = useRouter();
  const [experimentId, setExperimentId] = useState<string>("");
  const [error, setError] = useState("");

  // Define available experiments
  const experiments = [
    { id: 1, name: "Pair Programming", route: "pair-programming" },
    // Add more experiments here as needed
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!experimentId) {
      setError("Please select an experiment");
      return;
    }

    const numId = parseInt(experimentId);
    const experiment = experiments.find((exp) => exp.id === numId);

    if (!experiment) {
      setError("Invalid experiment selection");
      return;
    }

    setError("");
    router.push(experiment.route);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Select Experiment</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <Select
                value={experimentId}
                onValueChange={(value) => {
                  setExperimentId(value);
                  setError("");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an experiment" />
                </SelectTrigger>
                <SelectContent>
                  {experiments.map((experiment) => (
                    <SelectItem
                      key={experiment.id}
                      value={experiment.id.toString()}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          {experiment.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Menu;
