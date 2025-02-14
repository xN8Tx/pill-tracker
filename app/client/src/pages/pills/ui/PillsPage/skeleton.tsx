import {
  AddPillsSkeleton,
  ListPillsSkeleton,
  ShowPillsSkeleton,
} from "@/features/pills";
import { Layout } from "@/widgets";

export const PillsPageSkeleton = () => {
  return (
    <Layout action={<AddPillsSkeleton />}>
      <ShowPillsSkeleton />
      <ListPillsSkeleton />
    </Layout>
  );
};
