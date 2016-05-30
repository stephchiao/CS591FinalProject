#CS411
This is the code that we looked at in our Node/Express Walkthrough. Note that normally we'd exclude node_modules from 
the repository, since there are quite a few and they can be installed via `npm install`, but in this case we'll leave them
so that you can simply clone and run.
## Running
To run, first clone the repo. Start mongoDB with `mongod&`, then run the app with `npm start`.
## Branches
 - The trunk (master) implements a back-end-only API for CRUD operations a=on a simple user database using MongoDB/Mongoose.
 - _with_Angular adds some saple Angular.js code to demonstrate calling the back-end API in a controller and displaying data using ng-model (you'll need to run `bower install` to pick up the Angular dependencies 
 - _with_mocha includes a few simple mocha / chai tests of the backend API.
 
Note that you'll need to `npm install` when switching or merging branches.
