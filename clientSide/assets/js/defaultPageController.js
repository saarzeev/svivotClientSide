
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
    
    // When the user clicks on the button, open the modal 
    $scope.onModalClick = function(index){
        var modal = document.getElementById("myModal" + index);
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    $scope.onXClick = function(index){
        var modal = document.getElementById("myModal" + index);
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(index) {
        var modal = document.getElementById("myModal" + index);

        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
}]);


