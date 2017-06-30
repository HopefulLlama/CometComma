import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRouter from 'angular-ui-router';
import home from '../imports/components/home/home';
import guestbook from '../imports/components/guestbook/guestbook';
import gallery from '../imports/components/gallery/gallery';
import '../imports/startups/accounts-config.js';

// import './main.html';
import homeHtml from '../templates/home.html';
import guestbookHtml from '../templates/guestbook.html';
import galleryHtml from '../templates/gallery.html'

angular.module('CommaBeanApp', [
	angularMeteor,
	angularRouter,
	home.name,
	guestbook.name,
	gallery.name,
	'accounts.ui'
])
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: homeHtml
	})
	.state('guestbook', {
		url: '/guestbook', 
		templateUrl: guestbookHtml
	})
	.state('gallery', {
		url: '/gallery',
		templateUrl: galleryHtml
	});
});