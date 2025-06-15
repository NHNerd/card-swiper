import React from 'react';

import cssImprtExprtList from './ImprtExprtList.module.css';

type Props = {};

export default function ImprtExprtList({}: Props) {
  function exportTxt(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  function exportCSV(filename, rows) {
    const csvContent = rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Пример использования:
  const rows = [
    ['Word', 'Translate'],
    ['Apple', 'яблоко'],
    ['Orange', 'апельсин'],
    ['Bаnana', 'банан'],
  ];

  // exportTxt('Fruits.txt', myText);
  // exportCSV('Fruits.csv', rows);

  // Пример использования:

  const myText = 'Apple: яблоко\nOrange: апельсин\nBаnana: банан';

  return (
    <>
      <header>Header</header>
      <footer>Footer</footer>
    </>
  );
}
