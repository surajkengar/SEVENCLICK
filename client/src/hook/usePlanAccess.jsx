import { useAuth } from "../context/AuthContext";

export function usePlanAccess() {
  const { user } = useAuth();
  const plan = user?.plan || "free";

  return {
    canAccessAI:  plan === "standard" || plan === "pro",
    canAccessStrategy: plan === "standard" || plan === "pro",
    canAccessFinancial: plan === "standard" || plan === "pro",
    canAccessHr: plan === "standard" || plan === "pro",
    canAccessMarketing:  plan === "standard" || plan === "pro",
    canAccessManagement: plan === "standard" || plan === "pro",
    appointmentLimit:    plan === "free" ? 2 : plan === "standard" ? 10 : Infinity,
    plan,
  };
}