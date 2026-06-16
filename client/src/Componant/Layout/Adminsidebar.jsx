import { NavLink } from "react-router-dom";
import "./admin.css";

const NAV = [
  { to: "/admin",              label: "Overview",       icon: "📊", end: true },
  { to: "/admin/appointments", label: "Appointments",   icon: "📅" },
  { to: "/admin/users",        label: "Users",          icon: "👥" },
];

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <nav className="admin-sidebar-nav">
        <p className="admin-sidebar-section">Main</p>
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `admin-sidebar-item${isActive ? " admin-sidebar-item--active" : ""}`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
