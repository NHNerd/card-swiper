import cssChart from './Chart.module.css';

type Props = {};

export default function Chart({}: Props) {
  //   const wordsAddedWeek: number[] = [14, 0, 0, 5, 28, 14, 8];
  const wordsAddedWeek: number[] = [14, 0, 0, 5];

  const percent = 100 / Math.max(...wordsAddedWeek);
  const step = 100 / (wordsAddedWeek.length - 1);
  const lineWidth = 2;

  const y2Calc = (i: number) => {
    return (100 - percent * wordsAddedWeek[i]) * (1 - lineWidth * 0.01) + lineWidth / 2;
  };

  const lines = [];
  const circles = [];
  for (let i = 0; i < wordsAddedWeek.length - 1; i++) {
    lines.push(
      <line
        key={i}
        x1={`${i * step}%`}
        y1={`${y2Calc(i)}%`}
        x2={`${(i + 1) * step}%`}
        y2={`${y2Calc(i + 1)}%`}
      />
    );

    circles.push(
      <circle
        key={`circle-${i}`}
        cx={`${i * step}%`}
        cy={`${y2Calc(i)}%`}
        r={lineWidth / 2}
        fill='#d9d9d9'
      />
    );
  }

  return (
    <div className={`${cssChart.container}`}>
      <svg width='100%' height='100%' stroke='#d9d9d9' strokeWidth={lineWidth} strokeLinecap='round'>
        {lines}
        {circles}
        {/* <circle
          key={`circle-7`}
          cx={`${100}%`}
          cy={`${y2Calc(wordsAddedWeek.length - 1)}%`}
          r={lineWidth * 1.5}
          fill='#d9d9d9'
        /> */}
      </svg>
      <div className={`${cssChart.dayDot}`} style={{ left: '50%' }}>
        {' '}
      </div>
    </div>
  );
}
