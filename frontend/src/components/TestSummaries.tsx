"use client";
import React from "react";
import Spinner from "@/components/Spinner";
import axios from "axios";

interface TestSummary {
  filename: string;
  summary: string;
  full_path: string;
}

interface TestSummariesProps {
  summaries: TestSummary[];
  loading: boolean;
  setLoading?: (loading: boolean) => void;
  setGeneratedTest?: (test: any) => void;
}

const TestSummaries: React.FC<TestSummariesProps> = ({
  summaries,
  loading,
  setLoading,
  setGeneratedTest,
}) => {
  const handleSummaryClick = async (summary: TestSummary) => {
    setLoading?.(true);
    try {
      const requestBody = {
        summary: summary.summary,
        file: {
          filename: summary.filename,
          path: summary.filename,
          full_path: summary.full_path,
        },
      };
      const response = await axios.post(
        "http://localhost:8000/generate/test-code",
        requestBody
      );

      console.log("Generated test code:", response.data);
      setGeneratedTest?.(response.data.test_code);
    } catch (error) {
      console.error("Error generating code:", error);
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-4 text-white">Test summaries:</h2>

      {loading && (
        <div className="mb-3">
          <Spinner />
        </div>
      )}

      {!loading && summaries.length === 0 && (
        <p className="text-gray-400">No summaries available.</p>
      )}

      <div className="grid gap-3 w-full">
        {summaries.map((summary, index) => (
          <div
            key={index}
            className="bg-gray-800 p-3 rounded-lg shadow-md hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => handleSummaryClick(summary)}
          >
            <p className="text-white font-medium">{summary.filename}</p>
            <p className="text-gray-300 text-sm">{summary.summary}</p>
            <p className="text-gray-500 text-xs mt-1 italic">
              {summary.full_path}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TestSummaries;
