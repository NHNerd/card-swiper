export const timeRangeSwitch = (timeRange: string, setTimeRange: any) => {
  switch (timeRange) {
    case 'w':
      setTimeRange('m');
      break;
    case 'm':
      setTimeRange('y');
      break;
    case 'y':
      setTimeRange('all');
      break;
    case 'all':
      setTimeRange('w');
      break;
    default:
      setTimeRange('w');
      break;
  }
};
