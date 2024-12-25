const sotByRatio = (item) => {
  return item.sort((a, b) => {
    const getRatio = (item) => {
      const aIsOne = item.wrong === 1 ? 1 : 0;
      return item.wrong === 0 ? item.correct : item.correct / item.wrong - aIsOne;
    };

    const aRatio = getRatio(a);
    const bRatio = getRatio(b);

    if (aRatio === bRatio) return a.correct + a.wrong - (b.correct + b.wrong);
    else return aRatio - bRatio;
  });
};

export default sotByRatio;
