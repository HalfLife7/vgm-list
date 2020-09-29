import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});
