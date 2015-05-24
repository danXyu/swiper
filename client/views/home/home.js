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
});
