import React from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

interface ShowInListProps {
  repos: { name: string; full_name?: string }[];
  owner: string;
  setRepoContents: (contents: any[]) => void;
  loading: boolean;
  setLoading?: (loading: boolean) => void;
}

const ShowInList: React.FC<ShowInListProps> = ({
  repos,
  owner,
  setRepoContents,
  loading,
  setLoading,
}) => {
  const handleRepoClick = async (repo: { name: string }) => {
    try {
      setLoading?.(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/github/files?owner=${encodeURIComponent(
          owner
        )}&repo=${encodeURIComponent(repo.name)}`
      );
      console.log("Repo contents:", response.data);
      setRepoContents(response.data || []);
    } catch (error) {
      console.error("Error fetching repo contents:", error);
      alert("Could not fetch repository contents.");
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-4 text-white">Repositories:</h2>
      {loading && (
        <div className="mb-3">
          <Spinner />
        </div>
      )}
      <div className="grid gap-3 w-full">
        {repos.map((repo, index) => (
          <div
            key={index}
            className="bg-gray-800 p-3 rounded-lg shadow-md hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => handleRepoClick(repo)}
          >
            <p className="text-white font-medium">{repo.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowInList;
