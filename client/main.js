import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularRouter from 'angular-ui-router';

import './main.html';
import home from '../templates/home.html';

export default angular.module('CommaBeanApp', [
	angularMeteor,
	angularRouter
])
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: home,
		controller: 'HomeCtrl'
	})
})
.controller('HomeCtrl', ['$scope', function($scope) {
	function Thing(css, header, body) {
		this.css = css;
		this.header = header;
		this.body = body;
	}

	$scope.things = [
		new Thing('euro', 'European', 'I am a classy French dog! I don\'t think I know how to speak any French though.'),
		new Thing('resize-small', 'Small', 'I am the runt of my litter. I am the size of two bags of sugar, and I weigh about that too.'),
		new Thing('queen', 'Pineapple Hair', 'I wear my hair in a bobble on the top of my head, like a pineapple. I do this because I am a queen and my bobble is my crown.'),
		new Thing('baby-formula', 'No Teeth', 'I lost all my teeth. I can only eat small bits of food, or soft food. It\'s hard to keep my tongue in my mouth, so I let it hang a lot.')
	];
}]);