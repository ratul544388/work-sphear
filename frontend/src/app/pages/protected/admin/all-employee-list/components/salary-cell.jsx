import { Button } from "@/components/ui/button";
import { request } from "@/lib/request";
import { formatPrice } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const SalaryCell = ({ user }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const { id, salary } = user;
  const inputRef = useRef();
  const [value, setValue] = useState(salary);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    setTimeout(() => {
      inputRef.current.focus();
    }, 200);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      request({
        method: "patch",
        url: `/users/${id}/salary`,
        data: { salary: value },
      }),
    onSuccess: ({ message }) => {
      queryClient.setQueryData(["employees"], (oldData) => {
        return oldData.map((e) => (e.id === id ? { ...e, salary: value } : e));
      });
      toast.success(message);
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="flex items-center gap-1">
      {!isEditing && (
        <>
          <p>{formatPrice(salary)}</p>
          <Button
            disabled={isPending}
            onClick={toggleEditing}
            variant="ghost"
            size="icon"
            className="size-7"
          >
            <Edit className="size-4" />
          </Button>
        </>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            disabled={isPending}
            min={salary}
            max={1000000}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            ref={inputRef}
            className="w-[150px] h-8 rounded-md border shadow-sm px-3"
            type="number"
          />
          <div className="flex gap-3 justify-end">
            <Button
              disabled={isPending}
              onClick={toggleEditing}
              size="sm"
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isPending || value === salary} size="sm">
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SalaryCell;
