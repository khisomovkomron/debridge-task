import axios from "axios";
import { config } from "../config/config";

export const httpClient = axios.create({
  baseURL: config.baseUrl,
  timeout: config.httpTimeoutMs,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});