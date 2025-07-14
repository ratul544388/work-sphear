import UserVerified from "@/components/user-verified";
import { placeholderUserImage } from "@/constants";
import { useAuthStore } from "@/hooks/use-auth-store";
import { formatPrice } from "@/lib/utils";

const UserInfo = () => {
  const { user } = useAuthStore();
  if (!user) return;
  const { name, image, role, designation, salary, email, isVerified } = user;
  return (
    <div className="flex flex-col w-full md:flex-row gap-4">
      <img
        src={image || placeholderUserImage}
        alt={name}
        className="object-cover min-w-40 max-w-40 h-48 rounded-md overflow-hidden bg-secondary/40"
      />
      <div>
        <h3 className="font-medium text-xl">{name}</h3>
        <p className="text-sm text-muted-foreground">{designation}</p>
        <p className="mt-3 font-medium text-sm">{email}</p>
        <UserVerified isVerified={isVerified} />
        <p className="capitalize mt-4 text-sm font-medium">
          <span className="text-muted-foreground">Role</span>:{" "}
          {role.toLowerCase()}
        </p>
        <p className="mt-4 text-sm font-medium">
          <span className="text-muted-foreground">Salary</span>:{" "}
          {formatPrice(salary)}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
