const DAY = 86400000;
export function elapsedSince(start, now = Date.now()) {
  const timestamp = new Date(start).getTime();
  const total = Math.max(0, Math.floor((now - timestamp) / 1000));
  if (!Number.isFinite(total)) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
  };
}
export function calendarDaysBetween(start, end) {
  const day = (value) => {
    const [y, m, d] = value.slice(0, 10).split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((day(end) - day(start)) / DAY);
}
