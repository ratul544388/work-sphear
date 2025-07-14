import Dropdown from "@/components/dropdown";
import { months } from "@/constants";
import { useQueryParams } from "@/hooks/use-query-params";
import { useSearchParams } from "react-router";

const MonthDropdown = () => {
  const { setQueryParams } = useQueryParams();
  const [searchParams] = useSearchParams();
  const month = searchParams.get("month");
  const items = months.map(({ label }) => ({
    label,
    onClick: () =>
      setQueryParams({ query: { month: label.toLowerCase() }, toggle: true }),
    checked: month === label.toLowerCase(),
  }));
  return (
    <Dropdown items={items}>
      Month
      {month && (
        <span className="text-muted-foreground text-xs capitalize px-1.5 py-1 border border-dashed rounded-md">
          {month}
        </span>
      )}
    </Dropdown>
  );
};

export default MonthDropdown;
