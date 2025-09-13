import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deployMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/projects/${project.id}/deploy`),
    onSuccess: () => {
      toast({
        title: "Deployment Started",
        description: `${project.name} deployment has been triggered.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
    },
    onError: () => {
      toast({
        title: "Deployment Failed",
        description: "Failed to start deployment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-green-100 text-green-800";
      case "building":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
        return "fas fa-check text-green-400";
      case "building":
        return "fas fa-spinner fa-spin text-yellow-400";
      case "failed":
        return "fas fa-times text-red-400";
      default:
        return "fas fa-clock text-gray-400";
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework.toLowerCase()) {
      case "react":
        return "fab fa-react text-primary";
      case "node":
        return "fab fa-node-js text-secondary";
      case "python":
        return "fab fa-python text-accent";
      default:
        return "fas fa-code text-gray-600";
    }
  };

  const formatLastDeployment = (date: string | null) => {
    if (!date) return "Never deployed";
    
    const deployedAt = new Date(date);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - deployedAt.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <i className={getFrameworkIcon(project.framework)}></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{project.name}</h3>
            <p className="text-sm text-gray-500">{project.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                <i className={`${getStatusIcon(project.status)} text-xs mr-1`}></i>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              <span className="text-xs text-gray-500">
                {formatLastDeployment(project.lastDeploymentAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {project.deploymentUrl && (
            <a 
              href={project.deploymentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <i className="fas fa-external-link-alt"></i>
            </a>
          )}
          <button 
            onClick={() => deployMutation.mutate()}
            disabled={deployMutation.isPending || project.status === "building"}
            className="text-gray-400 hover:text-gray-600 p-2 disabled:opacity-50"
          >
            <i className="fas fa-rocket"></i>
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-2">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
