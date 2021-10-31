const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport =  require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const PORT = process.env.PORT
const app = express();
const sessionRouter = require('./src/routers/sessionsRouter.js');
const adminRouter = require('./src/routers/adminRouter.js');
const authRouter = require('./src/routers/authRouter.js');

// middlewares
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'globomantics'}));


// configuring passport in our express app
require('./src/config/passport.js')(app)

// registering routers in express app
app.use('/sessions', sessionRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter)


// setting view template engine to ejs and it's path
app.set('views','./src/views');
app.set('view engine','ejs');

// default page is serverd, when request is for landing page i.e. host:port_number
app.get('/',(req, res)=>{
    res.render('index',{title:'Globomantics',data:['a','b','c']});
});

// configure express app to listen on PORT
app.listen(PORT,() => {
    debug(`listining to port ${chalk.green(PORT)}`);
});