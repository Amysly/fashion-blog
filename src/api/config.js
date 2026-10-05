// When VITE_API_URL is unset, use the same-origin /api path handled by Vite's
// development proxy. Set VITE_API_URL to the backend origin in deployment.
export const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
