import { useEffect, useState } from "react";
import { getAnalytics } from "../api/DashboardApi.jsx";
import "../style/Admin.css";

function AdminOverview() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const res = await getAnalytics();
      if (res.data.success) setData(res.data.analytics);
    } catch (error) {
      console.log("analytics error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="admin-loading">Loading...</p>;

  const serviceLabel = {
    strategy:  "Strategy Consulting",
    financial: "Financial Advisory",
    hr:        "HR Consulting",
    marketing: "Marketing Consulting",
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Overview</h2>
        <p>Platform analytics at a glance</p>
      </div>

      {/* KPI cards */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <p className="admin-kpi-label">Total users</p>
          <h3 className="admin-kpi-val">{data?.totalUser || 0}</h3>
        </div>
        <div className="admin-kpi-card">
          <p className="admin-kpi-label">Total appointments</p>
          <h3 className="admin-kpi-val">{data?.totalAppointment || 0}</h3>
        </div>
        <div className="admin-kpi-card">
          <p className="admin-kpi-label">AI chat sessions</p>
          <h3 className="admin-kpi-val">{data?.totalChat || 0}</h3>
        </div>
        <div className="admin-kpi-card">
          <p className="admin-kpi-label">Pending appointments</p>
          <h3 className="admin-kpi-val" style={{ color: "#f59e0b" }}>
            {data?.appointments?.pending || 0}
          </h3>
        </div>
      </div>

      {/* Appointment status breakdown */}
      <div className="admin-section">
        <h3>Appointment breakdown</h3>
        <div className="admin-breakdown">
          <div className="breakdown-item">
            <span className="breakdown-dot" style={{ background: "#3b82f6" }}></span>
            <span>Pending</span>
            <span className="breakdown-count">{data?.appointments?.pending || 0}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-dot" style={{ background: "#22c55e" }}></span>
            <span>Confirmed</span>
            <span className="breakdown-count">{data?.appointments?.confirmed || 0}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-dot" style={{ background: "#ef4444" }}></span>
            <span>Cancelled</span>
            <span className="breakdown-count">{data?.appointments?.cancelled || 0}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-dot" style={{ background: "#8b5cf6" }}></span>
            <span>Completed</span>
            <span className="breakdown-count">{data?.appointments?.completed || 0}</span>
          </div>
        </div>
      </div>

      {/* Most booked services */}
      <div className="admin-section">
        <h3>Most booked services</h3>
        {data?.serviceStats?.length === 0 && (
          <p style={{ color: "#6B6B67", fontSize: "13px" }}>No data yet</p>
        )}
        {data?.serviceStates?.map((s) => (
          <div className="service-stat-row" key={s._id}>
            <span>{serviceLabel[s._id] || s._id}</span>
            <span className="service-stat-count">{s.count} bookings</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOverview;
