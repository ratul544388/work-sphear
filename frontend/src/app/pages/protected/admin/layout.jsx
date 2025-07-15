import NotFound from "@/app/not-found";
import Container from "@/components/container";
import { useAuthStore } from "@/hooks/use-auth-store";
import { Outlet } from "react-router";

const AdminLayout = () => {
  const { user } = useAuthStore();
  if (user && user.role !== "ADMIN") {
    return <NotFound />;
  }
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default AdminLayout;
