import { Link } from "react-router-dom";
import { useState } from "react";
import { forgotpasswordUser } from "../api/authApi";
import toast from "react-hot-toast";
function Forgotpassword(){
    const[formdata , setformdata] = useState({
        emailid : ""
    })

    const[errors , seterrors] = useState({})


    function handleChange(e){
        setformdata({
            ...formdata,
            [e.target.name] : e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();

        let Newerror = {};
        if(!formdata.emailid.trim()){
            Newerror.emailid = "Emailid is required"
        }else if(!/\S+@\S+\.\S+/.test(formdata.emailid.trim())){
            Newerror.emailid = "emailid is not valid"
        }

        seterrors(Newerror);

        if(Object.keys(Newerror).length === 0){
            try{
                const res = await toast.promise(
                    forgotpasswordUser(formdata),
                    {
                        loading : "sharing resetpassword link....",
                        success : "reset password link shared",
                        error : (err) =>
                                    err.response?.data?.message || "forpassword failed"
                    }
                )
            }catch(error){
                console.log(error);
            }
        }

    }
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Forgot password</h2>
                <p className="auth-subtitle">
                    Enter your emailand we will send you password reset link
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="enter the emailid"  name="emailid" value={formdata.emailid} onChange={handleChange} />

                    {errors.emailid && <p className="error-text">{errors.emailid}</p>}

                    <button type="submit">send Reset link</button>

                    <p className="auth-footer">
                        Remember your password?{" "}
                        <Link to="/login"  className="auth-link">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Forgotpassword;