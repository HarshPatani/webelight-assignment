import axios from "axios";

const git = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 15000,
});

export { git };
