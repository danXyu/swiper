Template.home.helpers({
  'activeUser' : function () {
    return Session.get('user') != null;
  },
  'semanticElement' : function () {
    return [
      { 'what' : 'Large Buttons', 'withBootstrap' : 'btn btn-lg', 'withSemanticUI' : 'ui large button' },
      { 'what' : 'One column', 'withBootstrap' : 'col-md-1', 'withSemanticUI' : 'one wide column' },
      { 'what' : 'Vertical Menu / Navigation', 'withBootstrap' : 'nav nav-pills', 'withSemanticUI' : 'ui vertical menu' }

    ];
  },
  'bootstrapCode' : function () {
    return '<div class="btn btn-primary btn-lg"></div>';
  }
});

Template.home.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var usernamesProperties = {
      title: 'user',
      content: $(e.target).find('[name=username]').val(),
      createdAt: new Date()
    };

    usernames.insert(usernamesProperties, function(error) {
      if (error) {
        // display the error to the user
        console.log(error);
      } else {
        //Router.go('postPage', {_id: currentPostId});
        console.log("This worked");
        Session.set('user', usernamesProperties.content);
        Router.go('/');
      }
    });
  }
});
