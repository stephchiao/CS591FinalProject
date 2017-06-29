// contains requests for spoonacular api

const express = require('express')
const router = express.Router()

// get recipes
router.get('/', function (req, res, next) {

    console.log("printing body");
    // console.log(req);
    console.log(req.query);
    console.log(req.query.searched);
    var searchItem = req.query.searched;

    var unirest = require('unirest');

    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&limitLicense=false&maxCalories=1000&number=10&offset=0&query=" + searchItem + "&ranking=1&type=main+course")
        .header("X-Mashape-Key", "ugVe80ZLetmshQiBcCAxQyQSY0Mtp130wMMjsnd4ONMmiGHiyE")
        .header("Accept", "application/json")
        .end(function (result) {

            var listOfRecipes = [];
            for (var i = 0; i < result.body.results.length; i++) {
                var item = result.body.results[i];
                var id = item.id;
                var title = item.title;
                var calories = item.calories;
                listOfRecipes.push({id: id, title: title, calories: calories});
            }
            res.send(listOfRecipes);

        });


})


// router.post('/posting', function (req, res, next) {
//     res.send(req.body)
// })



module.exports = router