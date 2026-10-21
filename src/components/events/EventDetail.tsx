import { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event?: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  if (!event) {
    return (
      <section className="detay">
        <h2>Etkinlik bulunamadı</h2>
        <button onClick={onBack}>Listeye dön</button>
      </section>
    );
  }

  return (
    <section className="detay">
      <article>
        <h2>{event.title}</h2>
        <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        <h3>Açıklama</h3>
        <p>{event.description}</p>
        <button onClick={onBack}>Listeye dön</button>{" "}
        <button onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
      </article>
    </section>
  );
}

export default EventDetail;