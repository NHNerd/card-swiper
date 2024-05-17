import Fork from '../../../../components/fork/Fork';
import { useUiState } from '../../../../zustand';

import cssFooter from './Footer.module.css';

type Props = {};

export default function Footer({}: Props) {
  const { page } = useUiState();

  return (
    <div className={cssFooter.containerFooter + ' ' + (page == 'le' ? cssFooter.on : cssFooter.off)}>
      <div className={cssFooter.left}>
        <h2 className='wordCount'>124</h2>
        <h2 className='wordText'>word count</h2>
      </div>
      <div className={cssFooter.right}>
        <h2 className={cssFooter.gameCount}>38</h2>
        <h2 className={cssFooter.gameText}>game count</h2>
        <button className={cssFooter.gameCountButton}></button>
      </div>
    </div>
  );
}
