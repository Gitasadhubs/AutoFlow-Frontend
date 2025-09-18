<<<<<<< HEAD
export const config = {
  API_URL: import.meta.env.PROD
    ? "https://autoflow-backend-production.up.railway.app"
    : "http://localhost:8080",
  GITHUB_AUTH_URL: import.meta.env.PROD
=======
 the pagesexport const config = {
  API_URL: process.env.NODE_ENV === "production"
    ? "https://autoflow-backend-production.up.railway.app"
    : "http://localhost:8080",
  GITHUB_AUTH_URL: process.env.NODE_ENV === "production"
>>>>>>> c8569dd (Fix TypeScript errors and import paths, update OAuth callback URLs, configure session middleware and CORS for production)
    ? "https://autoflow-backend-production.up.railway.app/api/auth/github"
    : "http://localhost:8080/api/auth/github"
};
