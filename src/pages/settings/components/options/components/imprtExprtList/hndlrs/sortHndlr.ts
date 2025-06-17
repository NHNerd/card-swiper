export const sortHndlr = (
  listSorted: any,
  setListSorted: React.Dispatch<React.SetStateAction<any>>,
  sortText: 'a-z ↓' | 'z-a ↑' | 'time ↓' | 'time ↑',
  setSortText: React.Dispatch<React.SetStateAction<'a-z ↓' | 'z-a ↑' | 'time ↓' | 'time ↑'>>
) => {
  const freshList = [...listSorted];

  if (sortText === 'a-z ↓') {
    setSortText('z-a ↑');
    setListSorted(freshList.sort((a, b) => b.listName.toLowerCase().localeCompare(a.listName.toLowerCase())));
  } else if (sortText === 'z-a ↑') {
    setSortText('time ↓');
    console.log('⌚ need to add time create in the listModel');
  } else if (sortText === 'time ↓') {
    setSortText('time ↑');
    console.log('⌚ need to add time create in the listModel');
  } else if (sortText === 'time ↑') {
    setSortText('a-z ↓');
    setListSorted(freshList.sort((a, b) => a.listName.toLowerCase().localeCompare(b.listName.toLowerCase())));
  }
};
