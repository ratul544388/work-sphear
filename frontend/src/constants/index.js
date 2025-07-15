import {
  ClipboardList,
  Contact,
  DollarSign,
  FileText,
  Home,
  Users,
  Briefcase,
  CreditCard,
  CalendarCheck,
  BarChart2,
  ShieldCheck,
  MessageCircle,
  Rocket,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";

export const navLinks = (role) => {
  return [
    // Public links
    { label: "Home", href: "/", icon: Home },
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
    { label: "Contact Us", href: "/contact-us", icon: Contact },
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

export const services = [
  {
    icon: Briefcase,
    title: "Employee Task Tracking",
    description: "Monitor and manage employee workflow efficiently.",
  },
  {
    icon: CreditCard,
    title: "Automated Payroll System",
    description: "Seamless and secure employee salary processing.",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description: "Dedicated dashboards for Admin, HR, and Employees.",
  },
  {
    icon: CalendarCheck,
    title: "Work Hour Logging",
    description: "Track daily tasks with time and date logging.",
  },
  {
    icon: BarChart2,
    title: "Performance Visualization",
    description: "Graphical insight into monthly performance and salary.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description: "Email, social login, and role-based JWT protection.",
  },
  {
    icon: FileText,
    title: "Payroll Request Management",
    description: "Submit and approve salary payments with tracking.",
  },
  {
    icon: MessageCircle,
    title: "Contact & Feedback",
    description: "Visitors can send feedback directly to Admin.",
  },
];

export const reviews = [
  "This platform has transformed how we manage our team. Work tracking and payroll processing are finally seamless. It saved us hours every week. A must-have for any modern HR department.",
  "We started using this system last month, and it's been a game-changer. Employees can log work effortlessly, and HR can manage everything from one place. The entire team loves it.",
  "As an HR executive, verifying employees, managing salaries, and reviewing progress is so much easier now. The UI is clean and everything works without hassle. Great job!",
  "This web app truly simplifies employee management. Real-time updates and toast notifications keep everyone informed. We now spend less time managing, and more time growing our business.",
  "Our employees no longer struggle to report their daily tasks. The form is intuitive and quick. HR can see everything instantly and follow up when needed. Very practical tool.",
  "I can finally say goodbye to messy spreadsheets! Payroll and work logs are now centralized, and payment tracking is automated. This solution fits perfectly into our workflow.",
  "Managing a team used to be stressful. But now, the clear dashboards, instant CRUD feedback, and secure role-based access make everything feel under control. Very smart design.",
  "Our admin loves the salary management features. The ability to increase salaries safely and promote employees is incredibly helpful. It works like a real enterprise-grade system.",
  "Switching to this system helped us reduce manual errors and miscommunications. Everyone knows what to do, where to report, and how to view their history. Very efficient!",
  "The responsive layout means our team can log work from any device—even on the go. That flexibility alone made this platform worth using.",
  "Payment history and transaction tracking used to be a headache. Now it's all logged and searchable. Our finance department is much happier now.",
  "The chart visualization of employee performance and salary is a great touch. Helps us make better decisions and motivates employees to stay productive.",
  "Employees really appreciate how easy it is to log their hours. It's simple but powerful. Plus, they can see their own history and updates in real-time.",
  "The HR dashboard offers everything we need in one place—verification, salary updates, payment handling. It's made our HR workflow smooth and completely digital.",
  "This app feels like it was built for real teams, not just a demo. Every feature solves a specific business pain point. We're impressed.",
  "We needed a system that was both easy to use and secure. This one checks all the boxes. Firebase auth with role-based routes is perfectly implemented.",
  "Onboarding new team members is now so much faster. Registering roles, setting designations, uploading photos—it's all intuitive and polished. Great user experience.",
  "We especially like how payment approval and execution are split between HR and Admin. It mirrors how real companies operate. Very thoughtful design choices.",
  "Finally, we can manage HR, Employee, and Admin roles without overlap or confusion. The access control is spot-on and keeps the system safe.",
  "We didn't expect such a polished tool for internal use. Everything just works—from toast messages to secure API routes. Excellent work overall.",
  "This is exactly what small to mid-sized companies need. Lightweight, responsive, and covers all essential operations. Highly recommend to any HR team.",
  "Our team adopted it within days. No training needed—just clear forms, smart layout, and everything is self-explanatory. Really speaks to the quality of the UX.",
  "I especially appreciate that data updates reflect instantly without reloads. This makes the whole platform feel modern and highly efficient for day-to-day use.",
  "From managing employees to monitoring workflow and approving salaries, this web app has become an integral part of our daily operations. Couldn't ask for more.",
];

export const coreValues = [
  {
    icon: Rocket,
    title: "Streamlined Operations",
    description:
      "From task submissions to payroll approval, every step is optimized for speed and simplicity—helping teams work smarter, not harder.",
  },
  {
    icon: LayoutDashboard,
    title: "Role-Specific Dashboards",
    description:
      "Admins, HR, and Employees each get a personalized workspace with the exact tools they need. No clutter, just clarity and control.",
  },
  {
    icon: CheckCircle2,
    title: "Instant Feedback System",
    description:
      "Smart toasts, modals, and real-time updates ensure users always know what’s happening—without relying on old-school alerts or page reloads.",
  },
];
