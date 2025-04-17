import axios from "./axios";

export const registerRequest = async (data) =>
  await axios.post("/auth/register", data);
export const loginRequest = async (data) =>
  await axios.post("/auth/login", data);

export const verifyRequest = async () => await axios.get("/auth/verify");

export const logoutRequest = async () => await axios.post("/auth/logout");
