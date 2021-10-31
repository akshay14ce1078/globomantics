const passport  =  require('passport');
const  {Strategy} = require('passport-local');
const {MongoClient} = require('mongodb')

module.exports = function localStrategy () {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    },(username, password, done) => {
        const url = 'mongodb+srv://dbUser:9LPnBOLMO9J7Gr0t@globomantics.qtrvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        const dbName = 'globomantics';

        (async function validateUser (){
            let client ;
            try{
                client = await MongoClient.connect(url);
                const db = client.db(dbName);
                const user = await db.collection('users').findOne({username})
                
                if(user && user.password === password) {
                    done(null, user);
                }else {
                    done(null, false);
                }
            } catch(error){
                done(error, false);
            }
        }())

    }))
}