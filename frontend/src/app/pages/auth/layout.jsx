import Container from "@/components/container";
import { useAuthStore } from "@/hooks/use-auth-store";
import { getRedirectUrlAfterLogin } from "@/lib/utils";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { user } = useAuthStore();

  if (user) {
    const url = getRedirectUrlAfterLogin(user);
    return <Navigate to={url} />;
  }

  return (
    <Container
      elem="main"
      className="flex items-center justify-center min-h-main py-10"
    >
      <Outlet />
    </Container>
  );
};

export default AuthLayout;
