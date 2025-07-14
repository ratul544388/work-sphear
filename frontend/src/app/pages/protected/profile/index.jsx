import Container from "@/components/container";
import Title from "@/components/title";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useSearchParams } from "react-router";
import ChangePasswordForm from "./components/change-password-form";
import DeleteAccountForm from "./components/delete-account-form";
import EditProfileForm from "./components/edit-profile-form";
import Sidebar from "./components/sidebar";
import UserInfo from "./components/user-info";

const Profile = () => {
  const { loading } = useAuthStore();
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="mt-12">
      <Title>My Profile</Title>
      <div className="bg-background relative mx-auto flex w-full max-w-[800px] justify-center gap-4 overflow-hidden rounded-xl border px-4 py-10 pl-8 shadow-lg sm:pl-4">
        <Sidebar />
        <div className="w-full">
          {!view && <UserInfo />}
          {view === "edit-profile" && <EditProfileForm />}
          {view === "change-password" && <ChangePasswordForm />}
          {view === "delete-account" && <DeleteAccountForm />}
        </div>
      </div>
    </Container>
  );
};

const Loader = () => {
  return (
    <Container className="mt-12">
      <div className="flex gap-5 rounded-xl border p-4 max-w-[800px] mx-auto shadow-md">
        <div className="space-y-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-[200px]" />
          ))}
        </div>
        <Skeleton className="h-[300px] w-full rounded-xl border" />
      </div>
    </Container>
  );
};

export default Profile;
