export const psswrdValidate = (pass1: string) => {
  return pass1.length >= 4 ? true : false;
};

export const psswrdsMatch = (pass1: string, pass2: string) => {
  if (pass1 === pass2 && pass1) return true;
  return false;
};

export const validateEmail = (email: string) => {
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //? ^(?!.*\.\.) - Убедитесь, что нет двух последовательных точек.
  //? [a-zA-Z0-9._%+-]+ - Локальная часть email-адреса.
  //? @[a-zA-Z0-9.-]+ - Доменная часть email-адреса, которая может содержать буквы, цифры, точки и дефисы.
  //? \.[a-zA-Z]{2,}$ - Суффикс домена, который должен содержать как минимум две буквы.
  const emailPattern = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};
