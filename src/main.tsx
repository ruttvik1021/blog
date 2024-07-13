import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { routers } from "./router.tsx";
import { AuthProvider } from "./wrappers/AuthContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactQueryDevtools initialIsOpen={true} />
        <RouterProvider router={routers} />
        <Toaster richColors position="bottom-right" />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
