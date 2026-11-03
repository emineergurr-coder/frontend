import { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Tarih:</strong> {formatDate(event.date)} - {event.time}</p>
      <p><strong>Mekan:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <p>{event.description}</p>
    <button onClick={() => onShowDetail(event.id)}>Detayları Gör</button>
    </article>
  );
}

export default EventCard;