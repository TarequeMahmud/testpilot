"use client";
import Card from "@/components/Card";
import { useState } from "react";
import FindGitUser from "@/components/FindGitUser";
import ShowInList from "@/components/ShowInList";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);

  return (
    <div className="font-sans flex flex-col justify-start items-center min-h-screen p-2 pb-20 gap-2 sm:p-4">
      <h1 className="text-3xl font-bold mb-3 text-white">Test Pilot</h1>
      <Card>
        {repos.length === 0 ? (
          <FindGitUser
            username={username}
            setUsername={setUsername}
            loading={loading}
            setLoading={setLoading}
            setRepos={setRepos}
          />
        ) : (
          <ShowInList repos={repos} />
        )}
      </Card>
    </div>
  );
}
