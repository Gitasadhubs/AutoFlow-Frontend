import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export default function Navigation() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false
  });

  return (
    <nav className="glass bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 animate-slide-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center animate-fade-in-up">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-rocket text-primary text-2xl mr-3 animate-bounce-gentle"></i>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AutoFlow
              </span>
            </div>
          </div>
          
          <div className="hidden md:block animate-fade-in-up stagger-2">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-white px-4 py-2 rounded-lg text-sm font-medium btn-modern gradient-primary hover-lift">
                Dashboard
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium interactive">
                Documentation
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium interactive">
                Support
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 animate-fade-in-up stagger-3">
            {user ? (
              <div className="flex items-center space-x-3 modern-card p-2">
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=2563eb&color=fff`} 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all"
                />
                <span className="text-sm font-medium text-gray-700">{user.username}</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
              </div>
            ) : (
              <a 
                href="/api/auth/github"
                className="btn-modern gradient-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover-lift flex items-center space-x-2"
              >
                <i className="fab fa-github"></i>
                <span>Connect GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
