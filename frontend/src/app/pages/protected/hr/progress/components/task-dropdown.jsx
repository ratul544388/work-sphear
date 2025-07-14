import Dropdown from "@/components/dropdown";
import { taskTypes } from "@/constants";
import { useQueryParams } from "@/hooks/use-query-params";
import React from "react";
import { useSearchParams } from "react-router";

const TaskDropdown = () => {
  const { setQueryParams } = useQueryParams();
  const [searchParams] = useSearchParams();
  const task = searchParams.get("task");
  const items = taskTypes.map(({ label }) => ({
    label,
    onClick: () =>
      setQueryParams({ query: { task: label.toLowerCase() }, toggle: true }),
    checked: task === label.toLowerCase(),
  }));
  return (
    <Dropdown items={items}>
      Task
      {task && (
        <span className="text-muted-foreground text-xs capitalize px-1.5 py-1 border border-dashed rounded-md">
          {task}
        </span>
      )}
    </Dropdown>
  );
};

export default TaskDropdown;
