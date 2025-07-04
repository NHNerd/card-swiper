import React from 'react';

import { useUiState, zustandData } from '../../../../zustand';

import cssBar from './Bar.module.css';

type Props = {
  gameWords: any;
};

const Bar = React.memo(({ gameWords }: Props) => {
  const { page, setPage } = useUiState();
  const { dataZus } = zustandData();
  const barFillRef = React.useRef<HTMLDivElement | null>(null);
  const [barProcent, setBarProcent] = React.useState<number>(0);

  React.useEffect(() => {
    // setBarProcent();
    barFillRef.current.style.right = `${(100 / dataZus[0].gameCount) * gameWords.length}%`;
    // barFillRef.current.style.right = `${(100 / dataZus[0].words?.length) * gameWords.length}%`;
  }, [gameWords]);

  return (
    <>
      <div className={cssBar.bar + ' ' + (page === 'session' ? cssBar.on : cssBar.off)}>
        <div className={cssBar.percent}>
          {dataZus[0]?.gameCount - gameWords?.length + '/' + dataZus[0]?.gameCount}
        </div>
        <div ref={barFillRef} className={cssBar.fill}>
          <div className={cssBar.point}></div>
        </div>
      </div>
    </>
  );
});

export default Bar;
