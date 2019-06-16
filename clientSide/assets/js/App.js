var myApp = angular.module('myApp', ["ngRoute"]);

// config routes
myApp.config(function($routeProvider)  {
    $routeProvider
        // homepage
        // .when('/', {
        //     // this is a template
        //     template: '<h1>This is the default route</h1>'
        // })
        // login
        .when('/login', {
            // this is a template url
            templateUrl: 'login.html',
            controller : 'loginController as loginCtrl'
        })
        // poi
        .when('/signup', {
            templateUrl: 'signup.html',
            controller : 'signupController as signupCtrl'
        })
        // .when('/httpRequest', {
        //     templateUrl: 'pages/http/request.html',
        //     controller : 'httpController as httpCtrl'
        // })
        // other
        .otherwise({ redirectTo: '/' });
});

myApp.controller("mainController", function($scope){
     
    $scope.
    console.log($scope);
    
});