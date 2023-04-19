import {
  menu,
  gameOver,
  start,
  cards,
  stars,
  categories,
  toggleInput,
  headerTitle,
  buttonBox,
  main,
  statisticsDelete,
  statisticsPractice,
  statisticsToggle,
  statistics,
  statisticsBody,
} from './elements';
import state from './state';
import wingame from '../assets/images/wingame.png';
import lostgame from '../assets/images/lostgame.svg';
import lose from '../assets/sound/effects/lose.wav';
import won from '../assets/sound/effects/won.wav';
import { hideElements, showElements } from './helpers';

export const removeGameOver = () => {
  gameOver.classList.remove('gameover');
  gameOver.innerHTML = '';
};

export const removeClassFromElements = (className) => {
  cards.querySelectorAll(`.${className}`).forEach((card) => {
    card.classList.remove(className);
  });
};

export const addStartButton = () => {
  start.classList.add('start-button');
  start.classList.remove('repeat-button', 'visually-hidden');
};

export const createCards = (data, Card) => {
  stars.innerHTML = '';
  cards.innerHTML = '';

  categories.classList.add('visually-hidden');

  state.isCategory = false;

  if (state.mode === 'play') {
    showElements(start, stars);

    addStartButton();
  }

  data.forEach((cardObject) => {
    const card = new Card(cardObject).createCard();
    cards.appendChild(card);
  });
};

export const playWord = (index) => {
  const wordAudio = new Audio(state.cards[index].audio);

  setTimeout(() => {
    wordAudio.play();
  }, 1000);
};

export const refreshStatus = () => {
  if (statistics) {
    statisticsBody.innerHTML = '';
    hideElements(statistics, statisticsDelete, statisticsPractice);
    statisticsToggle.classList.remove('opened');
    showElements(toggleInput.parentElement);
  }

  state.mode = 'train';
  state.cards = [];
  state.counter = 0;
  state.correctAnswers = 0;
  state.wrongAnswers = 0;
  state.isGameStarted = false;
  state.studyWords = false;

  stars.innerHTML = '';
  start.classList.remove('repeat-button');
  main.classList.remove('play', 'play-game');

  hideElements(stars, start);
};

export const resetGame = () => {
  gameOver.classList.remove('gameover');
  showElements(menu, categories, buttonBox);

  headerTitle.textContent = 'English for Kids';
  toggleInput.checked = false;
  state.isCategory = true;
  refreshStatus();
};

export const endGame = () => {
  hideElements(start, stars, cards, menu, buttonBox);
  showElements(gameOver);
  gameOver.classList.add('gameover');

  if (state.wrongAnswers === 0) {
    gameOver.innerHTML = `
      <img class="gameover__img" width="300" height="250" src="${wingame}" />
      <span class="gameover__text">Perfect!</span>
      <span class="gameover__text">YOU WON</span>
    `;
    const audio = new Audio(won);
    audio.play();
  } else {
    gameOver.innerHTML = `
    <img class="gameover__img" width="300" height="250" src="${lostgame}" >
    <span class="gameover__text">Pity! You made ${state.wrongAnswers.toString()} mistakes</span>
    <span class="gameover__text">FAILURE</span>
  `;
    const audio = new Audio(lose);
    audio.play();
  }

  setTimeout(() => {
    resetGame();
    hideElements(gameOver);
  }, 4000);
};

export const getAllWords = (cardObject) => {
  const arrCardsWords = cardObject.map((categoryData) => categoryData.cards.map((cardData) => ({
    name: cardData.name,
    translation: cardData.translation,
    category: categoryData.name,
    image: cardData.image,
  }))).flat();

  return arrCardsWords;
};
