import React from 'react';

import { DnDProps, posType } from './dndProps';
// import { onMouseDown, onMouseUp, onMouseMove } from './pcEvents';

const DnD: React.FC<DnDProps> = ({ children, ContainerSessionRef }) => {
  const dndRef = React.useRef<HTMLDivElement>(null);
  const isClicked = React.useRef<boolean>(false);
  const [coordsDown, setCoordsDown] = React.useState<posType>({ x: 0, y: 0 });
  const [cardCurrentPos, setCardCurrentPos] = React.useState<posType>({ x: 0, y: 0 });
  const [cardDiffPrev, setCardDiffPrev] = React.useState<posType>({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    isClicked.current = true;

    setCoordsDown({ x: e.clientX, y: e.clientY });
    setCardCurrentPos({ x: e.clientX, y: e.clientY });

    console.log('onMouseDown = ' + e.clientX);
  };
  const handleMouseUp = (e: MouseEvent) => {
    isClicked.current = false;

    const diff = { x: cardCurrentPos.x - coordsDown.x, y: cardCurrentPos.y - coordsDown.y };
    // setCardDiffPrev({ x: diff, y: 0 });
    setCardDiffPrev((prev) => ({ x: prev.x + diff.x, y: prev.y + diff.y }));

    console.log('onMouseUp = ' + e.clientX);
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
    if (!dndRef.current && !ContainerSessionRef.current) return;

    const card: HTMLDivElement | null = dndRef.current;
    const containerSession: HTMLDivElement | null = ContainerSessionRef.current;

    const diff = { x: cardCurrentPos.x - coordsDown.x, y: cardCurrentPos.y - coordsDown.y };
    const result = { x: diff.x + cardDiffPrev.x, y: diff.y + cardDiffPrev.y };

    //! problem with Y (without: translate(-50%, -50%))
    card.style.transform = `translate(-50%, -50%) translate(${
      containerSession?.clientWidth * 0.5 + result.x
    }px, ${containerSession?.clientHeight * 0.5 + result.y}px)`;

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
  }, [coordsDown, cardCurrentPos]);

  return <div ref={dndRef}>{children}</div>;
};

export default DnD;
