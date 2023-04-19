import state from './state';
import {
  categories,
  toggleInput,
  main,
  start,
  stars,
  cards,
  statisticsToggle,
  statisticsDelete,
  statisticsBody,
  statisticsHeader,
  statisticsPractice,
  statistics,
  headerTitle,
} from './elements';
import Category from './Category';
import cardData from './data';
import {
  playWord, removeClassFromElements, createCards, refreshStatus, resetGame,
} from './functions';
import {
  shuffleArray,
  sortAlphabet,
  sortReverse,
  getDifficultWords,
  hideElements,
} from './helpers';
import Card from './Card';
import {
  closeStatistics,
  createStatistics,
  openStatistics,
  getStatistics,
} from './statistics';

toggleInput.addEventListener('click', (evt) => {
  if (evt.target.checked) {
    state.mode = 'play';
    main.classList.add('play');

    if (!state.isCategory) {
      main.classList.add('play-game');
      start.classList.remove('visually-hidden');
      start.classList.add('start-button');
      stars.classList.remove('visually-hidden');
    }
  } else {
    refreshStatus();
    removeClassFromElements('inactive');
  }
});

start.addEventListener('click', () => {
  if (start.classList.contains('start-button')) {
    state.cards = shuffleArray(cardData[state.currentCategoryIndex].cards);
    const shuffledCards = shuffleArray(cardData[state.currentCategoryIndex].cards);
    createCards(shuffledCards, Card);
    start.classList.remove('start-button');
    start.classList.add('repeat-button');
  }
  state.isGameStarted = true;
  playWord(state.counter);
});

statisticsToggle.addEventListener('click', (evt) => {
  if (start) {
    hideElements(start, stars);
  }
  if (evt.target.classList.contains('opened')) {
    closeStatistics();
    resetGame();
  } else {
    getStatistics();
    openStatistics();
    createStatistics();
  }
});

statisticsDelete.addEventListener('click', () => {
  localStorage.clear();
  getStatistics();
  createStatistics();
});

statisticsHeader.addEventListener('click', (evt) => {
  statisticsBody.innerHTML = '';
  const sortByKey = evt.target.id.split('-')[2]; // ['sort', 'by', 'index']

  if (evt.target.classList.contains('alphabet')) {
    state.statistic = sortReverse(state.statistic, sortByKey);
  } else {
    state.statistic = sortAlphabet(state.statistic, sortByKey);
  }

  evt.target.classList.toggle('alphabet');

  createStatistics();
});

statisticsPractice.addEventListener('click', () => {
  const diffWords = getDifficultWords(state.statistic);
  hideElements(statistics);
  state.studyWords = true;
  if (diffWords.length > 0) {
    state.mode = 'play';
    state.isCategory = false;
    cards.innerHTML = '';
    headerTitle.innerHTML = 'Train difficult words';
    main.classList.add('play');
    createCards(diffWords, Card);
  } else {
    const textStatistics = document.createElement('span');
    main.appendChild(textStatistics);
    textStatistics.innerHTML = `
        <span class="text--difficult">Great! You know all words!</span>
      `;
    setTimeout(() => {
      resetGame();
      hideElements(textStatistics);
    }, 3000);
    closeStatistics();
    refreshStatus();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  cardData.forEach((categoryObject, index) => {
    const category = new Category(categoryObject, index).createCategory();
    categories.appendChild(category);
  });
});
