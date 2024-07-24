//? Trash

export const onMouseDown = (e: MouseEvent, isClicked, setCoordsDown) => {
  isClicked.current = true;

  setCoordsDown({ x: e.clientX, y: e.clientY });

  console.log('onMouseDown = ' + e.clientX);
};

export const onMouseUp = (e: MouseEvent, isClicked, setCardCurrentPosPrev) => {
  isClicked.current = false;

  setCardCurrentPosPrev({ x: e.clientX, y: e.clientY });
  console.log('onMouseUp = ' + e.clientX);
};

export const onMouseMove = (e: MouseEvent, setCardCurrentPos) => {
  setCardCurrentPos({ x: e.clientX, y: e.clientY });
  // console.log('onMouseMove = ' + e.clientX);
};
