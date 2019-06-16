// signup controller
angular.module("myApp")
.controller("signupController", function ($scope) {

    $scope.validateSignUpForm = function() {
        console.log("yofi")
    }

    $scope.validateUsername = function() {
            var ans = signupForm.signupUserName >= 3;
            ans = ans && signupForm.signupUserName <= 8;

            var regex = /^[a-zA-Z]*$/
            return ans && regex.test(signupForm.signupUserName);
    }

});