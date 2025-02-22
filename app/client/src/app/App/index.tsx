import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { IsOnlineProvider } from "@/features/isOnline";
import { calendarRouter } from "@/pages/calendar";
import { pillsRouter } from "@/pages/pills";
import { authRouter } from "@/pages/auth";

const router = createBrowserRouter([authRouter, pillsRouter, calendarRouter]);
const client = new QueryClient();

export const App = () => {
  return (
    <IsOnlineProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </IsOnlineProvider>
  );
};
