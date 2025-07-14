import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import "./index.css";
import ReactQueryProvider from "./providers/react-query-provider";
import { ThemeProvider } from "./providers/theme-provider";
import { router } from "./routers";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ReactQueryProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
        <Toaster />
      </HelmetProvider>
    </ReactQueryProvider>
  </ThemeProvider>
);
