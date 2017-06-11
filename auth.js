const express = require('express')
const router = express.Router()

//Connect to user database
const User = require('./User')

//Use Passport for authentication - this version uses a local mongo collection
//via passport-local

const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy

//For this simple strategy, we just check the username and (plain text) password.
//If they match, passport calls req.login() and the user ID is placed on the session
//in passport.serializeUser()
//
//Set up an options doc for the strategy. Note: Passing req to passport is NOT well documented; it is briefly mentioned
//in the description of the Twitter strategy
const passportOptions = {
    passReqToCallback: true,
    failureFlash: true}

passport.use(new LocalStrategy(passportOptions,
    function (req, username, password, done) {
        //nb Need to use findOne, since find returns an array
        User.findOne({username: username}).exec()
            .then(function (user) {
                if (!user || (password !== user.password)) {
                    return done(null, false, req.flash('message', 'Incorrect user or pass!'))
                }
                else {
                    return done(null, user, req.flash('message', 'Welcome!'))
                }
            })
            .catch(function (err) {
                console.log(err)
            })
    }
))

passport.serializeUser(function (user, done) {
    console.log('in serialize, setting id on session:', user.id)
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    console.log('in deserialize')
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/login',
//        failureFlash     : true,
//        passReqToCallback: true
    })
)

router.get('/login', function (req, res, next) {
    console.log(req.flash('error'))
    res.render('login', {message: req.flash('message')})
})
router.get('/success', function (req, res, next) {
    res.redirect('/')
})

router.get('/logout', function(req, res, next) {
    req.logOut()
    res.redirect('/')
})
module.exports = router