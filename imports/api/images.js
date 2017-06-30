import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const fs = require('fs');
const uploadsDirectory = process.env['METEOR_SHELL_DIR'] + '/../../../.uploads/';

export const Images = new Mongo.Collection('images');

if(Meteor.isServer) {
  Meteor.publish('images', function imagesPublication() {
    return Images.find({});
  });
}

Meteor.methods({
  'images.insert': function(file, fileName, text) {
    check(text, String);
    check(fileName, String);

    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    if(text.length > 255) {
    	throw new Meteor.Error('caption-too-long');
    }

		var timestamp = new Date();
		var name = (timestamp.getTime().toString()) + '-' + fileName;
		if(Meteor.isServer) {
  		fs.writeFileSync(uploadsDirectory + name, file, 'binary');
		}
		Images.insert({
			filePath: name,
      caption: text,
      createdAt: timestamp,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  'images.remove': function(image) {
		if(Meteor.isServer) {
  		fs.unlinkSync(uploadsDirectory + image.filePath);
    }
    const imageRecord = Images.findOne(image._id);
    if(Meteor.user().username !== 'hopefulllama') {
      throw new Meteor.Error('not-authorized');
    }
    
    Images.remove(imageRecord._id);
  }
});