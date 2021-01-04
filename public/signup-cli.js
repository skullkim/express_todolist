import attribute from './attribute-cli.js';

window.onload = () => {
    const param = (new URL(location.href)).searchParams;
    const error_param = param.get('error');
    if(error_param) alert(error_param);
}

const signup = document.getElementById('signup');

const signup_btn = document.getElementById('signup-btn');
signup_btn.addEventListener('click', () => attribute(signup, '/signup/check-signup', 'POST'));

const main_page = document.getElementById('main-page');
main_page.addEventListener('click', () => attribute(signup, '/signup/main-page', 'GET'));

const my_page = document.getElementById('my-page');
my_page.addEventListener('click', () => attribute(signup, '/login/mypage'))