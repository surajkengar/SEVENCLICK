import { useEffect, useState } from "react";
import { getAllAppointments, updateAppointmentStatus } from "../api/DashboardApi.jsx";
import toast from "react-hot-toast";
import "./adminpages.css";


const serviceLabel = {
  strategy:  "Strategy",
  financial: "Financial",
  hr:        "HR",
  marketing: "Marketing",
};

const statusColor = {
  pending:   { bg: "#FEF3C7", color: "#92400E" },
  confirmed: { bg: "#D1FAE5", color: "#065F46" },
  cancelled: { bg: "#FEE2E2", color: "#991B1B" },
  completed: { bg: "#EDE9FE", color: "#4C1D95" },
};

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filter, setFilter]             = useState("all");
  const [updating, setUpdating]         = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const res = await getAllAppointments();
      if (res.data.success) setAppointments(res.data.appointments);
    } catch (error) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, status) {
    setUpdating(id);
    try {
      const res = await updateAppointmentStatus(id, status);
      if (res.data.success) {
        toast.success(`Appointment ${status}`);
        setAppointments(prev =>
          prev.map(a => a._id === id ? { ...a, status } : a)
        );
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(null);
    }
  }

  const filtered = appointments.filter(a =>
    filter === "all" ? true : a.status === filter
  );

  if (loading) return <p className="admin-loading">Loading...</p>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Appointments</h2>
        <p>{appointments.length} total appointments</p>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        {["all", "pending", "confirmed", "completed", "cancelled"].map(f => (
          <button
            key={f}
            className={`admin-filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", color: "#6B6B67", padding: "40px" }}>
                  No appointments found
                </td>
              </tr>
            )}
            {filtered.map(appt => (
              <tr key={appt._id}>
                <td>
                  <div className="appt-user-name">{appt.user?.fullname}</div>
                  <div className="appt-user-email">{appt.user?.emailid}</div>
                </td>
                <td>{serviceLabel[appt.service] || appt.service}</td>
                <td>{new Date(appt.date).toDateString()}</td>
                <td>{appt.time}</td>
                <td>
                  <span
                    className="admin-status-badge"
                    style={{
                      background: statusColor[appt.status]?.bg,
                      color:      statusColor[appt.status]?.color,
                    }}
                  >
                    {appt.status}
                  </span>
                </td>
                <td>
                  <select
                    className="admin-status-select"
                    value={appt.status}
                    disabled={updating === appt._id}
                    onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAppointments;
