"use client";
import React from "react";
import Spinner from "@/components/Spinner"; // Assuming you have a Spinner component

interface TestSummary {
  filename: string;
  summary: string;
  full_path: string;
}

interface TestSummariesProps {
  summaries: TestSummary[];
  loading: boolean;
  onSummarySelect: (summary: TestSummary) => void;
}

const TestSummaries: React.FC<TestSummariesProps> = ({
  summaries,
  loading,
  onSummarySelect,
}) => {
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
            onClick={() => onSummarySelect(summary)}
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
