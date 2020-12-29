import attribute from './attribute-cli.js';

const signup = document.getElementById('signup');

const signup_btn = document.getElementById('signup-btn');
signup_btn.addEventListener('click', () => attribute(signup, '/signup/check-signup', 'POST'));

const main_page = document.getElementById('main-page');
main_page.addEventListener('click', () => attribute(signup, '/signup/main-page', 'GET'));
