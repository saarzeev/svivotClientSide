
// signup controller
angular.module("myApp")
.controller("signupController", function ($scope, $http, $location) {

    $scope.countries = ['Australia', 'Bolivia', 'China', 'Denemark', 'Israel', 'Latvia', 'Monaco', 'August', 'Norway', 'Panama', 'Switzerland', 'USA'];
    $scope.countries.sort();
    $scope.qa = [{question: 'What is your mothers maiden name?', answer: $scope.ans1}, {question: 'What is your hometown?', answer: $scope.ans2}];

    $scope.isSelectionInvalid = function(registrationForm) {
        console.log($scope.country);
        console.log($scope.categories);
        console.log($scope.categories.length);
        if($scope.country == ""){
            alert("Please select a country");
        }else if($scope.categories.length < 2){
            alert("Please select at least 2 categories you are interested in");
        }
        return($scope.country == "" || $scope.categories.length < 2 );
    };

    $scope.submitSignupForm = function () {
        const url = `${localUrl}/signup`;
        if(!this.isSelectionInvalid()){

            $scope.registrationForm = {
                username: $scope.signupUserName,
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
            $scope.isRestoringPassword = false;
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