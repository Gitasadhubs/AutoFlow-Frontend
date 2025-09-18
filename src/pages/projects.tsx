import { useQuery } from "@tanstack/react-query";
import Navigation from "../components/navigation";
import ProjectCard from "../components/project-card";
import OnboardingModal from "../components/onboarding-modal";
import { useState } from "react";
import type { Project } from "../../shared/schema";

export default function Projects() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"]
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Projects</h1>
            <p className="text-gray-600 mt-2">Manage and monitor your deployed projects</p>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="btn-modern gradient-primary text-white px-6 py-3 rounded-lg font-medium hover-lift flex items-center space-x-2"
          >
            <i className="fas fa-plus"></i>
            <span>Add Project</span>
          </button>
        </div>

        {projectsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="modern-card p-6 skeleton animate-scale-in">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg skeleton"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 skeleton"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 skeleton"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded skeleton"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={project.id} className={`animate-fade-in-up stagger-${index + 1}`}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="animate-float">
              <i className="fas fa-folder-open text-blue-300 text-6xl mb-6"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-6">Get started by connecting your GitHub repository</p>
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="btn-modern gradient-primary text-white px-8 py-3 rounded-lg font-medium hover-lift"
            >
              <i className="fas fa-plus mr-2"></i>
              Create Your First Project
            </button>
          </div>
        )}
      </main>

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </div>
  );
}
