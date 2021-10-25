const express = require('express');
const sessionData = require('../data/sessions.json'); 

const sessionRouter = express.Router();

sessionRouter.route('/')
    .get((req,res) => {
        res.render('sessions', {
            data:sessionData
        })
    });

sessionRouter.route('/:id')
    .get((req,res) => {
        const id = req.params.id
        res.render('sessionDetails',{session: sessionData[id]});
    });

module.exports = sessionRouter;