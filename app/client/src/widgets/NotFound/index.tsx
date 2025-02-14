import { Card } from "@/shared/ui";

interface NotFoundProps {
  title: string;
  description: string;
}

export const NotFound = ({ title, description }: NotFoundProps) => {
  return (
    <Card.Root className="min-h-[370px]">
      <Card.Header>
        <Card.Title className="text-center text-md font-normal">
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Content className="my-3">
        <div className="flex flex-col gap-2 items-center text-center text-xl font-medium">
          {description}
        </div>
      </Card.Content>
    </Card.Root>
  );
};
