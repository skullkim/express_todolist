//import attribute from './attribute-cli.js'
const todo = document.getElementById('todo-form');

const submit = document.getElementById('post');
submit.addEventListener('click', () => {
    todo.setAttribute('action', '/todo');
    todo.setAttribute('method', 'POST');
    // attribute(todo, 'action', '/postTodo');
    // attribute(todo, 'method', 'POST');
});
