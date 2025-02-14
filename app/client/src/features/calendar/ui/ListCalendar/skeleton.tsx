import { Carousel, Skeleton } from "@/shared/ui";

export const ListCalendarSkeleton = () => {
  return (
    <Carousel.Root className="flex-grow overflow-hidden min-h-16">
      <Carousel.Content
        containerClassName="h-full container"
        className="h-full"
      >
        <Carousel.Item className="max-w-32 w-32 max-h-48 min-h-16">
          <Skeleton className="w-full h-full rounded-xl" />
        </Carousel.Item>
        <Carousel.Item className="max-w-32 w-32 max-h-48 min-h-16">
          <Skeleton className="w-full h-full rounded-xl" />
        </Carousel.Item>
        <Carousel.Item className="max-w-32 w-32 max-h-48 min-h-16">
          <Skeleton className="w-full h-full rounded-xl" />
        </Carousel.Item>
        <Carousel.Item className="max-w-32 w-32 max-h-48 min-h-16">
          <Skeleton className="w-full h-full rounded-xl" />
        </Carousel.Item>
      </Carousel.Content>
    </Carousel.Root>
  );
};
