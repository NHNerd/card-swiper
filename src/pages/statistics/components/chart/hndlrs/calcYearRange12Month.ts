import dateToLocalUtcOffset from '../../../../../handlers/dateToLocalUtcOffset';

const calcYearRange12Month = (
  wordsAdd: number[],
  wordsRep: number[],
  sessionInput: number[],
  time: number[],
  wordsAdd12month: Record<string, number[]>,
  wordsRep12month: Record<string, number[]>,
  sessionInput12month: Record<string, number[]>,
  time12month: Record<string, number[]>,
  firstDate: string,
  lastdate: string,
  difDaysHndlr: (firstDate: string, lastDate: string) => number
) => {
  // Calc for the Year range => for evry year days sum of every month - 2021: [junDaysSum, febDaysSum, ... , decDaysSum], 2022[...
  let yearDaysCountPrev = 0;
  const lastdateYear = lastdate.slice(0, 4);
  //  yars
  for (let year = Number(firstDate.slice(0, 4)); year < Number(lastdateYear) + 1; year++) {
    wordsAdd12month[String(year)] = [];
    wordsRep12month[String(year)] = [];
    sessionInput12month[String(year)] = [];
    time12month[String(year)] = [];

    const lastDateCurrentYear = String(year) === lastdateYear ? lastdate : `${year}-12-31`;
    const yearDaysCount = difDaysHndlr(`${year}-01-01`, lastDateCurrentYear);

    const wordsAddYearSlice = wordsAdd.slice(yearDaysCountPrev, yearDaysCount + yearDaysCountPrev);
    const wordsRepYearSlice = wordsRep.slice(yearDaysCountPrev, yearDaysCount + yearDaysCountPrev);
    const sessionYearSlice = sessionInput.slice(yearDaysCountPrev, yearDaysCount + yearDaysCountPrev);
    const timeYearSlice = time.slice(yearDaysCountPrev, yearDaysCount + yearDaysCountPrev);

    let prevMonthSum = 0;
    //  month
    for (let iMonth = 0; iMonth < Number(lastDateCurrentYear.slice(5, 7)); iMonth++) {
      const monthDaysCount: number = Number(
        dateToLocalUtcOffset(new Date(Number(lastdateYear), iMonth + 1, 0)).slice(8, 10)
      );

      const currentMonthAdd: number[] = wordsAddYearSlice.slice(prevMonthSum, prevMonthSum + monthDaysCount);
      const currentMonthRep: number[] = wordsRepYearSlice.slice(prevMonthSum, prevMonthSum + monthDaysCount);
      const currentMonthSession: number[] = sessionYearSlice.slice(prevMonthSum, prevMonthSum + monthDaysCount);
      const currentMonthTime: number[] = timeYearSlice.slice(prevMonthSum, prevMonthSum + monthDaysCount);

      let daysSumAdd = 0;
      let daysSumRep = 0;
      let daysSumSession = 0;
      let daysSumTime = 0;
      for (let iDay = 0; iDay < monthDaysCount; iDay++) {
        daysSumAdd += currentMonthAdd[iDay];
        daysSumRep += currentMonthRep[iDay];
        daysSumSession += currentMonthSession[iDay];
        daysSumTime += currentMonthTime[iDay];
      }

      wordsAdd12month[String(year)].push(daysSumAdd);
      wordsRep12month[String(year)].push(daysSumRep);
      sessionInput12month[String(year)].push(daysSumSession);
      time12month[String(year)].push(daysSumTime);

      prevMonthSum += monthDaysCount;
    }
    yearDaysCountPrev += yearDaysCount;
  }
};

export default calcYearRange12Month;
