usernames = new Mongo.Collection('usernames');

usernames.attachSchema(
    new SimpleSchema({
    title: {
      type: String
    },
    content: {
      type: Number
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    },
    address: {
      type: String
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  usernames.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}
