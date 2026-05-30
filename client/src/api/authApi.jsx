import API from "./axios";

// ✅ LOGIN
export const loginUser = (data) => API.post("/auth/login", data);

// ✅ REGISTER
export const registerUser = (data) => API.post("/auth/register", data);

// ✅ LOGOUT
export const logoutUser = () => API.post("/auth/logout");

// ✅ GET CURRENT USER
export const getmeUser = () => API.get("/auth/getme");

// ✅ FORGOT PASSWORD
export const forgotpasswordUser = (data) => API.post("/auth/forgotpassword", data);

// ✅ RESET PASSWORD
export const resetpasswordUser = (token,data) => API.post(`/auth/resetpassword/${token}`, data);