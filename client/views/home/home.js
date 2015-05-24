var endpoint;
var activeConversation;
var previewMedia;
var accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1zYXQ7dj0xIn0.eyJqdGkiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhLTE0MzI0MTk4MTIiLCJpc3MiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhIiwic3ViIjoiQUM1MGI2MTQ3NmVhM2ZhZDE2YjE4MDkyNmY1ODIxYjk0MiIsIm5iZiI6MTQzMjQxOTgxMiwiZXhwIjoxNDMyNTA2MjEyLCJncmFudHMiOlt7InJlcyI6Imh0dHBzOlwvXC9hcGkudHdpbGlvLmNvbVwvMjAxMC0wNC0wMVwvQWNjb3VudHNcL0FDNTBiNjE0NzZlYTNmYWQxNmIxODA5MjZmNTgyMWI5NDJcL1Rva2Vucy5qc29uIiwiYWN0IjpbIlBPU1QiXX0seyJyZXMiOiJzaXA6cXVpY2tzdGFydEBBQzUwYjYxNDc2ZWEzZmFkMTZiMTgwOTI2ZjU4MjFiOTQyLmVuZHBvaW50LnR3aWxpby5jb20iLCJhY3QiOlsibGlzdGVuIiwiaW52aXRlIl19XX0.nrDhq2BV0ikkvP9ypiMXbx6ygKX8ox33gXHEgdL1rfA";

Template.home.helpers({
  'activeUser' : function () {
    return Session.get('user') != null;
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

        // Show the user his current video and wait.
        Session.set('user', usernamesProperties.content);
        Router.go('/');

        console.log("hello");

        // Create the end point for the application.
        endpoint = Twilio.Endpoint(accessToken);
        endpoint.listen().then(
          function (error) {
            log('Could not connect to Twilio: ' + error.message);
          }
        );
        if (!previewMedia) {
          previewMedia = new Twilio.LocalMedia();
          Twilio.getUserMedia().then(
            function (mediaStream) {
              previewMedia.addStream(mediaStream);
              previewMedia.attach('#local-media');
            },
            function (error) {
              console.error('Unable to access local media', error);
              log('Unable to access Camera and Microphone');
            }
          );
        };
      }
    });
  },
  'click #button-preview': function(e) {
    e.preventDefault();
    console.log(twilioConfig);

  }
});

// successfully connected!
function endpointConnected() {
  document.getElementById('invite-controls').style.display = 'block';
  log("Connected to Twilio. Listening for incoming Invites as '" + endpoint.address + "'");

  endpoint.on('invite', function (invite) {
    log('Incoming invite from: ' + invite.from);
    invite.accept().then(conversationStarted);
  });

  // bind button to create conversation
  document.getElementById('button-invite').onclick = function () {
    var inviteTo = document.getElementById('invite-to').value;

    if (activeConversation) {
      // add a participant
      activeConversation.invite(inviteTo);
    } else {
      // create a conversation
      var options = {};
      if (previewMedia) {
        options.localMedia = previewMedia;
      }
      endpoint.createConversation(inviteTo, options).then(
        conversationStarted,
        function (error) {
          log('Unable to create conversation');
          console.error('Unable to create conversation', error);
        }
      );
    }
  };
};

// conversation is live
function conversationStarted(conversation) {
  log('In an active Conversation');
  activeConversation = conversation;
  // draw local video, if not already previewing
  if (!previewMedia) {
    conversation.localMedia.attach('#local-media');
  }
  // when a participant joins, draw their video on screen
  conversation.on('participantConnected', function (participant) {
    log("Participant '" + participant.address + "' connected");
    participant.media.attach('#remote-media');
  });
  // when a participant disconnects, note in log
  conversation.on('participantDisconnected', function (participant) {
    log("Participant '" + participant.address + "' disconnected");
  });
  // when the conversation ends, stop capturing local video
  conversation.on('ended', function (conversation) {
    log("Connected to Twilio. Listening for incoming Invites as '" + endpoint.address + "'");
    conversation.localMedia.stop();
    conversation.disconnect();
    activeConversation = null;
  });
};