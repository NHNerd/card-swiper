import React, { useEffect } from 'react';

import { DnDProps, posType } from './dndProps';
// import { onMouseDown, onMouseUp, onMouseMove } from './pcEvents';

const DnD: React.FC<DnDProps> = ({ children, ContainerSessionRef }) => {
  const dndRef = React.useRef<HTMLDivElement>(null);
  const isClicked = React.useRef<boolean>(false);
  const [coordsDown, setCoordsDown] = React.useState<posType>({ x: 0, y: 0 });
  const [cardCurrentPos, setCardCurrentPos] = React.useState<posType>({ x: 0, y: 0 });
  const [cardDiffPrev, setCardDiffPrev] = React.useState<posType>({ x: 0, y: 0 });

  //! Stupid
  let card = dndRef.current;
  let containerSession = ContainerSessionRef.current;
  React.useEffect(() => {
    card = dndRef.current;
    containerSession = ContainerSessionRef.current;

    card.addEventListener('mousedown', handleMouseDown);
  }, []);

  const handleMouseDown = (e: MouseEvent) => {
    isClicked.current = true;

    setCoordsDown({ x: e.clientX, y: e.clientY });
    setCardCurrentPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = (e: MouseEvent) => {
    isClicked.current = false;

    const diff = { x: cardCurrentPos.x - coordsDown.x, y: cardCurrentPos.y - coordsDown.y };
    setCardDiffPrev((prev) => ({ x: prev.x + diff.x, y: prev.y + diff.y }));
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isClicked.current) return;

    setCardCurrentPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseLeave = (e: MouseEvent) => {
    if (!isClicked.current) return;

    isClicked.current = false;
    const diff = { x: cardCurrentPos.x - coordsDown.x, y: cardCurrentPos.y - coordsDown.y };
    setCardDiffPrev((prev) => ({ x: prev.x + diff.x, y: prev.y + diff.y }));
  };

  React.useEffect(() => {
    if (!card || !containerSession) return;

    const diff = { x: cardCurrentPos.x - coordsDown.x, y: cardCurrentPos.y - coordsDown.y };
    const result = { x: diff.x + cardDiffPrev.x, y: diff.y + cardDiffPrev.y };

    //! problem with Y (without: translate(-50%, -50%))
    card.style.transform = `translate(-50%, -50%) translate(${
      containerSession?.clientWidth * 0.5 + result.x
    }px, ${containerSession?.clientHeight * 0.5 + result.y}px)`;

    //! SUPER PROBLEM
    //! listners adds evry "move time"
    // listers
    card.addEventListener('mousedown', handleMouseDown);
    card.addEventListener('mouseup', handleMouseUp);
    card.addEventListener('mousemove', handleMouseMove);
    containerSession?.addEventListener('mouseleave', handleMouseLeave);

    // clearing listers
    return () => {
      card.removeEventListener('mousedown', handleMouseDown);
      card.removeEventListener('mouseup', handleMouseUp);
      card.removeEventListener('mousemove', handleMouseMove);
      containerSession?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cardCurrentPos]);

  return <div ref={dndRef}>{children}</div>;
};

export default DnD;
