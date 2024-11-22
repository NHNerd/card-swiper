const hndlrRemoveList = (data: any, listOrder: number) => {
  //? create array copy
  const newData = [...data];
  //? listOrder - array index, 1 - count deliting elemets (mutation)
  const removedList = newData.splice(listOrder, 1);
  const updateOrder = new Date().toISOString();
  for (let i = listOrder; i < newData.length; i++) {
    newData[i].order -= 1;
  }
  for (let i = 0; i < newData.length; i++) {
    //? ISO 8601 (0 UTC - Z)
    newData[i].updateOrder = updateOrder;
  }

  return [newData, removedList[0], updateOrder];
};

export default hndlrRemoveList;
