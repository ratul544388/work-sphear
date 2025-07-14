import Container from "@/components/container";
import Header from "@/components/header";
import PageLoader from "@/components/page-loader";
import { useAuthStore } from "@/hooks/use-auth-store";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router";

const MainLayout = () => {
  const { loading, user, setUser } = useAuthStore();
  const { pathname } = useLocation();

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { user } = await request({ url: "/users/me" });
      setUser(user);
      return user;
    },
  });

  if (loading) {
    return <PageLoader />;
  }

  if (user && !user.isProfileCompleted && pathname !== "/complete-profile") {
    return <Navigate to="/complete-profile" />;
  }

  return (
    <>
      <Header />
      <Container elem="main" className="min-h-main">
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
