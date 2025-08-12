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
  onFileClick: (file: FileNode) => void;
}

const TreeNode: React.FC<{
  node: FileNode;
  onFileClick: (file: FileNode) => void;
}> = ({ node, onFileClick }) => {
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
            <TreeNode key={child.path} node={child} onFileClick={onFileClick} />
          ))}
      </div>
    );
  }

  return (
    <div
      className="ml-8 cursor-pointer text-gray-200 hover:text-white"
      onClick={() => onFileClick(node)}
    >
      📄 {node.name}
    </div>
  );
};

const ShowRepoContent: React.FC<ShowRepoContentProps> = ({
  data,
  onFileClick,
}) => {
  return (
    <div className=" text-white p-4 rounded-lg max-h-[500px] overflow-auto w-full">
      <h2 className="text-lg font-bold mb-4">
        Select a file to make test examples
      </h2>
      {data.map((node) => (
        <TreeNode key={node.path} node={node} onFileClick={onFileClick} />
      ))}
    </div>
  );
};

export default ShowRepoContent;
