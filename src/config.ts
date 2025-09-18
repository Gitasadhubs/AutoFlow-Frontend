export const config = {
  API_URL: import.meta.env.PROD
    ? "https://autoflow-backend-production.up.railway.app"
    : "http://localhost:8080",
  GITHUB_AUTH_URL: import.meta.env.PROD
    ? "https://autoflow-backend-production.up.railway.app/api/auth/github"
    : "http://localhost:8080/api/auth/github"
};
