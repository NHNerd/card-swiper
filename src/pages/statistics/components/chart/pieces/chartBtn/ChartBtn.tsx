import cssChartBtn from './ChartBtn.module.css';

type Props = {};

export default function ChartBtn({
  chartWordsRepOn,
  setChartWordsRepOn,
  chartWordsAddOn,
  setChartWordsAddOn,
  chartSessionOn,
  setChartSessionOn,
  chartTimeOn,
  setChartTimeOn,
}: Props) {
  const switchBtnHndler = (btn, other1, other2, other3, btnSet) => {
    if (!other1 && !other2 && !other3 && btn) btnSet(true);
    else btnSet(!btn);
  };

  return (
    <div className={`${cssChartBtn.btnContainer} `}>
      <button
        className={`${cssChartBtn.btn} ${cssChartBtn.btnWordsAdded} ${
          chartWordsAddOn ? cssChartBtn.btnOn : ''
        }`}
        onClick={() =>
          switchBtnHndler(
            chartWordsAddOn,
            chartWordsRepOn,
            chartSessionOn,
            chartTimeOn,
            setChartWordsAddOn
          )
        }
      >
        words added
      </button>
      <button
        className={`${cssChartBtn.btn} ${cssChartBtn.btnWordsRep} ${
          chartWordsRepOn ? cssChartBtn.btnOn : ''
        }`}
        onClick={() =>
          switchBtnHndler(
            chartWordsRepOn,
            chartWordsAddOn,
            chartSessionOn,
            chartTimeOn,
            setChartWordsRepOn
          )
        }
      >
        words repiated
      </button>
      <button
        className={`${cssChartBtn.btn} ${cssChartBtn.btnSession} ${
          chartSessionOn ? cssChartBtn.btnOn : ''
        }`}
        onClick={() =>
          switchBtnHndler(
            chartSessionOn,
            chartWordsAddOn,
            chartWordsRepOn,
            chartTimeOn,
            setChartSessionOn
          )
        }
      >
        sessions
      </button>
      <button
        className={`${cssChartBtn.btn} ${cssChartBtn.btnTime} ${chartTimeOn ? cssChartBtn.btnOn : ''}`}
        onClick={() =>
          switchBtnHndler(chartTimeOn, chartWordsRepOn, chartWordsAddOn, chartSessionOn, setChartTimeOn)
        }
      >
        time
      </button>
    </div>
  );
}
