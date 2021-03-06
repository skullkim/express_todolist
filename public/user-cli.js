import attribute from './attribute-cli.js';
const user = document.getElementById('user');

const main = document.getElementById('main-page');
main.addEventListener('click', () => {
    user.setAttribute('action', '/');
    user.setAttribute('method', 'GET');
});

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    attribute(user, '/login/logout', 'POST');
});

const todo = document.getElementById('todo');
todo.addEventListener('click', () => {
    attribute(user, '/login/todo', 'POST');
})
