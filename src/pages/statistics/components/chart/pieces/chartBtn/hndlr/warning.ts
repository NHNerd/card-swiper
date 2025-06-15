export const emptyBtnWarning = (refDOM: any) => {
  refDOM.current.style.setProperty('--btnEmpty-opacity', '1');
  refDOM.current.style.setProperty('--btnEmpty-transition', 'opacity 0.2s ease-out');

  refDOM.current.style.setProperty('--btnEmpty-after-opacity', '1');
  refDOM.current.style.setProperty('--btnEmpty-after-transition', 'opacity 0.4s ease-out');
  refDOM.current.style.setProperty('--btnEmpty-after-scale', '1');
  refDOM.current.style.setProperty('--btnEmpty-after-scale-transition', '0.2s ease-out');

  requestAnimationFrame(() => {
    setTimeout(() => {
      refDOM.current.style.setProperty('--btnEmpty-opacity', '0');
      refDOM.current.style.setProperty('--btnEmpty-transition', 'opacity 0.8s ease-out');

      refDOM.current.style.setProperty('--btnEmpty-after-opacity', '0');
      refDOM.current.style.setProperty('--btnEmpty-after-transition', 'opacity 0.4s ease-out');
      refDOM.current.style.setProperty('--btnEmpty-after-scale', '0.96, 0.82');
      refDOM.current.style.setProperty('--btnEmpty-after-scale-transition', '1s ease-out');
    }, 500);
  });
};

export const warningEmpty = (refDOM: any) => {
  refDOM.current.style.setProperty('--empty-opacity', '0.6');
  refDOM.current.style.setProperty('--empty-transition', 'opacity 0.2s');

  refDOM.current.style.setProperty('--before-opacity', '1');
  refDOM.current.style.setProperty('--before-transition', '0.4s ease-out');

  requestAnimationFrame(() => {
    setTimeout(() => {
      refDOM.current.style.setProperty('--empty-opacity', '0.2');
      refDOM.current.style.setProperty('--empty-transition', 'opacity 2s');

      refDOM.current.style.setProperty('--before-opacity', '0');
      refDOM.current.style.setProperty('--before-transition', '1.2s ease-out');

      setTimeout(() => {
        refDOM.current.style.setProperty('--empty-transition', 'opacity 0.2s');
      }, 2001);
    }, 500);
  });
};
