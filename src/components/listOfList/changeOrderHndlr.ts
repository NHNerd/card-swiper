export const changeOrderHndlr = (props: any) => {
  if (props.listDetails.order === 0) return;

  // delete user choisen element
  const delited = props.dataZus.splice(props.listDetails.order, 1);
  // set order 0 oreder for this element
  delited[0][1].order = 0;

  // new order for all elements
  const dataNew = [];
  for (let i = 0; i < props.dataZus.length; i++) {
    dataNew.push(props.dataZus[i]);
    props.dataZus[i][1].order = i + 1;
  }

  // Add choisen element to start
  dataNew.unshift(...delited);

  props.setDataZus(dataNew);
};
