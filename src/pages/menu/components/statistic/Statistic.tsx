import React from 'react';

import cssStatistic from './Statistic.module.css';

type Props = {};

export default function Statistic({}: Props) {
  return <div className={cssStatistic.tempChart}></div>;
}
