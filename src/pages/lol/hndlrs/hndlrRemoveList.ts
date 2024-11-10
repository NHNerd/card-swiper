const hndlrRemoveList = (data, listOrder: number) => {
  //? create array copy
  const newData = [...data];
  const removedList = newData.splice(listOrder, 1);
  for (let i = listOrder; i < newData.length; i++) {
    newData[i].order -= 1;
  }

  return [newData, removedList];
};

export default hndlrRemoveList;
