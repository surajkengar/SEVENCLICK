import API from "./axios";

// ── Appointments ───────────────────────────────────────
export const bookAppointment   = (data) => API.post("/appoitnment/bookappoitnment", data);
export const getMyAppointments = ()     => API.get("/appoitnment/getallappoitnment");
export const cancelAppointment = (id)   => API.delete(`/appoitnment/cancleappoitnment/${id}`);

// ── Chat ───────────────────────────────────────────────
export const getChatHistory   = ()     => API.get("/chat/getchathistory");
export const sendChatMessage  = (data) => API.post("/chat/sendmessage", data);
export const clearChatHistory = ()     => API.delete("/chat/clearchat");