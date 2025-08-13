"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import Button from "./Button";

interface ShowTestCodeProps {
  generatedTest: {
    test_filename: string;
    code: string;
    full_path: string;
  };
  loading: boolean;
  setLoading?: (loading: boolean) => void;
}

const getLanguageFromFilename = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "py":
      return "python";
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "jsx":
      return "jsx";
    case "tsx":
      return "tsx";
    case "java":
      return "java";
    case "html":
      return "html";
    case "css":
      return "css";
    default:
      return ""; // no specific language
  }
};

const ShowTestCode: React.FC<ShowTestCodeProps> = ({
  generatedTest,
  loading,
  setLoading,
}) => {
  const { test_filename, code, full_path } = generatedTest;

  const handleCreatePR = () => {
    console.log("Create PR for:", full_path);
    alert(`PR creation triggered for: ${full_path}`);
  };

  const language = getLanguageFromFilename(test_filename);

  const markdownCode = `\`\`\`${language}
${code}
\`\`\``;

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-xl font-bold">{test_filename}</h2>
      <div className="bg-gray-900 text-green-200 p-4 rounded overflow-x-auto">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {markdownCode}
        </ReactMarkdown>
      </div>
      <Button onclick={handleCreatePR} loading={loading} name="Create PR" />
    </div>
  );
};

export default ShowTestCode;
