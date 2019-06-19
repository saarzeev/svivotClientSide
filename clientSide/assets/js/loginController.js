// login controller
const localUrl = 'http://localhost:3000';
angular.module("myApp")


    .controller("loginController", ['$scope', '$rootScope', '$http', '$window', '$location', function ($scope, $rootScope, $http, $window, $location) {

        $scope.qa = [{ question: 'What is your mothers maiden name?', answer: $scope.ans1 }, { question: 'What is your hometown?', answer: $scope.ans2 }];
        $scope.isRestoringPassword = false;
        $scope.restoredPassword = "";

        $scope.tryLogIn = function () {
            const url = `${localUrl}/LogIn`;
            const data = { username: $scope.loginUserName, psw: $scope.loginPassword };
            $http.post(url, data).then($scope.successfulLogIn, $scope.errorOnLogIn);
        };

        $scope.successfulLogIn = function (response) {
            if (response && response.data && response.data.token && response.data.name) {
                $window.sessionStorage.setItem('token', response.data.token);
                $window.sessionStorage.setItem('username', response.data.name);
                $rootScope.loggedInUsername = $window.sessionStorage.username;
                $rootScope.welcomePath = '#!loginHome'
                $rootScope.isLoggedIn = true;
                $scope.getAllMyFavorite();
            }
            else {
                $scope.errorOnLogIn("");
            }
        };

        $scope.errorOnLogIn = function (errorResponse) {
            if (errorResponse && (errorResponse.status == 404 || errorResponse.status == 400)) {
                $scope.errors = [{ key: 'badParams', value: errorResponse.data }];
            }
            else {
                $scope.errors = [{ key: 'badParams', value: 'We encountered a temporary problem.\nPlease try again later' }];
            }

        };

        $scope.submitRestorePasswordForm = function () {
            const url = `${localUrl}/answersIdentificationQuestion`;
            var locQa = [{ question: 'What is your mothers maiden name?', answer: $scope.ans1 }, { question: 'What is your hometown?', answer: $scope.ans2 }];
            const data = { username: $scope.username, qa: locQa };
            $http.post(url, data).then($scope.successRestore, $scope.errorRestore);
        };

        $scope.successRestore = function (response) {
            if (response && response.data && response.data.psw) {
                alert("Password was retrieved successfully! Your password:\n" + response.data.psw);
                $scope.isRestoringPassword = true;
            }
            else {
                $scope.errorRestore(response);
            }
        };

        $scope.errorRestore = function (errorResponse) {
            if (errorResponse && (errorResponse.status == 404 || errorResponse.status == 400 || errorResponse.status == 500)) {
                alert("Well, This is embarrassing.\nWe were not able to restore your password.\n" + errorResponse.data);
            }
        };

        $scope.getAllMyFavorite = function () {
            const url = `${localUrl}/logged/getFavoritePOI`;
            const headers = { headers: { "x-auth-token": $window.sessionStorage.token } }
            $http.post(url, null, headers)
                .then((favorites) => {
                    if (favorites && favorites.data) {
                        $scope.getFavoriteViews(favorites.data);
                    }
                    else {
                        $scope.errorFavorite();
                    }
                })
                .catch((error) => $scope.errorFavorite())
                
        }

        $scope.getFavoriteViews = function(favorites){
            const url = `${localUrl}/getAllPOI`;
            $http.get(url)
            .then((pois)=> {
                if(pois && pois.data){
                    for(let i = 0 ; i< favorites.length ; i++){
                        favorites[i].views = pois.data.find((poi) => poi.name === favorites[i].name).views;
                    }
                    $window.sessionStorage.setItem('userFavoritePoi', JSON.stringify(favorites));
                }
                else{
                    $scope.errorFavorite();
                }
            })
            .catch((err) => $scope.errorFavorite())
            .finally(() => $location.url("/loginHome"));
        }

        $scope.errorFavorite = function () {
            $window.sessionStorage.setItem('userFavoritePoi', JSON.stringify([]));
        };
    }])
    // this is our directive
    .directive('qnValidate', [function () {
        return {
            link: function (scope, element, attr) {
                var form = element.inheritedData('$formController');
                // no need to validate if form doesn't exists
                if (!form) return;
                // validation model
                var validate = attr.qnValidate;
                // watch validate changes to display validation
                scope.$watch(validate, function (errors) {

                    // every server validation should reset others
                    // note that this is form level and NOT field level validation
                    form.$serverError = {};

                    // if errors is undefined or null just set invalid to false and return
                    if (!errors) {
                        form.$serverInvalid = false;
                        return;
                    }
                    // set $serverInvalid to true|false
                    form.$serverInvalid = (errors.length > 0);

                    // loop through errors
                    angular.forEach(errors, function (error) {
                        form.$serverError[error.key] = { $invalid: true, message: error.value };
                    });
                });
            }
        };
    }]);

