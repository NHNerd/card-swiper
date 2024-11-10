import React from 'react';

import cssInputStatus from './InputStatus.module.css';

type Props = {
  status: boolean;
  attention: boolean;
};

export default function InputStatus({ status, attention }: Props) {
  return (
    <>
      <div className={cssInputStatus.container + (attention ? ' ' + 'jetter-attntion' : '')}>
        <div className={status ? cssInputStatus.y : cssInputStatus.x}></div>
      </div>
    </>
  );
}
