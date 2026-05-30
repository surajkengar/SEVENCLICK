import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Profilemenu({ user, onLogout, onClose }) {
    const menuRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickoutside(e) {
            // click OUTSIDE → close menu
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickoutside);

        return () => {
            document.removeEventListener("mousedown", handleClickoutside);
        };
    }, [onClose]);

    return (
        <div className="profile-dropdown" ref={menuRef}>
            
            <div 
                className="profile-info"
                onClick={() => {
                    navigate("/dashboard/profile");
                    onClose();
                }}
            >
                <p className="name">Profile</p>
            </div>

            <div onClick={() => { navigate("/dashboard/appointments"); onClose(); }}>
                <p>Appointments</p>
            </div>

            <button className="logout-btn" onClick={onLogout}>
                Logout
            </button>
        </div>
    );
}

export default Profilemenu;