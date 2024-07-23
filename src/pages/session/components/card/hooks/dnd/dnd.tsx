import React from 'react';

import { DnDProps, posType } from './dndProps';

const DnD: React.FC<DnDProps> = ({ children, ContainerSessionRef }) => {
  const dndRef = React.useRef<HTMLDivElement | null>(null);
  const isClicked = React.useRef<boolean | null>(false);
  const coordsDown = React.useRef<posType>({ x: 0, y: 0 });
  const croodsPrevSum = React.useRef<posType>({ x: 0, y: 0 });

  // ⬆️ down ⬇️
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    isClicked.current = true;
    coordsDown.current = { x: e.clientX, y: e.clientY };
  };
  // ⬆️ up ⬆️
  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    isClicked.current = false;
    const croodsFromZero = { x: e.clientX - coordsDown.current.x, y: e.clientY - coordsDown.current.y };
    croodsPrevSum.current = {
      x: croodsPrevSum.current.x + croodsFromZero.x,
      y: croodsPrevSum.current.y + croodsFromZero.y,
    };
  };
  // ⬅️➡️  move ⬅️➡️
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!isClicked.current) return;
    const croodsFromZero = { x: e.clientX - coordsDown.current.x, y: e.clientY - coordsDown.current.y };
    const result = {
      x: croodsFromZero.x + croodsPrevSum.current.x,
      y: croodsFromZero.y + croodsPrevSum.current.y,
    };

    // Style
    //! problem with Y element pos
    const issueCorrectY = ContainerSessionRef.current?.clientHeight * 0.5;
    dndRef.current.style.transform = `translate(${result.x}px, ${issueCorrectY + result.y}px)`;
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
  };

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
    };
  }, []);

  return <div ref={dndRef}>{children}</div>;
};

export default DnD;
