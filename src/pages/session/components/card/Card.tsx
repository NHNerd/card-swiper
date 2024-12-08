import React from 'react';
import { useUiState, zustandData } from '../../../../zustand';
import { useScreenSize } from './hooks/screenSize';
import DnD from './hooks/dnd/dnd';

import cssCard from './Card.module.css';

type Props = {
  //! надо задать точнее (may be...)
  ContainerSessionRef: HTMLDivElement;
  gameWords: [];
  setGameWords: any;
  time: number;
};

export default function Card({
  ContainerSessionRef,
  gameWords,
  setGameWords,
  time,
  know,
  dontKnow,
  translate,
}: Props) {
  const { page, setPage } = useUiState();

  // refresh screen size
  const screenSize = useScreenSize(ContainerSessionRef);
  return gameWords.map((item: object, index: number) => (
    <button
      key={index}
      className={`${cssCard.card} ${page === 'session' ? cssCard.on : cssCard.off} ${
        know && gameWords.length - 1 === index ? cssCard.know : ''
      } ${dontKnow && gameWords.length - 1 === index ? cssCard.dontKnow : ''}
      ${translate ? cssCard.translate : cssCard.translateOff}`}
    >
      {translate ? gameWords[index].translate : gameWords[index].word}
    </button>
  ));

  // if (!gameWords[0]) {
  //   /* word3 */
  //   return (
  //     <>
  //       <DnD ContainerSessionRef={ContainerSessionRef} gameWords={gameWords} setGameWords={setGameWords}>
  //         <button
  //           className={
  //             cssCard.card +
  //             ' ' +
  //             ' ' +
  //             cssCard.card2 +
  //             ' ' +
  //             (page === 'session' ? cssCard.on : cssCard.off)
  //           }
  //         >
  //           {`know: 0\ndon't know: 0\nfaster: ${time}s\naverage: ${time}s\nworst: ...`}
  //         </button>
  //       </DnD>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       {/* word3 */}
  //       <DnD ContainerSessionRef={ContainerSessionRef}>
  //         <button
  //           className={
  //             cssCard.card +
  //             ' ' +
  //             ' ' +
  //             cssCard.card2 +
  //             ' ' +
  //             (page === 'session' ? cssCard.on : cssCard.off)
  //           }
  //         >
  //           {"know: 0\n don't know: 0"}
  //         </button>
  //       </DnD>

  //       {/* word2 dnd */}
  //       <DnD ContainerSessionRef={ContainerSessionRef}>
  //         <button
  //           className={
  //             cssCard.card +
  //             ' ' +
  //             ' ' +
  //             cssCard.card1 +
  //             ' ' +
  //             (page === 'session' ? cssCard.on : cssCard.off)
  //           }
  //         >
  //           {gameWords[2] ? gameWords[2].word + ' | card1' : 'nothing | card1'}
  //         </button>
  //       </DnD>

  //       {/* word1 dnd */}
  //       <DnD ContainerSessionRef={ContainerSessionRef} gameWords={gameWords} setGameWords={setGameWords}>
  //         <button
  //           className={
  //             cssCard.card +
  //             ' ' +
  //             ' ' +
  //             cssCard.card1 +
  //             ' ' +
  //             (page === 'session' ? cssCard.on : cssCard.off)
  //           }
  //         >
  //           {gameWords[1]
  //             ? gameWords[1].word + ' | card1'
  //             : `know: 0\ndon't know: 0\nfaster: ${time}s\naverage: ${time}s\nworst: ...`}
  //         </button>
  //       </DnD>

  //       {/* word0 dnd */}
  //       <DnD ContainerSessionRef={ContainerSessionRef} gameWords={gameWords} setGameWords={setGameWords}>
  //         <button
  //           className={
  //             cssCard.card +
  //             ' ' +
  //             ' ' +
  //             cssCard.card0 +
  //             ' ' +
  //             (page === 'session' ? cssCard.on : cssCard.off)
  //           }
  //         >
  //           {gameWords[0] ? gameWords[0].word + ' | card0' : 'nothing | card0'}
  //         </button>
  //       </DnD>
  //     </>
  //   );
  // }
}
