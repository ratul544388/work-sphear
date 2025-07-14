import { useAuthStore } from "@/hooks/use-auth-store";
import Container from "../container";
import Logo from "../logo";
import AuthButtons from "./auth-buttons";
import NavLinks from "./nav-links";
import { UserButton } from "./user-button";

const Header = () => {
  const { user } = useAuthStore();
  return (
    <Container
      elem="header"
      className="h-header sticky top-0 bg-background z-50 flex items-center gap-6 border-b"
    >
      <Logo />
      <NavLinks />
      {user && <UserButton />}
      {!user && <AuthButtons/>}
    </Container>
  );
};

export default Header;
