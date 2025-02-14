import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { authRouter } from "@/pages/auth";
import { pillsRouter } from "@/pages/pills";
import { calendarRouter } from "@/pages/calendar";

const router = createBrowserRouter([authRouter, pillsRouter, calendarRouter]);
const client = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
