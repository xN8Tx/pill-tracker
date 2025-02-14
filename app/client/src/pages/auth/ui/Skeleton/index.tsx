import { Card } from "@/shared/ui";
import { Skeleton as SkeletonComponent } from "@/shared/ui";

export const Skeleton = () => {
  return (
    <Card.Root className="w-full">
      <Card.Header>
        <SkeletonComponent className="w-full h-4" />
      </Card.Header>
      <Card.Content className="flex flex-col gap-5">
        <SkeletonComponent className="w-full h-9 rounded-lg" />
        <SkeletonComponent className="w-full h-9 rounded-lg" />
        <SkeletonComponent className="w-full h-9 rounded-lg" />
        <SkeletonComponent className="w-full h-12 rounded-lg" />
      </Card.Content>
      <Card.Footer className="w-full flex justify-center items-center">
        <SkeletonComponent className="w-[200px] h-4" />
      </Card.Footer>
    </Card.Root>
  );
};
