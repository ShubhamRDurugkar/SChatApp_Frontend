myApp.controller("BlogController", function($scope,$route, $http, $location,$rootScope, $window) {
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
	
	$scope.blogComment={"commentID":0,"blogId":'',"commentDate":'',"commentText":'',"username":''}
	$scope.blogData;
	$scope.blogComments;
	$rootScope.message="Blog added successfully";

	$scope.insertBlog = function() {
		console.log('Entered into the insertBlog method');
		$scope.blog.loginname=$rootScope.currentUser.loginname;
		$http.post("http://localhost:8083/SChatMiddleWare/addBlog",
						$scope.blog).then(fetchAllBlogs(), function(response) {
					console.log('Status text:' + response.statusText);
					 $window.alert("Data inserted successfully");
					 $location.path("/Blog"); 
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
	$rootScope.viewBlog = function(blogId) {
		console.log('Entered into the getBlog method');
		$http.get('http://localhost:8083/SChatMiddleWare/getBlog/' + blogId)
				.then( function(response) {
					console.log('In get blog');
					console.log(response.data);
					$scope.blog=response.data;
					$rootScope.singleBlogData=response.data;
					console.log($rootScope.singleBlogData.blogId);
					console.log('Status Text' + response.statusText);
					$location.path('/SingleBlog');					
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
			$location.path("/updateBlog"); 
		});
		
	};
	$scope.approveBlog = function(blogId){
		console.log('Entered into the approveBlog method');
		console.log(blogId);
		$http.put('http://localhost:8083/SChatMiddleWare/approveBlog/'+ blogId)
		.then(fetchAllBlogs(), function(response){
			console.log('Approved blog'+ blogId+ ' successfully');
			console.log(blogId +" updated successfully");
			$window.alert('Blog approved successfully...');
			fetchAllBlogs();
			 $location.path("/updateBlog"); 
		});
		
	};
	$scope.rejectBlog = function(blogId){
		console.log('Entered into the rejectBlog method');
		console.log(blogId);
		$http.put('http://localhost:8083/SChatMiddleWare/rejectBlog/'+ blogId)
		.then(fetchAllBlogs(), function(response){
			console.log('Rejected blog'+ blogId+ ' successfully');
			console.log(blogId +" rejected successfully");
			$window.alert('Blog rejected successfully...');
			fetchAllBlogs();
			 $location.path("/updateBlog"); 
		});
		
	};
	$scope.deleteBlog = function(blogId){
		console.log('Entered into the deleteBlog method');
		$http.delete('http://localhost:8083/SChatMiddleWare/deleteBlog/'+blogId)
		.then(fetchAllBlogs(), function(response){
			console.log('Blog deleted '+ blogId);
			console.log('Response Status ' + response.statusText);
			fetchAllBlogs();
			alert('Blog deleted successfully..');
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
					$location.path('/viewBlog');
					
				});
	}
	
	$scope.fetchAllBlogComments=function(blogId) {
		console.log('Into Fetch All Blog Commments');
		$http.get("http://localhost:8083/SChatMiddleWare/listBlogComments/"+blogId).then(
				function(response) {
					console.log('Status text:' + response.statusText);
					$scope.blogComments = response.data;
					console.log(response.data);
				});
	};
	$scope.addBlogComment = function(blogId) {
		console.log('Entered into the addBlogComment method');
		$scope.blogComment.username=$rootScope.currentUser.loginname;
		$scope.blogComment.blogId=blogId;
		$http.post("http://localhost:8083/SChatMiddleWare/addBlogComment",
						$scope.blogComment).then(function(response) {
					console.log('Status text:' + response.statusText);
					 $window.alert("Commented successfully");
					 $window.location.reload();
					 $location.path("/SingleBlog"); 
				});
	};
		fetchAllBlogs();
});