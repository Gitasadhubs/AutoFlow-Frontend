import type { Activity } from "@shared/schema";

interface RecentActivityProps {
  activities: Activity[];
  isLoading: boolean;
}

export default function RecentActivity({ activities, isLoading }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "deployment_success":
        return "fas fa-check text-green-600";
      case "deployment_failed":
        return "fas fa-times text-red-600";
      case "deployment_started":
        return "fas fa-cog text-blue-600";
      case "project_created":
        return "fas fa-plus text-blue-600";
      default:
        return "fas fa-info text-gray-600";
    }
  };

  const getActivityIconBg = (type: string) => {
    switch (type) {
      case "deployment_success":
        return "bg-green-100";
      case "deployment_failed":
        return "bg-red-100";
      case "deployment_started":
        return "bg-blue-100";
      case "project_created":
        return "bg-blue-100";
      default:
        return "bg-gray-100";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-4 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={`w-8 h-8 ${getActivityIconBg(activity.type)} rounded-full flex items-center justify-center mt-1`}>
                <i className={`${getActivityIcon(activity.type)} text-xs`}></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500">{formatTime(activity.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <i className="fas fa-history text-gray-300 text-3xl mb-3"></i>
          <p className="text-gray-500">No recent activity</p>
        </div>
      )}
    </div>
  );
}
