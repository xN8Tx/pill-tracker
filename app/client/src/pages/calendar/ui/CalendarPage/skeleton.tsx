import {
  AddCalendarSkeleton,
  ShowCalendarSkeleton,
  ListCalendarSkeleton,
} from "@/features/calendar";
import { Layout } from "@/widgets";

export const CalendarPageSkeleton = () => {
  return (
    <Layout action={<AddCalendarSkeleton />}>
      <ShowCalendarSkeleton />
      <ListCalendarSkeleton />
    </Layout>
  );
};
