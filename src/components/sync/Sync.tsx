import React from 'react';
import { useUiState, zustandData } from '../../zustand';
import {
  getAllLists,
  removeMany,
  refreshOrdersSync,
  addSync,
  refreshFieldsSync,
} from '../..//axios/list';
import compare from '../../business/list/compare';
import cssSync from './Sync.module.css';
import buildClientDate from '../../business/buildClientDate';

let onMountFlag = true;
export default function Sync() {
  const { dataZus, setDataZus } = zustandData();
  const { page, setPage } = useUiState();
  const email: string = localStorage.getItem('email');

  const [status, setStatus] = React.useState<'not' | 'sync' | 'loading'>('not');

  //* Building data right here! ♡♡♡
  React.useEffect(() => {
    if (onMountFlag) {
      // first quick build
      buildClientDate(email).then((data) => {
        setDataZus(data);

        // second build after sync
        compare(getAllLists, removeMany, refreshOrdersSync, addSync, refreshFieldsSync).then(() => {
          buildClientDate(email)
            .then((data) => {
              setDataZus(data);
              setStatus('sync');
            })
            .catch(() => {
              setStatus('not');
            });
        });
      });
    }
    onMountFlag = false;
  }, []);

  const refresh = async () => {
    setStatus('loading');
    const syncOk = await compare(getAllLists, removeMany, refreshOrdersSync, addSync, refreshFieldsSync);
    if (syncOk) {
      // const DZ_refresh = await buildClientDate(localStorage.getItem('email'));
      // console.log(DZ_refresh);
      setStatus('sync');
    } else {
      setStatus('not');
    }
  };

  return (
    <button onClick={refresh} className={cssSync.wraper + (page === 'menu' ? '' : ' ' + cssSync.off)}>
      <div className={cssSync.btn + ' ' + cssSync[status]}></div>
    </button>
  );
}
