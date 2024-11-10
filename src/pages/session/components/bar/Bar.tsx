import React from 'react';

import { useUiState, zustandData } from '../../../../zustand';

import cssBar from './Bar.module.css';

type Props = {
  gameWords: any;
};

export default function Bar({ gameWords }: Props) {
  const { page, setPage } = useUiState();
  const { dataZus } = zustandData();
  const barFillRef = React.useRef<HTMLDivElement | null>(null);
  const [barProcent, setBarProcent] = React.useState<number>(0);

  React.useEffect(() => {
    // setBarProcent();
    barFillRef.current.style.right = `${(100 / dataZus[0].words?.length) * gameWords.length}%`;
  }, [gameWords]);

  // console.log(dataZus[0].words.length);
  // console.log(gameWords.length);
  return (
    <>
      <div className={cssBar.bar + ' ' + (page === 'session' ? cssBar.on : cssBar.off)}>
        <div className={cssBar.percent}>
          {dataZus[0]?.words?.length - gameWords?.length + '/' + dataZus[0]?.words?.length}
        </div>
        <div ref={barFillRef} className={cssBar.fill}>
          <div className={cssBar.point}></div>
        </div>
      </div>
    </>
  );
}
