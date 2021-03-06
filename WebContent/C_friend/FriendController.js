/**F
 * 
 */
myApp.controller("FriendController", function($scope, $http, $location,
		$rootScope) {
	$scope.friend = {
		"friendId" : 0,
		"loginname" : '',
		"friendloginname" : '',
		"status" : ''
	};
	$scope.acceptfriendData;
	$scope.pendingFriendRequest;
	$scope.suggestedFriends;
	$scope.acceptFriendRequest;

	function showAllFriends() {
		console.log("Entered into the showAllFriend() method");
		$http.get('http://localhost:8083/SChatMiddleWare/showAllFriends',
				$scope.friend).then(function(response) {
			$scope.acceptfriendData = response.data;
			console.log('Fetched data :' + $scope.acceptfriendData);
		});
	}

	function suggestedFriends() {
		console.log("Entered into the suggestedFriend() method");
		$http.get('http://localhost:8083/SChatMiddleWare/showSuggestedFriends')
				.then(function(response) {
					$scope.suggestedFriends = response.data;
					if($scope.suggestedFriends!=0){
					console.log('Fetched data :' + $scope.suggestedFriends);
					}
					else{
						alert("No suggested friends...");
						$route.reload();
					}
				});
	}
	function pendingFriendRequests() {
		console.log("Entered into the pendingFriendRequests() method");
		$http.get('http://localhost:8083/SChatMiddleWare/showPendingRequests')
				.then(
						function(response) {
							$scope.pendingFriendRequest = response.data;
							console.log('Fetched data :'
									+ $scope.pendingFriendRequest);
						});
	}
	$scope.acceptFriendRequest = function(friendId) {
		console.log("Entered into the acceptFriendRequest() method");
		$http.get(
				'http://localhost:8083/SChatMiddleWare/acceptFriendRequest/'
						+ friendId).then(function(response) {
			$scope.acceptFriendRequest = response.data;
			console.log('Fetched data :' + $scope.acceptFriendRequest);
		});
	}

	$scope.deleteFriendRequest = function(friendId) {
		console.log("Entered into the acceptFriendRequest() method");
		$http.get(
				'http://localhost:8083/SChatMiddleWare/deleteFriendRequest/'
						+ friendId).then(function(response) {
			$scope.acceptFriendRequest = response.data;
			console.log(friendId + 'Deleted successfully..');
		});
	}
	$scope.sendFriendRequest = function() {
		console.log("Entered into the sendFriendRequest() method");
		$scope.friend.loginname = $rootScope.currentUser.loginname;
		/* $scope.friend.friendloginname = friendloginname; */

		$http.post(
				'http://localhost:8083/SChatMiddleWare/sendFriendRequest/'
						+ $scope.friend).then(function(response) {
			console.log('Friend request sent to' + loginname + '..!!');
		});
	}

	suggestedFriends();
});