import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">

        <p className="section-title">Main</p>
        <NavLink to="/dashboard" end className="link">
          Dashboard
        </NavLink>

        <p className="section-title">CONSULTING</p>
        <NavLink to="/dashboard/appointments" className="link">
           My Appointments
        </NavLink>
        <NavLink to="/dashboard/strategy" className="link">
          Strategy Consulting
        </NavLink>
        <NavLink to="/dashboard/finance" className="link">
          Financial Advisory
        </NavLink>
        <NavLink to="/dashboard/hr" className="link">
          HR Consulting
        </NavLink>
        <NavLink to="/dashboard/marketing" className="link">
          Marketing Consulting
        </NavLink>

        <p className="section-title">TOOLS</p>
        <NavLink to="/dashboard/supply" className="link">
          Supply Optimization
        </NavLink>
        <NavLink to="/dashboard/management" className="link">
          Management
        </NavLink>

      </div>
    </div>
  );
}

export default Sidebar;