import DashboardLayout from "../Componant/Layout/DashboardLayout";
import Appoitnmentform from "../Componant/Layout/Appointmentform";
import "./style/strategy.css";

function Strategy(){

    return (
       

    <div className="startegy-page">

        {/* ✅ MOVE header inside container */}
        <div className="content-container">

            <div className="header">
                <h1>Strategy consulting</h1>
                <p>Your guide & Appointment booking</p>
            </div>

            <div className="steps">
                <div className="step-card">
                    <p className="step">Step 1</p>
                    <h4>Define your goals</h4>
                    <p>We start by understanding your business objectives.</p>
                </div>

                <div className="step-card">
                    <p className="step">Step 2</p>
                    <h4>Build a roadmap</h4>
                    <p>We create a clear strategy tailored to you.</p>
                </div>

                <div className="step-card">
                    <p className="step">Step 3</p>
                    <h4>Execute & review</h4>
                    <p>Track progress and improve continuously.</p>
                </div>
            </div>

            <Appoitnmentform service="strategy"/>

        </div>

    </div>


    );
}

export default Strategy;