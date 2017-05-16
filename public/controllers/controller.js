var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope','$http',
	function($scope, $http){
console.log("Hello world from controller");

var refresh = function(){
	$http({
	 method: 'GET',
	 url: '/contactlist'
		  })
 	.then(function(response){
 		console.log("I got the data I requested");
		$scope.contactlist = response.data;
 		$scope.contact = null;

 	});
};

refresh();

$scope.addContact = function() {
	console.log($scope.contact);
	$http({
		method: 'POST',
		url: '/contactlist',
		data: $scope.contact
	})
	.then(function(response){
		console.log('Post:'+response);
		refresh();
	});
};

$scope.remove = function(id){
	console.log(id);
	$http({
		method:'DELETE',
		url:'/contactlist/' +id
	}).then(function(response){
		refresh();
	});
};

$scope.edit = function(id){
	console.log(id);
	$http({
		method:'GET',
		url:'/contactlist/' +id
	}).then(function(response){
		$scope.contact =  response.data; 
	});
};


$scope.update = function(){
	console.log($scope.contact._id);
	$http({
		method:'PUT',
		url:'/contactlist/' +$scope.contact._id,
		data:$scope.contact
	}).then(function(response){
		refresh();
		});
};

$scope.deselect = function(){
	$scope.contact = "";
};


}]);


