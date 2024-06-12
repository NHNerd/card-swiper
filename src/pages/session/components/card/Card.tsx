import React from 'react';

import { useUiState } from '../../../../zustand';

import cssCard from './Card.module.css';

type Props = {};

export default function Card({ ContainerSessionRef }: Props) {
  const { page, setPage } = useUiState();
  const cardRef = React.useRef<HTMLButtonElement>(null);
  const isClicked = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (!cardRef.current || !ContainerSessionRef.current) return;

    const card = cardRef.current;
    const containerSession = ContainerSessionRef.current;

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isClicked.current = true;
      // card.style.transition = `0s`;
    };
    const onMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      isClicked.current = false;
      // card.style.transition = `0.2s`;
    };
    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (!isClicked.current) return;

      card.style.top = `${e.clientY}px`;
      card.style.left = `${e.clientX}px`;
      // card.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    card?.addEventListener('mousedown', onMouseDown);
    card?.addEventListener('mouseup', onMouseUp);
    containerSession?.addEventListener('mousemove', onMouseMove);
    containerSession?.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      card?.removeEventListener('mousedown', onMouseDown);
      card?.removeEventListener('mouseup', onMouseUp);
      containerSession?.removeEventListener('mousemove', onMouseMove);
      containerSession?.removeEventListener('mouseleave', onMouseUp);
    };

    return cleanup;
  }, []);

  return (
    <>
      <div className='testContainer'>
        {' '}
        <button
          ref={cardRef}
          className={cssCard.card + ' ' + (page === 'session' ? cssCard.on : cssCard.off)}
        >
          thought
        </button>
      </div>
    </>
  );
}
