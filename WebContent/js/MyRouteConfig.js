/**
 * myApp to navigate between all pages (SPA)
 */
var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function($routeProvider) {
	console.log('I am in routeProvider');
    $routeProvider
    .when("/", {
        templateUrl : "template/home.html"
    })
    .when("/Login", {
        templateUrl : "template/Login.html"
    })
    .when("/Register", {
        templateUrl : "template/Register.html"
    })
    .when("/ContactUs", {
        templateUrl : "template/ContactUs.html"
    })
    .when("/AboutUs", {
        templateUrl : "template/AboutUs.html"
    })
    .when("/Blog", {
        templateUrl : "C_Blog/Blog.html"
    });
});