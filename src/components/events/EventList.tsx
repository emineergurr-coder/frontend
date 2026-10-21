import { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
}

function EventList({ events, onShowDetail, emptyText }: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc">{emptyText || "Etkinlik bulunamadı."}</p>;
  }

  return (
    <div className="liste">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onShowDetail={onShowDetail}
        />
      ))}
    </div>
  );
}

export default EventList;