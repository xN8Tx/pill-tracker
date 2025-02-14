import { cn } from "@/shared/lib";
import { Calendar } from "../../types";
import { Card, Carousel } from "@/shared/ui";

interface CalendarListProps {
  calendars: Calendar[];
  currentCalendar: Calendar;
  setCurrentCalendar: (pills: Calendar) => void;
}

export const ListCalendar = ({
  calendars,
  currentCalendar,
  setCurrentCalendar,
}: CalendarListProps) => {
  return (
    <Carousel.Root className="flex-grow overflow-hidden min-h-16">
      <Carousel.Content
        containerClassName="h-full container"
        className="h-full"
      >
        {calendars.map((calendar) => (
          <Carousel.Item
            className="max-w-32 w-32 max-h-48 min-h-16"
            onClick={() => setCurrentCalendar(calendar)}
            key={calendar.id}
          >
            <Card.Root
              className={cn(
                "w-full h-full",
                currentCalendar.documentId === calendar.documentId
                  ? "bg-muted"
                  : "",
              )}
            >
              <Card.Content className="pb-0 w-full h-full flex justify-center items-center text-center text-md font-medium">
                {calendar.title}
              </Card.Content>
            </Card.Root>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel.Root>
  );
};
