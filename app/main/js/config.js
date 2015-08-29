( function (window){
	var angular = window.angular;
	angular.module('funglr', ['ui.router','ui.bootstrap','funglr.user','funglr.auth','funglr.dash','funglr.follow'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('funglr', {
				abstract: true,
				url: '',
				templateUrl: 'index.html'
			})
			.state('funglr.base', {
				abstract: true,
				url: '',
				templateUrl: 'main/main.html'
			})
			.state('funglr.base.main', {
				url: '',
				views: {
					navBar: {
						templateUrl: 'main/views/navbar.html',
						controller: 'navCtrl as nav'
					},
					'': {
						template: '<ui-view/>'
					},
					footer: {
						templateUrl: 'main/views/footer.html',
						controller: 'footerCtrl as footer'
					}
				}
			})
			.state('funglr.base.main.home', {
				url: 'home',
				templateUrl: 'main/views/home.html',
				controller: 'homeCtrl as home'
			})
			.state('funglr.base.main.login',{
				url: 'login',
				templateUrl: 'auth/views/login.html',
				controller: 'loginCtrl as login'
			})
			.state('funglr.base.main.register',{
				url: 'register',
				templateUrl: 'auth/views/register.html',
				controller: 'registerCtrl as register'
			})
			.state('funglr.userBase', {
				abstract: true,
				url: '',
				templateUrl: 'user/user.html'
			})
			.state('funglr.userBase.user',{
				abstract: true,
				url: 'user/:userid',
				views: {
					navbar: {
						templateUrl: 'user/views/nav.html',
						controller: 'userNavCtrl as userNav'
					},
					'':{
						template: '<ui-view/>'
					}
				}
			})
			.state('funglr.userBase.user.home',{
				/*
					This is the users blog that displays the posts from the user
					and from the other users they are following
				*/
				url: 'home',
				views: {
					dashTab: {
						templateUrl: 'dash/views/dashtab.html',
						controller: 'dashTabCtrl as dashTab'
					},
					dashBoard: {
						templateUrl: 'dash/views/dashboard.html',
						controller: 'dashBoardCtrl as dashBoard'
					},
					followersList: {
						templateUrl: 'follow/views/followersListBlock.html',
						controller: 'followersListCtrl as followers'
					}
					// Can add more component to the users home page for their blog
				}
			})
			.state('funglr.userBase.user.dash', {
				// This is the users own personal reblogs and posts
				url: 'dash',
				templateUrl: 'dash/views/userDash.html',
				controller: 'userdashCtrl as userDash'
			})
			.state('funglr.userBase.user.liked', {
				// This is the list of blogs the user has liked
				url: 'likes',
				templateUrl: 'user/views/userLikes.html',
				controller: 'userLikeCtrl as liked'
			})
			.state('funglr.userBase.user.followers', {
				// This is the list of blogs that is following this user
				url: 'followers',
				templateUrl: 'follow/views/followers.html',
				controller: 'followersListCtrl as followers'
			})
			.state('funglr.userBase.user.following', {
				// This is the list of blogs that the user is following
				url: 'following',
				templateUrl: 'follow/views/following.html',
				controller: 'followingListCtrl as following'
			})
			.state('funglr.userBase.user.profile', {
				/* 
					this is going to be done last because 
					this is what the world will see when they access the users page 
					This is going to be the hardest part to figure out
				*/
				url: 'profile',
				templateUrl: 'user/views/profile.html',
				controller: 'userProfileCtrl as Profile'
			})
			.state('funglr.userBase.user.activity', {
				/* 
					this is a component that displays all the activity on the users page,
					Mainly focusing on external activties from the users followers on the users page
				*/
				url: 'activty',
				templateUrl: 'user/views/activty.html',
				controller: 'activtyCtrl as activty'
			})
			.state('funglr.userBase.user.inbox', {
				/* 
					Direct Messages between users
				*/
				url: 'inbox',
				templateUrl: 'user/views/inbox.html',
				controller: 'inboxCtrl as inbox'
			})
	}])

}(window))