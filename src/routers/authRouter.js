const express= require('express');
const debug = require('debug')('app:authRouter');
const {MongoClient} = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();


authRouter.route('/signUp').post((req, res) => {
    const {username, password} =  req.body;
    const user = {username, password};
    const url = 'mongodb+srv://dbUser:9LPnBOLMO9J7Gr0t@globomantics.qtrvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const dbName = 'globomantics';

    (async function addUser() {
        let client;
        try{
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const result = await db.collection('users').insertOne(user)
            debug(result);
            req.login(result.acknowledged, () => {
                res.redirect('/auth/profile');
            })

        }catch(error){
            debug(error)
        }
        client.close();
    })()

   
});


authRouter.route('/signIn')
    .get((req, res)=>{
        res.render('signin')
    })
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
    }))

authRouter.route('/profile').get((req, res)=>{
    res.json(req.user)
})

module.exports = authRouter;