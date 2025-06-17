export function exportTxt(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.txt`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export function exportCSV(filename: string, rows: [string, string][]) {
  const csvContent = rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
