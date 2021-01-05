const express = require('express');
const path = require('path');


const router = express.Router();


router.get('/', (req, res, next) => {
    try{
        res.sendFile(path.join(__dirname, "../views/index.html"));
        //res.render('index.html', {csrfToken: req.csrfToken()});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;