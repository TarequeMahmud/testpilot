"use client";
import Card from "@/components/Card";
import { useState } from "react";
import FindGitUser from "@/components/FindGitUser";
import ShowInList from "@/components/ShowInList";
import ShowRepoContent from "@/components/showRepoContent";
import TestSummaries from "@/components/TestSummaries";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [repoContents, setRepoContents] = useState<any[]>([]);
  const [testSummaries, setTestSummaries] = useState<any[]>([]);
  const [generatedTest, setGeneratedTest] = useState<any>({});

  return (
    <div className="font-sans flex flex-col justify-start items-center min-h-screen p-2 pb-20 gap-2 sm:p-4">
      <div className="flex flex-row justify-between w-full items-center mb-3 p-0">
        <div></div>
        <h1 className="text-3xl font-bold text-white">Test Pilot</h1>
        <button
          className="bg-red-500 text-white px-4 rounded hover:bg-red-600 transition-colors"
          onClick={() => {
            setUsername("");
            setRepos([]);
            setRepoContents([]);
            setTestSummaries([]);
            setLoading(false);
          }}
        >
          Cancel
        </button>
      </div>

      <Card>
        {testSummaries.length > 0 ? (
          <TestSummaries
            summaries={testSummaries}
            loading={loading}
            setLoading={setLoading}
            setGeneratedTest={setGeneratedTest}
          />
        ) : repos.length === 0 ? (
          <FindGitUser
            username={username}
            setUsername={setUsername}
            loading={loading}
            setLoading={setLoading}
            setRepos={setRepos}
          />
        ) : repoContents.length === 0 ? (
          <ShowInList
            repos={repos}
            owner={username}
            setRepoContents={setRepoContents}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <ShowRepoContent
            data={repoContents}
            setTestSummaries={setTestSummaries}
          />
        )}
      </Card>
    </div>
  );
}
