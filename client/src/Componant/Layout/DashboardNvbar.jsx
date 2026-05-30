import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/authApi";
import Profilemenu from "./Profilemenu";
import toast from "react-hot-toast";

function DashboardNavbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

async function handleLogout() {
  try {
    await logoutUser();
    logout(); 
     toast.success("Logged out successfully");        // sets isLoggingOut = true + clears user
    navigate("/");    // goes to landing page
  } catch (error) {
     toast.error("Logout failed. Try again.");
    console.log("logout error:", error);
  }
}

  return (
    <header className="navbar1">
      <div className="logo">
        <h2>SevenClick</h2>
      </div>

      <div className="right-section">
        <div className="avatar" onClick={() => setOpen(!open)}>
          {user?.fullname?.charAt(0) || "U"}
        </div>

        {open && (
          <Profilemenu
            user={user}
            onClose={() => setOpen(false)}
            onLogout={handleLogout}  
          />
        )}
      </div>
    </header>
  );
}

export default DashboardNavbar;