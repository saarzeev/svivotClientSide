angular.module("myApp")

    .controller("favoriteController", ['$scope', '$http', '$window', '$rootScope', '$location', function ($scope, $http, $window, $rootScope, $location) {
        $scope.resultsArray = [];

        $scope.checkLogin = function () {
            if (!$rootScope.isLoggedIn) {
                $location.url('/');
                $rootScope.welcomePath = '#!/';
                return;
            }
        }

        $scope.getAllFavorites = function(){
            $scope.favorites = JSON.parse($window.sessionStorage.getItem('userFavoritePoi'));
       }

       $scope.updateFavoriteDB = function(){
            const url = `${localUrl}/logged/updateFavoritePOI`;
            const headers = { headers: { "x-auth-token": $window.sessionStorage.token } };
            const data = {favorites: JSON.parse($window.sessionStorage.getItem('userFavoritePoi'))};
            $http.post(url, data, headers)
            .then(() =>  alert("Successfully updated your favorites"))
            .catch((errorResponse) => $scope.errorOnUdateFavorites(errorResponse));
       }

       $scope.errorOnUdateFavorites = function(errorResponse){
            alert("Well, This is embarrassing.\nWe were not able to update your favorites.\n" + errorResponse.data);
       }

        $scope.sortPOIs = function (pois) {
            pois.sort((a, b) => (a.name > b.name) ? 1 : -1);
            $scope.favorites = pois;
        };

        $scope.submitReview = function (poi) {
            const url = `${localUrl}/logged/addReview`;
            const headers = { headers: { "x-auth-token": $window.sessionStorage.token } };
            var data = null;
            if (this.writtenReview != "") {
                data = {
                    poiName: poi.name,
                    review: this.writtenReview,
                    rank: (parseInt(this.stars, 10) / 5 * 100),
                    date: new Date()
                };
            }
            else {
                data = {
                    poiName: poi.name,
                    rank: (parseInt(this.stars, 10) / 5 * 100),
                    date: new Date()
                };
            }
            $http.post(url, data, headers)
                .then(() => $scope.successfulReviewAdded(poi))
                .then(() => $scope.setNewRank(poi))
                .catch(() => $scope.errorOnAddReview());
        };

        $scope.successfulReviewAdded = function (poi) {
            alert("Successfully added your review. Thank you!");
        }

        $scope.errorOnAddReview = function (errorResponse) {
            if (errorResponse && (errorResponse.status == 404 || errorResponse.status == 400 || errorResponse.status == 500)) {
                alert("Well, This is embarrassing.\nWe were not able to save your review.\n" + errorResponse.data);
            }
        };

        $scope.setNewRank = function (poi) {
            const url = `${localUrl}/getAllPOI`;
            $http.get(url)
                .then((pois) => {
                    if (pois && pois.data) {
                        poi.rank = pois.data.find((item) => poi.name === item.name).rank;
                    }
                })
        }

        $scope.addViewToPoi = function (poiName) {
            const url = `${localUrl}/addView`;
            const data = { poiName: poiName };
            return $http.post(url, data);
        }

        $scope.getTwoLastReviews = function (poiName) {
            const url = `${localUrl}/getLastReviews`;
            const data = { poiName: poiName };
            return $http.post(url, data);
        }

        $scope.successfulGetTwoLastReviews = function (poi, reviews) {
            let review = '';
            if (reviews && reviews.data) {
                if (reviews.data.length == 1) {
                    review = `Last Review: ${reviews.data[0].review}`
                }
                else if (reviews.data.length == 2) {
                    review = `Last Reviews: 1. ${reviews.data[0].review}
                                           2. ${reviews.data[1].review}`;
                }
            }
            poi.reviews = review;
        }

        // When the user clicks on the button, open the modal 
        $scope.onModalClick = function (poi) {
            var modal = document.getElementById("myPOIModal" + poi.name);
            $scope.getTwoLastReviews(poi.name)
                .then((reviews) => $scope.successfulGetTwoLastReviews(poi, reviews))
                .catch(() => poi.reviews = '')
                .finally(() => modal.style.display = "block");
        };

        // When the user clicks on <span> (x), close the modal
        $scope.onXClick = function (poi) {
            var modal = document.getElementById("myPOIModal" + poi.name);

            $scope.addViewToPoi(poi.name)
                .then(() => {
                    poi.views++;
                })
                .finally(() => {
                    modal.style.display = "none";
                });
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

        $scope.inFavorite = function(poi){
            const favorites = JSON.parse($window.sessionStorage.getItem('userFavoritePoi'));
            return $rootScope.isLoggedIn && favorites.find((favorite) => favorite.name === poi.name) !== undefined;
        }

        $scope.onFavoriteCheckBoxChange = function(poi){
            const favorites = JSON.parse($window.sessionStorage.getItem('userFavoritePoi'));
            let newFavorites;
            if(favorites.find((favorite) => favorite.name === poi.name) !== undefined) {
                newFavorites = favorites.filter((favorite) => favorite.name !== poi.name);
                document.getElementById("radio" + poi.name).checked = false;
                $rootScope.numberOfFavorites --;
            }
            else{
                newFavorite = angular.copy(poi);
                newFavorite.date = new Date();
                favorites.push(newFavorite);
                newFavorites = favorites;
                document.getElementById("radio" + poi.name).checked = true;
                $rootScope.numberOfFavorites++;
            }
            $window.sessionStorage.setItem('userFavoritePoi',JSON.stringify(newFavorites));
        }

    }]);


