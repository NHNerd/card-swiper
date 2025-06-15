import sccBtnback from './Btnback.module.css';

import { useUiState } from '../../zustand';

type Props = {
  hndlr;
  isOnSetting: boolean;
};

const Btnback = ({ hndlr, isOnSetting }: Props) => {
  const { page, setPage } = useUiState();

  return (
    <button
      className={`${sccBtnback.back} ${page === 'le' || page === 'edit' || isOnSetting ? '' : sccBtnback.off}`}
      onClick={() => {
        hndlr();
      }}
    >
      <div className={sccBtnback.image}></div>
    </button>
  );
};

export default Btnback;
