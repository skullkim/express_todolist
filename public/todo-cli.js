
const createBtn = (type, attribute, value) => {
    const btn = document.createElement('input');
    btn.setAttribute('type', type);
    if(value !== null){
        btn.setAttribute(attribute, value);
    }
    return btn;
}

const createTodo = (lists, i) => {
    const row = document.createElement('tr');
    let td = document.createElement('td');
    const row_data = (i !== null) ? lists.todo[i] : lists.todo;
    //load whole lists
    td.textContent = row_data.comment;
    //console.log(row_data.done);
    row.appendChild(td);
    //add edit btn
    const edit = createBtn('submit', 'value', 'edit');
    edit.addEventListener('click', async () => {
        const new_todo = prompt('input new todo');
        console.log(new_todo);
        const change = new XMLHttpRequest();
        change.open('PUT', '/todo/edit');
        const todo_id = edit.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
        console.log(todo_id);
        const req_todo = {
            todo_id,
            new_todo,
        };
        change.setRequestHeader('Content-Type', 'application/json');
        change.send(JSON.stringify(req_todo));
        change.addEventListener('load', () => {
            edit.parentElement.querySelector('td').textContent = new_todo;
        })
    });
    td = document.createElement('td');
    td.appendChild(edit);
    row.appendChild(edit);
    //add delete btn
    const del = createBtn('submit', 'value', 'delete');
    del.addEventListener('click', async () => {
        const erase = new XMLHttpRequest();
        erase.open('DELETE', '/todo/delete');
        const todo_id = del.nextElementSibling.nextElementSibling.textContent;
        const req_del = {todo_id};
        erase.setRequestHeader('Content-Type', 'application/json');
        erase.send(JSON.stringify(req_del));
        erase.addEventListener('load', () => {});
        //delete a todo row in html
        const useless_tag = del.parentNode;
        useless_tag.parentNode.removeChild(useless_tag);
        console.log(useless_tag);
    })
    td = document.createElement('td');
    td.append(del);
    row.append(del);
    //add checkbox
    const done = createBtn('checkbox', 'checked', null);
    done.addEventListener('click', () => {
        //console.log('done');
        const finish = new XMLHttpRequest();
        let checked;
        finish.open('PUT', '/todo/done');
        if(done.hasAttribute('checked')){
            checked = false;
            done.removeAttribute('checked');
        }
        else{
            checked = true;
            done.setAttribute('checked', 'true');
        }
        const todo_id = edit.nextElementSibling.nextElementSibling.textContent;
        console.log(todo_id, checked);
        const req_done = {
            todo_id,
            checked,
        };
        finish.setRequestHeader('Content-Type', 'application/json');
        finish.send(JSON.stringify(req_done));
        finish.addEventListener('load', () => {});
    });
    if(row_data.done){
        done.setAttribute('checked', 'true');
    }
    td.appendChild(done);
    row.appendChild(td);
    //todo id
    td = document.createElement('td');
    td.className = "user-id";
    td.innerText = row_data.id;
    //td.innerText = lists.todo[i].id;
    row.appendChild(td);
    return row;
}

window.onload = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/todo/showlist');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.addEventListener('load', () => {
        const lists = JSON.parse(xhr.responseText);
        console.log(JSON.parse(xhr.responseText));
        const tbody = document.querySelector('#todo-list');
        for(let i = 0; i < lists.todo.length; i++){
            tbody.appendChild(createTodo(lists, i));
        }
    });
}

const todo = document.getElementById('todo-form');
const todo_context = document.getElementById('todo');
const submit = document.getElementById('post');
submit.addEventListener('click', () => {
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
        if(list.todo !== null){
            tbody.appendChild(createTodo(list, null));
        }
        else{
            alert('same todo exist');
        }
    })
});