angular.module('cs411', ['ngRoute', 'ngCookies'])

    .controller('cs411ctrl', function ($scope, $http, $cookies) {


        //CREATE (POST)
        $scope.createUser = function () {
            if ($scope.dbID) {
                $scope.updateUser($scope.dbID)
            }
            else {
                const request = {
                    method: 'post',
                    url: 'http://localhost:3000/api/db',
                    data: {
                        name: $scope.name,
                        UID: $scope.UID,
                        department: $scope.department
                    }
                }
                $http(request)
                    .then(function (response) {
                            $scope.inputForm.$setPristine()
                            $scope.name = $scope.UID = $scope.department = ''
                            $scope.getUsers()
                            console.log(response)
                        },
                        function (error) {
                            if (error.status === 401) {
                                $scope.authorized = false
                                $scope.h2message = "Not authorized to add "
                                console.log(error)
                            }
                        }
                    )
            }
        }

        //CREATE (POST): create favorite in database
        $scope.createFavorite = function (recipe) {
            const request = {
                method: 'post',
                url: 'http://localhost:3000/favorites/db',
                data: {
                    title: recipe.title,
                    ID: recipe.id,
                    calories: recipe.calories
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.inputForm.$setPristine()
                        $scope.title = $scope.id = $scope.calories = ''
                        $scope.getFavorites()
                        console.log(response)
                    },
                    function (error) {
                        if (error.status === 401) {
                            $scope.authorized = false
                            $scope.h2message = "Must be logged in to add to favorites"
                            console.log(error)
                        }
                    }
                )
            // }
        }

        //DELETE (DELETE) from favorites
        $scope.deleteFavorite = function (_id) {

            const request = {
                method: 'delete',
                url: 'http://localhost:3000/favorites/db/' + _id,
            }
            $http(request)
                .then(function (response) {
                        $scope.inputForm.$setPristine()
                        $scope.title = $scope.id = $scope.calories = ''
                        $scope.getFavorites()
                    }
                )
        }

        //READ (GET)
        $scope.getUsers = function () {
            $http.get('http://localhost:3000/api/db')
                .then(function (response) {
                    $scope.users = response.data

                })
        }

        //READ (GET) show updated list of favorites
        $scope.getFavorites = function () {
            $http.get('http://localhost:3000/favorites/db')
                .then(function (response) {
                    $scope.favorites = response.data

                })
        }


        //UPDATE (PUT)
        $scope.setUserUpdate = function (user) {
            $scope.buttonMessage = "Update User"
            $scope.h2message = "Updating "
            $scope.name = user.name
            $scope.UID = user.UID
            $scope.dbID = user._id
            $scope.department = user.department

        }
        $scope.updateUser = function (userID) {
            const request = {
                method: 'put',
                url: 'http://localhost:3000/api/db/' + userID,
                data: {
                    name: $scope.name,
                    UID: $scope.UID,
                    department: $scope.department,
                    _id: userID
                }
            }
            $http(request)
                .then(function (response) {
                    $scope.inputForm.$setPristine()
                    $scope.name = $scope.UID = $scope.department = ''
                    $scope.h2message = "Add user"
                    $scope.buttonMessage = "Add User"
                    $scope.getUsers()
                    $scope.dbID = null
                })

        }

        //DELETE (DELETE)
        $scope.deleteUser = function (_id) {

            const request = {
                method: 'delete',
                url: 'http://localhost:3000/api/db/' + _id,
            }
            $http(request)
                .then(function (response) {
                        $scope.inputForm.$setPristine()
                        $scope.name = $scope.UID = $scope.department = ''
                        $scope.getUsers()
                    }
                )
        }


        // $scope.addToFavorites = function (recipe) {
        //     const request = {
        //         method: 'post',
        //         url: 'http://localhost:3000/api/db/'
        //     }
        // }

        /*  $scope.getAuth = function () {
         const request = {
         method: 'get',
         url: 'http://localhost:3000/api/db/auth'
         }
         $http.request(request)
         .then(function (err, response) {
         if (err) {
         $scope.authorized = false
         }

         else {
         $scope.authorized = true
         }
         })

         */
        $scope.initApp = function () {
            $scope.buttonState = "create"
            $scope.h2message = "Add user"
            $scope.buttonMessage = "Add User"
            $scope.authorized = false
            $scope.showLogin = false
            $scope.getUsers()
//            $scope.getAuth()
            //Grab cookies if present
            let authCookie = $cookies.get('authStatus')
            $scope.authorized = !!authCookie
        }

        $scope.logout = function () {
            $http.get('/auth/logout')
                .then(function (response) {
                    $scope.authorized = false
                })
        }
        $scope.login = function () {
            const request = {
                method: 'post',
                url: 'http://localhost:3000/auth/login',
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (err) {
                        $scope.authorized = false
                    }
                )
        }

        $scope.register = function () {

            const request = {
                method: 'post',
                url: '/auth/register',
                data: {
                    name: $scope.name,
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (error) {
                        if (error.status === 401) {
                            $scope.authorized = false
                            $scope.h2message = "Error registering"
                            console.log(error)
                        }
                    }
                )
        }

        $scope.showLoginForm = function () {
            $scope.showLogin = true
        }

        $scope.doTwitterAuth = function () {
            console.log('going to /auth/twitter 1');
            var openUrl = '/auth/twitter/'
            //Total hack, this:
            $scope.authorized = true
            window.location.replace(openUrl)
            console.log('going to /auth/twitter 2');
        }

        $scope.doGoogleAuth = function () {
            var openUrl = '/auth/google/'
            //Total hack, this:
            $scope.authorized = true
            window.location.replace(openUrl)

        }

        // GET for recipe search and exercises
        $scope.searchRecipe = function () {

            const request = {
                method: 'get',
                url: '/google/',
                data: {
                    name: $scope.name,
                    username: $scope.username,
                    password: $scope.password
                },
                params: {
                    searched: $scope.searchItem
                }
            }
            $http(request)
                .then(function (response) {
                    $scope.recipes = response.data
                    console.log($scope.recipes)
                })

            $http.get('/fitness')
                .then(function (response) {
                    $scope.exercises = response.data
                    console.log($scope.exercises)
                })


            return $scope.recipes
        }

        console.log($scope.searchItem);

        // show recipes
        $scope.recipeList = function () {


            $scope.title = recipe.title;
            $scope.id = recipe.id;
            $scope.calories = recipe.calories;


        }

        // show favorites
        $scope.getFavorites()

        // show workouts
        $scope.workoutList = function () {
            $scope.exerciseName = exercise.name;
        }
    })

    //Configure internal routes
    //
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'components/about.html',
            })

            .when('/BU', {
                templateUrl: 'components/BU.html',
                controller: 'BUController'
            })

            .otherwise({
                redirectTo: '/'
            })
    }])

    .controller('authController', function ($scope, $location) {

        let authStatus = $location.search()
        console.log(authStatus)
        console.log('In authController')
        $scope.authorized = !!authStatus

    })
    .controller('BUController', function ($scope) {
            $scope.message = "You MUSTgive money to the alumni fund!"
        }
    )


    //This controller handles toggling the display of details in the user list
    .controller('listController', function ($scope) {
        $scope.display = false

        $scope.showInfo = function () {
            $scope.display = !$scope.display
        }
    })
