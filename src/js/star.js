import starFull from '../assets/images/starfull.png';
import starEmpty from '../assets/images/starempty.png';

import { stars } from './elements';

const MAX_STARS_NUMBER = 10;

const createStar = (value) => {
  const starValue = value ? starFull : starEmpty;
  const star = document.createElement('div');
  star.classList.add('star');

  star.innerHTML = `<img class="star_img" src="${starValue}" alt="${starValue}" width="50" height="50">`;

  if (stars.children.length >= MAX_STARS_NUMBER) {
    stars.removeChild(stars.firstChild);
  }

  stars.appendChild(star);
};

export default createStar;
