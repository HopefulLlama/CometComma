import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments');

if(Meteor.isServer) {
  Meteor.publish('comments', function commentsPublication() {
    return Comments.find({});
  });
}

Meteor.methods({
  'comments.insert': function(text) {
    check(text, String);

    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    if(text.length > 255) {
    	throw new Meteor.Error('comment-too-long');
    }

    Comments.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  'comments.remove': function(commentId) {
    check(commentId, String);

    const comment = Comments.findOne(commentId);
    if(comment.private && comment.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    
    Comments.remove(commentId);
  }
});