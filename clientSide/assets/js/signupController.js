// signup controller
angular.module("myApp")
.controller("signupController", function ($scope) {

    $scope.validateSignUpForm = function() {
        console.log("yofi")
    }

    $scope.validateUsername = function() {
            // var ans = signupForm.$dirty
            // ans = ans && signupForm.signupUserName.length <= 8;

            var regex = /^[a-zA-Z]*$/
            // return ans && regex.test(signupForm.signupUserName);
            
            return regex.test(signupForm.signupUserName);
    }

});