import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetpasswordUser } from "../api/authApi";
import toast from "react-hot-toast";
function Resetpassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    password: "",
    confirmpassword: ""
  });

  const [error, seterror] = useState({});

  function handlechange(e) {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let Newerror = {};

    if (!formdata.password.trim()) {
      Newerror.password = "Password is required";
    } else if (formdata.password.length < 6) {
      Newerror.password = "Password must be at least 6 characters";
    }

    if (!formdata.confirmpassword.trim()) {
      Newerror.confirmpassword = "Confirm password is required";
    } else if (formdata.password !== formdata.confirmpassword) {
      Newerror.confirmpassword = "Passwords do not match";
    }

    seterror(Newerror);

    if (Object.keys(Newerror).length === 0) {
      try {
        await toast.promise(
          resetpasswordUser(token , formdata),
          {
            loading : "Resetting your passwrd....",
            success : "password changed ! you can login now",
            error :(err) => 
                err.response?.data?.message || "Reset failed"
            
          }
        )
       
      navigate("/login");

      } catch (error) {
        toast.error(error.response?.data?.message || "Reset failed ❌");
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <p className="auth-subtitle">Enter your new password below</p>

        <form onSubmit={handleSubmit}>

          {/* 🔥 Password */}
          <label htmlFor="password">New Password</label>
          <input
            className="auth-input"
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={handlechange}
          />
          {error.password && <p className="error-text">{error.password}</p>}

          {/* 🔥 Confirm Password */}
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            className="auth-input"
            id="confirmpassword"
            type="password"
            name="confirmpassword"
            placeholder="Confirm your password"
            value={formdata.confirmpassword}
            onChange={handlechange}
          />
          {error.confirmpassword && (
            <p className="error-text">{error.confirmpassword}</p>
          )}

          <button className="auth-button" type="submit">
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
}

export default Resetpassword;