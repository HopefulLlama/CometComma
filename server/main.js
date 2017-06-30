import { Meteor } from 'meteor/meteor';
import '../imports/api/comments.js';
import '../imports/api/images.js';

const fs = require('fs');
const rootDirectory = process.env['METEOR_SHELL_DIR'] + '/../../..';

Meteor.startup(() => {
  WebApp.connectHandlers.use(function(req, res, next) {
    var re = /^\/uploads\/(.*)$/.exec(req.url);
    if (re !== null) {   // Only handle URLs that start with /uploads/*
      var filePath = rootDirectory + '/.uploads/' + re[1];
      try {
        var data = fs.readFileSync(filePath);
      } catch(e) {
        throw new Meteor.Error('not-found', 404);
      }
      res.writeHead(200, {
        'Content-Type': 'image'
      });
      res.write(data);
      res.end();
    } else {  // Other urls will have default behaviors
      next();
    }
  });
});