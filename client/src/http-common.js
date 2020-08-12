import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json"
  }
});