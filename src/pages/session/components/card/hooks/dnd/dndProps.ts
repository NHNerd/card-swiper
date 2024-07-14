export type DnDProps = {
  children: React.ReactNode;
  ContainerSessionRef: React.RefObject<HTMLDivElement>;
};

export type posType = {
  x: number;
  y: number;
};

export interface CardEventListenersProps {
  card: HTMLElement | null;
  containerSession: HTMLElement | null;
  onMouseDown: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  onMouseLeave: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
}
