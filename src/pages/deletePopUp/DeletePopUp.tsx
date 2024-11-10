import React from 'react';

import { zustandData } from '../../zustand';

import cssDeletePopUp from './DeletePopUp.module.css';
import Btn from './components/Btn';

type Props = {
  isDeletePopUp: boolean;
  setIsDeletePopUp;
  deletedListOrder: number;
};

export default function DeletePopUp({ isDeletePopUp, setIsDeletePopUp, deletedListOrder }: Props) {
  const blurBG = React.useRef<HTMLDivElement | null>(null);

  //Zustand

  const { dataZus } = zustandData();

  const handlrMouseDown = (e: MouseEvent) => {
    if (e.target.className === blurBG.current?.className) setIsDeletePopUp(false);
  };

  React.useEffect(() => {
    blurBG.current?.addEventListener('mousedown', handlrMouseDown);

    return () => {
      blurBG.current?.removeEventListener('mousedown', handlrMouseDown);
    };
  }, []);
  return (
    <>
      <div
        ref={blurBG}
        className={cssDeletePopUp.blurBG + (isDeletePopUp ? '' : ' ' + cssDeletePopUp.blurBGOff)}
      >
        <section className={cssDeletePopUp.main}>
          <h1 className={cssDeletePopUp.listName}>{dataZus[deletedListOrder]?.listName}</h1>
          <div className={cssDeletePopUp.textHorizont}>
            <div className={cssDeletePopUp.text}>has</div>
            <h2 className={cssDeletePopUp.wordsNum}>{dataZus[deletedListOrder]?.words?.length}</h2>
          </div>

          <div className={cssDeletePopUp.text}>words!</div>
        </section>
        <section className={cssDeletePopUp.footer}>
          <div className={cssDeletePopUp.leftBtn}>
            <Btn children1={<div>delete words</div>} children2={<div>permanently</div>} />
          </div>
          <div className={cssDeletePopUp.rightBtn}>
            <Btn
              children1={<div>move words</div>}
              children2={
                <div className={cssDeletePopUp.textHorizont}>
                  <div>to the</div>
                  <div>"know"</div>
                </div>
              }
            />
          </div>

          <div className={cssDeletePopUp.centerBtn}>
            <Btn children1={<div>cancel</div>} children2={null} />
          </div>
        </section>
      </div>
    </>
  );
}
