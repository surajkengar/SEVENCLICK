import DashboardLayout from "../Componant/Layout/DashboardLayout";
import Appoitnmentform from "../Componant/Layout/Appointmentform";
import PlanGate from "../Componant/PlanGate";


function Marketing(){
    return (

    <PlanGate requires="canAccessMarketing">
        <div className="startegy-page">

        {/* ✅ MOVE header inside container */}
        <div className="content-container">

            <div className="header">
                <h1>Marketing consulting</h1>
                <p>Your guide & Appointment booking</p>
            </div>

            <div className="steps">
                <div className="step-card">
                    <p className="step">Step 1</p>
                    <h4>Audit your presence</h4>
                    <p>We review your current marketing channels and messaging.</p>
                </div>

                <div className="step-card">
                    <p className="step">Step 2</p>
                    <h4>Campaign design</h4>
                    <p>Build targeted campaigns across crypto, forex, and trading audiences.</p>
                </div>

                <div className="step-card">
                    <p className="step">Step 3</p>
                    <h4>Track & optimize</h4>
                    <p>Monitor performance and iterate on what works best.</p>
                </div>
            </div>

            <Appoitnmentform service="marketing"/>

        </div>

        </div>
    </PlanGate>         
        
    )
}

export default Marketing;