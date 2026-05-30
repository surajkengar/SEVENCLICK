import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/authApi.jsx";
import toast from "react-hot-toast";
function Register(){
    const navigate = useNavigate();
    const[formdata , setformdata] =useState({
        fullname : "",
        emailid : "",
        mobileno :"",
        password : "",
        referralid : ""
    })

    const[errors , seterror] = useState({});

    function handleChange(e){
        setformdata({
            ...formdata,
            [e.target.name] : e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();

        let Newerror = {};

        if(!formdata.fullname.trim()){
            Newerror.fullname = "fullname is required";
        }

if (!formdata.emailid.trim()) {
    Newerror.emailid = "emailid is required";
} else if (!/^\S+@\S+\.\S+$/.test(formdata.emailid)) {
    Newerror.emailid = "Enter a valid email";
}

        if(!formdata.mobileno.trim()){
            Newerror.mobileno = "Mobile No is required";
        }else if(formdata.mobileno.length !== 10){
            Newerror.mobileno = "mobile number must be 10 digit";
        }

        if(!formdata.password.trim()){
            Newerror.password = "password is required";
        }else if(formdata.password.length < 6 ){
            Newerror.password = "password must be more than 6 character";
        }

        if(!formdata.referralid.trim()){
            Newerror.referralid = "ReferralId id required";
        }

        seterror(Newerror);

        if(Object.keys(Newerror).length === 0){
             try{
               const res = await toast.promise(
                    registerUser(formdata),
                    {
                        loading : "Creating your account....",
                        success  : "Account created! Please verify your email",
                        error    : (err)=>
                                 err.response?.data?.message || "Registration failed "
                        
                    }
               )

               console.log("Register successfully :",res.data);

               setTimeout(()=>{
                    navigate("/login")
               },1500)
             }catch(error){
               console.log(error);
             }
        }

        
    }
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <h2>create account</h2>
                    <p>create your account to Get Started</p>

                    <form  onSubmit={handleSubmit}>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="enter full name" name="fullname" onChange={handleChange} value={formdata.fullname} />
                        {errors.fullname && <p className="error-text">{errors.fullname}</p>}

                        <label htmlFor="emilid">EmailId</label>
                        <input type="email" id="emailid" placeholder="enter emilid" name="emailid"  value={formdata.emailid} onChange={handleChange}/>
                        {errors.emailid && <p className="error-text">{errors.emailid}</p>}

                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="text" id="mobile" placeholder="enter your mobile nmber" name="mobileno" value={formdata.mobileno} onChange={handleChange} />
                        {errors.mobileno && <p className="error-text">{errors.mobileno}</p>}

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="enter your password" name="password" value={formdata.password} onChange={handleChange} />
                        {errors.password && <p className="error-text">{errors.password}</p>}

                        <label htmlFor="referralid">Referral ID</label>
                        <input type="text" id="referrakid" placeholder="enter your referral id" name="referralid" value={formdata.referralid} onChange={handleChange} />
                        {errors.referralid && <p className="error-text">{errors.referralid}</p>}

                        
                        <button type="submit">signup</button>
                        <Link to="/" className="back-btn">Back</Link>
                        
                    </form>

                    <p className="auth-footer">
                            Already have a account?{" "}
                        <Link to= "/login" className="auth-link">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        )
}

export default Register;