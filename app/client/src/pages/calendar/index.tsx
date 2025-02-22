import { RouteObject } from "react-router-dom";
import { CalendarPage } from "./ui/CalendarPage";

export const calendarRouter: RouteObject = {
  path: "/calendar",
  element: <CalendarPage />,
};
