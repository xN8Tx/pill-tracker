import { cn } from "@/shared/lib";
import { Pill } from "../../types";
import { Card, Carousel } from "@/shared/ui";

interface PillsListProps {
  pills: Pill[];
  currentPill: Pill;
  setCurrentPill: (pills: Pill) => void;
}

export const ListPills = ({
  pills,
  currentPill,
  setCurrentPill,
}: PillsListProps) => {
  return (
    <Carousel.Root className="flex-grow overflow-hidden min-h-16">
      <Carousel.Content
        containerClassName="h-full container"
        className="h-full"
      >
        {pills.map((pill) => (
          <Carousel.Item
            className="max-w-32 w-32 max-h-48 min-h-16"
            onClick={() => setCurrentPill(pill)}
            key={pill.id}
          >
            <Card.Root
              className={cn(
                "w-full h-full",
                currentPill.documentId === pill.documentId ? "bg-muted" : "",
              )}
            >
              <Card.Content className="pb-0 w-full h-full flex justify-center items-center text-center text-md font-medium">
                {pill.title}
              </Card.Content>
            </Card.Root>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel.Root>
  );
};
