const express = require('express');
const path = require('path');
const passport = require('passport');
const Todo = require('../models/todo');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const id = req.user.id;
        const todo = req.body.todo;
        const list = await Todo.create({
            commenter: id,
            comment: todo,
        });
        console.log(list);
        // res.end();
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
    });
    console.log(lists.length);
    //res.writeHead(200, {'Content-Type': 'application/json'});
    res.send(JSON.stringify({ len: lists.length, todo: lists }));
})

module.exports = router;