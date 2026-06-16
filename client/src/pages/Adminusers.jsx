import { useEffect, useState } from "react";
import { getAllUsers , blockUser } from "../api/DashboardApi.jsx";
import toast from "react-hot-toast";
import "./adminpages.css";

function AdminUsers() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [blocking, setBlocking] = useState(null);
  const [search, setSearch]   = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await getAllUsers();
      if (res.data.success) setUsers(res.data.users);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function handleBlock(id) {
    setBlocking(id);
    try {
      const res = await blockUser(id);
      if (res.data.success) {
        toast.success(res.data.message);
        setUsers(prev =>
          prev.map(u => u._id === id ? { ...u, isBlocked: !u.isBlocked } : u)
        );
      }
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setBlocking(null);
    }
  }

  const filtered = users.filter(u =>
    u.fullname?.toLowerCase().includes(search.toLowerCase()) ||
    u.emailid?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="admin-loading">Loading...</p>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Users</h2>
        <p>{users.length} total registered users</p>
      </div>

      {/* Search */}
      <input
        className="admin-search"
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Plan</th>
              <th>Verified</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "#6B6B67", padding: "40px" }}>
                  No users found
                </td>
              </tr>
            )}
            {filtered.map(u => (
              <tr key={u._id} style={{ opacity: u.isBlocked ? 0.5 : 1 }}>
                <td>
                  <div className="user-avatar-row">
                    <div className="user-mini-avatar">
                      {u.fullname?.charAt(0).toUpperCase()}
                    </div>
                    {u.fullname}
                  </div>
                </td>
                <td>{u.emailid}</td>
                <td>{u.mobileno || "—"}</td>
                <td>
                  <span className="plan-tag">{u.plan || "standard"}</span>
                </td>
                <td>
                  <span style={{ color: u.isVerified ? "#22c55e" : "#ef4444", fontSize: "13px" }}>
                    {u.isVerified ? "✓ Yes" : "✗ No"}
                  </span>
                </td>
                <td style={{ fontSize: "12px", color: "#6B6B67" }}>
                  {new Date(u.createdAt).toDateString()}
                </td>
                <td>
                  <button
                    className={`block-btn ${u.isBlocked ? "unblock" : "block"}`}
                    onClick={() => handleBlock(u._id)}
                    disabled={blocking === u._id}
                  >
                    {blocking === u._id
                      ? "..."
                      : u.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
