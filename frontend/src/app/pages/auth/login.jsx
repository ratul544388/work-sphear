import { FormWrapper } from "@/components/form-wrapper";
import { FormInput } from "@/components/form/form-input";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/validations";
import { Link } from "react-router";
import GoogleLogin from "./google-login";
import Title from "@/components/title";

const Login = () => {
  const defaultValues = {
    email: "",
    password: "Ratul544@",
  };
  return (
    <>
      <Title>Login</Title>
      <FormWrapper
        defaultValues={defaultValues}
        title="Welcome Back"
        description="Log in with your work credentials to access your dashboard and manage your employee profile."
        actionLabel="Login"
        schema={loginSchema}
        api="/auth/login"
        method="post"
        invalidateQueryKeys={["user"]}
        className="relative pb-36"
      >
        {({ form, isPending }) => (
          <>
            <FormInput
              autoFocus
              control={form.control}
              name="email"
              placeholder="Enter your Email"
              disabled={isPending}
            />
            <FormPasswordInput
              control={form.control}
              name="password"
              placeholder="Enter your password"
              disabled={isPending}
            />
            <div className="absolute flex flex-col inset-x-0 px-5 bottom-7">
              <div className="text-sm text-center font-medium">
                Do not have an account?{" "}
                <Link
                  to="/auth/register"
                  className={cn(
                    "hover:underline",
                    isPending && "opacity-60 pointer-events-none"
                  )}
                >
                  Register
                </Link>
              </div>
              <GoogleLogin disabled={isPending} />
            </div>
          </>
        )}
      </FormWrapper>
    </>
  );
};

export default Login;
