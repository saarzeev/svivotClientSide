// login controller
const localUrl = 'http://localhost:3000';
angular.module("myApp")


.controller("loginController", ['$scope','$http', '$window', function ($scope, $http, $window) {

    $scope.tryLogIn = function() {
        const url = `${localUrl}/LogIn`;
        const data = {username: $scope.loginUserName, psw: $scope.loginPassword };
        $http.post(url, data).then($scope.successfulLogIn, $scope.errorOnLogIn);
    }

    $scope.successfulLogIn = function(response) {
        if(response && response.data && response.data.token && response.data.name){
            $window.sessionStorage.setItem('token', response.data.token);
            $window.sessionStorage.setItem('username', response.data.name);
            //TO redirect to loged in window
        }
        else{
            $scope.errorOnLogIn("");
        }
    }

    $scope.errorOnLogIn = function(errorResponse) {
        if(errorResponse && (errorResponse.status == 404 || errorResponse.status == 400)){
           $scope.errors =  [{ key: 'badParams', value: errorResponse.data }];
        }
        else
             $scope.errors =  [{ key: 'badParams', value: 'temporal problem try please again later' }];
    }
    
}])
// this is our directive
.directive('qnValidate', [function() {
    return {
        link: function(scope, element, attr) {
            var form = element.inheritedData('$formController');
            // no need to validate if form doesn't exists
            if (!form) return;
            // validation model
            var validate = attr.qnValidate;
            // watch validate changes to display validation
            scope.$watch(validate, function(errors) {

                // every server validation should reset others
                // note that this is form level and NOT field level validation
                form.$serverError = { };

                // if errors is undefined or null just set invalid to false and return
                if (!errors) {
                    form.$serverInvalid = false;
                    return;
                }
                // set $serverInvalid to true|false
                form.$serverInvalid = (errors.length > 0);

                // loop through errors
                angular.forEach(errors, function(error) {                            
                        form.$serverError[error.key] = { $invalid: true, message: error.value };
                });
            });
        }
    };
}]);

