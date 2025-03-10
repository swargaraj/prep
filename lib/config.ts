import dotenv from "dotenv";

dotenv.config();

if (!process.env.MARKS_BEARER_TOKEN) {
  throw new Error("Missing MARKS_BEARER_TOKEN environment variable");
}

const config = {
  baseUrl: "https://web.getmarks.app/api",
  bearerToken: process.env.MARKS_BEARER_TOKEN,
};

export default config;
