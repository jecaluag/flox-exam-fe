export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000"),
} as const;

export const getApiUrl = (path: string): string => {
  return `${API_CONFIG.baseURL}/api/${path}`;
};
