export const listStatisticLS = () => {
  const allLists = JSON.parse(localStorage.getItem('card-swiper:allLists'));

  allLists[0].sessionCount ? (allLists[0].sessionCount += 1) : (allLists[0].sessionCount = 1);

  localStorage.setItem('card-swiper:allLists', JSON.stringify(allLists));

  // DTO for DB
  const listDTO = { _id: allLists[0]._id, sessionCount: allLists[0].sessionCount };

  return [listDTO];
};
