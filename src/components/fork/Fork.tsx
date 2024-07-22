import React from 'react';

import cssFork from './Fork.module.css';

type Props = {
  isOn: true | false;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
};

export default function Fork({ isOn, leftChild, rightChild }: Props) {
  return (
    <section className={cssFork.container + ' ' + (isOn ? cssFork.on : cssFork.off)}>
      <button className={cssFork.left}> {leftChild}</button>

      <div className={cssFork.line} />
      <button className={cssFork.right}>{rightChild}</button>
    </section>
  );
}
