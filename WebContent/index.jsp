<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>SChatApp</title>
<script src="js/angular.js"></script>
<script type="text/javascript" src="js/angular-route.js"></script>
<script src="js/MyRouteConfig.js"></script>
<script src="C_Blog/BlogController.js"></script>
<script src="C_User/UserController.js"></script>


<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!-- JQuery Js -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!-- Bootstrap Js -->
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-cookies.js"></script>

<link href="css/bootstrap.min.css" rel="stylesheet">


<style>
item {
	height: 100%;
	width: 100%;
}

footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	background-color: black;
	color: white;
	text-align: center;
}
</style>

</head>
<body ng-app="myApp">

	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<nav class="navbar navbar-inverse" role="navigation">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse"
							data-target="#bs-example-navbar-collapse-1">
							<span class="sr-only">Toggle navigation</span><span
								class="icon-bar"></span><span class="icon-bar"></span><span
								class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="#!">SChatApp</a>
					</div>

					<div class="collapse navbar-collapse"
						id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav">
							<li class="active"><a href="#!">Home</a></li>
							<li
								ng-hide="currentUser.role=='ROLE_USER'||currentUser.role=='ROLE_ADMIN'">
								<a href="#!Login">Login</a>
							</li>
							<li><a href="#!Blog">Blog</a></li>
							<li
								ng-show="currentUser.role=='ROLE_USER'||currentUser.role=='ROLE_ADMIN'">
								<a href="#!UpdateProfile">UpdateProfile</a>
							</li>
						</ul>
						<ul class="nav navbar-nav navbar-right">
							<li
								ng-hide="currentUser.role=='ROLE_USER'||currentUser.role=='ROLE_ADMIN'"><a
								href="#!Register">Register</a></li>
							<li
								ng-hide="currentUser.role=='ROLE_USER'||currentUser.role=='ROLE_ADMIN'"><a
								href="#!AboutUs">AboutUs</a></li>
							<!-- Button trigger modal -->

							<li
								ng-hide="currentUser.role=='ROLE_USER'||currentUser.role=='ROLE_ADMIN'"><a
								href="#!ContactUs">ContactUs</a></li>

						</ul>

						<div class="nav navbar-nav navbar-right"
							ng-hide="currentUser==undefined">
							<ul class="nav navbar-nav">
								<li><font color="white">Welcome
										{{currentUser.loginname}}</font></li>
								<div ng-controller="UserController">
									<input type="submit" value="LogOut" ng-click="logout()"
										class="btn btn-info">
								</div>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</div>


		<div ng-view></div>
	</div>
	<footer>
		<div id="footer">
			<div class="container">
				<div class="bottom-bar">
					Copyright &copy; SChatApp <a href="https://www.facebook.com/">
						<i style="font-size: 24px" class="fa">&#xf082; </i>
					</a> <a href="https://twitter.com/login"> <i
						style="font-size: 24px" class="fa">&#xf099;</i></a> <a
						href="https://plus.google.com/"> <i style="font-size: 24px"
						class="fa">&#xf0d5;</i>
					</a> All Rights Reserved © 2018 | <a href="#!AboutUs">About Us</a> | <a
						href="#!ContactUs">Contact US</a>
				</div>
			</div>
		</div>
	</footer>

</body>

</html>