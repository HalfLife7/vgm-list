import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});
