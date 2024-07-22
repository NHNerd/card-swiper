import { putRefreshOrders } from '../axios/list';

async function listsOrderRefresh(data) {
  const allListsOld = JSON.parse(localStorage.getItem('allLists'));
  const allListsNew = [];

  let lstsLength: number = data.length - 1;
  for (let i = 0; i < data.length; i++) {
    for (let ii = 0; ii <= lstsLength; ii++) {
      if (data[i].listName === allListsOld[ii].listName) {
        allListsOld[ii].order = i;
        allListsNew.push(allListsOld[ii]);
        allListsOld.splice(ii, 1);
        lstsLength -= 1;

        break;
      }
    }
  }

  // refresh localstorage
  localStorage.setItem('allLists', JSON.stringify(allListsNew));

  // refresh BD
  putRefreshOrders(allListsNew);
}

export default listsOrderRefresh;
