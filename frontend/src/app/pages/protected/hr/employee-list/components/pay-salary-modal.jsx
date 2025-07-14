import { FormWrapper } from "@/components/form-wrapper";
import { FormSelect } from "@/components/form/form-select";
import Modal from "@/components/modal";
import { months } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";
import { formatPrice, getLast10YearsOptions } from "@/lib/utils";
import { payrollRequestSchema } from "@/validations";
import { useState } from "react";
import { toast } from "sonner";

const PaySalaryModal = () => {
  const { open, type, onClose, data = {} } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);

  const { salary, employeeId } = data;
  return (
    <Modal
      open={open && type === "paySalary"}
      title="Submit Payroll Request"
      description="Specify the salary, month, and year to initiate the payroll process for the selected employee."
      onOpenChange={onClose}
      disabled={isLoading}
      className="gap-0"
    >
      <FormWrapper
        insideModal
        schema={payrollRequestSchema}
        defaultValues={{
          month: "",
          year: new Date().getFullYear().toString(),
          salary,
        }}
        api={`/hr/payroll/${employeeId}`}
        actionLabel="Pay"
        setIsPending={setIsLoading}
        onSuccess={() => {
          toast.success("Payroll request has sent to Admin");
          onClose();
        }}
      >
        {({ isPending, form }) => {
          return (
            <>
              <FormSelect
                control={form.control}
                disabled={isPending}
                name="month"
                options={months}
                placeholder="Select the month"
              />
              <FormSelect
                control={form.control}
                disabled={isPending}
                name="year"
                placeholder="Select the year"
                options={getLast10YearsOptions()}
              />
              <p className="text-sm font-medium text-end text-blue-500">
                Paying Salary: {formatPrice(form.getValues("salary"))}
              </p>
            </>
          );
        }}
      </FormWrapper>
    </Modal>
  );
};

export default PaySalaryModal;
