import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createPaymentOrder, verifyUserPayment } from "../api/DashboardApi";
import toast from "react-hot-toast";
import "./pricing.css";

const PLANS = [
  {
    id:       "free",
    name:     "Free",
    price:    0,
    label:    "₹0 / month",
    color:    "#6B6B67",
    features: [
      "2 appointments per month",
      "Strategy & HR consulting",
      "No AI chat access",
      "Email support",
    ],
  },
  {
    id:       "standard",
    name:     "Standard",
    price:    499,
    label:    "₹499 / month",
    color:    "#185FA5",
    popular:  true,
    features: [
      "10 appointments per month",
      "All 4 consulting services",
      "AI supply optimization chat",
      "Priority email support",
    ],
  },
  {
    id:       "pro",
    name:     "Pro",
    price:    999,
    label:    "₹999 / month",
    color:    "#534AB7",
    features: [
      "Unlimited appointments",
      "All 4 consulting services",
      "AI supply optimization chat",
      "Dedicated account manager",
    ],
  },
];

function Pricing() {
  const { user, setUser } = useAuth();
  const navigate          = useNavigate();
  const [loading, setLoading] = useState(null);

  async function handlePayment(plan) {
    // free plan — just update user plan
    if (plan.id === "free") {
      toast.success("You are already on the free plan!");
      return;
    }

    // if already on this plan
    if (user?.plan === plan.id) {
      toast.success(`You are already on the ${plan.name} plan!`);
      return;
    }

    setLoading(plan.id);

    try {
      // step 1 — create order on backend
      const res = await createPaymentOrder({ plan: plan.id });

      if (!res.data.success) {
        toast.error("Failed to create order");
        return;
      }

      const { order, key } = res.data;

      // step 2 — open Razorpay checkout
      const options = {
        key,
        amount:      order.amount,
        currency:    order.currency,
        name:        "SevenClick",
        description: `${plan.name} Plan - Monthly Subscription`,
        order_id:    order.id,
        prefill: {
          name:    user?.fullname || "",
          email:   user?.emailid  || "",
          contact: user?.mobileno || "",
        },
        theme: {
          color: plan.color,
        },
        handler: async function (response) {
          // step 3 — verify payment on backend
          try {
            const verifyRes = await verifyUserPayment({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              plan:                plan.id,
            });

            if (verifyRes.data.success) {
              toast.success(`🎉 ${plan.name} plan activated successfully!`);
              // update user plan in context
              setUser(prev => ({ ...prev, plan: plan.id }));
              navigate("/dashboard");
            }
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
            setLoading(null);
          },
        },
      };

      // load Razorpay script and open checkout
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="pricing-page">

      {/* Header */}
      <div className="pricing-header">
        <h1>Choose your plan</h1>
        <p>Upgrade to unlock more consulting sessions and AI features</p>
      </div>

      {/* Current plan */}
      {user?.plan && (
        <div className="current-plan-banner">
          Your current plan — <strong>{user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}</strong>
        </div>
      )}

      {/* Plans grid */}
      <div className="plans-grid">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className={`plan-card ${plan.popular ? "plan-card--popular" : ""} ${user?.plan === plan.id ? "plan-card--current" : ""}`}
          >
            {plan.popular && (
              <div className="popular-badge">Most popular</div>
            )}
            {user?.plan === plan.id && (
              <div className="current-badge">Current plan</div>
            )}

            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">{plan.label}</div>

            <ul className="plan-features">
              {plan.features.map((f, i) => (
                <li key={i}>
                  <span className="check">✓</span> {f}
                </li>
              ))}
            </ul>

            <button
              className={`plan-btn ${plan.popular ? "plan-btn--popular" : ""}`}
              onClick={() => handlePayment(plan)}
              disabled={loading === plan.id || user?.plan === plan.id}
              style={{ borderColor: plan.color, color: plan.popular ? "#fff" : plan.color }}
            >
              {loading === plan.id
                ? "Processing..."
                : user?.plan === plan.id
                ? "Current plan"
                : plan.id === "free"
                ? "Get started"
                : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Pricing;
