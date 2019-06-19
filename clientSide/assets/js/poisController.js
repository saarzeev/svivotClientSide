
angular.module("myApp")

    .controller("poisController", ['$scope', '$http', '$window', '$filter', function ($scope, $http, $window, $filter) {

        $scope.getAllPOIs = function () {
            const url = `${localUrl}/getAllPOI`;
            $http.get(url).then($scope.successfulGet, $scope.errorOnGet);
        };

        $scope.successfulGet = function (response) {
            if (response && response.data && response.data.length >= 1) {
                $scope.sortPOIs(response.data);
            }
            else {
                $scope.errorOnLogIn("");
            }
        };

        $scope.errorOnGet = function (errorResponse) {
            if (errorResponse && errorResponse.status == 400) {
                $scope.error = true;
                $scope.errorValue = { key: 'badParams', value: errorResponse.data };
            }
            else {
                $scope.error = { key: 'noData', value: 'no data to show' };
            }
        };

        $scope.sortPOIs = function (pois) {
            pois.sort((a, b) => (a.name > b.name) ? 1 : -1);
            $scope.sortedPOIs = pois;
        };

        $scope.submitReview = function (poi) {
            const url = `${localUrl}/logged/addReview`;
            const headers = { headers: { "x-auth-token": $window.sessionStorage.token } };
            var data = null;
            if (this.writtenReview != "") {
                data = {
                    poiName: poi.name,
                    review: this.writtenReview,
                    rank: parseInt(this.stars, 10),
                    date: new Date()
                };
            }
            else {
                data = {
                    poiName: poi.name,
                    rank: parseInt(this.stars, 10),
                    date: new Date()
                };
            }
            $http.post(url, data, headers).then($scope.successfulReviewAdded, $scope.errorOnAddReview);
        };

        $scope.successfulReviewAdded = function (response) {
            alert("Successfully added your review. Thank you!");
        }

        $scope.errorOnAddReview = function (errorResponse) {
            if (errorResponse && (errorResponse.status == 404 || errorResponse.status == 400 || errorResponse.status == 500)) {
                alert("Well, This is embarrassing.\nWe were not able to save your review.\n" + errorResponse.data);
            }
        };

        // When the user clicks on the button, open the modal 
        $scope.onModalClick = function (poi) {
            var modal = document.getElementById("myPOIModal" + poi.name);
            modal.style.display = "block";
        };

        // When the user clicks on <span> (x), close the modal
        $scope.onXClick = function (poi) {
            var modal = document.getElementById("myPOIModal" + poi.name);
            modal.style.display = "none";
        };

        // When the user clicks on the button, open the modal 
        $scope.onWriteReviewClick = function (poi) {
            var modal = document.getElementById("myReviewModal" + poi.name);
            modal.style.display = "block";
        };


        // When the user clicks on <span> (x), close the modal
        $scope.onReviewXClick = function (poi) {
            var modal = document.getElementById("myReviewModal" + poi.name);
            modal.style.display = "none";
        };
        // When the user clicks anywhere outside of the modal, close it
        // This does not really work...
        // window.onclick = function() {
        //     for (let index = 0; index < $scope.sortedPOIs.length; index++) {
        //         const poi = sortedPOIs[index];
        //         var modal = document.getElementById("myModal" + poi);

        //         if (event.target == modal) {
        //             modal.style.display = "none";
        //         }
        //     }
        // }

    }]);


