import type { Calendar } from "@/features/calendar";

import { useEffect, useState } from "react";

import {
  ListCalendar,
  ShowCalendar,
  useGetCalendar,
  AddCalendar,
} from "@/features/calendar";
import { Layout, NotFound } from "@/widgets";
import { CalendarPageSkeleton } from "./skeleton";

export const CalendarPage = () => {
  const { data, isError, isLoading } = useGetCalendar();
  const [currentCalendar, setCurrentCalendar] = useState<Calendar | null>(null);

  useEffect(() => {
    if (data) {
      setCurrentCalendar(
        (currentCalendar) =>
          data.data.find(
            (pill) => pill.documentId === currentCalendar?.documentId,
          ) || data.data[0],
      );
    }
  }, [data]);

  if (isLoading) {
    return <CalendarPageSkeleton />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (data?.data.length === 0) {
    return (
      <Layout action={<AddCalendar />}>
        <NotFound
          title="Ваш список календарей пуст"
          description="Создайте свой первый календарь"
        />
      </Layout>
    );
  }

  if (data) {
    return (
      <Layout action={<AddCalendar />}>
        <ShowCalendar {...(currentCalendar ? currentCalendar : data.data[0])} />
        <ListCalendar
          calendars={data.data}
          currentCalendar={currentCalendar ? currentCalendar : data.data[0]}
          setCurrentCalendar={setCurrentCalendar}
        />
      </Layout>
    );
  }
};
