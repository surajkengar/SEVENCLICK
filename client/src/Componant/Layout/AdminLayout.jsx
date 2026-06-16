import { Outlet } from "react-router-dom";
import AdminNavbar from "./Adminnavbar";
import AdminSidebar from "./Adminsidebar";
import "./admin.css";

function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminNavbar />
      <div className="admin-body">
        <AdminSidebar />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
