"use client";
import React, { useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

interface FileNode {
  name: string;
  path: string;
  full_path: string;
  type: "file" | "dir";
  children?: FileNode[];
}

interface ShowRepoContentProps {
  data: FileNode[];
  setTestSummaries: (summaries: any[]) => void;
}

const TreeNode: React.FC<{
  node: FileNode;
  onToggleSelect: (file: FileNode, checked: boolean) => void;
  selectedPaths: Set<string>;
}> = ({ node, onToggleSelect, selectedPaths }) => {
  const [expanded, setExpanded] = useState(false);

  if (node.type === "dir") {
    return (
      <div className="ml-4 h-full">
        <div
          onClick={() => setExpanded(!expanded)}
          className="cursor-pointer text-blue-400 hover:text-blue-300 font-bold"
        >
          {expanded ? "📂" : "📁"} {node.name}
        </div>
        {expanded &&
          node.children?.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              onToggleSelect={onToggleSelect}
              selectedPaths={selectedPaths}
            />
          ))}
      </div>
    );
  }

  return (
    <div className="ml-8 flex items-center space-x-2">
      <input
        type="checkbox"
        checked={selectedPaths.has(node.path)}
        onChange={(e) => onToggleSelect(node, e.target.checked)}
      />
      <span className="cursor-pointer text-gray-200 hover:text-white">
        📄 {node.name}
      </span>
    </div>
  );
};

const ShowRepoContent: React.FC<ShowRepoContentProps> = ({
  data,
  setTestSummaries,
}) => {
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
  const [selectedFiles, setSelectedFiles] = useState<FileNode[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSelect = (file: FileNode, checked: boolean) => {
    setSelectedPaths((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(file.path);
      } else {
        newSet.delete(file.path);
      }
      return newSet;
    });

    setSelectedFiles((prevFiles) => {
      if (checked) {
        if (!prevFiles.some((f) => f.path === file.path)) {
          return [...prevFiles, file];
        }
        return prevFiles;
      } else {
        return prevFiles.filter((f) => f.path !== file.path);
      }
    });
  };

  const handleSend = async () => {
    if (selectedFiles.length === 0) return;

    const payload = {
      files: selectedFiles.map((file) => ({
        filename: file.name,
        path: file.path,
        full_path: file.full_path,
      })),
    };

    console.log(payload);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/generate/test-summaries",
        payload
      );
      console.log("API Response:", response.data);
      setTestSummaries(response.data.summaries || []);
    } catch (error) {
      console.error("Error sending files:", error);
      alert("Failed to send files. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-4 rounded-lg h-auto w-full">
      <h2 className="text-lg font-bold text-center">
        Select one or more files to Generate Test Case summaries
      </h2>
      <hr className="mb-4" />
      {data.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          onToggleSelect={toggleSelect}
          selectedPaths={selectedPaths}
        />
      ))}

      <button
        onClick={handleSend}
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 rounded disabled:opacity-50"
        disabled={loading || selectedFiles.length === 0}
      >
        {loading ? <Spinner /> : `Send ${selectedFiles.length} file(s) to API`}
      </button>
    </div>
  );
};

export default ShowRepoContent;
