import React from 'react';
import { useUiState } from '../../../../zustand';
import {
  onMouseDownDragLogic,
  onMouseUpDragLogic,
  onMouseMoveDragLogic,
  cardEventAddListners,
  cardEventCleanupListners,
} from './handlers/cardMoveLogic';
import cssCard from './Card.module.css';

type Props = {
  //! надо задать точнее (may be...)
  ContainerSessionRef: object;
};

export default function Card({ ContainerSessionRef }: Props) {
  const { page, setPage } = useUiState();

  const cardRef = React.useRef<HTMLButtonElement>(null);
  const isClicked = React.useRef<boolean>(false);

  const [coordsDown, setCoordsDown] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cardCurrentPos, setCardCurrentPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cardCurrentPosPrev, setCardCurrentPosPrev] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    if (!cardRef.current && !ContainerSessionRef.current) return;

    const card = cardRef.current;
    const containerSession = ContainerSessionRef.current;

    const onMouseDown = (e: MouseEvent) => {
      onMouseDownDragLogic(e, isClicked, setCoordsDown);
    };
    const onMouseUp = (e: MouseEvent) => {
      onMouseUpDragLogic(e, isClicked, setCardCurrentPosPrev, cardCurrentPos);
    };
    const onMouseMove = (e: MouseEvent) => {
      onMouseMoveDragLogic(
        e,
        isClicked,
        coordsDown,
        cardCurrentPos,
        setCardCurrentPos,
        cardCurrentPosPrev,
        card
      );
    };

    const cardProps = { card, containerSession, onMouseDown, onMouseUp, onMouseMove };
    // Here is avoiding listers & cleanup
    cardEventAddListners({ ...cardProps });

    return () => cardEventCleanupListners({ ...cardProps });
  }, [coordsDown, cardCurrentPos]);

  return (
    <>
      <div className='testContainer'>
        <button
          ref={cardRef}
          className={cssCard.card + ' ' + (page === 'session' ? cssCard.on : cssCard.off)}
        >
          thought
        </button>
      </div>
    </>
  );
}
