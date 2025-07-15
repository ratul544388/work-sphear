import { useAuthStore } from "@/hooks/use-auth-store";
import Container from "../container";
import Logo from "../logo";
import AuthButtons from "./auth-buttons";
import NavLinks from "./nav-links";
import { UserButton } from "./user-button";

const Header = () => {
  const { user } = useAuthStore();
  return (
    <header className="h-header sticky top-0 bg-background z-50  border-b">
      <Container className="h-full max-w-full flex items-center gap-6">
        <Logo />
        <NavLinks />
        {user && <UserButton />}
        {!user && <AuthButtons />}
      </Container>
    </header>
  );
};

export default Header;
