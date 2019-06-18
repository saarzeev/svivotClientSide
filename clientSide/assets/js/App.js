var myApp = angular.module('myApp', ["ngRoute"]);

myApp.init = function(){

}
// config routes
myApp.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            // this is a template
            templateUrl: 'defaultPage.html',
            controller: 'defaultPage as dPCtrl'
        })
        // homepage for logIn
        .when('/loginHome', {
            // this is a template
            templateUrl: 'loginHome.html',
            controller: 'loginHome as loginHomeCtrl'
        })
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
         // about
         .when('/about', {
            templateUrl: 'about.html',
            controller : 'aboutController as aboutCtrl'
        })
        // .when('/httpRequest', {
        //     templateUrl: 'pages/http/request.html',
        //     controller : 'httpController as httpCtrl'
        // })
        // other
        .otherwise({ redirectTo: '/' });
});

myApp.controller("mainController", function($scope, $rootScope){
    //  if(!$scope.loggedInUsername){
    //     $scope.loggedInUsername = "Guest";
    //  }
    
});