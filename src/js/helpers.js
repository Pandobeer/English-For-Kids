export const shuffleArray = (array) => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  return shuffledArray;
};

export const hideElements = (...args) => {
  for (let i = 0; i < args.length; i += 1) {
    args[i].classList.add('visually-hidden');
  }
};

export const showElements = (...args) => {
  for (let i = 0; i < args.length; i += 1) {
    args[i].classList.remove('visually-hidden');
  }
};

export const sortAlphabet = (array, key) => array.sort((a, b) => ((a[key] > b[key]) ? 1 : -1));

export const sortReverse = (array, key) => array.sort((b, a) => ((a[key] > b[key]) ? 1 : -1));

export const createInitialStat = () => ({
  correct: 0,
  errors: 0,
  trained: 0,
  percent: 0,
});

export const getDifficultWords = (array) => {
  const sortedArr = sortReverse(array, 'errors');
  return sortedArr.slice(0, 8).filter((item) => item.errors > 0);
};
