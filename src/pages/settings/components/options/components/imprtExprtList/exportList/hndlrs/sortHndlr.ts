export type SortType = 'X ⇅' | 'a-z ↓' | 'z-a ↑' | 'time ↓' | 'time ↑';

export const sortHndlr = (
  listSorted: any,
  setListSorted: React.Dispatch<React.SetStateAction<any>>,
  sortText: SortType,
  setSortText: React.Dispatch<React.SetStateAction<SortType>>,
  listNoSorted: any
) => {
  const freshList = [...listSorted];

  if (sortText === 'X ⇅') {
    setSortText('a-z ↓');
    setListSorted(freshList.sort((a, b) => a.listName.toLowerCase().localeCompare(b.listName.toLowerCase())));
  } else if (sortText === 'a-z ↓') {
    setSortText('z-a ↑');
    setListSorted(freshList.sort((a, b) => b.listName.toLowerCase().localeCompare(a.listName.toLowerCase())));
  } else if (sortText === 'z-a ↑') {
    setSortText('time ↓');
    setListSorted(freshList.sort((a, b) => b?.createDate?.utcMS - a?.createDate?.utcMS));
  } else if (sortText === 'time ↓') {
    setSortText('time ↑');
    setListSorted(freshList.sort((a, b) => a?.createDate?.utcMS - b?.createDate?.utcMS));
  } else if (sortText === 'time ↑') {
    setSortText('X ⇅');
    setListSorted(listNoSorted);
  }
};
