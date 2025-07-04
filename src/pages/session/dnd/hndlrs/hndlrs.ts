import { PosType } from '../../../../types/types';

export const clickOrTouchEvent = (e: React.MouseEvent | React.TouchEvent): PosType => {
  if ('touches' in e) {
    const touch = e.touches[0] || e.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  return { x: Math.max(e.clientX, 1), y: Math.max(e.clientY, 1) };
};

export const calcMove = (
  screenSize: PosType,
  xyStart: PosType,
  xyMove: PosType,
  xyEnd: PosType,
  xyCardToCursor: PosType
): PosType => {
  const startOffset = {
    x: -screenSize.x / 2 + xyStart.x,
    y: -screenSize.y / 2 + xyStart.y,
  };

  const speed = 0.08;

  xyCardToCursor.x += speed * (startOffset.x - xyCardToCursor.x - xyEnd.x);
  xyCardToCursor.y += speed * (startOffset.y - xyCardToCursor.y - xyEnd.y);

  const moveX = (Math.abs(xyMove.x) ? xyMove.x - xyStart.x : 0) + xyEnd.x;
  const moveY = (Math.abs(xyMove.y) ? xyMove.y - xyStart.y : 0) + xyEnd.y;

  return { x: moveX + xyCardToCursor.x, y: moveY + xyCardToCursor.y };
};

export const calcRotate = (screenSize: PosType, pos: PosType, random: number, randMult: number): number => {
  const halfScreen = screenSize.x / 2;
  return (pos.x / halfScreen) * 30 + random * randMult;
};

export const calcThrown = (
  dragHistory: { pos: { x: number; y: number }; time: number }[],
  dragEnd: { x: number; y: number }
): { wasThrown: boolean; velocity: { x: number; y: number } } => {
  if (!dragHistory.length) return { wasThrown: false, velocity: { x: 0, y: 0 } };
  const now = Date.now();
  // Найдем позицию ~100мс назад (или ближайшую)
  const past = dragHistory.find((p) => now - p.time >= 100) || dragHistory[0];

  const posDif = { x: dragEnd.x - past.pos.x, y: dragEnd.y - past.pos.y };
  const timeDif = now - past.time || 1; // во избежание деления на 0

  const velocity = { x: posDif.x / (timeDif / 1000), y: posDif.y / (timeDif / 1000) }; // px/s
  const wasThrown = Math.abs(velocity.x) > 1600; // порог скорости, подбирай по ощущениям

  return { wasThrown, velocity };
};

export const calcRotate3D = (dragHistory: { pos: PosType; time: number }[], xyMove: PosType): PosType => {
  //* velocity for Rotate 3D
  if (!dragHistory.length) return { x: 0, y: 0 };

  const now = Date.now();
  // find older then 100ms or last(самый старый)
  const past = dragHistory.find((p) => now - p.time >= 100) || dragHistory[0];
  const posDif = { x: xyMove.x - past.pos.x, y: xyMove.y - past.pos.y };
  const timeDif = now - past.time || 1; // во избежание деления на 0
  const speedPxS = { x: posDif.x / (timeDif / 1000), y: posDif.y / (timeDif / 1000) }; // px/s

  // Constraint
  const maxDeg = 30;
  const maxSpeed = 3000; // sensity

  return {
    x: Math.max(-1, Math.min(1, speedPxS.x / maxSpeed)) * maxDeg,
    y: Math.max(-1, Math.min(1, speedPxS.y / maxSpeed)) * maxDeg,
  };
};
