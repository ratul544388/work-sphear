import { FormWrapper } from "@/components/form-wrapper";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import ImageUpload from "@/components/image-upload";
import { useAuthStore } from "@/hooks/use-auth-store";
import { getRedirectUrlAfterLogin } from "@/lib/utils";
import { completeProfileSchema } from "@/validations";
import { Navigate, useNavigate } from "react-router";

const CompleteProfile = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();


  if(user.isProfileCompleted) {
    return <Navigate to="/"/>
  }

  const defaultValues = {
    name: user.name || "",
    image: user.image || "",
    designation: "",
    salary: 0,
    bankAccountNo: "",
    role: "",
  };
  return (
    <FormWrapper
      method="put"
      api="/users/me/complete-profile"
      schema={completeProfileSchema}
      defaultValues={defaultValues}
      title="Set Up Your Profile"
      description="Complete your profile to ensure a smooth HR and payroll experience."
      actionLabel="Continue"
      onSuccess={(user) => {
        const url = getRedirectUrlAfterLogin(user);
        navigate(url);
        setTimeout(() => {
          setUser(user);
        }, 200);
      }}
      className="my-10 mx-auto"
    >
      {({ isPending, form }) => {
        return (
          <>
            <ImageUpload
              name="image"
              disabled={isPending}
              value={form.getValues("image")}
              onChange={(value) => form.setValue("image", value)}
            />
            <FormInput
              control={form.control}
              name="name"
              placeholder="Enter your name"
              disabled={isPending}
            />
            <FormInput
              control={form.control}
              name="designation"
              placeholder="Enter your designation"
              description="Your current job title, such as 'Software Engineer' or 'Project Manager'."
              disabled={isPending}
            />
            <FormInput
              control={form.control}
              name="salary"
              placeholder="Enter your salary"
              disabled={isPending}
              type="number"
            />
            <FormInput
              control={form.control}
              name="bankAccountNo"
              placeholder="Enter your Bank Account No."
              disabled={isPending}
              type="number"
            />
            <FormSelect
              control={form.control}
              name="role"
              placeholder="Enter your role"
              disabled={isPending}
              options={[
                {
                  label: "Employee",
                  value: "EMPLOYEE",
                },
                {
                  label: "Hr",
                  value: "HR",
                },
              ]}
            />
          </>
        );
      }}
    </FormWrapper>
  );
};

export default CompleteProfile;
