import NotFound from "@/app/not-found";
import Container from "@/components/container";
import { useAuthStore } from "@/hooks/use-auth-store";
import { Navigate, Outlet } from "react-router";

const EmployeeLayout = () => {
  const { user } = useAuthStore();
  if (user && user.role !== "EMPLOYEE") {
    return <NotFound />;
  }

  if (user.isFired) {
    return <Navigate to="/you-are-fired" />;
  }

  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default EmployeeLayout;
