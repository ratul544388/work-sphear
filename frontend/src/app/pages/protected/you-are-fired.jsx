import { useAuthStore } from "@/hooks/use-auth-store";
import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

const YouAreFired = () => {
  const { user } = useAuthStore();
  const { name } = user;

  return (
    <div className="min-h-main flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-white dark:bg-muted rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-destructive h-10 w-10" />
        </div>
        <h1 className="text-2xl font-semibold text-destructive mb-2">
          You&apos;ve Been Fired
        </h1>
        <p className="text-muted-foreground mb-4">
          Hi {name}, it looks like your employment has been terminated by the admin. You no longer have access to this system.
        </p>

        <Link
          to="/"
          className={buttonVariants()}
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default YouAreFired;
