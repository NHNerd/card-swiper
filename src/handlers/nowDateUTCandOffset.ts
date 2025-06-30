const nowDateUTCandOffset = () => {
  const dateNow: Date = new Date();
  const createDate = { utcMS: dateNow.getTime(), utcOffsetMS: dateNow.getTimezoneOffset() * 60 * 1000 };
  return createDate;
};

export default nowDateUTCandOffset;
