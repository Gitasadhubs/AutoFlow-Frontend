interface SidebarProps {
  stats?: any;
  onConnectRepo: () => void;
}

export default function Sidebar({ stats, onConnectRepo }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button 
            onClick={onConnectRepo}
            className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <i className="fab fa-github text-gray-600"></i>
              <span className="text-sm font-medium text-gray-900">Connect Repository</span>
            </div>
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3">
              <i className="fas fa-rocket text-gray-600"></i>
              <span className="text-sm font-medium text-gray-900">Deploy Project</span>
            </div>
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3">
              <i className="fas fa-code text-gray-600"></i>
              <span className="text-sm font-medium text-gray-900">Browse Templates</span>
            </div>
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
          </button>
          <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3">
              <i className="fas fa-book text-gray-600"></i>
              <span className="text-sm font-medium text-gray-900">Documentation</span>
            </div>
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
          </button>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Projects</span>
            <span className="text-lg font-semibold text-gray-900">
              {stats?.totalProjects || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Successful Deployments</span>
            <span className="text-lg font-semibold text-green-600">
              {stats?.successfulDeployments || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Build Time (avg)</span>
            <span className="text-lg font-semibold text-blue-600">
              {stats?.avgBuildTime || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Success Rate</span>
            <span className="text-lg font-semibold text-secondary">
              {stats?.successRate || "0%"}
            </span>
          </div>
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-gradient-to-br from-accent to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <i className="fas fa-graduation-cap text-2xl"></i>
          <h3 className="text-lg font-semibold">Need Help?</h3>
        </div>
        <p className="text-purple-100 text-sm mb-4">
          Join our student community for tips, tutorials, and support from fellow developers.
        </p>
        <button className="bg-white text-accent px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
          <i className="fas fa-users mr-2"></i>
          Join Community
        </button>
      </div>
    </div>
  );
}
