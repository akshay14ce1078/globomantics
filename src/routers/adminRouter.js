const express = require('express');
const debug = require('debug')('app:adminRouter');
const {MongoClient} = require('mongodb');
const sessionData = require('../data/sessions.json'); 

const adminRouter = express.Router();

adminRouter.route('/').get((req, res)=>{
    const url = 'mongodb+srv://dbUser:9LPnBOLMO9J7Gr0t@globomantics.qtrvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            debug('Connected to the Mongo DB');

            const db = client.db(dbName);

            const dbResponse = await db.collection('session').insertMany(sessionData);

            res.json(dbResponse);

        }catch(err){
            debug(err.stack);
        }
    }())
})

module.exports = adminRouter;