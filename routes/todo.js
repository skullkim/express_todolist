const express = require('express');
const path = require('path');
const passport = require('passport');
const Todo = require('../models/todo');
const connection = require('./mysql');
const sanitize = require('sanitize-html');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const id = req.user.id;
        //const todo = req.body.todo;
        //console.log(req.body);
        const {todo, order} = req.body;
        //const {todo1, order} = req.body;
        console.log(todo, order);
        sanitize(id);
        sanitize(todo);
        const list = await Todo.create({
            commenter: id,
            comment: todo,
            order,
        });
        res.send(JSON.stringify({todo: list}));
       
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/showlist', async (req, res, next) => {
    const id = req.user.id;
    const lists = await Todo.findAll({
        where: {commenter: id},
        order: ['order'],
    });
    res.send(JSON.stringify({ len: lists.length, todo: lists }));
})

router.put('/edit', (req, res, next) => {
    const prev_todo = req.body;
    connection.connect();
    let a = req.body;
    connection.query(
        `UPDATE todo SET comment="${a.new_todo}" WHERE id=${a.todo_id}`,
        (err, results, fields) => {
            console.log(err);
            //results contains rows returned by server
            console.log(results);
            //fields contains extra meta data about results, if available
            console.log(fields);
        }
    )
    res.send();
})

router.delete('/delete', (req, res, next) => {
    const id = req.body.todo_id;
    Todo.destroy({where: {id}});
    res.send();
})

router.put('/done', (req, res, next) => {
    //const json = JSON.parse(req.body);
    const {todo_id, checked} = req.body;
    sanitize(todo_id);
    sanitize(checked);
    Todo.update({done: checked}, {where: {id: todo_id}})
        .then(result => res.send())
        .catch(err => {
            console.log(err);
            next(err);
        });
    //res.send();
});

router.put('/order', async (req, res, next) => {
    try{
        const {
            prev_id,
            prev_order, 
            new_id,
            new_order,
        } = req.body;
        console.log(prev_id, prev_order, new_id, new_order);
        await Todo.update({order: new_order}, {where: {id: prev_id}});
        await Todo.update({order: prev_order}, {where: {id: new_id}});
        res.send();
    }
    catch(err){
        console.log(err);
    }
    
});
module.exports = router;