import { cards, headerTitle, main } from './elements';
import state from './state';
import { createCards } from './functions';
import Card from './Card';
import { showElements } from './helpers';

class Category {
  constructor(obj, index) {
    this.name = obj.name;
    this.image = obj.image;
    this.cards = obj.cards;
    this.index = index;
  }

  createCategory() {
    const category = document.createElement('div');
    category.classList.add('category');

    category.innerHTML = `
        <img class="category__img" src="${this.image}" alt="${this.name}" width="150" height="150">
        <span class="category__word">${this.name}</span>
      `;

    state.isCategory = true;

    category.addEventListener('click', () => {
      createCards(this.cards, Card);
      showElements(cards);
      headerTitle.innerHTML = `${this.name}`;
      state.currentCategoryIndex = this.index;

      if (state.mode === 'play') {
        main.classList.add('play-game');
      } else {
        main.classList.remove('play-game');
      }
    });

    return category;
  }
}

export default Category;
