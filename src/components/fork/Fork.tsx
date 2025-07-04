import React from 'react';
import inputValidation from '../../handlers/inputValidation';

import cssFork from './Fork.module.css';

type AddLogicType = (input: string, setState?: React.Dispatch<React.SetStateAction<string>>) => void;
type Props = {
  isOn: boolean;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  actionStatus: { l: boolean; r: boolean };
  setActionStatus: React.Dispatch<React.SetStateAction<{ l: boolean; r: boolean }>>;
  addLogic: AddLogicType;
};

export default function Fork({ isOn, leftChild, rightChild, actionStatus, setActionStatus, addLogic }: Props) {
  const maxLength: number = 20;
  const pevButton = React.useRef<'non' | 'r' | 'l'>('non');

  const buttonRightRef = React.useRef<HTMLButtonElement>(null);
  const buttonLeftRef = React.useRef<HTMLButtonElement>(null);
  const inputRightRef = React.useRef<HTMLInputElement>(null);
  const inputLeftRef = React.useRef<HTMLInputElement>(null);

  const [inputValueL, setInputValueL] = React.useState('');
  const [inputValueR, setInputValueR] = React.useState('');

  const addLogicRef = React.useRef<AddLogicType>(addLogic);
  //* Check refresh data in addLogicRef (dataZus)
  React.useEffect(() => {
    addLogicRef.current = addLogic;
  }, [addLogic]);

  const submitHndlr = (
    inputRightRef: React.RefObject<HTMLInputElement>,
    pevButton: React.MutableRefObject<'non' | 'r' | 'l'>,
    addLogicRef: React.MutableRefObject<AddLogicType>,
    setInputValueR?: React.Dispatch<React.SetStateAction<string>>
  ): void => {
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
  };

  const clickHndlr = (e: Event): void => {
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
      submitHndlr(inputRightRef, pevButton, addLogicRef, setInputValueR);
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputValueL) console.log('Enter');
          }}
          onChange={(e) => setInputValueL(inputValidation(e.target.value))}
          className={actionStatus.l ? cssFork.inputButton : cssFork.inputButtonOff}
          maxLength={maxLength}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputValueR !== '')
              submitHndlr(inputRightRef, pevButton, addLogicRef, setInputValueR);
          }}
          className={actionStatus.r ? cssFork.inputButton : cssFork.inputButtonOff}
          maxLength={maxLength}
        />
      </button>
    </section>
  );
}
