const express = require('express');
const path = require('path');
const passport = require('passport');
const Todo = require('../models/todo');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        //const {id, todo} = req.body;
        // console.log(req.sessionID, req.user);
        //console.log(req.user, req.body.todo);
        const id = req.user.id;
        const todo = req.body.todo;
        const list = await Todo.create({
            commenter: id,
            comment: todo,
        });
        //res.send('hi');
        res.status(201).json(list);
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;