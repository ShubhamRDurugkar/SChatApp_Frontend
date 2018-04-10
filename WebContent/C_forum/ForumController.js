myApp.controller("ForumController", function($scope, $http, $location,$rootScope) {
	$scope.forum = {
		"forumName" : '',
		"forumContent" : '',
		"createdDate" : '',
		"loginname" : '',
		"status" : ''
	}
	$rootScope.forum1 = {
			"forumName" : '',
			"forumContent" : '',
			"createdDate" : '',
			"loginname" : '',
			"status" : ''
		}
	$scope.forumData;

	$scope.insertForum = function() {
		console.log('Entered into the insertForum method');
		$scope.forum.loginname=$rootScope.currentUser.loginname;
		$http.post("http://localhost:8083/SChatMiddleWare/addForum",
						$scope.forum).then(fetchAllForums(), function(response) {
					//$location.reload();
							$scope.forumData=response.Data;
					console.log('Status text:' + response.statusText +' '+$scope.forumData);
				});
	};
	function fetchAllForums() {
		console.log('Into Fetch All Forums');
		$http.get("http://localhost:8083/SChatMiddleWare/listForums").then(
				function(response) {
					console.log('Status text:' + response.statusText);
					$scope.forumData = response.data;
				});
	};
	$scope.editForum = function(forumId) {
		alert("In edit method");
		$http.get('http://localhost:8083/SChatMiddleWare/getForum/' + forumId)
				.then(fetchAllForums(), function(response) {
					console.log('In edit forum');
					$scope.forum = response.data;
					$location.path('/updateForum');
					console.log('Status Text' + response.statusText);
					
				});
	};

	$scope.updateForum = function(forumId){
		alert("in update forum");
		$http.put('http://localhost:8083/SChatMiddleWare/updateForum/'+ forumId, $scope.forum)
		.then(fetchAllForums(), function(response){
			console.log('updated forum'+ forumId+ ' successfully');
			// $location.path('/updateForum');
			console.log(forumId +" updated successfully");
		// $location.reload();
		});
		
	};
	$scope.deleteForum = function(forumId){
		// alert("in delete forum");
		$http.delete('http://localhost:8083/SChatMiddleWare/deleteForum/'+forumId)
		.then(fetchAllForums(), function(response){
			console.log('Forum deleted '+ forumId);
			console.log('Response Status ' + response.statusText);
		// $location.reload();
		});
	};
	$scope.incrementLike = function(forumId) {
		console.log('Into like increment');
		$http.post(
				'http://localhost:8083/SChatMiddleWare/incrementLikes/'
						+ forumId, $scope.forum).then(fetchAllForums(),
				function(response) {
					console.log('Incremented likes');
					$location.path('/Forum')
				});
	}
	fetchAllForums();
});