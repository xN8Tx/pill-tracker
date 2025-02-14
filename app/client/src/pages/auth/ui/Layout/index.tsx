import { Outlet } from "react-router-dom";
import { useMe } from "@/features/user";

export const Layout = () => {
  useMe();

  return (
    <main className="container w-full h-dvh flex items-center justify-center">
      <Outlet />
    </main>
  );
};
