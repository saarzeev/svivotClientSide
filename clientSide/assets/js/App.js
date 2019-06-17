var myApp = angular.module('myApp', ["ngRoute"]);

myApp.init = function(){

}
// config routes
myApp.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            // this is a template
            //template: '<h1>This is the default route</h1>'
            controller: 'mainController as mainCtrl'
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