import { RouteObject } from "react-router-dom";
import { PillsPage } from "./ui/PillsPage";

export const pillsRouter: RouteObject = {
  index: true,
  element: <PillsPage />,
};
