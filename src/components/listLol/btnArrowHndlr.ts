// Определение типа для функции обработчика
type ButtonHandler = () => void;

// Определение интерфейса для группы обработчиков
interface ButtonHandlers {
  btnArrowTop: ButtonHandler;
  btnArrowLeft: ButtonHandler;
  btnArrowRight: ButtonHandler;
}

// Определение интерфейса для всех обработчиков по компонентам
interface Sections {
  list: ButtonHandlers;
  statistic: ButtonHandlers;
}

const btnArrowHndlr: Sections = {
  list: {
    btnArrowTop: () => {
      console.log('ButtonArrow Top Clicked');
    },
    btnArrowLeft: () => {
      console.log('ButtonArrow Left Clicked');
    },
    btnArrowRight: () => {
      console.log('ButtonArrow Right Clicked');
    },
  },
  statistic: {
    btnArrowTop: () => {
      console.log('Statistic ButtonArrow Top Clicked');
    },
    btnArrowLeft: () => {
      console.log('Statistic ButtonArrow Left Clicked');
    },
    btnArrowRight: () => {
      console.log('Statistic ButtonArrow Right Clicked');
    },
  },
};

export default btnArrowHndlr;
