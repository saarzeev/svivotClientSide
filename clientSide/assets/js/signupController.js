import { error } from "protractor";

// signup controller
angular.module("myApp")
.controller("signupController", function ($scope, $http, $location) {
    $scope.registrationForm = {
        username: "",
        psw: "",
        qa:[{question: "nu1", answer: "nu1Ans"}, {question: "nu2", answer: "nu2Ans"}],
        email: "",
        city: "",
        country: "",
        firstName: "",
        lastName: "",
        categories: ["Food", "Shopping"]
    };

    $scope.submitSignupForm = function () {
        const url = `${localUrl}/signup`;
        
        $http.post(url, $scope.registrationForm).then($scope.successfullSignUp, $scope.errorOnSignUp);
    };

    $scope.successfullSignUp = function(response) {
        if(response){
            alert("Registration was completed successfully.\nPlease log in to your new user.");
            $location.url("/login");
        }
        else{
            $scope.errorOnSignUp("");
        }
    };

    $scope.errorOnSignUp = function(errorResponse) {
        if(errorResponse && (errorResponse.status == 404 || errorResponse.status == 400 ||  errorResponse.status == 500)){
        alert("Well, This is embarrassing.\nWe were not able to sign you up.\n" + errorResponse.data);
        }
    };

});