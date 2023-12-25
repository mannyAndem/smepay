import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:443/smepay",
  baseURL: "https://smepay.onrender.com/smepay",
});

// interceptors for refresh tokens
// Add a request interceptor
