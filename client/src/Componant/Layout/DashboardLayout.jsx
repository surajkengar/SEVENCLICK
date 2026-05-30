import DashboardNavbar from "./DashboardNvbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./index.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">

      {/* Navbar full width */}
      <DashboardNavbar />

      {/* Sidebar + Content in same row */}
      <div className="dashboard-body">
        <Sidebar />

      <div className="dashboard-content">
        <Outlet />
      </div>
      </div>

    </div>
  );
}

export default DashboardLayout;