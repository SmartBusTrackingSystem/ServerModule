var app = angular.module('login', [])
	app.controller('logincontroller', ['$scope','$http',function($scope,$http){
	$scope.user = {};
	$scope.pass = {};

	$scope.search = function() {
		console.log("Checking user name and Password");
		// $http.get('/abc', {param:"ddd"}
  //           function (response) {  console.log("dddaaaaaa");},
  //           function (failure) { console.log("failed :(", failure); });

	$http.get('/api/login/authentication', {},
            function (response) {console.log("whatttt I got it ",response);},
            function (failure) { console.log("failed :(", failure); });
			
			// console.log("called api/authentication");
			// window.location = "#/dashboard.pug";


	// $http.get('/api/login/authentication', {username: "kk"},
 //            function (response) {console.log("whatttt I got it ",response);},
 //            function (failure) { console.log("failed :(", failure); });
			
	// 		console.log("called api/authentication");


	

	}

}
]);

// Prod end point to get bus logs.
// http://shivanageshchandra.com:3000/api/busLog?token=4VjGvaiS5uyQF64Sl8R66lgN31UiilNj 
