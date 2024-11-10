//TODO change order all lists
//TODO set correct value in client - change creating logic in server

const addList = (listName: string) => {
  const allLists = JSON.parse(localStorage.getItem('allLists'));

  if (allLists)
    allLists.map((item) => {
      if (item.listName === listName) {
        console.log('List: ' + listName + ' already exist!');
        return;
      }
    });

  allLists.map((item) => {
    item.order = item.order + 1;
  });

  const newList = { gameCount: 12, listName: listName, order: 0 };
  allLists.unshift(newList);

  console.log(allLists);
  localStorage.setItem('allLists', JSON.stringify(allLists));

  return allLists;
};

export default addList;

// const allListsId: [] = [];
// allLists.map((list) => {
//   const listId = list._id;
//   const listName = list.listName;
//   const order = list.order;
//   const wordCount = 0;
//   const gameCount = list.gameCount;
//   const words: [] = [];

//   data.push({ listId, listName, order, wordCount, gameCount, words });
