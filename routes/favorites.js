// contains requests for accessing mongo database

const express = require('express')
const router = express.Router()

//Helper for authorization
const authorized = require('./authCheck')

const mongoose = require('mongoose')
if (!mongoose.connection.db) {
    mongoose.connect('mongodb://localhost/cs591')
}
const db = mongoose.connection
const Schema = mongoose.Schema
const recipeSchema = new Schema({
    title      : String,
    ID         : Number,
    calories   : Number
})
const recipe = mongoose.model('recipe',  recipeSchema)


// POST Create recipe in favorites (only available to logged in users)
router.post('/db', authorized, function (req, res, next) {
    aRecipe = new recipe(
        req.body
    )
    aRecipe.save(function (err) {
        if (err) {
            res.send(err)
        }
        //send back the new person
        else {
            res.send(aRecipe)
        }
    })
})


// GET Fetch all recipes in favorites
router.get('/db', function (req, res, next) {
    recipe.find({}, function (err, results) {
        res.json(results)
    })
})

// //GET Fetch all users
// router.get('/db', function (req, res, next) {
//     people.find({}, function (err, results) {
//         res.json(results)
//     })
//
// })

/*
 //GET Fetch single user, match /users/db/Frank
 router.get('/db/:_id', function (req, res, next) {
 people.find({_id: req.param('_id')}, function (err, results) {
 res.json(results);
 });
 });
 */

router.get('/db/:name', function (req, res, next) {
    findByName(req.params.name)
        .then(function (status) {
            res.json(status)
        })
        .catch(function (status) {
            res.json(status)

        })
})

//PUT Update the specified user's name
router.put('/db/:_id', function (req, res, next) {
    people.findByIdAndUpdate(req.params._id, req.body, {'upsert': 'true'}, function (err, result) {
        if (err) {
            res.json({message: 'Error updating'})
        }
        else {
            console.log('updated')
            res.json({message: 'success'})
        }

    })

})




//DELETE Delete the specified user
router.delete('/db/:_id', function (req, res, next) {
    console.log("deleting");
    recipe.findByIdAndRemove(req.params._id, function (err, result) {
        if (err) {
            console.log('error deleting!!');
            res.json({message: 'Error deleting'})
        }
        else {
            console.log("success!!");
            res.json({message: 'success'})
        }
    })
})


let findByName = function (checkName) {
    return new Promise(function (resolve, reject) {
        people.find({name: checkName}, function (err, results) {
            console.log(results, results.length)
            if (results.length > 0) {
                resolve({found: results})
            }
            else {
                reject({found: false})
            }
//    return ( (results.length  > 0) ? results : false)
        })
    })
}

module.exports = router

//TODO Route to log out (req.logout())