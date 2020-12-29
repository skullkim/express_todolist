import attribute from './attribute-cli.js';
const user = document.getElementById('user');

const main = document.getElementById('main-page');
main.addEventListener('click', () => attribute(main, '/', 'GET'));
