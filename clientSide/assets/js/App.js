var myApp = angular.module('myApp', ["ngRoute"]);

myApp.init = function(){

}
// config routes
myApp.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            // this is a template
            templateUrl: 'defaultPage.html',
            controller: 'defaultPage as dPCtrl'
        })
        // homepage for logIn
        .when('/loginHome', {
            // this is a template
            templateUrl: 'loginHome.html',
            controller: 'loginHome as loginHomeCtrl'
        })
        // login
        .when('/login', {
            // this is a template url
            templateUrl: 'login.html',
            controller : 'loginController as loginCtrl'
        })
        // poi
        .when('/signup', {
            templateUrl: 'signup.html',
            controller : 'signupController as signupCtrl'
        })
         // about
         .when('/about', {
            templateUrl: 'about.html',
            controller : 'aboutController as aboutCtrl'
        })
        // pois
        .when('/pois', {
            templateUrl: 'pois.html',
            controller : 'poisController as poisCtrl'
        })
        //favorites
        .when('/favorites', {
            templateUrl: 'favorites.html',
            controller : 'favoriteController as favoriteCtrl'
        })
        // .when('/httpRequest', {
        //     templateUrl: 'pages/http/request.html',
        //     controller : 'httpController as httpCtrl'
        // })
        // other
        .otherwise({ redirectTo: '/' });
});

myApp.filter('searchByPOIName', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){

			if(item.name.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}

		});

		return result;
	};

});

myApp.filter('searchByCategory', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:category)

	return function(arr, category){

		if(!category){
			return arr;
		}

		var result = [];
        
		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){

			if(item.category == category){
				result.push(item);
			}

		});

		return result;
	};

});

myApp.filter('sortByRank', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:category)

	return function(arr, sortMetod){

		if(!sortMetod){
			return arr;
		}
        switch (sortMetod){
            case 'ascending':
                return arr.sort((poi1, poi2) => poi1.rank - poi2.rank);
            case 'descending':
                return arr.sort((poi1, poi2) => poi2.rank - poi1.rank);
        }
	};

});