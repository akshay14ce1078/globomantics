const express = require('express');
const sessionData = require('../data/sessions.json'); 
const debug = require('debug')('app:sessionRouter');
const {MongoClient, ObjectId} = require('mongodb');
const speakerServices = require('../services/speakerServices.js');

const sessionRouter = express.Router();

sessionRouter.use((req,res, next)=>{
    if(req.user){
        next();
    }else {
        res.redirect('/auth/signIn');
    }
})

sessionRouter.route('/')
    .get((req,res) => {
        const url = 'mongodb+srv://dbUser:9LPnBOLMO9J7Gr0t@globomantics.qtrvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        const dbName = 'globomantics';
        (async function (){
            let client;
            try{
                client = await MongoClient.connect(url);
                debug('Connected to the Mongo DB');

                const db = client.db(dbName);

                const dbResponseForSessions = await db.collection('session').find().toArray()

                res.render('sessions',{data:dbResponseForSessions});

            }catch(err){
                debug(err.stack);
            }
        }())

    });

sessionRouter.route('/:id')
    .get((req,res) => {
        const id = req.params.id;
        const url = 'mongodb+srv://dbUser:9LPnBOLMO9J7Gr0t@globomantics.qtrvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        const dbName = 'globomantics';
        (async function (){
            let client;
            try{
                client = await MongoClient.connect(url);
                debug('Connected to the Mongo DB'+ id);

                const db = client.db(dbName);

                const dbResponseForSession = await db.collection('session').findOne({_id: new ObjectId(id)});

                const apiResponse = await speakerServices.getSpeakerById(dbResponseForSession.speakers[0].id);

                dbResponseForSession.speaker = apiResponse.data;

                res.render('sessionDetails',{session:dbResponseForSession});

            }catch(err){
                debug(err.stack);
            }
        }())
    });

module.exports = sessionRouter;