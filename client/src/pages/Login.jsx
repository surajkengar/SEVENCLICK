import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/authApi.jsx";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    emailid: "",
    password: ""
  });

  const{checkAuth} = useAuth();

  const [error, seterror] = useState({});

  // ✅ handle input change
  function handleChange(e) {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  }

  // ✅ handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("button clicked");

    let Newerror = {};

    // 🔹 Email validation
    if (!formdata.emailid.trim()) {
      Newerror.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formdata.emailid.trim())) {
      Newerror.email = "Invalid email format";
    }

    // 🔹 Password validation
    if (!formdata.password.trim()) {
      Newerror.password = "Password is required";
    } else if (formdata.password.length < 6) {
      Newerror.password = "Password must be at least 6 characters";
    }

    seterror(Newerror);

    if(Object.keys(Newerror).length === 0){
      try{
          const res = await toast.promise(
            loginUser(formdata),
            {
              loading :"logging in....",
              success : "login successfully",
              error :(err)=>{
               return err.response?.data?.message || "Login failed"
              }
                 
            }
            
          )

           console.log("Login success:", res.data);
          await checkAuth();
          navigate("/dashboard");
      }catch(error){
        console.log(error);
      }
    }

    
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <p className="auth-subtitle">
          Welcome back! Please enter your details.
        </p>

        <form onSubmit={handleSubmit}>
          
          {/* ✅ Email */}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="emailid"
            placeholder="Enter your email"
            value={formdata.emailid}
            onChange={handleChange}
          />
          {error.email && <p className="error-text">{error.email}</p>}

          {/* ✅ Password */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={handleChange}
          />
          {error.password && <p className="error-text">{error.password}</p>}

          <div className="auth-row">
            <Link to="/forgot-password" className="auth-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;