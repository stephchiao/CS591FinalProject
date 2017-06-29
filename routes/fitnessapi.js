// requests for wger api

const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
  var request = require("request");

  var options = { method: 'GET',
      url: 'https://wger.de/api/v2/exercise/?muscles=1&equipment=3&status=2',
      data:
          {
              // "language": "english",
              "workout": "https://wger.de/api/v2/workout/"
          },
      headers:
          {   'Accept': 'application/json',
              'Authorization': 'Token 2ad21287cf437ece551ef9f862afe0bb00692046',
              'content-type': 'application/x-www-form-urlencoded',
              'postman-token': '03668367-a131-cd34-90b0-84146066742a',
              'cache-control': 'no-cache' }

  };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);


        // res.send(body);
        myData = JSON.parse(body);

        res.send(myData.results);

    });

});

router.post('/posting', function (req, res, next) {


    res.send(req.body)

})



module.exports = router