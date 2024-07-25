import React, { useEffect } from 'react';

import cssFork from './Fork.module.css';

type Props = {
  isOn: boolean;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  actionStatus;
  setActionStatus;
};

export default function Fork({ isOn, leftChild, rightChild, actionStatus, setActionStatus }: Props) {
  const pevButton = React.useRef<'non' | 'r' | 'l'>('non');

  const buttonRightRef = React.useRef<HTMLButtonElement>(null);
  const buttonLeftRef = React.useRef<HTMLButtonElement>(null);
  const inputRightRef = React.useRef<HTMLInputElement>(null);
  const inputLeftRef = React.useRef<HTMLInputElement>(null);

  const [inputValueL, setInputValueL] = React.useState('');
  const [inputValueR, setInputValueR] = React.useState('');

  const hndlrSetInpurL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueL(event.target.value);
  };
  const hndlrSetInpurR = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueR(event.target.value);
  };

  // useEffect(() => {
  //   if (inputValueL && actionStatus.l) {
  //     console.log('LLLLLLLLLLLLL');
  //   }
  // }, [inputValueL]);

  const clickHndlr = (e: Event) => {
    if (buttonRightRef.current?.contains(e.target)) {
      if (pevButton.current === 'r') return;
      if (inputLeftRef.current?.value && pevButton.current !== 'non') {
        console.log('Search list');
        return;
      }
      setActionStatus({ l: false, r: true });
      pevButton.current = 'r';

      setTimeout(() => {
        inputRightRef.current?.focus();
        inputLeftRef.current?.blur();
      }, 0);
    } else if (buttonLeftRef.current?.contains(e.target)) {
      if (pevButton.current === 'l') return;
      if (inputRightRef.current?.value && pevButton.current !== 'non') {
        console.log('Add list');
        return;
      }
      setActionStatus({ l: true, r: false });
      pevButton.current = 'l';

      setTimeout(() => {
        inputLeftRef.current?.focus();
        inputRightRef.current?.blur();
      }, 0);
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
        {/* child inage with wraper  */}
        <div
          className={
            inputValueR && actionStatus.r
              ? cssFork.imgRotStart + ' ' + cssFork.imgOpacityOff
              : cssFork.imgRotEnd
          }
        >
          {leftChild}
        </div>
        <div
          className={
            cssFork.tick +
            ' ' +
            (inputValueR && actionStatus.r
              ? cssFork.imgRotStart
              : cssFork.imgRotEnd + ' ' + cssFork.imgOpacityOff)
          }
        ></div>

        <input
          ref={inputLeftRef}
          type='text'
          value={inputValueL}
          onChange={hndlrSetInpurL}
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
        {/* child inage with wraper  */}
        <div
          className={
            inputValueL && actionStatus.l
              ? cssFork.imgRotStart + ' ' + cssFork.imgOpacityOff
              : cssFork.imgRotEnd
          }
        >
          {rightChild}
        </div>
        <div
          className={
            cssFork.tick +
            ' ' +
            (inputValueL && actionStatus.l
              ? cssFork.imgRotStart
              : cssFork.imgRotEnd + ' ' + cssFork.imgOpacityOff)
          }
        ></div>

        <input
          ref={inputRightRef}
          type='text'
          value={inputValueR}
          onChange={hndlrSetInpurR}
          className={actionStatus.r ? cssFork.inputButton : cssFork.inputButtonOff}
        />
      </button>
    </section>
  );
}
