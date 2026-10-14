import type { CampusEvent, Category } from "../types/campus-event";

// Metin içinde arama yapma
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const query = text.toLocaleLowerCase("tr-TR").trim();
  if (!query) return list;
  return list.filter((event) =>
    event.title.toLocaleLowerCase("tr-TR").includes(query)
  );
}

// Kategoriye göre filtreleme
export function filterByCategory(
  list: CampusEvent[],
  category: Category | ""
): CampusEvent[] {
  if (!category) return list;
  return list.filter((event) => event.category === category);
}

// ID'ye göre tek bir etkinlik bulma
export function findEventById(
  list: CampusEvent[],
  id: string
): CampusEvent | undefined {
  return list.find((event) => event.id === id);
}