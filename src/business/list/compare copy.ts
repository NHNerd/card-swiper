// Full comapare
// You can find imgs alghorithms in doc.

// O(n * m + n log n)
// n — array size listsLS или listsDB (зависит от контекста).
// m — another array size (example, listsDB for filter).

const compare = async (getAllLists, removeMany) => {
  const listsLS = JSON.parse(localStorage.getItem('allLists'));
  const listsDB = await getAllLists(localStorage.getItem('userId'));
  const removedLists: any[] | null = JSON.parse(localStorage.getItem('removedLists'));

  console.log('-_'.repeat(10), ' sync start ', '-_'.repeat(10));

  //---------------------------------------------------------------------
  //* Work with object
  const lsAddToDB: any[] = [];
  const lsDelete = listsLS.filter(
    (lsItem: any) =>
      !listsDB.some((dbItem: any, index: any) => {
        if (lsItem.notUpdated && !index) lsAddToDB.push(lsItem);
        else if (!lsItem.notUpdated) return dbItem._id === lsItem._id;
        else return true;
      })
  );

  const removedListsSet = new Set(removedLists.map((item) => item._id));
  const { dbDelete, dbAddToLS } = listsDB.reduce(
    (result: any, dbItem: any) => {
      const isInLS = listsLS.some((lsItem: any) => lsItem._id === dbItem._id);
      if (!isInLS) {
        if (removedListsSet.has(dbItem._id)) {
          result.dbDelete.push(dbItem);
        } else {
          result.dbAddToLS.push(dbItem);
        }
      }
      return result;
    },
    { dbDelete: [], dbAddToLS: [] } //? Start  value
  );

  //---------------------------------------------------------------------
  //* Work with object fields
  const allUniqueIds = new Set([
    ...lsAddToDB.map((item: any) => item._id),
    ...lsDelete.map((item: any) => item._id),
    ...dbDelete.map((item: any) => item._id),
    ...dbAddToLS.map((item: any) => item._id),
  ]);

  const sortById = (arr: any) => arr.sort((a: any, b: any) => (a._id > b._id ? 1 : -1));
  // Фильтруем listsLS и listsDB, исключая объекты с ID из allUniqueIds и оборачиваем в func-sortById
  const LS_sameDB: any[] = sortById(listsLS.filter((item) => !allUniqueIds.has(item._id)));
  const DB_sameLS: any[] = sortById(listsDB.filter((item) => !allUniqueIds.has(item._id)));

  let needRefreshDBFields: any[] = [];
  let needRefreshLSFlag: Boolean = false;
  const freshFields = [...LS_sameDB];

  const getFreshField = (fieldUpdate: string, fieldName: string, i: number) => {
    if (LS_sameDB[i][fieldUpdate] > DB_sameLS[i][fieldUpdate]) {
      needRefreshDBFields[i] = DB_sameLS[i];
    } else if (LS_sameDB[i][fieldUpdate] < DB_sameLS[i][fieldUpdate]) {
      freshFields[i][fieldUpdate] = DB_sameLS[i][fieldUpdate];
      freshFields[i][fieldName] = DB_sameLS[i][fieldName];

      needRefreshLSFlag = true;
    }
  };

  for (let i = 0; i < LS_sameDB.length; i++) {
    getFreshField('updateGameCount', 'gameCount', i);
    getFreshField('updateListName', 'listName', i);
    getFreshField('updateOrder', 'order', i);

    if (!needRefreshDBFields[i]) needRefreshDBFields.splice(i, 1);
  }
  needRefreshDBFields = needRefreshDBFields.filter((item) => item !== null);
  //---------------------------------------------------------------------
  //* Fields action

  if (needRefreshDBFields.length > 0) {
    // I make all field couse i tired :) !!!
    console.log('Fresh fields: need update DB: ', needRefreshDBFields);
  }
  if (needRefreshLSFlag) {
    //* OK
    console.log('Fresh fields: need update LS: ', freshFields, '- replece ls by this');
    freshFields.push(...lsAddToDB);
    freshFields.sort((a, b) => a.order - b.order);
    localStorage.setItem('allLists', JSON.stringify(freshFields));
  }

  //* Object action
  if (dbDelete.length > 0) {
    console.log('Object(s): To Delete in DB:', dbDelete);
  }
  if (dbAddToLS.length > 0) {
    console.log('Object(s): To Add to LS:', dbAddToLS);
  }
  if (lsAddToDB.length > 0) {
    console.log('Object(s): To Add to DB:', lsAddToDB);
  }
  if (lsDelete.length > 0) {
    console.log('Object(s): To Delete in LS:', lsDelete);
  }

  console.log('-_'.repeat(10), ' sync end ', '-_'.repeat(10));

  return true;
};

export default compare;
