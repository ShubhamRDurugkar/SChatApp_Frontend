myApp.controller("BlogController", function($scope, $http, $location,$rootScope) {
	$scope.blog = {
		"blogName" : '',
		"blogContent" : '',
		"createdDate" : '',
		"likes" : 0,
		"loginname" : '',
		"status" : ''
	}
	$rootScope.blog1 = {
			"blogName" : '',
			"blogContent" : '',
			"createdDate" : '',
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
					//$location.reload();
					console.log('Status text:' + response.statusText);
				});
	};
	function fetchAllBlogs() {
		console.log('Into Fetch All Blogs');
		$http.get("http://localhost:8083/SChatMiddleWare/listBlogs").then(
				function(response) {
					console.log('Status text:' + response.statusText);
					$scope.blogData = response.data;
				});
	};
	$scope.editBlog = function(blogId) {
		alert("In edit method");
		$http.get('http://localhost:8083/SChatMiddleWare/getBlog/' + blogId)
				.then(fetchAllBlogs(), function(response) {
					console.log('In edit blog');
					$scope.blog = response.data;
					$location.path('/updateBlog');
					console.log('Status Text' + response.statusText);
					
				});
	};

	$scope.updateBlog = function(blogId){
		alert("in update blog");
		$http.put('http://localhost:8083/SChatMiddleWare/updateBlog/'+ blogId, $scope.blog)
		.then(fetchAllBlogs(), function(response){
			console.log('updated blog'+ blogId+ ' successfully');
			// $location.path('/updateBlog');
			console.log(blogId +" updated successfully");
		// $location.reload();
		});
		
	};
	$scope.deleteBlog = function(blogId){
		// alert("in delete blog");
		$http.delete('http://localhost:8083/SChatMiddleWare/deleteBlog/'+blogId)
		.then(fetchAllBlogs(), function(response){
			console.log('Blog deleted '+ blogId);
			console.log('Response Status ' + response.statusText);
		// $location.reload();
		});
	};
	$scope.incrementLike = function(blogId) {
		console.log('Into like increment');
		$http.post(
				'http://localhost:8083/SChatMiddleWare/incrementLikes/'
						+ blogId, $scope.blog).then(fetchAllBlogs(),
				function(response) {
					console.log('Incremented likes');
					$location.path('/Blog')
				});
	}
	fetchAllBlogs();
});