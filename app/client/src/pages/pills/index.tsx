import { RouteObject } from "react-router-dom";
import { PillsPageSkeleton } from "./ui/PillsPage";
import { lazy, Suspense } from "react";

const PillsPage = lazy(() =>
  import("./ui/PillsPage").then((mod) => ({ default: mod.PillsPage })),
);

export const pillsRouter: RouteObject = {
  index: true,
  element: (
    <Suspense fallback={<PillsPageSkeleton />}>
      {" "}
      <PillsPage />
    </Suspense>
  ),
};
