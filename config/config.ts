import "dotenv/config";

const baseUrl = process.env.BASE_URL?.trim();

if (!baseUrl) {
  throw new Error("BASE_URL is required. Set it in the .env file.");
}

const parsedUrl = new URL(baseUrl);

if (!["http:", "https:"].includes(parsedUrl.protocol)) {
  throw new Error("BASE_URL must use HTTP or HTTPS.");
}

export const config = {
  baseUrl: parsedUrl.toString(),
  httpTimeoutMs: 15_000,
};