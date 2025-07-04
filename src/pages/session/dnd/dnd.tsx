import React, { isValidElement, cloneElement } from 'react';
import { clickOrTouchEvent, calcMove, calcThrown, calcRotate, calcRotate3D } from './hndlrs/hndlrs';
import useChildSize from '../../../hooks/useChildSize';

import cssDnD from './dnd.module.css';

type Props = {
  children: React.ReactNode;
  screenSize: { x: number; y: number };
  isTop: boolean;
  hndlrKnow: (timeOut: number) => void;
  hndlrDontKnow: (timeOut: number) => void;
};

const DnD = React.memo(({ children, screenSize, isTop, hndlrKnow, hndlrDontKnow }: Props) => {
  const [childRef, childrenSize] = useChildSize(); // Get children childrenSize

  const random = React.useRef(Math.random() - 0.5);
  const randMult: number = 8;

  const [drag, setDrag] = React.useState(false);
  const [xyDrag, setXyDrag] = React.useState({ x: 0, y: 0 });
  const [, setTick] = React.useState(0);

  const xyStart = React.useRef({ x: 0, y: 0 });
  const xyMove = React.useRef({ x: 0, y: 0 });
  const xyEnd = React.useRef({ x: 0, y: 0 });
  const xyCardToCursor = React.useRef({ x: 0, y: 0 });

  const rotate = React.useRef(random.current * randMult);

  const dragHistory = React.useRef<{ pos: { x: number; y: number }; time: number }[]>([]);
  const thrown = React.useRef({ wasThrown: false, velocity: { x: 0, y: 0 } });

  const velocity = React.useRef({ x: 0, y: 0 });

  const screenEdge = Math.floor(screenSize.x * 0.1); // 10 %

  const hndlrThrowMovement = (vx: number, vy: number) => {
    setXyDrag((prev) => {
      if (Math.abs(prev.x) > screenSize.x) {
        thrown.current.wasThrown = false;

        // нельзя set state into another state 😁
        setTimeout(() => {
          prev.x > 0 ? hndlrKnow(0) : hndlrDontKnow(0);
        }, 0);
      }

      //Rotate
      rotate.current = calcRotate(screenSize, prev, random.current, randMult);

      return { x: prev.x + vx * 0.016, y: prev.y + vy * 0.008 };
    });
  };

  React.useEffect(() => {
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!drag) {
        // Trough Edge
        if (Math.abs(xyEnd.current.x) > screenSize.x / 2 - screenEdge && xyStart.current.x !== 0) {
          hndlrThrowMovement(2000 * Math.sign(xyEnd.current.x), thrown.current.velocity.y);
        }
        // Trough
        if (thrown.current.wasThrown) {
          hndlrThrowMovement(thrown.current.velocity.x, thrown.current.velocity.y);
        }

        // Rotate 3D fading
        if (Math.abs(velocity.current.x) <= 1 && Math.abs(velocity.current.y) <= 1) return;
        const speedBraak = 0.86;
        velocity.current = { x: velocity.current.x * speedBraak, y: velocity.current.y * speedBraak };
        setTick((t) => t + 1); // Rerender

        // Drag
      } else if (drag) {
        const pos = calcMove(screenSize, xyStart.current, xyMove.current, xyEnd.current, xyCardToCursor.current);
        setXyDrag(pos);

        //Rotate
        rotate.current = calcRotate(screenSize, pos, random.current, randMult);

        //* velocity for Rotate 3D
        velocity.current = calcRotate3D(dragHistory.current, xyMove.current);
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
    thrown.current.velocity = { x: 0, y: 0 };
  };
  const hndlrMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!drag) return;
    const pos = clickOrTouchEvent(e);
    xyMove.current = { x: pos.x, y: pos.y };

    // Trough: save bulk - pos, date
    const now = Date.now();
    dragHistory.current.push({ pos: { x: pos.x, y: pos.y }, time: Date.now() });
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
    // console.log('🍉end', pos.x);
    drugEnd(pos);
  };
  const hndlrMouseLeave = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!drag) return;
    const pos = clickOrTouchEvent(e);
    // console.log('❌leave', pos.x);
    drugEnd(pos);
  };

  return (
    <div
      className={cssDnD.contaiter}
      style={{
        zIndex: drag ? 1 : 0,
        width: childrenSize.width * (drag ? 1.02 : 1),
        height: childrenSize.height * (drag ? 1.02 : 1),
      }}
    >
      <div
        // Click
        className={`${cssDnD.dnd}  ${drag ? cssDnD.brightness : cssDnD.brightnessOff}`}
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
          transform: `translate(-50%, -50%) translate(${xyDrag.x + random.current * randMult}px,  ${
            xyDrag.y + random.current * randMult
          }px) rotate(${rotate.current}deg) rotateX(${-velocity.current.y}deg) rotateY(${-velocity.current
            .x}deg)`,
          scale: `${drag ? 1.02 : 1}`,
          width: childrenSize.width * (drag ? 1.02 : 1),
          height: childrenSize.height * (drag ? 1.02 : 1),

          //TODO MPV solution, in future I wanna use multi-touch
          // pointerEvents: isTop ? 'auto' : 'none',
        }}
      >
        <div className={`${cssDnD.shadow} ${drag ? '' : cssDnD.shadowOff}`}></div>
        {isValidElement(children) ? cloneElement(children, { ref: childRef }) : children}
      </div>
    </div>
  );
});

export default DnD;
