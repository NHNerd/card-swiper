import React from 'react';

import { DnDProps, posType } from './dndProps';
import { onMouseDown } from './pcEvents';

const DnD: React.FC<DnDProps> = ({ children, ContainerSessionRef }) => {
  const dndRef = React.useRef<HTMLDivElement>(null);
  const isClicked = React.useRef<boolean>(false);
  const [coordsDown, setCoordsDown] = React.useState<posType>({ x: 0, y: 0 });
  const [cardCurrentPos, setCardCurrentPos] = React.useState<posType>({ x: 0, y: 0 });
  const [cardCurrentPosPrev, setCardCurrentPosPrev] = React.useState<posType>({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!dndRef.current && !ContainerSessionRef.current) return;

    const card: HTMLDivElement | null = dndRef.current;
    const containerSession: HTMLDivElement | null = ContainerSessionRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      onMouseDown(e, isClicked, setCoordsDown);
    };

    //Style
    // card.style.translate = `${cardCurrentPos.x}px ${cardCurrentPos.y}px`;

    // const cardProps = {
    //   card,
    //   containerSession,
    //   onMouseDown,
    //   onMouseUp,
    //   onMouseLeave,
    //   onMouseMove,
    // };

    // Here is avoiding listers & cleanup
    card.addEventListener('mousedown', handleMouseDown);

    return () => {
      card.removeEventListener('mousedown', handleMouseDown);
    };
  }, [coordsDown, cardCurrentPos]);

  return <div ref={dndRef}>{children}</div>;
};

export default DnD;
