import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import { useState } from "react";
import type { Deployment } from "@shared/schema";

export default function Deployments() {
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);

  const { data: deployments = [], isLoading: deploymentsLoading } = useQuery<Deployment[]>({
    queryKey: ["/api/deployments"]
  });

  const { data: logs, isLoading: logsLoading } = useQuery({
    queryKey: selectedDeployment ? ["/api/logs", selectedDeployment.id] : [],
    enabled: !!selectedDeployment
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deployment History</h1>
          <p className="text-gray-600 mt-2">View all your project deployments and their status</p>
        </div>

        <div className="modern-card p-6">
          {deploymentsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 skeleton animate-pulse">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4 skeleton"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6 skeleton"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded skeleton"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 skeleton"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : deployments.length > 0 ? (
            <div className="space-y-4">
              {deployments.map((deployment) => (
                <div key={deployment.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        deployment.status === 'success' ? 'bg-green-500' :
                        deployment.status === 'failed' ? 'bg-red-500' :
                        deployment.status === 'building' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="font-medium text-gray-900">
                        Deployment #{deployment.id}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        deployment.status === 'success' ? 'bg-green-100 text-green-800' :
                        deployment.status === 'failed' ? 'bg-red-100 text-red-800' :
                        deployment.status === 'building' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {deployment.status}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedDeployment(deployment)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Logs
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Commit:</strong> {deployment.commitMessage || 'N/A'}</p>
                    <p><strong>Started:</strong> {new Date(deployment.startedAt).toLocaleString()}</p>
                    {deployment.completedAt && (
                      <p><strong>Completed:</strong> {new Date(deployment.completedAt).toLocaleString()}</p>
                    )}
                    {deployment.deploymentUrl && (
                      <p>
                        <strong>URL:</strong>{" "}
                        <a
                          href={deployment.deploymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          {deployment.deploymentUrl}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-history text-gray-300 text-6xl mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deployments yet</h3>
              <p className="text-gray-500">Deployments will appear here once you start deploying projects</p>
            </div>
          )}
        </div>

        {/* Logs Modal */}
        {selectedDeployment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Deployment Logs #{selectedDeployment.id}
                  </h2>
                  <button
                    onClick={() => setSelectedDeployment(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-96">
                {logsLoading ? (
                  <div className="text-center py-8">
                    <i className="fas fa-spinner fa-spin text-gray-400 text-2xl"></i>
                    <p className="text-gray-500 mt-2">Loading logs...</p>
                  </div>
                ) : logs ? (
                  <pre className="whitespace-pre-wrap text-sm bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                    {logs}
                  </pre>
                ) : (
                  <div className="text-center py-8">
                    <i className="fas fa-file-alt text-gray-300 text-4xl mb-2"></i>
                    <p className="text-gray-500">No logs available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
