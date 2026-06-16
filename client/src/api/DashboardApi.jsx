import API from "./axios";

// ── Appointments ───────────────────────────────────────
export const bookAppointment   = (data) => API.post("/appoitnment/bookappoitnment", data);
export const getMyAppointments = ()     => API.get("/appoitnment/getallappoitnment");
export const cancelAppointment = (id)   => API.delete(`/appoitnment/cancleappoitnment/${id}`);

// ── Chat ───────────────────────────────────────────────
export const getChatHistory   = ()     => API.get("/chat/getchathistory");
export const sendChatMessage  = (data) => API.post("/chat/sendmessage", data);
export const clearChatHistory = ()     => API.delete("/chat/clearchat");

//--- Adminpanel------------------------

export const getAllUsers = ()=>  API.get("/admin/allusers");
export const blockUser = (id) => API.patch(`/admin/blockuser/${id}`);
export const getAllAppointments = ()  => API.get("/admin/allappointments");
export const updateAppointmentStatus = (id , status) => API.patch(`/admin/appointmentstatus/${id}`,{status});
export const getAnalytics = () => API.get("/admin/analytics");