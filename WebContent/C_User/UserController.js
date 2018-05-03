/**
 * UserController for login
 */
myApp.controller("UserController", function($scope, $http, $location,
		$rootScope, $cookieStore) {
	$scope.user = {
		loginname : '',
		password : '',
		role : '',
		username : '',
		emailId : '',
		mobileNo : '',
		address : '',
		isOnline : ''
	};
	$scope.userData;
	$scope.userList;
	$scope.userProfile = {
		loginname : '',
		image : ''
	};
	$rootScope.login = function() {
		console.log("Logging Function");

		$http.post('http://localhost:8083/SChatMiddleWare/login', $scope.user)
				.then(function(response) {
					console.log(response.status);
					$scope.user = response.data;
					$rootScope.currentUser = response.data;
					$cookieStore.put('userDetails', response.data);
					console.log($rootScope.currentUser.role);
					if ($rootScope.currentUser.role == "ROLE_ADMIN") {
						console.log('AdminPage');
					} else {
						console.log('UserPage');
					}
					$location.path("/");
				});
	};

	$scope.register = function() {
		console.log('Entered into the Register User method');
		$http.post("http://localhost:8083/SChatMiddleWare/registerUser",
				$scope.user).then(function(response) {
			console.log('Status text:' + response.statusText);
			alert('Registered successfully..!!');
			$location.path("/");
		});

	};
	$scope.update = function(loginname) {
		console.log('Entered into the Update  User method');
		$http.post("http://localhost:8083/SChatMiddleWare/updateUser/"+loginname,
				$scope.user).then(function(response) {
			console.log('Status text:' + response.statusText);
			alert('updated details successfully..!!');
			$location.path("/ViewProfile");
		});

	};

	/*
	 * $scope.upload = function() { console.log('Entered into the upload
	 * method');
	 * $http.post("http://localhost:8083/SChatMiddleWare/doUpload",$scope.userProfile).then(function(response) {
	 * console.log('Status text:' + response.statusText); alert('Uploaded
	 * successfully..!!'); $location.path("/"); }); };
	 */
	$scope.fetchUserDetails = function() {
		console.log("Inside fetch user Details function "
				+ $rootScope.currentUser.loginname);
		$http.get(
				"http://localhost:8083/SChatMiddleWare/getUser/"
						+ $rootScope.currentUser.loginname).then(
				function(response) {
					console.log("fetched User");
					$scope.userData = response.data;
					$scope.user = response.data;
					$rootScope.currentUser = response.data;
					$cookieStore.put('userDetails', response.data);
				});
	};
	/*$scope.listUsers = function() {
		console.log("Inside list user Details function "
				+ $rootScope.currentUser.loginname);
		$http.get("http://localhost:8083/SChatMiddleWare/listUsers").then(
				function(response) {
					console.log("fetched Users");
					$scope.userList = response.data;
					$scope.user = response.data;
					$cookieStore.put('userDetails', response.data);
				});
	};*/
	$rootScope.logout = function() {
		console.log('Entered into the logout function');
		$http.post("http://localhost:8083/SChatMiddleWare/logout",
				$rootScope.currentUser).then(function(response) {
			console.log(response.data);
			delete $rootScope.currentUser;
			$cookieStore.remove('userDetails');
			$location.path("/");
		});
	}

});