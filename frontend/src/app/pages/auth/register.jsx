import { FormWrapper } from "@/components/form-wrapper";
import { FormInput } from "@/components/form/form-input";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/validations";
import { Link } from "react-router";
import GoogleLogin from "./google-login";

const Register = () => {
  const defaultValues = {
    email: "",
    password: "Ratul544@",
    confirmPassword: "Ratul544@",
  };
  return (
    <FormWrapper
      schema={registerSchema}
      defaultValues={defaultValues}
      title="Create Your Account"
      description="Register with your work email to access the Employee Management System."
      actionLabel="Register"
      api="/auth/register"
      redirectUrlAfterSuccess="/complete-profile"
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
          <FormPasswordInput
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter your confirm password"
            disabled={isPending}
          />
          <div className="absolute flex flex-col inset-x-0 px-5 bottom-7">
            <div className="text-sm text-center font-medium">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className={cn(
                  "hover:underline",
                  isPending && "opacity-60 pointer-events-none"
                )}
              >
                Login
              </Link>
            </div>
            <GoogleLogin disabled={isPending} />
          </div>
        </>
      )}
    </FormWrapper>
  );
};

export default Register;
