import React from 'react';

import { useUiState } from '../../../../zustand';

import cssCard from './Card.module.css';

type Props = {};

export default function Card({ ContainerSessionRef }: Props) {
  const { page, setPage } = useUiState();
  const cardRef = React.useRef<HTMLButtonElement>(null);
  const isClicked = React.useRef<boolean>(false);

  const [coordsDown, setCoordsDown] = React.useState({ x: 0, y: 0 });

  const [cardCurrentPos, setCardCurrentPos] = React.useState({ x: 0, y: 0 });
  const [cardCurrentPosPrev, setCardCurrentPosPrev] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!cardRef.current || !ContainerSessionRef.current) return;

    const card = cardRef.current;
    const containerSession = ContainerSessionRef.current;

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isClicked.current = true;

      setCoordsDown({ x: e.clientX, y: e.clientY });
    };

    const onMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      isClicked.current = false;

      setCardCurrentPosPrev(cardCurrentPos);
    };

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (!isClicked.current) return;

      const moveFromZero = { x: e.clientX - coordsDown.x, y: e.clientY - coordsDown.y };
      setCardCurrentPos({
        x: moveFromZero.x + cardCurrentPosPrev.x,
        y: moveFromZero.y + cardCurrentPosPrev.y,
      });

      //Style
      card.style.translate = `${cardCurrentPos.x}px ${cardCurrentPos.y}px`;
    };

    card?.addEventListener('mousedown', onMouseDown);
    card?.addEventListener('mouseup', onMouseUp);
    containerSession?.addEventListener('mousemove', onMouseMove);
    containerSession?.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      card?.removeEventListener('mousedown', onMouseDown);
      card?.removeEventListener('mouseup', onMouseUp);
      containerSession?.removeEventListener('mousemove', onMouseMove);
      containerSession?.removeEventListener('mouseleave', onMouseUp);
    };

    return cleanup;
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
