import { useState, useEffect } from "react";
// @ts-ignore
import "./App.css";
import { events as initialEvents } from "./data/events";
import { PageName } from "./types/page";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<any>("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${
      page === "home"
        ? "Ana Sayfa"
        : page === "events"
        ? "Tüm Etkinlikler"
        : page === "add"
        ? "Etkinlik Ekle"
        : page === "update"
        ? "Etkinlik Güncelle"
        : "Detay"
    }`;
  }, [page]);

  const upcoming = [...initialEvents]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(
    searchEvents(initialEvents, searchText),
    category
  );

  const selectedEvent = selectedId ? findEventById(initialEvents, selectedId) : undefined;
  const categories = [...new Set(initialEvents.map((e) => e.category))];

  return (
    <>
      <Header
        title="Kampüs Etkinlikleri"
        text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
      />
      <Navigation current={page} onNavigate={(p) => go(p)} />

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
            />
          </section>
        )}

        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <p>{filtered.length} etkinlik listeleniyor.</p>
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </section>
        )}

        {page === "detail" && (
          <EventDetail
            event={selectedEvent}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm
            mode={page}
            initialData={selectedEvent}
            onSubmit={() => window.scrollTo(0, 0)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;