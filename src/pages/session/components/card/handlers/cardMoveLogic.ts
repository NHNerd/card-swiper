import React from 'react';

interface CardEventListenersProps {
  card: HTMLElement | null;
  containerSession: HTMLElement | null;
  onMouseDown: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
}

export const onMouseDownDragLogic = (
  e: MouseEvent,
  isClicked: { current: boolean },
  setCoordsDown: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
) => {
  e.preventDefault();

  isClicked.current = true;
  setCoordsDown({ x: e.clientX, y: e.clientY });
};

export const onMouseUpDragLogic = (
  e: MouseEvent,
  isClicked: { current: boolean },
  setCardCurrentPosPrev: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  cardCurrentPos: { x: number; y: number }
) => {
  e.preventDefault();

  isClicked.current = false;
  setCardCurrentPosPrev(cardCurrentPos);
};

export const onMouseMoveDragLogic = (
  e: MouseEvent,
  isClicked: { current: boolean },
  coordsDown: { x: number; y: number },
  cardCurrentPos: { x: number; y: number },
  setCardCurrentPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  cardCurrentPosPrev: { x: number; y: number },
  card: HTMLButtonElement
) => {
  if (!isClicked.current) return;
  e.preventDefault();

  const moveFromZero = { x: e.clientX - coordsDown.x, y: e.clientY - coordsDown.y };
  setCardCurrentPos({
    x: moveFromZero.x + cardCurrentPosPrev.x,
    y: moveFromZero.y + cardCurrentPosPrev.y,
  });

  //Style
  card.style.translate = `${cardCurrentPos.x}px ${cardCurrentPos.y}px`;
  //TODO
  // card.style.rotate = `${moveFromZero.x * 0.03}deg`;
};

export const cardEventAddListners = (props: CardEventListenersProps) => {
  props.card?.addEventListener('mousedown', props.onMouseDown);
  props.card?.addEventListener('mouseup', props.onMouseUp);
  props.containerSession?.addEventListener('mousemove', props.onMouseMove);
  props.containerSession?.addEventListener('mouseleave', props.onMouseUp);
};

export const cardEventCleanupListners = (props: CardEventListenersProps) => {
  props.card?.removeEventListener('mousedown', props.onMouseDown);
  props.card?.removeEventListener('mouseup', props.onMouseUp);
  props.containerSession?.removeEventListener('mousemove', props.onMouseMove);
  props.containerSession?.removeEventListener('mouseleave', props.onMouseUp);
};
