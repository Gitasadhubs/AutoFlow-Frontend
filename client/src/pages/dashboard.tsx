import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import WelcomeBanner from "@/components/welcome-banner";
import ProjectCard from "@/components/project-card";
import RecentActivity from "@/components/recent-activity";
import Sidebar from "@/components/sidebar";
import OnboardingModal from "@/components/onboarding-modal";
import { useState } from "react";
import type { Project, Activity } from "@shared/schema";

export default function Dashboard() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"]
  });

  const { data: activities = [], isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"]
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"]
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        <WelcomeBanner onGetStarted={() => setIsOnboardingOpen(true)} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 stagger-2">
          <div className="lg:col-span-2 animate-slide-in">
            <div className="modern-card p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <i className="fas fa-folder-open text-blue-500 mr-3"></i>
                  Your Projects
                </h2>
                <button className="btn-modern gradient-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover-lift flex items-center space-x-2">
                  <i className="fas fa-plus"></i>
                  <span>New Project</span>
                </button>
              </div>

              {projectsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="modern-card p-4 skeleton animate-scale-in stagger-1">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg skeleton"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 skeleton"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 skeleton"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={project.id} className={`animate-fade-in-up stagger-${index + 1}`}>
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 animate-scale-in">
                  <div className="animate-float">
                    <i className="fas fa-rocket text-blue-300 text-6xl mb-6"></i>
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
            </div>

            <RecentActivity activities={activities} isLoading={activitiesLoading} />
          </div>

          <Sidebar stats={stats} onConnectRepo={() => setIsOnboardingOpen(true)} />
        </div>
      </main>

      <OnboardingModal 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
      />
    </div>
  );
}
