import { y2Calc } from '../hndlrs/math';
import cssChart from '../Chart.module.css';

export const dotDay = (
  array: number[],
  color: string,
  isOn: boolean,
  step: number,
  lineWidth: number
) => {
  return (
    <div
      className={`${cssChart.dayDot}`}
      style={{
        left: `${(array.length - 1) * step}%`,
        top: `${y2Calc(array, array.length - 1, lineWidth)}%`,
        backgroundColor: color,
        display: isOn ? 'block' : 'none',
      }}
    ></div>
  );
};
