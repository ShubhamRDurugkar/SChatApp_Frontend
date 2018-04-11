/**
 * myApp to navigate between all pages (SPA)
 */
var myApp = angular.module("myApp", [ 'ngRoute', , 'ngCookies' ]);
myApp.config(function($routeProvider) {
	console.log('I am in routeProvider');
	$routeProvider.when("/", {
		templateUrl : "home.html"
	}).when("/Login", {
		templateUrl : "C_User/Login.html"
	}).when("/UpdateProfile", {
		templateUrl : "C_User/UpdateProfile.html"
	}).when("/Register", {
		templateUrl : "C_User/Register.html"
	}).when("/ContactUs", {
		templateUrl : "template/ContactUs.html"
	}).when("/AboutUs", {
		templateUrl : "template/AboutUs.html"
	}).when("/Blog", {
		templateUrl : "C_Blog/Blog.html"
	}).when("/updateBlog", {
		templateUrl : "C_Blog/updateBlog.html"
	}).when("/createForum", {
		templateUrl : "C_forum/Forum.html"
	}).when("/updateForum", {
		templateUrl : "C_forum/updateForum.html"
	}).when("/Chat", {
	templateUrl : "C_chat/chat.html"
	});
});

myApp.run(function($rootScope, $cookieStore) {
	console.log('I am in run function');
	console.log($rootScope.currentUser);

	if ($rootScope.currentUser == undefined) {
		$rootScope.currentUser = $cookieStore.get('userDetails');
	} else {
		console.log($rootScope.currentUser.username);
		console.log($rootScope.currentUser.role);
	}
});