const express = require('express');
const path = require('path');
const passport = require('passport');
const Todo = require('../models/todo');
const connection = require('./mysql');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const id = req.user.id;
        const todo = req.body.todo;
        const alreay_had = await Todo.findOne({
            where: {comment: todo},
        });
        if(alreay_had === null){
            const list = await Todo.create({
                commenter: id,
                comment: todo,
            });
            console.log(list);
            res.send(JSON.stringify({todo: list}));
        }
        else{
            res.send(JSON.stringify({todo: null}));
        }
       
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
    });
    res.send(JSON.stringify({ len: lists.length, todo: lists }));
})

router.put('/edit', (req, res, next) => {
    const prev_todo = req.body;
    connection.connect();
    let a = req.body;
    console.log(req.body);
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
    console.log(req.body);
    const {todo_id, checked} = req.body;
    console.log(todo_id, checked);
    Todo.update({done: checked}, {where: {id: todo_id}})
        .then(result => res.send())
        .catch(err => {
            console.log(err);
            next(err);
        });
    res.send();
});
module.exports = router;