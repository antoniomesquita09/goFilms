import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonmock.hackerrank.com/api/movies/search"
});

export default api;
