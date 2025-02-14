import type { Pill } from "@/features/pills";

import { useEffect, useState } from "react";

import { ListPills, ShowPills, useGetPill, AddPills } from "@/features/pills";
import { Layout, NotFound } from "@/widgets";
import { PillsPageSkeleton } from "./skeleton";

export const PillsPage = () => {
  const { data, isError, isLoading } = useGetPill();
  const [currentPill, setCurrentPill] = useState<Pill | null>(null);

  useEffect(() => {
    if (data) {
      setCurrentPill(
        (currentPill) =>
          data.data.find(
            (pill) => pill.documentId === currentPill?.documentId,
          ) || data.data[0],
      );
    }
  }, [data]);

  if (isLoading) {
    return <PillsPageSkeleton />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (data?.data.length === 0) {
    return (
      <Layout action={<AddPills />}>
        <NotFound
          title="Ваш список таблеток пуст"
          description="Добавьте свои первые таблетки"
        />
      </Layout>
    );
  }

  if (data) {
    return (
      <Layout action={<AddPills />}>
        <ShowPills {...(currentPill ? currentPill : data.data[0])} />
        <ListPills
          pills={data.data}
          currentPill={currentPill ? currentPill : data.data[0]}
          setCurrentPill={setCurrentPill}
        />
      </Layout>
    );
  }
};
