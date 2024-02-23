const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const defaultRoutes = require('./routes.js');
require('dotenv').config()

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{console.log('Connected to DB ');})
.catch((err)=>{console.log(err);})

const app = express();

//ejs template
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cookie parser 
app.use(cookieParser())

//session 
app.use(session({
    secret:'adfasdf',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge:60000*15}
}))

//passport configuration
app.use(passport.initialize())
app.use(passport.session())
require('./passport.google.js')

//save user serilization
app.get('*',(req,res,next)=>{
    console.log(req.user);
    res.locals.user = req.user || null
    next()
})

//routes manegment
app.use('/',defaultRoutes)

//404 page
app.get((req,res)=>{
    res.status(404).send('page not found')
})

app.listen(process.env.PORT,()=>{
    console.log('listening on port',process.env.PORT);
})