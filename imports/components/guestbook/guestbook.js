import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Comments } from '../../api/comments.js';
import { Meteor } from 'meteor/meteor';

import template from './guestbook.html';

class GuestbookCtrl {
	constructor($scope) {
		$scope.viewModel(this);

		this.subscribe('comments');

		this.newComment = '';

		this.helpers({
			comments() {
				return Comments.find({}, {
					sort: {
						createdAt: -1
					}
				});
			},
			currentUser() {
				return Meteor.user();
			}
		});
	}

	addComment(newComment) {
		Meteor.call('comments.insert', newComment);
		this.newComment = '';
	}

	removeComment(comment) {
		Meteor.call('comments.remove', comment._id);
	}
}

export default angular.module('guestbook', [
	angularMeteor
])
.component('guestbook', {
	templateUrl: template,
	controller: ['$scope', GuestbookCtrl]
});