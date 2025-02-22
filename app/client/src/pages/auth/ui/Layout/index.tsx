import { Outlet } from "react-router-dom";
import { useMe } from "@/features/user";

import { Skeleton } from "../Skeleton";

export const Layout = () => {
  const { isLoading } = useMe();

  if (isLoading) {
    <main className="container w-full h-dvh flex items-center justify-center">
      <Skeleton />
    </main>;
  }

  return (
    <main className="container w-full h-dvh flex items-center justify-center">
      <Outlet />
    </main>
  );
};
