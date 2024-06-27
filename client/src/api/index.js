import axios from "axios";

const API = axios.create({
  baseURL: "https://fitnesstrack-vtv1.onrender.com/api/",
});

// User authentication endpoints
export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

// Dashboard details endpoint
export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

// Workouts endpoints
export const getWorkouts = async (token, date) =>
  API.get(`/user/workout${date ? `?date=${date}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  API.post("/user/workout", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Additional API endpoints can be added below
export const updateUserProfile = async (token, data) =>
  API.put("/user/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteWorkout = async (token, workoutId) =>
  API.delete(`/user/workout/${workoutId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getBlogPosts = async () =>
  API.get("/blogs");

export const getBlogPostById = async (postId) =>
  API.get(`/blogs/${postId}`);
