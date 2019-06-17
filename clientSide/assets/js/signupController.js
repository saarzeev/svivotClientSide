
// signup controller
angular.module("myApp")
.controller("signupController", function ($scope, $http, $location) {
    // $scope.registrationForm = {
    //     username: "",
    //     psw: "",
    //     qa:[{question: 'What is your mothers maiden name?', answer: ''}, {question: 'What is your hometown?', answer: ''}],
    //     email: "",
    //     city: "",
    //     country: "",
    //     firstName: "",
    //     lastName: "",
    //     categories: $scope.categories
    // };

    $scope.countries = ['Australia', 'Bolivia', 'China', 'Denemark', 'Israel', 'Latvia', 'Monaco', 'August', 'Norway', 'Panama', 'Switzerland', 'USA'];
    $scope.countries.sort();

    // $scope.categories = ['Food', 'Shopping', 'Museums', 'Churches'];
    // $scope.categories.sort();

    

    $scope.isSelectionInvalid = function(registrationForm) {
        if(registrationForm.country == ""){
            alert("Please select a country");
        }else if(registrationForm.categories.length < 2){
            alert("Please select at least 2 categories you are interested in");
        }
        return(registrationForm.country == "" || registrationForm.categories.length < 2 );
    };

    $scope.submitSignupForm = function () {
        const url = `${localUrl}/signup`;
        if(!this.isSelectionInvalid()){

            $scope.registrationForm = {
                username: $scope.username,
                psw: $scope.psw,
                qa:[{question: 'What is your mothers maiden name?', answer: $scope.ans1}, {question: 'What is your hometown?', answer: $scope.ans2}],
                email: $scope.email,
                city: $scope.city,
                country: $scope.country,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                categories: $scope.categories
            };

            if(!this.isSelectionInvalid($scope.registrationForm))
            $http.post(url, $scope.registrationForm).then($scope.successfullSignUp, $scope.errorOnSignUp);
        }
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