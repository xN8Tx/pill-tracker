import { useMe } from "@/features/user";
import { Navbar } from "../Navbar";

export const Layout = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: React.ReactNode;
}) => {
  useMe();

  return (
    <main
      className="container py-2 mt:py-10 w-full flex flex-col gap-3"
      style={{ height: "100dvh" }}
    >
      {children}
      <Navbar>{action}</Navbar>
    </main>
  );
};
