import React from 'react';
import { useUiState, zustandData, zustandOrderListEdit } from '../../../../zustand';
import { patchListField } from '../../../../axios/list';
import Btn from '../../../../components/btn/Btn';
import PopInput from '../../../../components/popInput/PopInput';
import cssListName from './ListName.module.css';

type Props = {};

export default function ListName({}: Props) {
  const { page } = useUiState();
  const { dataZus, setDataZus } = zustandData();
  const { orderListEditZus } = zustandOrderListEdit();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [newInputVal, setNewInputVal] = React.useState<string>('');
  const [trySubmitEmpty, setTrySubmitEmpty] = React.useState<boolean>(false);

  const hndlrListEdit = async () => {
    setIsOpen(true);
  };

  const hndlrSubmit = (inputRef: any) => {
    if (newInputVal === '') {
      setTrySubmitEmpty(true);
      setTimeout(() => {
        setTrySubmitEmpty(false);
      }, 1000);

      return;
    }

    let listsLS: any[] = [];
    if (dataZus[orderListEditZus].listName === newInputVal) {
      console.log(newInputVal, "- it's old name");

      setIsOpen(false);
      setTrySubmitEmpty(false);
      inputRef.current?.setSelectionRange(0, 0);
      inputRef.current?.blur();
      return;
    } else {
      listsLS = JSON.parse(localStorage.getItem('allLists'));
      const isNameTaken = listsLS.some((item: { listName: string }) => item.listName === newInputVal);
      if (isNameTaken) {
        console.log('name: ', newInputVal, ' alrady exist :(');
        return;
      }
    }

    //? ISO 8601 (0 UTC - Z)
    const newTime = new Date().toISOString();

    //DZ
    dataZus[orderListEditZus].listName = newInputVal;
    setDataZus(dataZus);
    // LS
    listsLS[orderListEditZus].listName = newInputVal;
    listsLS[orderListEditZus].updateListName = newTime;
    localStorage.setItem('allLists', JSON.stringify(listsLS));
    // DB
    patchListField(listsLS[orderListEditZus]._id, newInputVal, newTime);

    setIsOpen(false);
    setTrySubmitEmpty(false);
    inputRef.current?.setSelectionRange(0, 0);
    inputRef.current?.blur();
  };

  return (
    <>
      <section className={cssListName.container}>
        <div
          className={
            cssListName.listName +
            ' ' +
            (page == 'le' ? cssListName.listNameOn : cssListName.listNameOff)
          }
        >
          {dataZus[orderListEditZus].listName}
        </div>
        <div
          className={
            cssListName.btnContainer + ' ' + (page == 'le' ? cssListName.btnOn : cssListName.btnOff)
          }
        >
          <Btn parrent='le' type='editListName' hndlr={hndlrListEdit} />
        </div>
      </section>
      <PopInput
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        oldInputVal={dataZus[orderListEditZus].listName}
        newInputVal={newInputVal}
        setNewInputVal={setNewInputVal}
        hndlrSubmit={hndlrSubmit}
        trySubmitEmpty={trySubmitEmpty}
        setTrySubmitEmpty={setTrySubmitEmpty}
        placeholderText='Enter the list name'
      />
    </>
  );
}
