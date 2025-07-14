import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";

const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const sidebarItems = [
    {
      label: "Info",
    },
    {
      label: "Edit Profile",
      param: "edit-profile",
    },
    {
      label: "Change Password",
      param: "change-password",
    },
    {
      label: "Delete Account",
      param: "delete-account",
    },
  ];

  const currentView = searchParams.get("view");

  const TriggerIcon = useMemo(() => open ? X : Menu, [open]);

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        size="icon"
        className="absolute -top-9 -left-7 z-30 sm:hidden"
      >
        <TriggerIcon className="size-4" />
      </Button>
      <aside
        className={cn(
          "min-w-[200px] bg-background pt-16 sm:pt-0 sm:bg-transparent -inset-y-10 z-20 transition-all ease-in absolute md:static -left-8 -translate-x-[calc(100%_+_100px)] md:translate-x-0",
          open && "translate-x-0"
        )}
      >
        <ul className="flex flex-col">
          {sidebarItems.map(({ label, param }) => {
            const isActive = param
              ? currentView === param
              : !currentView; // "Info" is active when no view param
            const href = param ? `/profile?view=${param}` : "/profile";

            return (
              <li key={label}>
                <Link
                  to={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "justify-start w-full",
                    isActive && "bg-secondary/80"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
