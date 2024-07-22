// function throttle(func, delay) {
//   function wrapper() {}

//   return wrapper
// }

const debounce = (func, delay: number) => {
  let timeout;

  return function () {
    const funcCall = () => {
      func.apply(this, arguments);
    };

    clearTimeout(timeout);

    timeout = setTimeout(funcCall, delay);
  };
};

export default debounce;
