import { navLinks } from "@/constants";
import { useAuthStore } from "@/hooks/use-auth-store";
import { Link, useLocation } from "react-router";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const { user } = useAuthStore();
  const { pathname } = useLocation();
  return (
    <nav className="hidden sm:block">
      <ul className="flex">
        {navLinks(user?.role).map(({ href, label }) => (
          <li key={label}>
            <Link
              to={href}
              className={buttonVariants({
                variant: "ghost",
                className: cn(
                  "text-foreground/70",
                  pathname === href && "text-foreground"
                ),
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
