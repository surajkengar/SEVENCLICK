
import Appoitnmentform from "../Componant/Layout/Appointmentform";
import PlanGate from "../Componant/PlanGate";
function Finincial(){
    return (
    <PlanGate requires="canAccessFinancial">
        <div className="startegy-page">

        {/* ✅ MOVE header inside container */}
        <div className="content-container">

            <div className="header">
                <h1>Financial advisory</h1>
                <p>Your guide & Appointment booking</p>
            </div>

            <div className="steps">
                <div className="step-card">
                    <p className="step">Step 1</p>
                    <h4>Portfolio review</h4>
                    <p>We assess your current holdings and risk profile.</p>
                </div>

                <div className="step-card">
                    <p className="step">Step 2</p>
                    <h4>Strategy design</h4>
                    <p>Smart automation and decision frameworks tailored to your goals.</p>
                </div>

                <div className="step-card">
                    <p className="step">Step 3</p>
                    <h4>Ongoing advisory</h4>
                    <p>Regular check-ins to adjust your plan to market conditions.</p>
                </div>
            </div>

            <Appoitnmentform service="financial"/>

        </div>

    </div>
        </PlanGate>
           
    )
}

export default Finincial;