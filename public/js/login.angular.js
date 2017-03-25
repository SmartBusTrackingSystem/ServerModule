var app = angular.module('login', [])
	app.controller('logincontroller',function($scope,$http){	
	// $scope.user = {};
	// $scope.pass = {};


$scope.submit=function(){
	console.log("submit button click, now calling authentication api");
		// $http.get('/api/login/authentication', {},
  //           function (response) {console.log("whatttt I got it ",response);},
  //           function (failure) { console.log("failed :(", failure); });

			console.log("Username : "+$scope.user );
			console.log("password : "+$scope.pass )

  	$http({
			method : "POST",
			url : '/api/login/authentication',
			data : {
				"user":$scope.user,
				"password":$scope.pass
			}
		}).success(function(data){
			console.log("wohhooo");

			if(data.status=="Invalid")
			{
				alert("Invalid Username/password")
			}
			else
			{
				window.location.assign("/api/login/userProfile");
			}

			}).error(function(error) {
			console.log("Baaaeehhhh");

		});
	};


});

// Prod end point to get bus logs.
// http://shivanageshchandra.com:3000/api/busLog?token=4VjGvaiS5uyQF64Sl8R66lgN31UiilNj 
