import React from 'react';

import cssBtn from './Btn.module.css';

export default function BtnText({ children1, children2 }) {
  return (
    <>
      <button className={cssBtn.btn}>
        {children1}
        {children2}
      </button>
    </>
  );
}
