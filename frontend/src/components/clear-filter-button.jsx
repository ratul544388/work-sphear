import { useQueryParams } from "@/hooks/use-query-params";
import { useSearchParams } from "react-router";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const ClearFilterButton = () => {
  const [searchParams] = useSearchParams();
  const { setQueryParams } = useQueryParams();

  if (searchParams.size === 0) {
    return null;
  }

  return (
    <Button
      onClick={() => setQueryParams({ clearCurrentQuery: true })}
      variant="outline"
    >
      <X className="size-4" />
      Clear Filters
      <span className="bg-blue-500 text-xs size-5 font-medium rounded-full flex items-center justify-center text-white">
        {searchParams.size}
      </span>
    </Button>
  );
};

export default ClearFilterButton;
