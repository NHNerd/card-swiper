import cssBriefStatistic from './BriefStatistic.module.css';

type Props = {};

export default function BriefStatistic({}: Props) {
  return (
    <div className={`${cssBriefStatistic.container}`}>
      <div className={`${cssBriefStatistic.stringContainer} ${cssBriefStatistic.spaceBetween}`}>
        <h3 className={cssBriefStatistic.stringContainer}>
          <div className={cssBriefStatistic.text + ' color2'}>sessions:</div>
          <div className={cssBriefStatistic.value}>{8}</div>
        </h3>
        <h3 className={cssBriefStatistic.stringContainer}>
          <div className={cssBriefStatistic.text + ' color2'}>words repeated:</div>
          <div className={cssBriefStatistic.value}>{57}</div>
        </h3>
      </div>

      <h3 className={`${cssBriefStatistic.stringContainer} ${cssBriefStatistic.hardes}`}>
        <div className={cssBriefStatistic.text + ' color2'}>hardes word:</div>
        <div className={cssBriefStatistic.value}>{'regret'}</div>
      </h3>
    </div>
  );
}
