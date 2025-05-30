const monthDayLetters = (lastStatisticDate: string) => {
  const monthDays = new Date(
    new Date(lastStatisticDate).getFullYear(),
    new Date(lastStatisticDate).getMonth() + 1,
    0
  ).getDate();

  const dayLetters = [
    '01',
    ' ',
    ' ',
    '04',
    ' ',
    ' ',
    '07',
    ' ',
    ' ',
    '10',
    ' ',
    ' ',
    '13',
    ' ',
    ' ',
    '16',
    ' ',
    ' ',
    '19',
    ' ',
    ' ',
    '22',
    ' ',
    ' ',
    '25',
    ' ',
    ' ',
  ];
  if (monthDays === 28) {
    dayLetters.push('28');
  } else if (monthDays === 29) {
    dayLetters.push(...[' ', '29']);
  } else if (monthDays === 30) {
    dayLetters.push(...[' ', ' ', '30']);
  } else if (monthDays === 31) {
    dayLetters.push(...['28', ' ', ' ', '31']);
  }
  return dayLetters;
};

export default monthDayLetters;
