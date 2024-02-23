const express = require("express");
const router = express.Router();
const User = require('./User.js');
const passport = require('passport');
const isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    console.log('not authenticated');
    res.redirect('/');
}
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
    });
})
router.get('/logout',(req,res) => {
    req.logout((err)=>{
        console.log(err);
    });
    res.send('logout successfully')
})
router.get('/success', (req, res) => {
    res.render('success')
})
router.get('/failure', (req, res) => {
    res.render('failure')
})

router.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile'],
        prompt: 'select_account',
    }
    ));
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/failure'
    }));



module.exports = router