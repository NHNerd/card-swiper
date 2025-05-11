const linesTSX: any[] = [];
const circlesTSX: any[] = [];

const linesAndCircles = (
  array: number[],
  color: string,
  i: number,
  key: string,
  lineWidth: number,
  y2Calc
) => {
  if (array.length > i) {
    circlesTSX.push(
      <circle
        key={`${key}${i}`}
        cx={`${i * step}%`}
        cy={`${y2Calc(array, i)}%`}
        r={lineWidth / 2}
        fill='#d9d9d9'
        stroke={color}
      />
    );
    if (array.length - 1 > i) {
      linesTSX.push(
        <line
          key={`line-${key}${i}`}
          x1={`${i * step}%`}
          y1={`${y2Calc(array, i)}%`}
          x2={`${(i + 1) * step}%`}
          y2={`${y2Calc(array, i + 1)}%`}
          stroke={color}
          opacity={0.7}
        />
      );
    }
  }
};

export default linesAndCircles;
