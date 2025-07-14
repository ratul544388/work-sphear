import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = ({disabled}) => {
  return (
    <div>
      <div className="relative">
        <Separator className="my-5" />
        <span className="absolute top-[-14.5px] px-2 bg-background left-1/2 -translate-x-1/2">
          or
        </span>
      </div>
      <Button
        disabled={disabled}
        type="button"
        onClick={() =>
          window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`
        }
        className="w-full"
        variant="outline"
      >
        <FcGoogle />
        Continue with Google
      </Button>
    </div>
  );
};

export default GoogleLogin;
