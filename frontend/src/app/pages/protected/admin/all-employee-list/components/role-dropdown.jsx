import Dropdown from "@/components/dropdown";
import { request } from "@/lib/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const RoleDropdown = ({ user }) => {
  const queryClient = useQueryClient();
  const { name, id, role } = user;
  const { mutate, isPending } = useMutation({
    mutationFn: (newRole) =>
      request({
        method: "patch",
        url: `/admin/employees/${id}/role`,
        data: { role: newRole },
      }),
    onSuccess: (_, newRole) => {
      toast.success(`${name} is now ${newRole}`);
      queryClient.setQueryData(["employees"], (oldData) => {
        return oldData.map((e) => (e.id === id ? { ...e, role: newRole } : e));
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });

  const handleChangeRole = (newRole) => {
    if (role === newRole) return;
    mutate(newRole);
  };

  const items = [
    {
      label: "Employee",
      onClick: () => handleChangeRole("EMPLOYEE"),
      checked: role === "EMPLOYEE",
    },
    {
      label: "HR",
      onClick: () => handleChangeRole("HR"),
      checked: role === "HR",
    },
  ];
  return (
    <Dropdown disabled={isPending} items={items} className="capitalize">
      {role.toLowerCase()}
    </Dropdown>
  );
};

export default RoleDropdown;
