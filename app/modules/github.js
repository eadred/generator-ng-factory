'use strict';

var Promise = require('bluebird');
var needle = Promise.promisifyAll(require('needle'));
var semver = require('semver');
var oauth = '?client_id=a94e588ae95b43ffc6d6&client_secret=f3c4b630065dd0913d6a914bc2226966b1f17690';

exports.tags = function fetchLatestTags(repository, range) {
  return needle.getAsync('https://api.github.com/repos/' + repository + '/tags' + oauth, {compressed: true})
  .spread(function(response, body) {
    return body.map(function(v) { return semver.parse(v.name); }).filter(function(v) {
      if(!v || (range && !semver.satisfies(v, range))) return false;
      return true;
    });
  });
};

exports.user = function fetchUserByUsername(username) {
  return needle.getAsync('https://api.github.com/users/' + username + oauth, {compressed: true})
  .spread(function(response, body) {
    return body;
  });
};

exports.email = function fetchUsernameWithEmail(email) {
  return needle.getAsync('https://api.github.com/search/users' + oauth + '&q=' + email + '%20in:email', {compressed: true})
  .spread(function(response, body) {
    return body.items && body.items[0] ? body.items[0].login : '';
  });
};
