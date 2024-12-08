// Full comapare
// You can find imgs alghorithms in doc.

// O(n * m + n log n)
// n — array size listsLS или listsDB (зависит от контекста).
// m — another array size (example, listsDB for filter).

const compare = async (getAllLists, removeMany, refreshOrdersSync, addSync, refreshFieldsSync) => {
  const dateStart = Date.now();
  const listsLS = await JSON.parse(localStorage.getItem('card-swiper:allLists'));
  const listsDB = await getAllLists(localStorage.getItem('card-swiper:userId'));
  const removedLists: any[] | null = JSON.parse(localStorage.getItem('card-swiper:removedLists'));

  console.log('-_'.repeat(6), ' sync start ', '-_'.repeat(6));

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

  const removedListsSet = new Set(removedLists?.map((item) => item._id));
  // console.log(removedListsSet.size);
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
      needRefreshDBFields[i] = LS_sameDB[i];
      // console.log(
      //   LS_sameDB[i][fieldName],
      //   ': ',
      //   LS_sameDB[i][fieldUpdate],
      //   ' | ',
      //   DB_sameLS[i][fieldName],
      //   ': ',
      //   DB_sameLS[i][fieldUpdate]
      // );
    } else if (LS_sameDB[i][fieldUpdate] < DB_sameLS[i][fieldUpdate]) {
      freshFields[i][fieldUpdate] = DB_sameLS[i][fieldUpdate];
      freshFields[i][fieldName] = DB_sameLS[i][fieldName];

      needRefreshLSFlag = true;
    }
  };

  let biggestOrderUpdate = '0001-11-21T10:07:28.526Z';
  let fresh_orders_LS_or_DB: string | false = false;
  const DTOupdateDB_allOrder: any[] = [];
  for (let i = 0; i < LS_sameDB.length; i++) {
    // console.log('DB_sameLS: ', DB_sameLS[i].updateOrder, 'LS_sameDB: ', LS_sameDB[i].updateOrder);
    if (DB_sameLS[i].updateOrder !== LS_sameDB[i].updateOrder) {
      if (DB_sameLS[i].updateOrder > biggestOrderUpdate) {
        biggestOrderUpdate = DB_sameLS[i].updateOrder;
        fresh_orders_LS_or_DB = 'DB';
      }
      if (LS_sameDB[i].updateOrder > biggestOrderUpdate) {
        biggestOrderUpdate = LS_sameDB[i].updateOrder;
        fresh_orders_LS_or_DB = 'LS';
      }
    }
  }

  for (let i = 0; i < LS_sameDB.length; i++) {
    if (fresh_orders_LS_or_DB === 'LS') {
      // refresh all orders in DB by LS with biggest update(each)
      DTOupdateDB_allOrder.push({
        _id: LS_sameDB[i]._id,
        order: LS_sameDB[i].order,
        updateOrder: biggestOrderUpdate,
      });
    } else if (fresh_orders_LS_or_DB === 'DB') {
      // refresh all orders in LS by DB with biggest update(each)
      freshFields[i].updateOrder = biggestOrderUpdate;
      freshFields[i].order = DB_sameLS[i].order;
    }

    getFreshField('updateGameCount', 'gameCount', i);
    getFreshField('updateListName', 'listName', i);

    if (!needRefreshDBFields[i]) needRefreshDBFields.splice(i, 1);
  }
  needRefreshDBFields = needRefreshDBFields.filter((item) => item !== null);
  //---------------------------------------------------------------------
  //* Fields action
  let updateDB_allOrders_success = false;
  if (fresh_orders_LS_or_DB === 'LS') {
    console.log('updateDB_allOrders_DTO: ', DTOupdateDB_allOrder);
    updateDB_allOrders_success = await refreshOrdersSync(DTOupdateDB_allOrder);
    if (updateDB_allOrders_success) {
      if (lsAddToDB.length > 0) {
        freshFields.push(...lsAddToDB);
      }
    }
    // Update LS all oreders by biggest data
  } else if (fresh_orders_LS_or_DB === 'DB') {
    console.log('freshFields: all orders now freshes: ', freshFields);
  }

  if (needRefreshDBFields.length > 0) {
    //* OK
    // I make all field couse i tired :) !!!
    console.log('Fresh fields: need update DB: ', needRefreshDBFields);
    refreshFieldsSync(needRefreshDBFields);
  }
  if (needRefreshLSFlag) {
    //* OK
    console.log('Fresh fields: need update LS: ', freshFields, '- replece ls by this');
  }

  //* Object action
  if (dbDelete.length > 0) {
    //* OK
    console.log('Object(s): To Delete in DB:', dbDelete);
    const _id = dbDelete.map((list) => list._id);
    removeMany(_id);
  }
  if (dbAddToLS.length > 0) {
    console.log('Object(s): To Add to LS:', dbAddToLS);
    //* OK
    freshFields.push(...dbAddToLS);
  }
  let lsAddToDB_success = false;
  if (lsAddToDB.length > 0) {
    //* OK
    console.log('Object(s): To Add to DB:', lsAddToDB);
    lsAddToDB_success = await addSync(lsAddToDB);

    freshFields.push(...lsAddToDB);
  }

  if (lsAddToDB_success || updateDB_allOrders_success) {
    freshFields.map((list) => {
      list.updateOrder = biggestOrderUpdate;
      if (lsAddToDB_success) delete list?.notUpdated;
    });
  }

  // After all conditons 1 LS update
  if (fresh_orders_LS_or_DB || lsAddToDB_success || dbAddToLS) {
    freshFields.sort((a, b) => a.order - b.order);
    freshFields.map((list, i) => {
      console.log(LS_sameDB[i]);
      list.order = i;
      // Fresh order for db
      if (LS_sameDB[i]) {
        DTOupdateDB_allOrder.push({
          _id: LS_sameDB[i]._id,
          order: LS_sameDB[i].order,
          updateOrder: LS_sameDB[i].updateOrder,
        });
      }
    });
    localStorage.setItem('card-swiper:allLists', JSON.stringify(freshFields));
  }

  if (lsDelete.length > 0) {
    console.log('Object(s): To Delete in LS:', lsDelete);
    // Fresh order for db after delete list(s)
    await refreshOrdersSync(DTOupdateDB_allOrder);
  }

  const dateEnd = Date.now();
  console.log('-_'.repeat(5), ' sync end ', (dateEnd - dateStart) / 1000, 's.', '-_'.repeat(5));

  return true;
};

export default compare;
