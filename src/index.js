import './scss/style.scss';

// if (process.env.NODE_ENV === 'production') {
//   console.log('Production mode');
// } else if (process.env.NODE_ENV === 'development') {
//   console.log('Development mode');
// }

const navButton = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

navButton.onclick = function () {
  navButton.classList.toggle('navigation__button--opened');
  navList.classList.toggle('navigation__list--opened');
}
