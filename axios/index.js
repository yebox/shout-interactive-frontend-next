import axios from "axios";

export const baseInstance = axios.create({
  baseURL: "https://dev-server.shoutng.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
