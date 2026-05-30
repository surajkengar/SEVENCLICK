import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyAppointments } from "../api/DashboardApi";
import { getChatHistory } from "../api/DashboardApi";

function Dashboards() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [aiQueries, setAiQueries]       = useState(0);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // fetch appointments
      const apptRes = await getMyAppointments();
      if (apptRes.data.success) {
        setAppointments(apptRes.data.appoitnments);
      }

      // fetch AI chat query count
      const chatRes = await getChatHistory();
      if (chatRes.data.success) {
        setAiQueries(chatRes.data.totalmessage || 0);
      }
    } catch (error) {
      console.log("dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  // count only active appointments
  const activeAppointments = appointments.filter(
    (a) => a.status === "pending" || a.status === "confirmed"
  ).length;

  // appointments added this week
  const thisWeek = appointments.filter((a) => {
    const created = new Date(a.createdAt);
    const now = new Date();
    const weekAgo = new Date(now.setDate(now.getDate() - 7));
    return created >= weekAgo;
  }).length;

  const services = [
    {
      title: "Strategy consulting",
      desc:  "Schedule your next session",
      path:  "/dashboard/strategy",
    },
    {
      title: "Financial advisory",
      desc:  `${appointments.filter(a => a.service === "financial" && a.status !== "cancelled").length} upcoming appointments`,
      path:  "/dashboard/finance",
    },
    {
      title: "Supply optimization",
      desc:  "AI assistant ready",
      path:  "/dashboard/supply",
    },
    {
      title: "Management",
      desc:  "News & activity summary",
      path:  "/dashboard/management",
    },
    {
      title: "HR consulting",
      desc:  "Exchange update available",
      path:  "/dashboard/hr",
    },
    {
      title: "Marketing consulting",
      desc:  "View your campaigns",
      path:  "/dashboard/marketing",
    },
  ];

  if (loading) {
    return (
      <div className="dashboard">
        <p style={{ color: "#6B6B67", padding: "24px" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <h2>Overview</h2>
        <p>Welcome back, {user?.fullname || "User"}</p>
      </div>

      {/* Stats Cards */}
      <div className="stats">
        <div className="card">
          <p>Appointments booked</p>
          <h3>{appointments.length}</h3>
          <span>+{thisWeek} this week</span>
        </div>

        <div className="card">
          <p>Active appointments</p>
          <h3>{activeAppointments}</h3>
          <span>pending or confirmed</span>
        </div>

        <div className="card">
          <p>AI queries</p>
          <h3>{aiQueries}</h3>
          <span>supply optimization</span>
        </div>
      </div>

      {/* Recent Appointments */}
      {appointments.length > 0 && (
        <div className="recent-appointments">
          <h3>Recent appointments</h3>
          {appointments.slice(0, 3).map((appt) => (
            <div className="service-card1" key={appt._id}>
              <div>
                <h4>{appt.service.charAt(0).toUpperCase() + appt.service.slice(1)} consulting</h4>
                <p>{new Date(appt.date).toDateString()} · {appt.time}</p>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "20px",
                  background:
                    appt.status === "confirmed" ? "#EAF3DE" :
                    appt.status === "cancelled" ? "#FCEBEB" : "#E6F1FB",
                  color:
                    appt.status === "confirmed" ? "#27500A" :
                    appt.status === "cancelled" ? "#A32D2D" : "#185FA5",
                }}
              >
                {appt.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Services Section */}
      <div className="services">
        <h3>Your services</h3>
        {services.map((s) => (
          <div
            className="service-card1"
            key={s.title}
            onClick={() => navigate(s.path)}
            style={{ cursor: "pointer" }}
          >
            <div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
            <span>›</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboards;
