import { Separator } from "@/components/ui/separator";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import ChartLoader from "./chart-loader";

const chartConfig = {
  salary: {
    label: "Salary",
    color: "#2563eb",
  },
};

const SalaryVsMonthChart = () => {
  const { id } = useParams();
  const { data: chartData, isPending } = useQuery({
    queryKey: ["chart-data"],
    queryFn: () => request({ url: `/payrolls/chart-data/${id}` }),
  });

  return (
    <>
      <h2 className="mt-10 font-semibold text-xl">Salary vs. Month </h2>
      <Separator className="my-3" />
      {isPending ? (
        <ChartLoader />
      ) : (
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full max-w-[800px] mx-auto"
        >
          <BarChart accessibilityLayer data={chartData}>
            <YAxis
              dataKey="salary"
              tickLine={false}
              tickFormatter={(value) => `৳${value}`}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="salary" fill="var(--color-chart-1)" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </>
  );
};

export default SalaryVsMonthChart;
