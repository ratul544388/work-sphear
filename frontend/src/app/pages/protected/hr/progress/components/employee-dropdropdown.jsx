import Dropdown from "@/components/dropdown";
import { useQueryParams } from "@/hooks/use-query-params";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

const EmployeeDropdown = () => {
  const { setQueryParams } = useQueryParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("employee_name");

  const { data: employees = [] } = useQuery({
    queryKey: ["employee-names"],
    queryFn: () =>
      request({ url: "/users/employees/names", params: { name: true } }),
  });

  const items = employees.map((e) => ({
    label: e.name,
    onClick: () =>
      setQueryParams({ query: { employee_name: e.name }, toggle: true }),
    checked: e.name === name,
  }));

  return (
    <Dropdown items={items}>
      Employee
      <span className="py-0.5 text-xs rounded-full px-1.5 border border-dashed">{name}</span>
    </Dropdown>
  );
};

export default EmployeeDropdown;
