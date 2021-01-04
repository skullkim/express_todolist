import attribute from './attribute-cli.js';

window.onload = () => {
    const param = (new URL(location.href)).searchParams;
    const error_param = param.get('error');
    const success_param = param.get('success');
    if(error_param) alert(error_param);
    else if(success_param) alert(success_param);
}

const response = document.getElementById('login');

const login = document.getElementById('login-btn');
login.addEventListener('click', () => attribute(response, '/login', 'POST'));

const signup = document.getElementById('signup-btn');
signup.addEventListener('click', () => attribute(response, '/signup', 'GET'));

const my_page = document.getElementById('my-page');
my_page.addEventListener('click', () => attribute(response, '/login/mypage', 'GET'));


