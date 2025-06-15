import React from 'react';
import { emptyBtnWarning, warningEmpty } from './hndlr/warning';
import cssChartBtn from './ChartBtn.module.css';

type Props = {
  chartWordsRepOn: boolean;
  setChartWordsRepOn: React.Dispatch<React.SetStateAction<boolean>>;
  chartWordsAddOn: boolean;
  setChartWordsAddOn: React.Dispatch<React.SetStateAction<boolean>>;
  chartSessionOn: boolean;
  setChartSessionOn: React.Dispatch<React.SetStateAction<boolean>>;
  chartTimeOn: boolean;
  setChartTimeOn: React.Dispatch<React.SetStateAction<boolean>>;
  sliceSumIsNotNUllRef: React.RefObject<{
    add: boolean;
    rep: boolean;
    session: boolean;
    time: boolean;
  }>;
  empty: boolean;
  warningRef: any;
};

export default function ChartBtn({
  chartWordsRepOn,
  setChartWordsRepOn,
  chartWordsAddOn,
  setChartWordsAddOn,
  chartSessionOn,
  setChartSessionOn,
  chartTimeOn,
  setChartTimeOn,
  sliceSumIsNotNUllRef,
  empty,
  warningRef,
}: Props) {
  const btnAddEmptyRef = React.useRef(null);
  const btnRepEmptyRef = React.useRef(null);
  const btnSessionEmptyRef = React.useRef(null);
  const btnTimeEmptyRef = React.useRef(null);

  const switchBtnHndler = (
    btn: boolean,
    other1: boolean,
    other2: boolean,
    other3: boolean,
    btnSet: React.Dispatch<React.SetStateAction<boolean>>,
    isLineExist: boolean
  ) => {
    if (!isLineExist && empty) {
      // Warning "Empty" if line don't existe
      if (!sliceSumIsNotNUllRef.current?.add) emptyBtnWarning(btnAddEmptyRef);
      if (!sliceSumIsNotNUllRef.current?.rep) emptyBtnWarning(btnRepEmptyRef);
      if (!sliceSumIsNotNUllRef.current?.session) emptyBtnWarning(btnSessionEmptyRef);
      if (!sliceSumIsNotNUllRef.current?.time) emptyBtnWarning(btnTimeEmptyRef);
      btnSet(false);
      return;
    }
    if (!other1 && !other2 && !other3 && btn) warningEmpty(warningRef);
    else if (empty) btnSet(!btn);
    else warningEmpty(warningRef);
  };

  return (
    <div className={`${cssChartBtn.btnContainer} `}>
      <button
        className={`${cssChartBtn.btn} ${cssChartBtn.btnWordsAdded} ${chartWordsAddOn ? cssChartBtn.btnOn : ''}`}
        onClick={() =>
          switchBtnHndler(
            chartWordsAddOn,
            chartWordsRepOn,
            chartSessionOn,
            chartTimeOn,
            setChartWordsAddOn,
            sliceSumIsNotNUllRef.current.add
          )
        }
      >
        <div className={`${cssChartBtn.btnEmpty}`} ref={btnAddEmptyRef} data-text='EMPTY'>
          EMPTY
        </div>
        words added
      </button>
      <button
        className={`${cssChartBtn.btn} ${cssChartBtn.btnWordsRep} ${chartWordsRepOn ? cssChartBtn.btnOn : ''}`}
        onClick={() =>
          switchBtnHndler(
            chartWordsRepOn,
            chartWordsAddOn,
            chartSessionOn,
            chartTimeOn,
            setChartWordsRepOn,
            sliceSumIsNotNUllRef.current.rep
          )
        }
      >
        <div className={`${cssChartBtn.btnEmpty}`} ref={btnRepEmptyRef} data-text='EMPTY'>
          EMPTY
        </div>
        words repiated
      </button>
      <button
        className={`${cssChartBtn.btn} ${cssChartBtn.btnSession} ${chartSessionOn ? cssChartBtn.btnOn : ''}`}
        onClick={() =>
          switchBtnHndler(
            chartSessionOn,
            chartWordsAddOn,
            chartWordsRepOn,
            chartTimeOn,
            setChartSessionOn,
            sliceSumIsNotNUllRef.current.session
          )
        }
      >
        <div className={`${cssChartBtn.btnEmpty}`} ref={btnSessionEmptyRef} data-text='EMPTY'>
          EMPTY
        </div>
        sessions
      </button>
      <button
        className={`${cssChartBtn.btn} ${cssChartBtn.btnTime} ${chartTimeOn ? cssChartBtn.btnOn : ''}`}
        onClick={() =>
          switchBtnHndler(
            chartTimeOn,
            chartWordsRepOn,
            chartWordsAddOn,
            chartSessionOn,
            setChartTimeOn,
            sliceSumIsNotNUllRef.current.time
          )
        }
      >
        <div className={`${cssChartBtn.btnEmpty}`} ref={btnTimeEmptyRef} data-text='EMPTY'>
          EMPTY
        </div>
        time
      </button>
    </div>
  );
}
