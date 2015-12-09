var app = angular.module('uclaApp', ['ngRoute']);

app.controller('welcomeController', function ($scope, $http){
    $http.get('/')
    .success(function (data) {
    })
    .error(function () {

    });
});

app.controller('resultsController', function ($scope, $http){
    $http.get('/startups')
    .success(function (data) {
        $scope.results = data;
    })
    .error(function () {

    });
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'welcome.html',
            controller: "welcomeController"
        })
        .when('/startups', {
          templateUrl: 'results.html',
          controller: "resultsController"
        })
});
