import React from 'react';

import cssFork from './Fork.module.css';

type Props = {
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
};

export default function Fork({ leftChild, rightChild }: Props) {
  return (
    <section className={cssFork.container}>
      <div className={cssFork.left}> {leftChild}</div>

      <div className={cssFork.line + ' bg-color3'} />
      <div className={cssFork.right}>{rightChild}</div>
    </section>
  );
}
