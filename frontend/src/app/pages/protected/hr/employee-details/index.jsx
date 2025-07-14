import PageHeader from "@/components/page-header";
import Title from "@/components/title";
import { placeholderUserImage } from "@/constants";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Verified } from "lucide-react";
import { useParams } from "react-router";
import Loader from "./components/loader";
import UserVerified from "@/components/user-verified";
import BarChart from "./components/salary-vs-month-chart";

const EmployeeDetails = () => {
  const { id } = useParams();
  const { data: employee = {}, isPending } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => request({ url: `/users/${id}` }),
  });

  const { name, image, designation, email, _count, isVerified } = employee;

  return (
    <>
      <Title>{name || "Employee Details"}</Title>
      <PageHeader label="Employee Details" className="mb-4" />
      {isPending && <Loader />}
      {!isPending && (
        <div className="flex flex-col xs:flex-row gap-4">
          <img
            src={image || placeholderUserImage}
            alt="Image"
            className="w-40 aspect-[4/5] object-cover rounded-lg bg-accent"
          />
          <div>
            <h1 className="font-semibold text-2xl">{name}</h1>
            <p className="text-muted-foreground text-lg">{designation}</p>
            <p className="">{email}</p>
            <UserVerified isVerified={isVerified} />
            <p className="mt-3 font-medium text-blue-500">
              Task Completed: {_count.workEntries}
            </p>
          </div>
        </div>
      )}
      <BarChart/>
    </>
  );
};

export default EmployeeDetails;
