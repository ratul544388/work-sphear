import Container from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/use-auth-store";
import { getRedirectUrlAfterLogin } from "@/lib/utils";
import { Link } from "react-router";

const Banner = () => {
  const { user } = useAuthStore();

  const actionUrl = user ? getRedirectUrlAfterLogin(user) : "/auth/register";

  return (
    <div className="h-[70vh] max-h-[700px] relative">
      <img
        src="/banner.png"
        alt="Banner"
        className="w-full h-full object-cover opacity-40"
      />
      <Container className="absolute md:pl-14 inset-0 flex items-center justify-between">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-5xl text-center lg:text-start md:text-6xl lg:text-7xl max-w-3xl lg:max-w-xs font-bold text-foreground/80">
            Streamline Workforce Management
          </h1>
          <Link
            to={actionUrl}
            className={buttonVariants({
              className:
                "mt-7 h-14 px-10 rounded-full! font-semibold! text-lg!",
            })}
          >
            {user ? "Go to Dashboard" : "Get Started"}
          </Link>
        </div>
      </Container>
      <img
        src="/woman-worker.png"
        alt="design"
        className="lg:w-[500px] xl:w-[600px] 2xl:w-[800px] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-90 hidden lg:block"
      />
    </div>
  );
};

export default Banner;
