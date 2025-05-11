export const secToHMS = (secInput: number) => {
  const sec = secInput % 60;
  const min = ((secInput - sec) / 60) % 60;
  const hours = ((secInput - min * 60 - sec) / 3600) % 24;
  const days = (secInput - hours * 3600 - min * 60 - sec) / 86400;
  let HMS = days + 'd. ' + hours + 'h. ' + min + 'm. ' + sec + 's. ';
  if (days === 0) {
    HMS = hours + 'h. ' + min + 'm. ' + sec + 's. ';
    if (hours === 0) {
      HMS = min + 'm. ' + sec + 's. ';
      if (min === 0) HMS = sec + 's. ';
    }
  }
  return HMS;
};
