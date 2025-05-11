const percent = (array: number[]) => 100 / Math.max(...array);

// Padding for chart
export const y2Calc = (array: number[], i: number, lineWidth: number) => {
  return (100 - percent(array) * array[i]) * (1 - lineWidth * 0.01) + lineWidth / 2;
};
