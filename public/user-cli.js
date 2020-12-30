import attribute from './attribute-cli.js';
const user = document.getElementById('user');

const main = document.getElementById('main-page');
main.addEventListener('click', () => {
    user.setAttribute('action', '/');
    user.setAttribute('method', 'GET');
    //attribute(main, '/', 'GET');
    //console.log(location.href);
});

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    attribute(user, '/login/logout', 'POST');
});
