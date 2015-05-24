Meteor.publish('usernames', function () {
  return usernames.find();
});
