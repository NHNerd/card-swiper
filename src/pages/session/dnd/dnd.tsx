import React from 'react';
import { clickOrTouchEvent, calcMove, calcThrown, calcRotate } from './hndlrs/hndlrs';

import cssDnD from './dnd.module.css';

type Props = {
  children: React.ReactNode;
  screenSize: PosType;
};

const DnD = React.memo(({ children, screenSize }: Props) => {
  const random = React.useRef(Math.random() - 0.5);
  const randMult: number = 8;

  const [drag, setDrag] = React.useState(false);
  const [xyDrag, setXyDrag] = React.useState({ x: 0, y: 0 });

  const xyStart = React.useRef({ x: 0, y: 0 });
  const xyMove = React.useRef({ x: 0, y: 0 });
  const xyEnd = React.useRef({ x: 0, y: 0 });
  const xyCardToCursor = React.useRef({ x: 0, y: 0 });

  const rotate = React.useRef(random.current * randMult);

  const dragHistory = React.useRef<{ x: number; time: number }[]>([]);
  const thrown = React.useRef({ wasThrown: false, velocity: 0 });

  React.useEffect(() => {
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      // Trough
      if (!drag && thrown.current.wasThrown) {
        setXyDrag((prev) => {
          if (Math.abs(prev.x) > screenSize.x) thrown.current.wasThrown = false;
          return { x: prev.x + thrown.current.velocity * 0.016, y: prev.y };
        });
        // Drag
      } else if (drag) {
        const pos = calcMove(screenSize, xyStart.current, xyMove.current, xyEnd.current, xyCardToCursor.current);
        setXyDrag(pos);

        rotate.current = calcRotate(screenSize, pos, random.current, randMult);
      }
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, [drag]);

  const hndlrPressStart = (e: React.MouseEvent | React.TouchEvent): void => {
    if (drag) return;
    const pos = clickOrTouchEvent(e);
    // console.log('🍏start', pos.x);
    setDrag(true);
    xyStart.current = { x: pos.x, y: pos.y };

    // Trough Clear
    thrown.current.velocity = 0;
  };
  const hndlrMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!drag) return;
    const pos = clickOrTouchEvent(e);
    xyMove.current = { x: pos.x, y: pos.y };

    // Trough: save bulk - pos, date
    const now = Date.now();
    dragHistory.current.push({ x: pos.x, time: Date.now() });
    dragHistory.current = dragHistory.current.filter((p) => now - p.time <= 150); // Clean items older 150мс
  };

  const drugEnd = (pos: { x: number; y: number }): void => {
    xyEnd.current = { ...xyDrag };
    xyMove.current = { x: 0, y: 0 };
    xyCardToCursor.current = { x: 0, y: 0 };
    setDrag(false);

    // Trough
    thrown.current = calcThrown(dragHistory.current, pos);
    // Trough Clear
    dragHistory.current = [];
  };
  const hndlrPressEnd = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!drag) return;
    const pos = clickOrTouchEvent(e);
    console.log('🍉end', pos.x);
    drugEnd(pos);
  };
  const hndlrMouseLeave = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!drag) return;
    const pos = clickOrTouchEvent(e);
    console.log('❌leave');
    drugEnd(pos);
  };
  return (
    <div
      // Click
      className={`${cssDnD.dnd}`}
      onMouseDown={(e) => hndlrPressStart(e)}
      onMouseMove={(e) => hndlrMove(e)}
      onMouseUp={(e) => hndlrPressEnd(e)}
      onMouseLeave={(e) => hndlrMouseLeave(e)}
      // Touch
      onTouchStart={(e) => hndlrPressStart(e)}
      onTouchMove={(e) => hndlrMove(e)}
      onTouchEnd={(e) => hndlrPressEnd(e)}
      onTouchCancel={(e) => hndlrMouseLeave(e)}
      style={{
        transform: `translate(-50%, -50%) translate(${xyDrag.x + random.current * randMult}px, ${
          xyDrag.y + random.current * randMult
        }px) rotate(${rotate.current}deg)`,
        zIndex: drag ? 1 : 0,
        scale: `${drag ? 1.06 : 1}`,
      }}
    >
      {children}
    </div>
  );
});

export default DnD;
