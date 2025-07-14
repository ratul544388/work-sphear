import {
  ClipboardList,
  Contact,
  DollarSign,
  FileText,
  Home,
  Users,
} from "lucide-react";

export const navLinks = (role) => {
  return [
    // Public links
    ...(!role
      ? [
          { label: "Home", href: "/", icon: Home },
          { label: "Contact Us", href: "/contact-us", icon: Contact },
        ]
      : []),

    // Employee links
    ...(role === "EMPLOYEE"
      ? [
          {
            label: "Work Sheet",
            href: "/dashboard/work-sheet",
            icon: ClipboardList,
          },
          {
            label: "Payment History",
            href: "/dashboard/payment-history",
            icon: DollarSign,
          },
        ]
      : []),

    // HR links
    ...(role === "HR"
      ? [
          {
            label: "Employee List",
            href: "/dashboard/employee-list",
            icon: Users,
          },
          {
            label: "Progress",
            href: "/dashboard/progress",
            icon: FileText,
          },
        ]
      : []),

    // Admin links
    ...(role === "ADMIN"
      ? [
          {
            label: "All Employees",
            href: "/dashboard/all-employee-list",
            icon: Users,
          },
          {
            label: "Payroll",
            href: "/dashboard/payroll",
            icon: DollarSign,
          },
        ]
      : []),
  ];
};

export const taskTypes = [
  { enum: "SALES", label: "Sales" },
  { enum: "SUPPORT", label: "Support" },
  { enum: "CONTENT", label: "Content" },
  { enum: "PAPERWORK", label: "Paperwork" },
];

export const placeholderUserImage = "/placeholder-user.webp";

export const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export const MonthNumberToStringMap = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
