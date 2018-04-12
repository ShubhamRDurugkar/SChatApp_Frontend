myApp.controller("BlogController", function($scope, $http, $location,$rootScope, $window) {
	$scope.blog = {
			"blogId":0,
		"blogName" : '',
		"blogContent" : '',
		"createDate" : '',
		"likes" : 0,
		"loginname" : '',
		"status" : ''
	}
	$rootScope.blog1 = {
			"blogId":0,
			"blogName" : '',
			"blogContent" : '',
			"createDate" : '',
			"likes" : 0,
			"loginname" : '',
			"status" : ''
		}
	$scope.blogData;

	$scope.insertBlog = function() {
		console.log('Entered into the insertBlog method');
		$scope.blog.loginname=$rootScope.currentUser.loginname;
		$http.post("http://localhost:8083/SChatMiddleWare/addBlog",
						$scope.blog).then(fetchAllBlogs(), function(response) {
					console.log('Status text:' + response.statusText);
					 $window.alert("Data inserted successfully");
				});
	};
	function fetchAllBlogs() {
		console.log('Into Fetch All Blogs');
		$http.get("http://localhost:8083/SChatMiddleWare/listBlogs").then(
				function(response) {
					console.log('Status text:' + response.statusText);
					$scope.blogData = response.data;
					console.log(response.data);
				});
	};
	$scope.editBlog = function(blogId) {
		console.log('Entered into the editBlog method');
		$http.get('http://localhost:8083/SChatMiddleWare/getBlog/' + blogId)
				.then( function(response) {
					console.log('In edit blog');
					console.log(response.data);
					$scope.blog = response.data;
					console.log('Status Text' + response.statusText);
					$location.path('/updateBlog');					
				});
	};

	$scope.updateBlog = function(blogId){
		console.log('Entered into the updateBlog method');
		console.log(blogId);
		$http.put('http://localhost:8083/SChatMiddleWare/updateBlog/'+ blogId, $scope.blog)
		.then(fetchAllBlogs(), function(response){
			console.log('updated blog'+ blogId+ ' successfully');
			console.log(blogId +" updated successfully");
			$window.alert('Blog updated successfully...');
			 $location.path("/updateForum"); 
		});
		
	};
	$scope.deleteBlog = function(blogId){
		console.log('Entered into the deleteBlog method');
		$http.delete('http://localhost:8083/SChatMiddleWare/deleteBlog/'+blogId)
		.then(fetchAllBlogs(), function(response){
			console.log('Blog deleted '+ blogId);
			console.log('Response Status ' + response.statusText);
			fetchAllBlogs();
			$window.alert('Blog deleted successfully..');
			$location.path("/Blog");
		});
	};
	$scope.incrementLike = function(blogId) {
		console.log('Into like increment');
		$http.post(
				'http://localhost:8083/SChatMiddleWare/incrementLikes/'
						+ blogId, $scope.blog).then(fetchAllBlogs(),
				function(response) {
					console.log('Incremented likes');
					fetchAllBlogs();
					$location.path('/Blog')
				});
	}
	fetchAllBlogs();
});