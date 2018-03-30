myApp.controller("BlogController",function($scope,$http,$location)
		{
	$scope.blog={"blogName":'',"blogContent":'',"createdDate":'',"likes":0,"loginname":'',"status":''}
	
	$scope.blogData;
	
	$scope.insertBlog=function()
	{
		console.log('Enter into the insertBlog method');
		$http.post("http://localhost:8083/SChatMiddleWare/addBlog",$scope.blog)
		.then(function(response){
			console.log('Status text:'+response.statusText);
		});
	};
	function fetchAllBlog()
	{
		console.log('Fetch All Blogs');
		$http.get("http://localhost:8083/SChatMiddleware/listBlogs")
		.then(function(response)
		{
			$scope.blogData=response.data;
		})
	}
	fetchAllBlog();
});