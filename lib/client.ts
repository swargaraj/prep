import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import config from "./config";

const client = setupCache(
  axios.create({
    baseURL: config.baseUrl,
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${config.bearerToken}`,
    },
  }),
  {
    ttl: 1000 * 60 * 60,
    staleIfError: true,
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status >= 500) {
      console.warn("Server error, returning fallback response.");
      return {
        data: null,
        status: error.response.status,
        error: "API error occurred",
      };
    }
    return Promise.reject(error);
  }
);

export default client;
