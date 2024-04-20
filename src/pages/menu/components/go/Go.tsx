import React from 'react';

import cssGo from './Go.module.css';

type Props = {};

export default function Go({}: Props) {
  return <button id={cssGo.container}>go</button>;
}
