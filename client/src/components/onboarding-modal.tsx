import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertProjectSchema } from "@shared/schema";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  default_branch: string;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: repositories = [], isLoading: reposLoading } = useQuery<Repository[]>({
    queryKey: ["/api/github/repositories"],
    enabled: step >= 2
  });

  const createProjectMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/projects", data),
    onSuccess: () => {
      toast({
        title: "Project Created!",
        description: "Your project has been set up successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      onClose();
      setStep(1);
      setSelectedRepo(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGitHubAuth = () => {
    // In a real implementation, this would redirect to GitHub OAuth
    // For now, we'll simulate the auth and move to next step
    setStep(2);
  };

  const handleCreateProject = () => {
    if (!selectedRepo) return;

    const framework = selectedRepo.language?.toLowerCase() === "javascript" ? "react" : 
                     selectedRepo.language?.toLowerCase() === "python" ? "python" : "node";

    const projectData = {
      name: selectedRepo.name,
      description: selectedRepo.description || `${selectedRepo.language} project`,
      repositoryUrl: selectedRepo.html_url,
      repositoryName: selectedRepo.full_name,
      branch: selectedRepo.default_branch,
      framework,
      status: "pending"
    };

    createProjectMutation.mutate(projectData);
  };

  const getLanguageIcon = (language: string) => {
    switch (language?.toLowerCase()) {
      case "javascript":
        return "fab fa-js-square text-yellow-500";
      case "typescript":
        return "fab fa-js-square text-blue-500";
      case "python":
        return "fab fa-python text-green-500";
      case "java":
        return "fab fa-java text-red-500";
      default:
        return "fas fa-code text-gray-500";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            <i className="fas fa-rocket text-primary text-3xl mb-4 block"></i>
            Welcome to AutoFlow!
          </DialogTitle>
          <p className="text-center text-gray-600">
            Let's get you set up with your first automated deployment in just a few steps.
          </p>
        </DialogHeader>

        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-sm font-medium`}>
                1
              </div>
              <span className={`text-sm font-medium ${step >= 1 ? 'text-primary' : 'text-gray-500'}`}>
                Connect GitHub
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-sm font-medium`}>
                2
              </div>
              <span className={`text-sm ${step >= 2 ? 'text-primary font-medium' : 'text-gray-500'}`}>
                Select Repository
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-sm font-medium`}>
                3
              </div>
              <span className={`text-sm ${step >= 3 ? 'text-primary font-medium' : 'text-gray-500'}`}>
                Configure & Deploy
              </span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="text-center space-y-4">
            <Button onClick={handleGitHubAuth} className="bg-primary hover:bg-blue-700">
              <i className="fab fa-github mr-2"></i>
              Connect Your GitHub Account
            </Button>
            <p className="text-xs text-gray-500">
              We'll only access repositories you explicitly grant permission for.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Select a Repository</h3>
            {reposLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4 animate-pulse">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-2">
                {repositories.map((repo) => (
                  <button
                    key={repo.id}
                    onClick={() => setSelectedRepo(repo)}
                    className={`w-full text-left border rounded-lg p-4 hover:border-primary transition-colors ${
                      selectedRepo?.id === repo.id ? 'border-primary bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <i className={getLanguageIcon(repo.language)}></i>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{repo.name}</h4>
                        <p className="text-sm text-gray-500">{repo.description || 'No description'}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-400">{repo.language}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">{repo.default_branch}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                disabled={!selectedRepo}
                className="bg-primary hover:bg-blue-700"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && selectedRepo && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Configure Your Project</h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <i className={getLanguageIcon(selectedRepo.language)}></i>
                <div>
                  <h4 className="font-medium text-gray-900">{selectedRepo.name}</h4>
                  <p className="text-sm text-gray-500">{selectedRepo.full_name}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Language:</span>
                  <span className="ml-2 font-medium">{selectedRepo.language}</span>
                </div>
                <div>
                  <span className="text-gray-500">Branch:</span>
                  <span className="ml-2 font-medium">{selectedRepo.default_branch}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We'll create a GitHub Actions workflow for automated deployments</li>
                <li>• Your project will be deployed to a hosting platform</li>
                <li>• You'll get real-time updates on deployment status</li>
                <li>• Future commits will automatically trigger new deployments</li>
              </ul>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button 
                onClick={handleCreateProject}
                disabled={createProjectMutation.isPending}
                className="bg-primary hover:bg-blue-700"
              >
                {createProjectMutation.isPending ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Button variant="ghost" onClick={onClose}>
            Skip for now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
