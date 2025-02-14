import { Card, Skeleton } from "@/shared/ui";

export const ShowCalendarSkeleton = () => {
  return (
    <Card.Root>
      <Card.Header className="flex flex-col items-center">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-16 h-7" />
      </Card.Header>
      <Card.Content className="my-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 items-center">
            <Skeleton className="w-44 h-7" />
            <Skeleton className="w-12 h-11" />
          </div>
          <div className="flex flex-row gap-2 justify-around">
            <div className="flex flex-col items-center justify-center gap-1">
              <Skeleton className="w-16 h-11" />
              <Skeleton className="w-5 h-4" />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <Skeleton className="w-16 h-11" />
              <Skeleton className="w-5 h-4" />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <Skeleton className="w-16 h-11" />
              <Skeleton className="w-5 h-4" />
            </div>
          </div>
        </div>
      </Card.Content>
      <Card.Footer className="flex justify-center gap-2">
        <Skeleton className="w-12 h-9 rounded-md" />
        <Skeleton className="w-12 h-9 rounded-md" />
      </Card.Footer>
    </Card.Root>
  );
};
