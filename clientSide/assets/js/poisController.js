
angular.module("myApp")

.controller("poisController", ['$scope','$http', '$window', '$filter', function ($scope, $http, $window, $filter) {
    
    $scope.getAllPOIs = function() {
        const url = `${localUrl}/getAllPOI`;
        $http.get(url).then($scope.successfulGet, $scope.errorOnGet);
    }

    $scope.successfulGet = function(response) {
        if(response && response.data && response.data.length >= 1) {
            $scope.sortPOIs(response.data);
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

    $scope.sortPOIs = function(pois){
        pois.sort((a,b) => (a.name > b.name) ? 1 : -1); 
        $scope.sortedPOIs = pois;
    }
    
    // When the user clicks on the button, open the modal 
    $scope.onModalClick = function(poi){
        var modal = document.getElementById("myModal" + poi.name);
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    $scope.onXClick = function(poi){
        var modal = document.getElementById("myModal" + poi.name);
        modal.style.display = "none";
    }

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


