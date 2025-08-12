"use client";
import React, { useState } from "react";

interface FileNode {
  name: string;
  path: string;
  type: "file" | "dir";
  children?: FileNode[];
}

interface ShowRepoContentProps {
  data: FileNode[];
  onSendToApi: (files: FileNode[]) => void; // New prop for sending selected files
}

const TreeNode: React.FC<{
  node: FileNode;
  onToggleSelect: (file: FileNode, checked: boolean) => void;
  selectedPaths: Set<string>;
}> = ({ node, onToggleSelect, selectedPaths }) => {
  const [expanded, setExpanded] = useState(false);

  if (node.type === "dir") {
    return (
      <div className="ml-4">
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
  onSendToApi,
}) => {
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
  const [selectedFiles, setSelectedFiles] = useState<FileNode[]>([]);

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
        // Avoid duplicates
        if (!prevFiles.some((f) => f.path === file.path)) {
          return [...prevFiles, file];
        }
        return prevFiles;
      } else {
        return prevFiles.filter((f) => f.path !== file.path);
      }
    });
  };

  return (
    <div className="text-white p-4 rounded-lg max-h-[500px] overflow-auto w-full">
      <h2 className="text-lg font-bold text-center">
        Select one or more files to Generate Test Cases summeries
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
        onClick={() => onSendToApi(selectedFiles)}
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 rounded"
        disabled={selectedFiles.length === 0}
      >
        Send {selectedFiles.length} file(s) to API
      </button>
    </div>
  );
};

export default ShowRepoContent;
