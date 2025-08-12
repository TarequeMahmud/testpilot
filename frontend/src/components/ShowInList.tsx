import React from "react";

interface ShowInListProps {
  repos: { name: string; html_url?: string }[];
}

const ShowInList: React.FC<ShowInListProps> = ({ repos }) => {
  return (
    <>
      <h2 className="text-lg font-bold mb-4 text-white">Repositories:</h2>
      <div className="grid gap-3 w-full">
        {repos.map((repo, index) => (
          <div
            key={index}
            className="bg-gray-800 p-3 rounded-lg shadow-md hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() =>
              repo.html_url && window.open(repo.html_url, "_blank")
            }
          >
            <p className="text-white font-medium">{repo.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowInList;
