import type { TabItem } from "@/shared/ui";
import { ExpandableTabs } from "@/shared/ui";
import { Calendar, LogOut, PillIcon } from "lucide-react";

const tabs: TabItem[] = [
  { title: "Таблетки", to: "/", icon: PillIcon },
  { title: "Календарь", to: "/calendar", icon: Calendar },
  { type: "separator" },
  { title: "Выход", to: "/auth/logout", icon: LogOut },
];

export const Navbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-full mt-auto flex items-center justify-center gap-2">
      <ExpandableTabs className="w-fit " tabs={tabs} />
      {children}
    </div>
  );
};
