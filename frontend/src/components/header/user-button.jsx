import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { placeholderUserImage } from "@/constants";
import { useAuthStore } from "@/hooks/use-auth-store";
import { request } from "@/lib/request";
import { cn } from "@/lib/utils";
import { LogOut, User2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const UserButton = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const dropdownItems = [
    {
      label: "Profile",
      icon: User2,
      onClick: () => navigate("/profile"),
    },
    {
      label: "Logout",
      icon: LogOut,
      onClick: () => {
        request({
          method: "post",
          url: "/auth/logout",
        });
        navigate("/");
        setUser(null);
        toast.success("Logged out");
      },
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "group",
          buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "size-10 !rounded-full ml-auto",
          })
        )}
      >
        <span className="relative size-8 overflow-hidden rounded-full">
          <img
            src={user.image || placeholderUserImage}
            alt="Avatar"
            className="size-full rounded-full object-cover bg-accent"
          />
          <span className="absolute top-0 -left-2 block h-full w-1 -rotate-[25deg] bg-white blur-[1.7px] transition-all duration-300 group-hover:left-[105%]" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[300px]" align="end">
        <div className="flex items-center gap-3">
          <div className="size-14">
            <img
              src={user.image || placeholderUserImage}
              alt="Avatar"
              className="size-full rounded-full object-cover bg-accent"
            />
          </div>
          <div className="text-sm">
            <p className="font-md">{user.name || "Annonymous"}</p>
            <p className="text-muted-foreground line-clamp-1">{user.email}</p>
          </div>
        </div>
        <ul className="flex flex-col pt-3">
          {dropdownItems.map(({ label, icon, onClick }) => {
            const Icon = icon;
            return (
              <li
                onClick={() => {
                  onClick();
                  setOpen(false);
                }}
                key={label}
                role="button"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-foreground/70 hover:text-foreground/70 hover:bg-accent/50 justify-start"
                )}
              >
                <Icon className="text-muted-foreground size-4" />
                {label}
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
