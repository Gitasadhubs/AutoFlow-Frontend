import React, { useEffect, useState } from "react";
import axios from "axios";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  private: boolean;
  html_url: string;
  language?: string;
  default_branch: string;
  updated_at: string;
}

interface RepoCardProps {
  repo: Repo;
  onSetup: (repo: Repo) => void;
  onDeploy: (repo: Repo) => void;
  onViewLogs: (repo: Repo) => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onSetup, onDeploy, onViewLogs }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{repo.name}</h2>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm hover:underline"
        >
          {repo.full_name}
        </a>
        <p className="text-gray-500 text-sm mt-2">
          Language: {repo.language || "N/A"}
        </p>
        <p className="text-gray-400 text-xs">
          Last updated: {new Date(repo.updated_at).toLocaleString()}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onSetup(repo)}
          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
        >
          Setup CI/CD
        </button>
        <button
          onClick={() => onDeploy(repo)}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          Deploy
        </button>
        <button
          onClick={() => onViewLogs(repo)}
          className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-800"
        >
          View Logs
        </button>
      </div>
    </div>
  );
};

const RepoList: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string | null>(null);

  // Fetch repos from backend
  useEffect(() => {
    axios
      .get("/repos", { withCredentials: true })
      .then((res) => {
        setRepos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching repos:", err);
        setLoading(false);
      });
  }, []);

  const handleSetup = async (repo: Repo) => {
    try {
      await axios.post("/setup", { repo: repo.full_name });
      alert(`CI/CD setup for ${repo.name} successful!`);
    } catch (err) {
      console.error(err);
      alert("Error setting up CI/CD.");
    }
  };

  const handleDeploy = async (repo: Repo) => {
    try {
      await axios.post("/deploy", { repo: repo.full_name });
      alert(`Deployment triggered for ${repo.name}`);
    } catch (err) {
      console.error(err);
      alert("Error triggering deployment.");
    }
  };

  const handleViewLogs = async (repo: Repo) => {
    try {
      const res = await axios.get(`/status?repo=${repo.full_name}`);
      setLogs(res.data.logs || "No logs available.");
    } catch (err) {
      console.error(err);
      alert("Error fetching logs.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading repositories...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your GitHub Repositories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            onSetup={handleSetup}
            onDeploy={handleDeploy}
            onViewLogs={handleViewLogs}
          />
        ))}
      </div>

      {logs && (
        <div className="mt-6 bg-gray-900 text-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Deployment Logs</h2>
          <pre className="text-sm whitespace-pre-wrap">{logs}</pre>
        </div>
      )}
    </div>
  );
};

export default RepoList;
