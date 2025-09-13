// API Configuration for AutoFlow Frontend
// This file configures the backend API URL for different environments

export const config = {
  // Railway backend URL - replace with your actual Railway deployment URL
  API_URL: import.meta.env.VITE_API_URL || "https://your-app-name.up.railway.app",
  
  // Environment detection
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // GitHub OAuth configuration
  GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID || "",
};