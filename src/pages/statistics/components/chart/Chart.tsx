import cssChart from './Chart.module.css';

type Props = {};

export default function Chart({}: Props) {
  //   [14, 0, 0, 5];
  //   [14, 0, 0, 5, 28, 14, 8];
  const wordsAddedWeek: number[] = [14, 0, 0, 5];
  const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const percent = 100 / Math.max(...wordsAddedWeek);
  const step = 100 / (7 - 1);
  const lineWidth = 2;

  const y2Calc = (i: number) => {
    return (100 - percent * wordsAddedWeek[i]) * (1 - lineWidth * 0.01) + lineWidth / 2;
  };

  const linesTSX = [];
  const circlesTSX = [];
  const dayLettersTSX = [];
  for (let i = 0; i < 7; i++) {
    if (wordsAddedWeek.length > i) {
      circlesTSX.push(
        <circle
          key={`circle-${i}`}
          cx={`${i * step}%`}
          cy={`${y2Calc(i)}%`}
          r={lineWidth / 2}
          fill='#d9d9d9'
        />
      );

      if (wordsAddedWeek.length - 1 > i) {
        linesTSX.push(
          <line
            key={i}
            x1={`${i * step}%`}
            y1={`${y2Calc(i)}%`}
            x2={`${(i + 1) * step}%`}
            y2={`${y2Calc(i + 1)}%`}
          />
        );
      }
    }

    dayLettersTSX.push(
      <div
        key={`dayLetter-${i}`}
        className={`${cssChart.dayLetter}`}
        style={{
          left: `${i * step}%`,
          color: `${i === wordsAddedWeek.length - 1 ? '#d9d9d9' : '#d9d9d983'}`,
          textShadow: `${i === wordsAddedWeek.length - 1 ? 'rgb(255, 255, 255) 0px 0 1px' : ''}`,
        }}
      >
        {dayLetters[i]}
      </div>
    );
  }

  return (
    <div className={`${cssChart.container} `}>
      <svg width='100%' height='100%' stroke='#d9d9d9' strokeWidth={lineWidth} strokeLinecap='round'>
        {linesTSX}
        {circlesTSX}
      </svg>
      <div
        className={`${cssChart.dayDot}`}
        style={{
          left: `${(wordsAddedWeek.length - 1) * step}%`,
          top: `${y2Calc(wordsAddedWeek.length - 1)}%`,
        }}
      ></div>
      {dayLettersTSX}
    </div>
  );
}
