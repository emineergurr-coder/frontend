export function formatDate(date: string): string {
  if (!date) return "";
  const parts = date.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    return dateObj.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return date;
}