
angular.module("myApp")

.controller("defaultPage", ['$scope','$http', '$window', function ($scope, $http, $window) {
    
    $scope.getPopularPOIGuest = function() {
        const url = `${localUrl}/getPopularPOI`;
        const data = {threshold: 75};
        $http.post(url, data).then($scope.successfulGet, $scope.errorOnGet);
    }

    $scope.successfulGet = function(response) {
        if(response && response.data && response.data.length >= 3) {
            $scope.setThreePoi(response.data);
        }
        else{
            $scope.errorOnLogIn("");
        }
    }

    $scope.errorOnGet = function(errorResponse) {
        if(errorResponse && errorResponse.status == 400){
            $scope.error = true;
            $scope.errorValue = { key: 'badParams', value: errorResponse.data };
        }
        else {
            $scope.error =  { key: 'noData', value: 'no data to show' };
        }
    }

    $scope.setThreePoi = function(pois){
        for (let i = 0 ; i < pois.length ; i++) {
            const poi = pois[i];
            if(!poi.name || !poi.category || !poi.img || !poi.rank || !poi.details || !poi.ranksAmount){
                $scope.errorOnGet("");
                return; 
            }
        }

        let random, tempPoi;
        for (let i = pois.length - 1; i > 0; i--) {
            random = Math.floor(Math.random() * (i + 1));
            tempPoi = pois[i];
            pois[i] = pois[random];
            pois[random] = tempPoi;
        } 
        
         $scope.threeRandomPopularPOIs = pois;
    }

    $scope.getTwoLastReviews = function(index){
        const url = `${localUrl}/getLastReviews`;
        const data = {poiName: $scope.threeRandomPopularPOIs[index].name};
        return $http.post(url, data);
    }

    $scope.successfulGetTwoLastReviews = function(index, reviews){
        let review = '';
        if(reviews && reviews.data){
            if(reviews.data.length == 1){
                review =   `Last Review: ${reviews.data[0].review}`
            }
            else if(reviews.data.length == 2){
                review =`Last Reviews: 1. ${reviews.data[0].review}
                                       2. ${reviews.data[1].review}`;
            }
        }
        $scope.threeRandomPopularPOIs[index].reviews = review;
    }

    $scope.addViewToPoi = function(index){
        const url = `${localUrl}/addView`;
        const data = {poiName: $scope.threeRandomPopularPOIs[index].name};
        return $http.post(url, data);
    }

    // When the user clicks on the button, open the modal 
    $scope.onModalClick = function(index){
        var modal = document.getElementById("myModal" + index);
         $scope.getTwoLastReviews(index)
        .then((reviews)=> $scope.successfulGetTwoLastReviews(index, reviews))
        .catch(() => $scope.threeRandomPopularPOIs[index].reviews = '')
        .finally(() =>  modal.style.display = "block");
    }

    // When the user clicks on <span> (x), close the modal
    $scope.onXClick = function(index){
        var modal = document.getElementById("myModal" + index);
        $scope.addViewToPoi(index)
        .then(()=> {
            $scope.threeRandomPopularPOIs[index].views ++;
        })
        .finally(()=> modal.style.display = "none");
    }
    
}]);


