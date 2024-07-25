import React from 'react';

import cssFork from './Fork.module.css';

type Props = {
  isOn: boolean;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  addHndlr?: () => void;
  searchHndlr?: () => void;
  parrent?: 'lol' | 'le';
};

export default function Fork({ isOn, leftChild, rightChild, addHndlr, searchHndlr, parrent }: Props) {
  const [actionStatus, setActionStatus] = React.useState<{ l: boolean; r: boolean }>({
    l: false,
    r: false,
  });
  const pevButton = React.useRef<'non' | 'r' | 'l'>('non');

  const buttonRightRef = React.useRef<HTMLButtonElement>(null);
  const buttonLeftRef = React.useRef<HTMLButtonElement>(null);
  const inputRightRef = React.useRef<HTMLInputElement>(null);
  const inputLeftRef = React.useRef<HTMLInputElement>(null);

  const clickHndlr = (e: Event) => {
    if (buttonRightRef.current?.contains(e.target)) {
      if (pevButton.current === 'r') return;
      setActionStatus({ l: false, r: true });
      pevButton.current = 'r';

      setTimeout(() => {
        inputRightRef.current?.focus();
        inputLeftRef.current?.blur();
      }, 200);
    } else if (buttonLeftRef.current?.contains(e.target)) {
      if (pevButton.current === 'l') return;
      setActionStatus({ l: true, r: false });
      pevButton.current = 'l';

      setTimeout(() => {
        inputLeftRef.current?.focus();
        inputRightRef.current?.blur();
      }, 200);
    } else if (pevButton.current !== 'non') {
      if (pevButton.current === 'non') return;
      setActionStatus({ l: false, r: false });
      pevButton.current = 'non';

      setTimeout(() => {
        inputLeftRef.current?.blur();
        inputRightRef.current?.blur();
      }, 200);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', clickHndlr);

    return () => {
      document.removeEventListener('mousedown', clickHndlr);
    };
  }, []);

  // React.useEffect(() => {
  //   // console.log(actionStatus);
  // }, [actionStatus]);

  return (
    <section className={cssFork.container + ' ' + (isOn ? cssFork.on : cssFork.off)}>
      <button
        ref={buttonLeftRef}
        onClick={searchHndlr}
        className={
          cssFork.left +
          ' + ' +
          (actionStatus.l || actionStatus.r
            ? actionStatus.l
              ? cssFork.focus
              : cssFork.defocus
            : cssFork.blur)
        }
      >
        {/* //TODO make proper image transition */}
        {!actionStatus.l ? leftChild : null}
        <input
          ref={inputLeftRef}
          type='text'
          className={actionStatus.l ? cssFork.inputButton : cssFork.inputButtonOff}
        />
      </button>

      <div
        className={
          cssFork.line +
          ' + ' +
          (actionStatus.l || actionStatus.r
            ? actionStatus.r
              ? cssFork.lineR
              : cssFork.lineL
            : cssFork.lineCenter)
        }
      />

      <button
        ref={buttonRightRef}
        onClick={addHndlr}
        className={
          cssFork.right +
          ' + ' +
          (actionStatus.l || actionStatus.r
            ? actionStatus.r
              ? cssFork.focus
              : cssFork.defocus
            : cssFork.blur)
        }
      >
        {/* //TODO make proper image transition */}
        {!actionStatus.r ? rightChild : null}
        <input
          ref={inputRightRef}
          type='text'
          className={actionStatus.r ? cssFork.inputButton : cssFork.inputButtonOff}
        />
      </button>
    </section>
  );
}
