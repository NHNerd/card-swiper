import { putRefreshOrders } from '../../axios/list';

async function listsOrderRefresh(data) {
  const allListsOld = JSON.parse(localStorage.getItem('card-swiper:allLists'));
  if (!allListsOld) {
    console.log(`You don't have lsits`);
    return;
  }
  const allListsNew = [];

  let lstsLength: number = data.length - 1;
  for (let i = 0; i < data.length; i++) {
    for (let ii = 0; ii <= lstsLength; ii++) {
      if (data[i].listName === allListsOld[ii].listName) {
        allListsOld[ii].order = i;
        //? ISO 8601 (0 UTC - Z)
        allListsOld[ii].updateOrder = new Date().toISOString();

        allListsNew.push(allListsOld[ii]);
        allListsOld.splice(ii, 1);
        lstsLength -= 1;

        break;
      }
    }
  }

  // refresh localstorage
  localStorage.setItem('card-swiper:allLists', JSON.stringify(allListsNew));
  // refresh DB
  putRefreshOrders(allListsNew);
}

export default listsOrderRefresh;
