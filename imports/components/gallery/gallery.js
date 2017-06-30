import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Images } from '../../api/images.js';
import { Meteor } from 'meteor/meteor';

import template from './gallery.html';

class GalleryCtrl {
	constructor($scope) {
		$scope.viewModel(this);
		this.subscribe('images');

		this.caption = ''

		this.helpers({
			images() {
				return Images.find({}, {
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

	focusImage(image) {
		this.focussedImage = image;
	}

	uploadImage() {
		var fileReader = new FileReader();
		var file = $('#file-upload')[0].files[0];
		var caption = this.caption;

		fileReader.onload = function(f) {
			Meteor.call('images.insert', f.srcElement.result, file.name, caption);
		};

		fileReader.readAsBinaryString(file);
	}

	deleteImage(image) {
		Meteor.call('images.remove', image);
	}
}

export default angular.module('gallery', [
	angularMeteor
])
.component('gallery', {
	templateUrl: template,
	controller: ['$scope', GalleryCtrl]
});