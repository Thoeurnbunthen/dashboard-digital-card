export const envCons = {
  baseUrl: import.meta.env.VITE_PUBLIC_API || "https://api.khid.link/api/v1",
  frontendUrl: import.meta.env.VITE_PUBLIC_FRONT_API || "https://khid.link",
  backendUrl: import.meta.env.VITE_PUBLIC_API || "https://api.khid.link/api/v1",
  isNodeProd: import.meta.env.NODE_ENV === "production",
  isNodeDev: import.meta.env.NODE_ENV === "development",
};
