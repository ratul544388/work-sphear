import { navLinks } from "@/constants";
import { useAuthStore } from "@/hooks/use-auth-store";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";

const BottomNavbar = () => {
  const { user } = useAuthStore();
  const { pathname } = useLocation();
  return (
    <nav className="fixed bg-background inset-x-0 z-50 md:hidden h-[60px] border-t bottom-0">
      <ul className="flex h-full items-center justify-around">
        {navLinks(user?.role).map(({ href, label, icon: Icon }) => (
          <li key={label} className="h-full">
            <Link
              to={href}
              className={cn(
                "flex flex-col px-4 h-full hover:bg-accent rounded-3xl items-center justify-center gap-0.5 text-muted-foreground",
                pathname === href && "text-foreground"
              )}
            >
              <Icon className="size-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
