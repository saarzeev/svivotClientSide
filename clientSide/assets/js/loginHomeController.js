angular.module("myApp")

    .controller("loginHome", ['$scope', '$http', '$window', '$rootScope', '$location', function ($scope, $http, $window, $rootScope, $location) {

        // popular functions
        $scope.getUsersCategories = function () {
            if (!$rootScope.isLoggedIn) {
                $location.url('/');
                $rootScope.welcomePath = '#!/';
                return;
            }
            const url = `${localUrl}/logged/getUsersCategories`;
            const headers = { headers: { "x-auth-token": $window.sessionStorage.token } }
            $http.get(url, headers).then($scope.successfulGet, $scope.errorOnGet);
        }

        $scope.successfulGet = function (response) {
            if (response && response.data && response.data.length >= 2) {
                $scope.setMostPopularPoiByCategory(response.data);
            }
            else {
                $scope.errorOnLogIn("");
            }
        }

        $scope.getMostPopularByCategory = function (category) {
            const url = `${localUrl}/getMostPopularByCategory`;
            const data = { category: category };
            return $http.post(url, data);
        }

        $scope.setMostPopularPoiByCategory = function (categories) {
            let firstPois, seconedPois;
            $scope.getMostPopularByCategory(categories[0].category)
                .then((firstResponse) => {
                    if (firstResponse && firstResponse.data) {
                        firstPois = firstResponse.data;
                        return $scope.getMostPopularByCategory(categories[1].category);
                    }
                    else {
                        $scope.errorOnLogIn("");
                    }
                })
                .then((seconedResponse) => {
                    if (seconedResponse && seconedResponse.data) {
                        seconedPois = seconedResponse.data;
                        $scope.byCategoryPois = [firstPois[0], seconedPois[0]];
                    }
                    else {
                        $scope.errorOnLogIn("");
                    }
                })
                .catch((err) => {
                    $scope.errorOnGet(err);
                })
        }

        // favorites handler

        

        // errors handler
        $scope.errorOnGet = function (errorResponse) {
            if (errorResponse && errorResponse.status == 400) {
                $scope.error = true;
                $scope.errorValue = { key: 'badParams', value: errorResponse.data };
            }
            if (errorResponse && errorResponse.status == 401) {
                $scope.error = true;
                $scope.errorValue = { key: 'Unauthorized', value: 'Unauthorized user' };
            }
            else {
                $scope.error = true;
                $scope.errorValue = { key: 'noData', value: 'no data to show' };
            }
        }

    }]);