import { PosType } from '../../../../types/types';

export const clickOrTouchEvent = (e: React.MouseEvent | React.TouchEvent): PosType => {
  if ('touches' in e) {
    const touch = e.touches[0] || e.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  return { x: e.clientX, y: e.clientY };
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
  dragHistory: { x: number; time: number }[],
  dragEnd: { x: number; y: number }
): { wasThrown: boolean; velocity: number } => {
  if (!dragHistory.length) return { wasThrown: false, velocity: 0 };
  const now = Date.now();
  // Найдем позицию ~100мс назад (или ближайшую)
  const past = dragHistory.find((p) => now - p.time >= 100) || dragHistory[0];

  const dx = dragEnd.x - past.x;
  const dt = now - past.time || 1; // во избежание деления на 0

  const velocity = dx / (dt / 1000); // px/s
  const wasThrown = Math.abs(velocity) > 1400; // порог скорости, подбирай по ощущениям

  return { wasThrown, velocity };
};
