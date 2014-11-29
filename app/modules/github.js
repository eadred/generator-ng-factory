'use strict';

var Promise = require('bluebird');
var needle = Promise.promisifyAll(require('needle'));
var semver = require('semver');
var oauth = '?client_id=a94e588ae95b43ffc6d6&client_secret=33b3c27b055c548b5077377abf0cd8ad29cdc89d';

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
    return body.items[0].login;
  });
};