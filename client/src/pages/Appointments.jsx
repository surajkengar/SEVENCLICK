import { useEffect, useState } from "react";
import { getMyAppointments, cancelAppointment } from "../api/DashboardApi";
import toast from "react-hot-toast";
import "./style/Appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [cancelling, setCancelling]     = useState(null); // stores id being cancelled
  const [filter, setFilter]             = useState("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const res = await getMyAppointments();
      if (res.data.success) {
        setAppointments(res.data.appoitnments);
      }
    } catch (error) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    setCancelling(id);
    try {
      const res = await cancelAppointment(id);
      if (res.data.success) {
        toast.success("Appointment cancelled successfully");
        // update status locally without refetching
        setAppointments(prev =>
          prev.map(a => a._id === id ? { ...a, status: "cancelled" } : a)
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel appointment");
    } finally {
      setCancelling(null);
    }
  }

  // filter appointments
  const filtered = appointments.filter(a => {
    if (filter === "all")       return true;
    if (filter === "active")    return a.status === "pending" || a.status === "confirmed";
    if (filter === "cancelled") return a.status === "cancelled";
    if (filter === "completed") return a.status === "completed";
    return true;
  });

  const statusColor = {
    pending:   { bg: "#E6F1FB", color: "#185FA5" },
    confirmed: { bg: "#EAF3DE", color: "#27500A" },
    cancelled: { bg: "#FCEBEB", color: "#A32D2D" },
    completed: { bg: "#F1EFE8", color: "#444441" },
  };

  const serviceLabel = {
    strategy:  "Strategy Consulting",
    financial: "Financial Advisory",
    hr:        "HR Consulting",
    marketing: "Marketing Consulting",
  };

  if (loading) {
    return (
      <div className="appt-page">
        <p className="appt-loading">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="appt-page">

      {/* Header */}
      <div className="appt-header">
        <div>
          <h2>My Appointments</h2>
          <p>{appointments.length} total appointments</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="appt-filters">
        {["all", "active", "completed", "cancelled"].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="filter-count">
              {f === "all"       ? appointments.length :
               f === "active"    ? appointments.filter(a => a.status === "pending" || a.status === "confirmed").length :
               appointments.filter(a => a.status === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="appt-empty">
          <p>No appointments found</p>
          <span>Book a consulting session from the services menu</span>
        </div>
      )}

      {/* Appointments list */}
      <div className="appt-list">
        {filtered.map(appt => (
          <div className="appt-card" key={appt._id}>

            {/* Left */}
            <div className="appt-left">
              <div className="appt-service">
                {serviceLabel[appt.service] || appt.service}
              </div>
              <div className="appt-details">
                <span>📅 {new Date(appt.date).toDateString()}</span>
                <span>🕐 {appt.time}</span>
              </div>
              {appt.note && (
                <div className="appt-note">"{appt.note}"</div>
              )}
              <div className="appt-meta">
                Booked on {new Date(appt.createdAt).toDateString()}
              </div>
            </div>

            {/* Right */}
            <div className="appt-right">
              <span
                className="appt-status"
                style={{
                  background: statusColor[appt.status]?.bg,
                  color:      statusColor[appt.status]?.color,
                }}
              >
                {appt.status}
              </span>

              {/* Cancel button — only for pending or confirmed */}
              {(appt.status === "pending" || appt.status === "confirmed") && (
                <button
                  className="cancel-appt-btn"
                  onClick={() => handleCancel(appt._id)}
                  disabled={cancelling === appt._id}
                >
                  {cancelling === appt._id ? "Cancelling..." : "Cancel"}
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Appointments;
