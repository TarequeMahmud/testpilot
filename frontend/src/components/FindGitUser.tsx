import React from "react";
import Button from "@/components/Button";
import axios from "axios";

interface FindGitUserProps {
  username: string;
  setUsername: (value: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setRepos: (repos: any[]) => void;
}

const FindGitUser: React.FC<FindGitUserProps> = ({
  username,
  setUsername,
  loading,
  setLoading,
  setRepos,
}) => {
  const findUser = async () => {
    if (!username.trim()) {
      alert("Please enter a Git username");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/github/repos?username=${encodeURIComponent(
          username
        )}`
      );
      console.log("Fetched repos:", response.data.repos);
      setRepos(response.data.repos || []);
    } catch (error) {
      console.error("Error fetching repos:", error);
      alert("Could not fetch repositories. Please check the username.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="text-white mb-4">
        Please enter your Git username to continue:
      </p>
      <input
        type="text"
        value={username}
        placeholder="Enter Git Username"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button name="Submit" loading={loading} onclick={findUser} />
    </>
  );
};

export default FindGitUser;
