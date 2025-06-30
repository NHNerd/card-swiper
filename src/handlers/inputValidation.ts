const inputValidation = (input: string) => {
  if (input === ' ') return '';
  // max 1 space at a time
  return input.replace(/\s{2,}/g, ' ');
};

export default inputValidation;
