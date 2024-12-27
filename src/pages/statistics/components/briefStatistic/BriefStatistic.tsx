import React from 'react';

import cssBriefStatistic from './BriefStatistic.module.css';

import { zustandData } from '../../../../zustand';

type Props = {};

export default function BriefStatistic({}: Props) {
  const { dataZus } = zustandData();

  const [hardes, setHardes] = React.useState<string>('...');
  const [wordsRepeated, setWordsRepeated] = React.useState<string>('...');

  React.useEffect(() => {
    if (dataZus && dataZus.length !== 0 && dataZus[0]?.words && dataZus[0]?.words?.length !== 0) {
      setHardes(dataZus[0]?.words[0]?.word);

      //TODO Need count session (need add field in Model)

      let count = 0;
      dataZus[0]?.words.forEach((item) => {
        count += item.correct + item.wrong;
      });
      setWordsRepeated(count);
    }
  }, [dataZus]);

  return (
    <div className={`${cssBriefStatistic.container}`}>
      <div className={`${cssBriefStatistic.stringContainer} ${cssBriefStatistic.spaceBetween}`}>
        <h3 className={cssBriefStatistic.stringContainer}>
          <div className={cssBriefStatistic.text + ' color2'}>sessions:</div>
          <div className={cssBriefStatistic.value}>{dataZus[0]?.sessionCount}</div>
        </h3>
        <h3 className={cssBriefStatistic.stringContainer}>
          <div className={cssBriefStatistic.text + ' color2'}>words repeated:</div>
          <div className={cssBriefStatistic.value}>{wordsRepeated}</div>
        </h3>
      </div>

      <h3 className={`${cssBriefStatistic.stringContainer} ${cssBriefStatistic.hardes}`}>
        <div className={cssBriefStatistic.text + ' color2'}>hardes word:</div>
        <div className={cssBriefStatistic.value}>{hardes}</div>
      </h3>
    </div>
  );
}
