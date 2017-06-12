//Get a router instance
const express = require('express')
const router = express.Router()

//Grab configs for Twitter
const twitterConfig = require('../config/twitter')

//Connect to user database
//No reason not to use the crypto version of the user model
const User = require('../models/UserWithCrypto')

//Set up an options doc for the strategy. Note: Passing req to passport is NOT well documented; it is briefly mentioned
//in the description of the Twitter strategy.

const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const passportOptions = {
    passReqToCallback: true,
    consumerKey: twitterConfig.CONSUMER_KEY,
    consumerSecret: twitterConfig.CONSUMER_SECRET,
    callbackURL: twitterConfig.CALLBACK_URL
}

//Once authenticated, Twitter will pass back tokens and the user's Twitter profile,
//which we will use as a key in the database
//NOTE: The mongoose model has a plugin, findOrCreate, that simplifies the logic of this operation
//
passport.use(new TwitterStrategy(passportOptions,
    function (token, tokenSecret, profile, done) {
        /*       User.findOrCreate({twitterID: profile.id}).exec()
         .then(function (err, user) {
         return (done(err, user))
         })
         .catch(function (err) {
         //This is a db error, not a 'not found'
         console.log(err)
         })
         })*/
        return done(null, profile)
    }
))

passport.serializeUser(function (user, done) {
    console.log('in serialize, setting id on session:', user.id)
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    console.log('in deserialize with id', id)
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/login',
    })
)

router.get('/login', function (req, res, next) {
    console.log(req.flash('error'))
    res.render('login', {message: req.flash('message')})
})
router.get('/success', function (req, res, next) {
    res.redirect('/')
})

router.get('/logout', function (req, res, next) {
    req.logOut()
    res.status = 401
    res.redirect('/')
})

router.post('/register', function (req, res, next) {
    let user = new User({
        'username': req.body.username,
        'name': req.body.name
    })
    user.setPassword(req.body.password)
    user.save()
        .then(function (err, result) {
            res.redirect('/')
        })
        .catch(function (err, result) {
            res.send({message: 'Error in save', error: err})
        })
})
router.get('/register', function (req, res, next) {
    res.render('register')
})

//Step 1
router.get('/twitter',
    passport.authenticate('twitter'));

//Step 2
router.get('/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });


module.exports = router