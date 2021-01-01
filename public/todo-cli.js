window.onload = () => {
    const xhr = new XMLHttpRequest();
    //xhr.responseType = "json";
    xhr.open('GET', '/todo/showlist');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.addEventListener('load', () => {
        //console.log(xhr.responseText, 1);
        const lists = JSON.parse(xhr.responseText);
        console.log(JSON.parse(xhr.responseText));
        const tbody = document.querySelector('#todo-list');
        for(let i = 0; i < lists.todo.length; i++){
            const row = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = lists.todo[i].comment;
            row.appendChild(td);
            //add edit btn
            const edit = document.createElement('input');
            edit.setAttribute('value', 'edit');
            edit.setAttribute('type', 'submit');
            edit.addEventListener('click', () => {
                console.log('edit');
            });
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(edit);
            //add checkbox
            const done = document.createElement('input');
            done.setAttribute('type', 'checkbox');
            done.addEventListener('click', () => {
                console.log('done');
            });
            td.appendChild(done);
            row.appendChild(td);
            tbody.appendChild(row);
        }
    });
}

//import attribute from './attribute-cli.js'
const todo = document.getElementById('todo-form');
const todo_context = document.getElementById('todo');
const submit = document.getElementById('post');
submit.addEventListener('click', () => {
    console.log(11111);
    let data = {'todo': todo_context.value}; 
    data = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/todo');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(data);
    const tbody = document.querySelector('#todo-list');
    xhr.addEventListener('load', () => {
        console.log(xhr.responseText);
        const list = JSON.parse(xhr.responseText);
        const row = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = list.todo.comment;
        row.appendChild(td);
        tbody.appendChild(row);
        const edit = document.createElement('input');
        edit.setAttribute('value', 'edit');
        edit.setAttribute('type', 'submit');
        edit.addEventListener('click', () => {
            console.log('edit');
        });
        td = document.createElement('td');
        td.appendChild(edit);
        row.appendChild(edit);
        //add checkbox
        const done = document.createElement('input');
        done.setAttribute('type', 'checkbox');
        done.addEventListener('click', () => {
            console.log('done');
        });
        td.appendChild(done);
        row.appendChild(td);
        tbody.appendChild(row);
    })
    // todo.setAttribute('action', '/todo');
    // todo.setAttribute('method', 'POST');
});

async function getTodo(id){
    try{
        const res = await axios.get(`/users/%{id}/comments`);
        const comments = res.data;
        const tbody = document.querySelector('#comment-list tbody');
        tobody.innerHTML = '';
        comments.map(function(todo){
            const row = document.createElement('tr');
            let td = codument.createElement('td');
            td.textContent = todo.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = todo.User.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = todo.comment;
            row.appendChild(td);
            const edit = document.createElement('button');
            edit.textContent = 'edit';
            edit.addEventListener('click', async () =>{
                const newTodo = prompt('input new todo');
                if(!newTodo){
                    return alter('You have to input new todo');
                }
                try{
                    await axios.patch(`/comments/${comment.id}`, {comment: newTodo});
                    getTodo(id);
                }
                catch(err){
                    console.error(err);
                }
            });
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
            td = document.createElement('td');
            td.appendChild(remove);
            row.appendChild(td);
            tbody.appendChild(row);
        })
    }
    catch(err){
        console.error(err);
    }
}