import { clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  return format(new Date(date), "d MMMM yyyy");
};

export const getRedirectUrlAfterLogin = (user) => {
  const { role, isProfileCompleted } = user;
  if (!isProfileCompleted) {
    return "/complete-profile";
  }
  switch (role) {
    case "EMPLOYEE":
      return "/dashboard/work-sheet";
    case "HR":
      return "/dashboard/employee-list";
    case "ADMIN":
      return "/dashboard/all-employee-list";
    default:
      return "/";
  }
};

export const getLast10YearsOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year > currentYear - 10; year--) {
    years.push({ label: year.toString(), value: year.toString() });
  }

  return years;
};

export const formatPrice = (price) =>
  `${Number(price).toLocaleString("en-BD")} BDT`;
