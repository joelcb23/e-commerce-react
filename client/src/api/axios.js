import axios from "axios";

const instance = axios.create({
  baseURL: "https://e-commerce-react-qs3n.onrender.com",
  withCredentials: true,
});

export default instance;
