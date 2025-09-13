// API Configuration for AutoFlow Frontend
// This file configures the backend API URL for different environments
// Updated for Vercel deployment

export const config = {
  // Railway backend URL - replace with your actual Railway deployment URL
  // For local development, use: http://localhost:5000
  // For production, use your Railway URL: https://autoflow-backend-production.up.railway.app
  API_URL: import.meta.env.VITE_API_URL || "https://autoflow-backend-production.up.railway.app",
  
  // GitHub OAuth URLs
  GITHUB_AUTH_URL: "https://autoflow-backend-production.up.railway.app/api/auth/github",
  GITHUB_CALLBACK_URL: "https://autoflow-backend-production.up.railway.app/api/auth/github/callback",
  
  // Environment detection
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // GitHub OAuth configuration
  GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID || "",
};