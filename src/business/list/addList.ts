//TODO change order all lists
//TODO set correct value in client - change creating logic in server

export const addList = (listName: string) => {
  const allLists = JSON.parse(localStorage.getItem('allLists'));

  if (allLists && allLists.some((item) => item.listName === listName)) {
    console.log('List: "' + listName + '" already exists!');
    return null;
  }

  allLists.map((item) => {
    item.order = item.order + 1;
  });

  //? ISO 8601 (0 UTC - Z)
  const newTime = new Date().toISOString();

  const newList = {
    listName,
    gameCount: 12,
    order: 0,
    updateGameCount: newTime,
    updateListName: newTime,
    updateOrder: newTime,
    notUpdated: true,
  };
  allLists.unshift(newList);

  localStorage.setItem('allLists', JSON.stringify(allLists));

  return allLists;
};

export const refreshLSAterDB = (newList: any, allLists: any[]) => {
  delete newList.notUpdated;
  allLists[0] = newList;

  localStorage.setItem('allLists', JSON.stringify(allLists));
  return allLists;
};
