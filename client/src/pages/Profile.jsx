import "./style/profile.css";
import { FaUser, FaEnvelope, FaBriefcase, FaCalendar, FaPhone } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();  // ✅ real user data

  return (
    <div className="profile-page">
      <div className="account-card">

        <h2 className="title">Account Information</h2>

        <div className="info-row">
          <div className="icon"><FaUser /></div>
          <div>
            <p className="label">Full Name</p>
            <p className="value">{user?.fullname || "N/A"}</p>
          </div>
        </div>

        <div className="info-row">
          <div className="icon"><FaEnvelope /></div>
          <div>
            <p className="label">Email</p>
            <p className="value">{user?.emailid || "N/A"}</p>
          </div>
        </div>

        <div className="info-row">
          <div className="icon"><FaPhone /></div>
          <div>
            <p className="label">Mobile</p>
            <p className="value">{user?.mobileno || "N/A"}</p>
          </div>
        </div>

        <div className="info-row">
          <div className="icon"><FaBriefcase /></div>
          <div>
            <p className="label">Plan</p>
            <p className="value">{user?.plan || "Standard"}</p>
          </div>
        </div>

        <div className="info-row">
          <div className="icon"><FaCalendar /></div>
          <div>
            <p className="label">Member since</p>
            <p className="value">
              {user?.createdAt
                ? new Date(user.createdAt).toDateString()
                : "N/A"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;