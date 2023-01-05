var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeController'
    })
    .when('/about', {
      templateUrl: 'about.html',
      controller: 'AboutController'
    })
    .when('/contact', {
      templateUrl: 'contact.html',
      controller: 'ContactController'
    })
    .otherwise({redirectTo: '/'});
});

app.controller('HomeController', function($scope) {
  $scope.message = 'Welcome to the homepage!';
});

app.controller('AboutController', function($scope, $http) {
  $http.get('https://itzmmohit.github.io/Lab_7/data.json')
    .success(function(response)
    {
      $scope.data=response.records;
    });
});

app.controller('myctrl', function($scope, $http) {
  $http.get('https://itzmmohit.github.io/Lab_7/data.json').then(function (response) {
      $scope.datas = response.data;
  });


})

app.controller('ContactController', function($scope, $http) {
  $http.get('https://itzmmohit.github.io/Lab_7/data.json')
    .success(function(response)
    {
      $scope.data=response.records;
    });
  
});

app.controller('myctrl', function ($scope, $http) {
            
  $http.get('https://itzmmohit.github.io/Lab_7/data.json').then(function (response) {
      $scope.datas = response.data;
  });

  $scope.rowLimit = 6;
  $scope.limit = 6;

  $scope.order = "";
  $scope.genderCase = "uppercase";
  $scope.search = "";


  $scope.setTitle = function () {
      if($scope.order === "title") {
          $scope.order = "-title";
          return;
      }
      $scope.order = "title";
  }

  $scope.setAge = function () {
      if($scope.order === "age") {
          $scope.order = "-age";
          return;
      }
      $scope.order = "age";
  }

  $scope.setGenre = function () {
      if($scope.order === "genre") {
          $scope.order = "-genre";
          return;
      }
      $scope.order = "genre";
  }

  $scope.setVD = function () {
      if($scope.order === "video_date") {
          $scope.order = "-video_date";
          return;
      }
      $scope.order = "video_date";
  }

  $scope.setUpDate = function () {
      if($scope.order === "UpDate") {
          $scope.order = "-UpDate";
          return;
      }
      $scope.order = "UpDate";
  }

  $scope.setCur = function () {
      if($scope.order === "orVal") {
          $scope.order = "-orVal";
          return;
      }
      $scope.order = "orVal";
  }

  $scope.setSt = function () {
      if($scope.order === "orSt") {
          $scope.order = "-orSt";
          return;
      }
      $scope.order = "orSt";
  }
})
.filter('inrValue', InrFilter)
.filter('findAge', AgeFinder);

function InrFilter (){
  return function (input) {
      input = input * 86.88;
      input = "₹" + String(input.toFixed(2));
      return input;
  };
}

function AgeFinder () {
  return function (input) {
      var birth = input.split("-");
      var year = birth[0];
      var month = birth[1];
      var date = birth[2];

      var da = new Date(year, month, date);

      var diff_ms = Date.now() - da.getTime();
      var age_dt = new Date(diff_ms); 
  
      return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
}

