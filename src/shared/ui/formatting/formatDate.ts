// Formats a date as yyyy/MM/dd. Accepts a string as well because dates coming from
// the API arrive as ISO strings (e.g. '2026-10-16T00:00:00Z'), even when typed as Date.
// UTC getters are used so a midnight-UTC date doesn't shift to the previous day.
export const formatDate = (value: Date | string | null | undefined): string => {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  const yyyy = date.getUTCFullYear();
  const MM = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${yyyy}/${MM}/${dd}`;
}
