import { Button } from "@/components/ui/button";
import { request } from "@/lib/request";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const VerifiedCellButton = ({ employee }) => {
  const { id, isVerified } = employee;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      request({
        method: "patch",
        url: `/users/${id}/toggle-verified`,
        data: { isVerified },
        onSuccess: () => {
          if (isVerified) {
            toast.success("Employee marked as unverified");
          } else {
            toast.success("Employee marked as verified");
          }
          queryClient.setQueryData(["employees"], (oldData) => {
            return oldData.map((employee) =>
              employee.id !== id
                ? employee
                : { ...employee, isVerified: !isVerified }
            );
          });
        },
        onError: (error) => {
          console.log(error);
          toast.error("Something went wrong");
        },
      }),
  });

  const Icon = isVerified ? Check : X;

  return (
    <Button onClick={mutate} disabled={isPending} variant="outline" size="icon">
      <Icon
        className={cn(
          "size-6",
          isVerified ? "text-blue-500" : "text-destructive"
        )}
      />
    </Button>
  );
};

export default VerifiedCellButton;
