import { psswrdsMatch, validateEmail } from './validation';
import { login, registration } from '../../../axios/user';
import createFirstTimedata from './firstTimeData';

export const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  sign: string,
  emailVal: string,
  passVal: string,
  passRepeatVal: string,
  setAttention: any,
  wrongValue: { value: string; message: string },
  setwrongValue: any,
  setPage: any
) => {
  e.preventDefault(); // cancel page refresh

  if (!validateEmail(emailVal)) {
    console.log(`email incorrect!`);
    setwrongValue({ value: wrongValue, message: `email incorrect!` });
    setAttention('email');
    setTimeout(() => {
      setAttention('');
    }, 500);
    return;
  } else if (passVal.length < 4) {
    console.log(`pass has been more then 4 symbols`);
    setwrongValue({ value: wrongValue, message: `pass has been more then 4 symbols` });
    setAttention('pass');
    setTimeout(() => {
      setAttention('');
    }, 500);
    return;
  } else if (!psswrdsMatch(passVal, passRepeatVal) && passVal && sign !== 'in') {
    console.log(`passwords don't match!`);
    setwrongValue({ value: wrongValue, message: `passwords don't match!` });
    setAttention('passRepeat');
    setTimeout(() => {
      setAttention('');
    }, 500);
    return;
  }

  // submit
  if (sign === 'in') {
    login(emailVal, passVal)
      .then((result) => {
        if (result === 404) {
          setAttention('email');
          setwrongValue({ value: emailVal, message: `This email ist't exist.  Do Y wanna sign-up?` });
        } else {
          console.log('Logged in successfully with userId:', result);
          //!
          localStorage.setItem('card-swiper:email', emailVal);
          setPage('menu');
          setwrongValue({ value: '', message: '' });
        }
      })
      .catch((error) => {
        console.error('An unexpected error occurred:', error);
      });
  } else if (sign === 'up') {
    registration(emailVal, passVal)
      .then((result) => {
        if (result === 409) {
          setAttention('email');
          setwrongValue({
            value: emailVal,
            message: `User with this email already exists :(  Do Y wanna sign-in?`,
          });
        } else {
          // console.log('registration is success :)', result);
          setPage('menu');
          setwrongValue({ value: '', message: '' });

          //* Creating data first time DATA: list, words
          createFirstTimedata(emailVal, result);
        }
      })
      .catch((error) => {
        console.error('An unexpected error occurred:', error);
      });
  }

  // clear
  setAttention('');
};
