import { Link } from "react-router-dom"

function Navbar(){

    return (
        <>
            <nav className="navbar">

            <div className="logo">
                SevenClick
            </div>
           
            <div className="nav-links">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Service</a>
                <a href="#article">Artical</a>
                <a href="#pdfdownload">pdfDownload</a>
                <a href="#contact">Contact</a>
            </div>

            <div className="auth-links">
                <Link to="/login">Login</Link>
                <Link to="/register" className="register-btn">Register</Link>
            </div>

        </nav>
        
        </>

    )
}

export default Navbar;