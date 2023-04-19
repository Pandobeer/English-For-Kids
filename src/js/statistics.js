import { getAllWords } from './functions';
import cardData from './data';
import {
  statisticsBody,
  totalCorrect,
  totalErrors,
  totalTrained,
  categories,
  statistics,
  toggleInput,
  statisticsDelete,
  statisticsPractice,
  statisticsToggle,
  cards,
} from './elements';
import {
  createInitialStat,
  hideElements, showElements,
} from './helpers';
import state from './state';

export const getStatistics = () => {
  const words = getAllWords(cardData);

  state.statistic = words.map((wordObj, index) => {
    const jsonData = localStorage.getItem(wordObj.name);
    const statData = jsonData ? JSON.parse(jsonData) : createInitialStat();

    return ({
      ...wordObj, // contain category, name, translation
      ...statData, // contain errors, correct, percent
      index,
    });
  });
};

export const createStatistics = () => {
  const total = createInitialStat();

  state.statistic.forEach((obj) => {
    total.trained += obj.trained;
    total.correct += obj.correct;
    total.errors += obj.errors;

    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${obj.index + 1}</td>
            <td>${obj.category}</td>
            <td>${obj.name}</td>
            <td>${obj.translation}</td>
            <td>${obj.trained}</td>
            <td>${obj.correct}</td>
            <td>${obj.errors}</td>
            <td>${obj.percent}</td>
        `;
    statisticsBody.appendChild(row);
  });

  totalTrained.textContent = total.trained;
  totalCorrect.textContent = total.correct;
  totalErrors.textContent = total.errors;
};

export const openStatistics = () => {
  hideElements(categories, toggleInput.parentElement);
  cards.innerHTML = '';
  showElements(statistics, statisticsDelete, statisticsPractice);
  statisticsToggle.classList.add('opened');
  state.isCategory = false;
};

export const closeStatistics = () => {
  statisticsBody.innerHTML = '';
  hideElements(statistics, statisticsDelete, statisticsPractice);
  showElements(toggleInput.parentElement);
  statisticsToggle.classList.remove('opened');
};
