import state from './state';
import { playWord, endGame } from './functions';
import createStar from './star';
import starAudio from '../assets/sound/effects/star.wav';
import errorAudio from '../assets/sound/effects/error.wav';
import { createInitialStat } from './helpers';

class Card {
  constructor(obj) {
    this.name = obj.name;
    this.image = obj.image;
    this.translation = obj.translation;
    this.audio = obj.audio;
  }

  setCounter() {
    const isCorrect = this.name === state.cards[state.counter].name;
    const wordStat = JSON.parse(localStorage.getItem(this.name)) || createInitialStat();

    createStar(isCorrect);

    if (isCorrect) {
      this.card.classList.add('inactive');
      const audio = new Audio(starAudio);
      audio.play();
      state.counter += 1;
      wordStat.correct += 1;
    } else {
      state.wrongAnswers += 1;
      wordStat.errors += 1;
      const audio = new Audio(errorAudio);
      audio.play();
    }

    wordStat.percent = Math.trunc((wordStat.correct * 100)
      / (wordStat.errors + wordStat.correct)) || 0;
    localStorage.setItem(this.name, JSON.stringify(wordStat));
  }

  createCard() {
    this.card = document.createElement('div');
    this.card.classList.add('card');

    this.card.innerHTML = `
    <div class="card__front">
      <img class="card__img" src="${this.image}" alt="${this.name}" width="150" height="150">
      <span class="card__word">${this.name}</span>
      <button class="card__flip-btn" type="button"></button>
    </div >

      <div class="card__back">
        <img class="card__img" src="${this.image}" alt="${this.name}" width="150" height="150">
        <span class="card__word">${this.translation}</span>
      </div>
    `;

    const btnFlip = this.card.querySelector('.card__flip-btn');

    btnFlip.addEventListener('click', () => {
      if (state.mode === 'train') {
        this.card.classList.add('flipped');
      }
    });

    this.card.addEventListener('mouseleave', () => {
      this.card.classList.remove('flipped');
    });

    const cardAudio = new Audio(this.audio);

    this.card.addEventListener('click', (evt) => {
      if (evt.target !== btnFlip && state.mode === 'train' && !this.card.classList.contains('flipped')) {
        cardAudio.play();
        const wordStat = JSON.parse(localStorage.getItem(this.name)) || createInitialStat();
        wordStat.trained += 1;
        localStorage.setItem(this.name, JSON.stringify(wordStat));
      }

      if (state.isGameStarted) {
        this.setCounter();

        if (state.counter >= state.cards.length) {
          endGame();
        } else {
          playWord(state.counter);
        }
      }
    });

    return this.card;
  }
}

export default Card;
