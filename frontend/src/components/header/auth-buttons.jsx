import { Link, useLocation } from "react-router";
import { buttonVariants } from "../ui/button";

const AuthButtons = () => {
  const { pathname } = useLocation();
  const visibleRoutes = ["/", "/contact-us"];

  if (!visibleRoutes.includes(pathname)) return null;

  return (
    <div className="flex gap-3 ml-auto">
      <Link
        to="/auth/register"
        className={buttonVariants({ variant: "outline" })}
      >
        Register
      </Link>
      <Link to="/auth/login" className={buttonVariants()}>
        Login
      </Link>
    </div>
  );
};

export default AuthButtons;
