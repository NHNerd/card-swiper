import React from 'react';

import { useUiState } from '../../zustand';
// import debounce from '../../handlers/throttle.ts';
// import Wave from './components/wave/Wave';
import Header from './components/header/Header';
import InputStatus from './components/inputStatus/InputStatus';
import { psswrdValidate, psswrdsMatch, validateEmail } from './business/validation';
import { handleSubmit } from './business/formSent';

import cssAuth from './Auth.module.css';

type Props = {};

// wrapping "refreshing allLists in localstorage" into debounce
// const debounceListsOrderRefresh = debounce(listsOrderRefresh, 500);

export default function Auth({}: Props) {
  const { page, setPage } = useUiState();

  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const inputPassRef = React.useRef<HTMLInputElement>(null);
  const inputPassrepeatRef = React.useRef<HTMLInputElement>(null);

  const [sign, setSign] = React.useState<'in' | 'up'>('in');
  const [emailVal, setEmailVal] = React.useState('');
  const [passVal, setPassVal] = React.useState('');
  const [passRepeatVal, setpassRepeatVal] = React.useState('');
  const [attention, setAttention] = React.useState<'' | 'email' | 'pass' | 'passRepeat'>('');
  const [wrongValue, setwrongValue] = React.useState<{ value: string; message: string }>({
    value: '',
    message: '',
  });

  // auto focus
  React.useEffect(() => {
    inputEmailRef.current?.focus();
    if (validateEmail(emailVal) && !psswrdValidate(passVal)) inputPassRef.current?.focus();
    else if (psswrdValidate(passVal)) inputPassrepeatRef.current?.focus();
  }, [sign]);
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (validateEmail(emailVal) && document.activeElement === inputEmailRef.current) {
          inputPassRef.current?.focus();
        } else if (psswrdValidate(passVal) && validateEmail(emailVal)) {
          inputPassrepeatRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [emailVal, passVal]);

  // React.useEffect(() => {
  //   console.log(wrongValue.value);
  // }, [emailVal]);

  return (
    <>
      <Header sign={sign} />
      <form
        className={cssAuth.log}
        onSubmit={(e) =>
          handleSubmit(
            e,
            sign,
            emailVal,
            passVal,
            passRepeatVal,
            setAttention,
            wrongValue,
            setwrongValue,
            setPage
          )
        }
        noValidate
      >
        <section className={cssAuth.fork}>
          <button
            className={sign === 'in' ? '' : cssAuth.signOff}
            type='button'
            onClick={() => setSign('in')}
          >
            sign-in
          </button>
          <div className={cssAuth.forkLine}> | </div>
          <button
            className={sign === 'up' ? '' : cssAuth.signOff}
            type='button'
            onClick={() => setSign('up')}
          >
            sign-up
          </button>
        </section>

        <section className={cssAuth.inputs}>
          <InputStatus
            status={validateEmail(emailVal) && (attention === wrongValue.value || sign !== 'up')}
            attention={attention === 'email'}
          />
          <input
            ref={inputEmailRef}
            className={cssAuth.input}
            type='email'
            name='email'
            placeholder='enter mail'
            value={emailVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailVal(e.target.value)}
            required
            //   onFocus={() => inputFocusedHandler('mail')}
            //   onBlur={() => inputFocusedHandler('none')}
            //! Dont work
            autoComplete='email'
          ></input>
          <div className={cssAuth.error + (attention === 'email' ? '' : ' ' + cssAuth.errorOff)}>
            {/* {sign === 'in' ? wrongValue.message : ''} */}
            {wrongValue.message}
          </div>
          <div className={cssAuth.line}></div>
          <InputStatus status={psswrdValidate(passVal)} attention={attention === 'pass'} />
          <input
            ref={inputPassRef}
            className={cssAuth.input}
            type='password'
            name='password'
            placeholder='enter pass'
            value={passVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassVal(e.target.value)}
            required
            //   onFocus={() => inputFocusedHandler('mail')}
            //   onBlur={() => inputFocusedHandler('none')}
            //! Dont work
            autoComplete='password'
          ></input>
          <div
            className={
              cssAuth.error +
              (attention === 'pass' ? ' ' + cssAuth.errorAnother : ' ' + cssAuth.errorOff)
            }
          >
            {wrongValue.message}
          </div>
          <div className={cssAuth.line}></div>

          <div className={sign === 'up' ? cssAuth.rePassContainer : cssAuth.rePassContainerOff}>
            <InputStatus
              status={psswrdsMatch(passVal, passRepeatVal)}
              attention={attention === 'passRepeat'}
            />
            <input
              ref={inputPassrepeatRef}
              className={cssAuth.input}
              type='password'
              name='password'
              placeholder='re pass'
              value={passRepeatVal}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setpassRepeatVal(e.target.value)}
              required
              //   onFocus={() => inputFocusedHandler('mail')}
              //   onBlur={() => inputFocusedHandler('none')}
              //! Dont work
              autoComplete='password'
            ></input>
            <div
              className={
                cssAuth.error +
                (attention === 'passRepeat' ? ' ' + cssAuth.errorAnother : ' ' + cssAuth.errorOff)
              }
            >
              {wrongValue.message}
            </div>
            <div className={cssAuth.line}></div>
          </div>
        </section>

        <button type='button' className={cssAuth.forgot}>
          <div className='buttom-jitter'> forgot password ?</div>
        </button>
        <button type='submit' className={cssAuth.submit}>
          <div className='buttom-jitter'> sign-in</div>
        </button>
      </form>
    </>
  );
}
