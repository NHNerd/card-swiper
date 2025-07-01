import React from 'react';
import inputValidation from '../../handlers/inputValidation';

import cssFork from './Fork.module.css';

type Props = {
  isOn: boolean;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  actionStatus;
  setActionStatus;
  addLogic;
};

export default function Fork({ isOn, leftChild, rightChild, actionStatus, setActionStatus, addLogic }: Props) {
  const pevButton = React.useRef<'non' | 'r' | 'l'>('non');

  const buttonRightRef = React.useRef<HTMLButtonElement>(null);
  const buttonLeftRef = React.useRef<HTMLButtonElement>(null);
  const inputRightRef = React.useRef<HTMLInputElement>(null);
  const inputLeftRef = React.useRef<HTMLInputElement>(null);

  const [inputValueL, setInputValueL] = React.useState('');
  const [inputValueR, setInputValueR] = React.useState('');

  const addLogicRef = React.useRef(addLogic);
  //* Check refresh data in addLogicRef (dataZus)
  React.useEffect(() => {
    addLogicRef.current = addLogic;
  }, [addLogic]);

  const clickHndlr = (e: Event) => {
    if (buttonRightRef.current?.contains(e.target)) {
      if (pevButton.current === 'r') return;
      if (inputLeftRef.current?.value && pevButton.current !== 'non') {
        console.log('Search list');
        //* Logic Saerch from child
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
        //* In addLogicRef происходит Clousure in first mount time (addEventListener)
        //* Поэтому обновляем func через отслеживание ее изменнеий помместив ее в useRef
        addLogicRef.current(inputRightRef.current?.value.trim(), setInputValueR);
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

        setInputValueL('');
        setInputValueR('');
      }, 200);
    }
  };

  // dataZus тут замыкается в самом начале (null) внутри addLogic
  React.useEffect(() => {
    document.addEventListener('pointerup', clickHndlr);

    return () => {
      document.removeEventListener('pointerup', clickHndlr);
    };
  }, []);

  return (
    <section className={cssFork.container + ' ' + (isOn ? cssFork.on : cssFork.off)}>
      <button
        ref={buttonLeftRef}
        className={
          cssFork.left +
          ' + ' +
          (actionStatus.l || actionStatus.r ? (actionStatus.l ? cssFork.focus : cssFork.defocus) : cssFork.blur)
        }
      >
        {/* child inage with wraper  */}
        <div
          className={
            inputValueR && actionStatus.r ? cssFork.imgRotStart + ' ' + cssFork.imgOpacityOff : cssFork.imgRotEnd
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
          onChange={(e) => setInputValueL(inputValidation(e.target.value))}
          className={actionStatus.l ? cssFork.inputButton : cssFork.inputButtonOff}
          maxLength={20}
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
        // onClick={() => addLogic(11)} //TODO
        className={
          cssFork.right +
          ' + ' +
          (actionStatus.l || actionStatus.r ? (actionStatus.r ? cssFork.focus : cssFork.defocus) : cssFork.blur)
        }
      >
        {/* child inage with wraper  */}
        <div
          className={
            inputValueL && actionStatus.l ? cssFork.imgRotStart + ' ' + cssFork.imgOpacityOff : cssFork.imgRotEnd
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
          onChange={(e) => setInputValueR(inputValidation(e.target.value))}
          className={actionStatus.r ? cssFork.inputButton : cssFork.inputButtonOff}
          maxLength={20}
        />
      </button>
    </section>
  );
}
