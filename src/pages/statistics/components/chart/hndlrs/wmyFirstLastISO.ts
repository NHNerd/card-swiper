const wmyFirstLastISO = (lastDate) => {
  const date = new Date(lastDate);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11
  const dayOfWeek = date.getDay() || 7; // 1 (Mon) – 7 (Sun)

  // Week start (Monday)
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - dayOfWeek + 1);
  weekStart.setHours(0, 0, 0, 0);

  // Week end (Sunday)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(0, 0, 0, 0);

  // Month start
  const monthStart = new Date(year, month, 1);
  monthStart.setHours(0, 0, 0, 0);

  // Month end
  const monthEnd = new Date(year, month + 1, 0);
  monthEnd.setHours(0, 0, 0, 0);

  // Year start
  const yearStart = new Date(year, 0, 1);
  yearStart.setHours(0, 0, 0, 0);

  // Year end
  const yearEnd = new Date(year, 11, 31);
  yearEnd.setHours(0, 0, 0, 0);

  const toISO = (d) => d.toLocaleDateString('sv-SE'); // format: YYYY-MM-DD

  return {
    weekStart: toISO(weekStart),
    weekEnd: toISO(weekEnd),
    monthStart: toISO(monthStart),
    monthEnd: toISO(monthEnd),
    yearStart: toISO(yearStart),
    yearEnd: toISO(yearEnd),
  };
};

export default wmyFirstLastISO;
