import { useAuthStore } from "@/hooks/use-auth-store";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
};

export default ProtectedLayout;
