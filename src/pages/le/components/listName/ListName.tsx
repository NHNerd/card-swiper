import cssListName from './ListName.module.css';
import { useUiState } from '../../../../zustand';

type Props = {};

export default function ListName({}: Props) {
  const { page } = useUiState();

  return (
    <div
      className={
        cssListName.listName + ' ' + (page == 'le' ? cssListName.listNameOn : cssListName.listNameOff)
      }
    >
      List Name
    </div>
  );
}
