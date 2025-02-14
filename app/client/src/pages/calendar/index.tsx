import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CalendarPageSkeleton } from "./ui/CalendarPage";

const CalendarPage = lazy(() =>
  import("./ui/CalendarPage").then((mod) => ({ default: mod.CalendarPage })),
);

export const calendarRouter: RouteObject = {
  path: "/calendar",
  element: (
    <Suspense fallback={<CalendarPageSkeleton />}>
      <CalendarPage />
    </Suspense>
  ),
};
