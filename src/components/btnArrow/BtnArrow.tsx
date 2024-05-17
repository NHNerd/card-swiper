import React from 'react';

import cssBtnArrow from './BtnArrow.module.css';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  direct: 'top' | 'left' | 'right' | 'bottom';
};

export default function BtnArrow({ onClick, direct }: Props) {
  return (
    <div onClick={onClick} className={cssBtnArrow.btnArrow + ' color3 ' + cssBtnArrow[direct]}>
      <button className={cssBtnArrow.actArea}></button>
    </div>
  );
}
