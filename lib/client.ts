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
      console.error("API Request Failed");
      return {
        data: null,
        status: error.response.status,
        error: "API Request Failed",
      };
    }
    return Promise.reject(error);
  }
);

export default client;
