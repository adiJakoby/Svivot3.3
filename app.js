let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            templateUrl: 'pages/home/home.html',
            controller : 'homeController as homeCtrl'
        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // log in
        .when('/logIn', {
            // this is a template url
            templateUrl: 'pages/logIn/logIn.html',
            controller : 'logInController as logInCtrl'
        })
        // poi
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        .when('/httpRequest', {
            templateUrl: 'pages/http/request.html',
            controller : 'httpController as httpCtrl'
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as registerCtrl'
        })
        .when('/restorePassword', {
            templateUrl: 'pages/restorePassword/restorePassword.html',
            controller : 'restorePasswordController as restorePasswordCtrl'
        })
        .when('/searchPOI', {
            templateUrl: 'pages/searchPOI/searchPOI.html',
            controller : 'searchPOIController as searchPOICtrl'
        })
        .when('/loggedIn', {
            templateUrl: 'pages/loggedIn/loggedIn.html',
            controller : 'loggedInController as loggedInPOICtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });
});
