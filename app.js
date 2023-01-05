(function () {
    'use strict';

    angular.module('myApp', ["ngRoute"])

        .controller('HomeController', function($scope) {
            $scope.message = 'Welcome to the homepage!';
        })

        .controller('MyController', function ($scope, $http) {
            $http.get('http://localhost:3000/data').then(function (response) {
                $scope.datas = response.data
            })

            $scope.order = "";
            $scope.genderCase = "uppercase";


            $scope.setName = function () {
                if ($scope.order === "name") {
                    $scope.order = "-name";
                    return;
                }
                $scope.order = "name";
            }

            $scope.setAge = function () {
                if ($scope.order === "age") {
                    $scope.order = "-age";
                    return;
                }
                $scope.order = "age";
            }

            $scope.setGender = function () {
                if ($scope.order === "gender") {
                    $scope.order = "-gender";
                    return;
                }
                $scope.order = "gender";
            }

            $scope.setDob = function () {
                if ($scope.order === "date") {
                    $scope.order = "-date";
                    return;
                }
                $scope.order = "date";
            }

            $scope.setTrDate = function () {
                if ($scope.order === "trDate") {
                    $scope.order = "-trDate";
                    return;
                }
                $scope.order = "trDate";
            }

            $scope.setCur = function () {
                if ($scope.order === "orVal") {
                    $scope.order = "-orVal";
                    return;
                }
                $scope.order = "orVal";
            }

            $scope.setSt = function () {
                if ($scope.order === "orSt") {
                    $scope.order = "-orSt";
                    return;
                }
                $scope.order = "orSt";
            }
        })

        .controller('createController', function ($scope) {
            $scope.createEntry = function () {
                fetch('http://localhost:3000/data')
                .then(resp => resp.json())
                .then(res => {
                    var dataArray = JSON.stringify(res)
                    var trDate = String(new Date($scope.trDate).getFullYear()) + "-" + (new Date($scope.trDate).getMonth() < 9 ? "0" : "") + String(new Date($scope.trDate).getMonth()+1) + "-" + (new Date($scope.trDate).getDate() < 10 ? "0" : "") + String(new Date($scope.trDate).getDate())
                    var date = String(new Date($scope.date).getFullYear()) + "-" + (new Date($scope.date).getMonth() < 9 ? "0" : "") + String(new Date($scope.date).getMonth()+1) + "-" + (new Date($scope.date).getDate() < 10 ? "0" : "") +String(new Date($scope.date).getDate())
                    var newData = "{\"trDate\":\""+trDate+"\", \"name\":\""+$scope.name+"\", \"gender\":\""+$scope.gender+"\", \"date\":\""+date+"\", \"orVal\":\""+$scope.orVal+"\", \"orSt\":\""+$scope.orSt+"\"}";
                    console.log(newData)
                    var newJSON = dataArray.split(']')[0]+"," + newData
                    var jsonObj = newJSON+"]"
                    console.log(JSON.parse(jsonObj))

                    fetch('http://localhost:3000/new', {
                        method: "POST",
                        body: jsonObj,
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    .then(response => response.json()) 
                    .then(json => console.log(json))
                    .catch(err => console.log(err))

                })
            };
        })

        .controller('deleteController', function ($scope, $http) {
            $http.get('http://localhost:3000/data').then(function (response) {
                $scope.datas = response.data
            })
            $scope.deleteEntry = function () {
                console.log($scope.del.name)
                var delName = $scope.del.name
                fetch('http://localhost:3000/data')
                .then(resp => resp.json())
                .then(data => {
                    var found = false
                    var newJson = []
                    for (var i=0; i<data.length; i++){
                        var eachData = data[i]
                        if (eachData['name'] != delName) {
                            newJson.push(eachData)
                        }
                        else if (eachData['name'] == delName && found) {
                            newJson.push(eachData)
                        }
                        else {
                            found = true
                        }
                    }
                    var k = JSON.stringify(newJson).replace('"',`\"`)
                    fetch('http://localhost:3000/new', {
                        method: "POST",
                        body: k,
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    .then(response => response.json()) 
                    .then(json => console.log(json))
                    .catch(err => console.log(err))
                })
            }
        })

        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "view.html"
                })
                .when('/home', {
                    templateUrl: 'home.html',
                    controller: 'HomeController'
                })
                .when("/create", {
                    templateUrl: "create.html",
                    controller: "createController"
                })
                .when("/update", {
                    templateUrl: "update.html",
                    controller: "updateController"
                })
                .when("/delete", {
                    templateUrl: "delete.html",
                    controller: "deleteController"
                });
        })
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('');
        }])
})();