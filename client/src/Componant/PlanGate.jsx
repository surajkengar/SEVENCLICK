import { useNavigate } from "react-router-dom";
import { usePlanAccess } from "../hook/usePlanAccess.jsx";

function PlanGate({ requires, children }) {
  const access   = usePlanAccess();
  const navigate = useNavigate();

  // check if user has access
  const hasAccess = access[requires];

  if (!hasAccess) {
    return (
      <div style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        height:         "60vh",
        gap:            "16px",
        textAlign:      "center",
        padding:        "24px"
      }}>
        <div style={{ fontSize: "40px" }}>🔒</div>
        <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#1A1A18" }}>
          This feature requires a paid plan
        </h2>
        <p style={{ fontSize: "14px", color: "#6B6B67", maxWidth: "320px" }}>
          Upgrade to Standard or Pro to unlock this feature.
        </p>
        <button
          onClick={() => navigate("/dashboard/pricing")}
          style={{
            background:    "#185FA5",
            color:         "#fff",
            border:        "none",
            borderRadius:  "10px",
            padding:       "10px 24px",
            fontSize:      "14px",
            fontWeight:    500,
            cursor:        "pointer",
          }}
        >
          View pricing plans
        </button>
      </div>
    );
  }

  return children;
}

export default PlanGate;