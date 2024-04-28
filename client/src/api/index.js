import axios from "axios";

const API = axios.create({
  // baseURL: "https://fitness-tracker-1-53ed.onrender.com/api/",
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getDashboard2Details = async (token) =>
  API.get("/user/dashboard2", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  await API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getDiets = async (token, date) =>
  await API.get(`/user/diet${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addDiet = async (token, data) =>
  await API.post(`/user/diet`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
