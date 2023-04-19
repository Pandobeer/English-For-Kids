import {
  categories,
  navList,
  menu,
  main,
  toggleInput,
  headerTitle, cards,
  navbar,
} from './elements';
import {
  removeGameOver, createCards, refreshStatus,
} from './functions';
import cardData from './data';
import state from './state';
import Card from './Card';

const openMenu = () => {
  navbar.classList.add('change');
  menu.classList.add('change');

  document.addEventListener('keydown', handleEscPress);
  document.addEventListener('click', handleOutsideClick, true);
};

const closeMenu = () => {
  navbar.classList.remove('change');
  menu.classList.remove('change');

  document.removeEventListener('keydown', handleEscPress);
  document.removeEventListener('click', handleOutsideClick, true);
};

const handleEscPress = (evt) => {
  if (evt.key === 'Escape') {
    closeMenu();
  }
};

const handleOutsideClick = (evt) => {
  if (evt.target !== navbar && !menu.contains(evt.target)) {
    closeMenu();
  }
};

menu.addEventListener('click', () => {
  if (menu.classList.contains('change')) {
    closeMenu();
  } else {
    openMenu();
  }
});

navList.addEventListener('click', (evt) => {
  if (evt.target.href && evt.target.href.includes('#')) {
    closeMenu();
    removeGameOver();
    refreshStatus();
    toggleInput.checked = false;

    if (evt.target.textContent === 'Main') {
      categories.classList.remove('visually-hidden');
      cards.innerHTML = '';
      state.isCategory = true;
      headerTitle.innerHTML = 'English For Kids';
    } else {
      const textContent = evt.target.textContent.toLowerCase();
      const categoryIndex = cardData.map((el) => el.name).indexOf(textContent);

      createCards(cardData[categoryIndex].cards, Card);
      state.currentCategoryIndex = categoryIndex;
      headerTitle.innerHTML = `${textContent}`;

      if (!state.isCategory) {
        main.classList.add('play-game');
      }
    }
  }
});
