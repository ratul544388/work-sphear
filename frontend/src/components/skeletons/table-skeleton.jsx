import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TableSkeleton = ({ cell = 9 }) => {
  return (
    <div className="bg-background border w-full overflow-hidden rounded-lg">
      <div className="flex h-10 gap-5 items-center justify-between border-b px-4">
        {Array.from({ length: cell }).map((_, i) => (
          <Skeleton key={i} className="h-5 min-w-20" />
        ))}
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-5 px-4 items-center justify-between py-3 border-b"
        >
          {Array.from({ length: cell }).map((_, i) => (
            <Skeleton key={i} className="min-w-20 h-5" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
