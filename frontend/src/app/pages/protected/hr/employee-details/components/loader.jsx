import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loader = () => {
  return (
    <div className="flex gap-4 flex-col xs:flex-row">
      <Skeleton className="rounded-lg w-40 aspect-[5/6]" />
      <div>
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-6 mt-3 w-36" />
        <Skeleton className="h-5 mt-2.5 w-40" />
        <Skeleton className="h-4 mt-2.5 w-20" />
        <Skeleton className="h-5 mt-3 w-40" />
      </div>
    </div>
  );
};

export default Loader;
