import React, { useEffect } from 'react';

import { DnDProps, posType } from './dndProps';

const DnD: React.FC<DnDProps> = ({ children, ContainerSessionRef }) => {
  const dndRef = React.useRef<HTMLDivElement | null>(null);
  const isClicked = React.useRef<boolean | null>(false);

  const coordsDown = React.useRef<posType>({ x: 0, y: 0 });
  const croodsPrevSum = React.useRef<posType>({ x: 0, y: 0 });

  const [autoCloser, setAutoCloser] = React.useState<posType>({ x: 0, y: 0 });
  const RAFid = React.useRef<number | null>(null);

  const [result, setResult] = React.useState<posType>({ x: 0, y: 0 });

  // ⬆️ down ⬇️
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();

    //! When drag card second try, before it's return to 0 0
    //! Wrong back speed
    // setAutoCloser({ x: 0, y: 0 });
    cancelAnimationFrame(RAFid.current);

    isClicked.current = true;
    coordsDown.current = { x: e.clientX, y: e.clientY };
  };
  // ⬆️ up ⬆️
  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();

    isClicked.current = false;
    const croodsFromZero = { x: e.clientX - coordsDown.current.x, y: e.clientY - coordsDown.current.y };

    //! Last coordsMove refresh, works in time mouseup,
    //! and we get new croodsPrevSum in old move
    //! last useEffect[coordsMove] when moves speedy
    setTimeout(() => {
      croodsPrevSum.current = {
        x: croodsPrevSum.current.x + croodsFromZero.x,
        y: croodsPrevSum.current.y + croodsFromZero.y,
      };
    }, 10);

    RAFid.current = requestAnimationFrame(loop);
  };
  // ⬅️➡️  move ⬅️➡️
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!isClicked.current) return;
    const croodsFromZero = {
      x: e.clientX - coordsDown.current.x,
      y: e.clientY - coordsDown.current.y,
    };
    // setCoordsMove({ x: e.clientX, y: e.clientY });
    setResult({
      x: croodsFromZero.x + croodsPrevSum.current.x,
      y: croodsFromZero.y + croodsPrevSum.current.y,
    });
  };
  //  ❌  move leave ❌
  const handleMouseLeave = (e: MouseEvent) => {
    e.preventDefault();
    if (!isClicked.current) return;
    isClicked.current = false;
    const croodsFromZero = { x: e.clientX - coordsDown.current.x, y: e.clientY - coordsDown.current.y };
    croodsPrevSum.current = {
      x: croodsPrevSum.current.x + croodsFromZero.x,
      y: croodsPrevSum.current.y + croodsFromZero.y,
    };

    RAFid.current = requestAnimationFrame(loop);
  };

  const loop = () => {
    if (croodsPrevSum.current.x !== 0) {
      const step: number = 0.01;

      // console.log('autoCloser = ' + autoCloser.x + ' | ' + 'prev = ' + croodsPrevSum.current.x);

      setAutoCloser((prev) => ({
        x: prev.x - croodsPrevSum.current.x * step,
        y: prev.y - croodsPrevSum.current.y * step,
      }));
    }

    RAFid.current = requestAnimationFrame(loop);
  };

  //* remove
  //! 1.02 it's way around :)
  if (Math.abs(croodsPrevSum.current.x) / Math.abs(autoCloser.x) <= 1.02) {
    cancelAnimationFrame(RAFid.current);

    // Clear Full
    coordsDown.current = { x: 0, y: 0 };
    croodsPrevSum.current = {
      x: 0,
      y: 0,
    };
    setAutoCloser({ x: 0, y: 0 });
    setResult({ x: 0, y: 0 });
  }

  React.useEffect(() => {
    if (!dndRef.current || !ContainerSessionRef.current) return;

    // add listers
    dndRef.current.addEventListener('mousedown', handleMouseDown);
    dndRef.current.addEventListener('mouseup', handleMouseUp);
    ContainerSessionRef.current.addEventListener('mousemove', handleMouseMove);
    dndRef.current.addEventListener('mouseleave', handleMouseLeave);

    // remove listers
    return () => {
      dndRef.current?.removeEventListener('mousedown', handleMouseDown);
      dndRef.current?.removeEventListener('mouseup', handleMouseUp);
      ContainerSessionRef.current?.removeEventListener('mousemove', handleMouseMove);
      dndRef.current?.removeEventListener('mouseleave', handleMouseLeave);

      cancelAnimationFrame(RAFid.current);
    };
  }, []);

  React.useEffect(() => {
    // Style
    //! problem with Y element pos(0 = top(0))
    const issueCorrectY = ContainerSessionRef.current?.clientHeight * 0.5;
    dndRef.current.style.transform = `translate(${result.x + autoCloser.x}px, ${
      issueCorrectY + result.y + autoCloser.y
    }px)`;
  }, [result, autoCloser]);

  return <div ref={dndRef}>{children}</div>;
};

export default DnD;
