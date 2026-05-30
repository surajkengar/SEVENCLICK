import DashboardLayout from "../Componant/Layout/DashboardLayout";
import Appoitnmentform from "../Componant/Layout/Appointmentform";
function Hr(){
    return (
        
    <div className="startegy-page">

        {/* ✅ MOVE header inside container */}
        <div className="content-container">

            <div className="header">
                <h1>HR consulting</h1>
                <p>Your guide & Appointment booking</p>
            </div>

            <div className="steps">
                <div className="step-card">
                    <p className="step">Step 1</p>
                    <h4>Team assessment</h4>
                    <p>We review your current team structure and identify gaps..</p>
                </div>

                <div className="step-card">
                    <p className="step">Step 2</p>
                    <h4>Policy & compliance</h4>
                    <p>Ensure your HR practices align with current regulations.</p>
                </div>

                <div className="step-card">
                    <p className="step">Step 3</p>
                    <h4>Ongoing support</h4>
                    <p>We handle exchange order updates and team queries.</p>
                </div>
            </div>

            <Appoitnmentform service="hr"/>

        </div>

    </div>
            
        
    )
}

export default Hr;