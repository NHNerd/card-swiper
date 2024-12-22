import Chart from './components/chart/Chart';
import BriefStatistic from './components/briefStatistic/BriefStatistic';
import BtnArrow from '../../components/btnArrow/BtnArrow';
import { useUiState } from '../../zustand';
import cssStatistics from './Statistics.module.css';

type Props = {};

export default function Statistics({}: Props) {
  const { page, setPage } = useUiState();
  const btnArrowHndlr = () => {
    console.log('btnArrowHndl');
    setPage('statistics');
  };

  return (
    <div
      className={`${cssStatistics.container} ${
        page === 'menu' || page === 'statistics' ? '' : cssStatistics.off
      }`}
    >
      <Chart />
      <BriefStatistic />
      <div className={cssStatistics.BtnArrowContainer}>
        <BtnArrow onClick={btnArrowHndlr} direct='bottom' />
      </div>
    </div>
  );
}
