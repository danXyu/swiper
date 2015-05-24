var endpoint;
var activeConversation;
var previewMedia;
var accessTokens = ["eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1zYXQ7dj0xIn0.eyJqdGkiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhLTE0MzI0MTk4MTIiLCJpc3MiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhIiwic3ViIjoiQUM1MGI2MTQ3NmVhM2ZhZDE2YjE4MDkyNmY1ODIxYjk0MiIsIm5iZiI6MTQzMjQxOTgxMiwiZXhwIjoxNDMyNTA2MjEyLCJncmFudHMiOlt7InJlcyI6Imh0dHBzOlwvXC9hcGkudHdpbGlvLmNvbVwvMjAxMC0wNC0wMVwvQWNjb3VudHNcL0FDNTBiNjE0NzZlYTNmYWQxNmIxODA5MjZmNTgyMWI5NDJcL1Rva2Vucy5qc29uIiwiYWN0IjpbIlBPU1QiXX0seyJyZXMiOiJzaXA6cXVpY2tzdGFydEBBQzUwYjYxNDc2ZWEzZmFkMTZiMTgwOTI2ZjU4MjFiOTQyLmVuZHBvaW50LnR3aWxpby5jb20iLCJhY3QiOlsibGlzdGVuIiwiaW52aXRlIl19XX0.nrDhq2BV0ikkvP9ypiMXbx6ygKX8ox33gXHEgdL1rfA",
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1zYXQ7dj0xIn0.eyJqdGkiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhLTE0MzI0NDE2MDEiLCJpc3MiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhIiwic3ViIjoiQUM1MGI2MTQ3NmVhM2ZhZDE2YjE4MDkyNmY1ODIxYjk0MiIsIm5iZiI6MTQzMjQ0MTYwMSwiZXhwIjoxNDMyNTI4MDAxLCJncmFudHMiOlt7InJlcyI6Imh0dHBzOlwvXC9hcGkudHdpbGlvLmNvbVwvMjAxMC0wNC0wMVwvQWNjb3VudHNcL0FDNTBiNjE0NzZlYTNmYWQxNmIxODA5MjZmNTgyMWI5NDJcL1Rva2Vucy5qc29uIiwiYWN0IjpbIlBPU1QiXX0seyJyZXMiOiJzaXA6cXVpY2tzdGFydEBBQzUwYjYxNDc2ZWEzZmFkMTZiMTgwOTI2ZjU4MjFiOTQyLmVuZHBvaW50LnR3aWxpby5jb20iLCJhY3QiOlsibGlzdGVuIiwiaW52aXRlIl19XX0.xW8K0VDdK8FW6A3mepdCuzBjQL9Jykrvdx8TwGtWwlw",
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1zYXQ7dj0xIn0.eyJqdGkiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhLTE0MzI0NDE2MjIiLCJpc3MiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhIiwic3ViIjoiQUM1MGI2MTQ3NmVhM2ZhZDE2YjE4MDkyNmY1ODIxYjk0MiIsIm5iZiI6MTQzMjQ0MTYyMiwiZXhwIjoxNDMyNTI4MDIyLCJncmFudHMiOlt7InJlcyI6Imh0dHBzOlwvXC9hcGkudHdpbGlvLmNvbVwvMjAxMC0wNC0wMVwvQWNjb3VudHNcL0FDNTBiNjE0NzZlYTNmYWQxNmIxODA5MjZmNTgyMWI5NDJcL1Rva2Vucy5qc29uIiwiYWN0IjpbIlBPU1QiXX0seyJyZXMiOiJzaXA6cXVpY2tzdGFydEBBQzUwYjYxNDc2ZWEzZmFkMTZiMTgwOTI2ZjU4MjFiOTQyLmVuZHBvaW50LnR3aWxpby5jb20iLCJhY3QiOlsibGlzdGVuIiwiaW52aXRlIl19XX0.hclh7BsE6eWYgerGNNKZ4jVHMJRam3cTSz0umPUDJw8",
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1zYXQ7dj0xIn0.eyJqdGkiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhLTE0MzI0NDE2MzciLCJpc3MiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhIiwic3ViIjoiQUM1MGI2MTQ3NmVhM2ZhZDE2YjE4MDkyNmY1ODIxYjk0MiIsIm5iZiI6MTQzMjQ0MTYzNywiZXhwIjoxNDMyNTI4MDM3LCJncmFudHMiOlt7InJlcyI6Imh0dHBzOlwvXC9hcGkudHdpbGlvLmNvbVwvMjAxMC0wNC0wMVwvQWNjb3VudHNcL0FDNTBiNjE0NzZlYTNmYWQxNmIxODA5MjZmNTgyMWI5NDJcL1Rva2Vucy5qc29uIiwiYWN0IjpbIlBPU1QiXX0seyJyZXMiOiJzaXA6cXVpY2tzdGFydEBBQzUwYjYxNDc2ZWEzZmFkMTZiMTgwOTI2ZjU4MjFiOTQyLmVuZHBvaW50LnR3aWxpby5jb20iLCJhY3QiOlsibGlzdGVuIiwiaW52aXRlIl19XX0.S7mQC9cQLjIwcC_fWvod4xhLcfWjOM3_0xEE_youLV4",
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1zYXQ7dj0xIn0.eyJqdGkiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhLTE0MzI0NDE2ODUiLCJpc3MiOiJTSzAyZmFlN2NlNGZmZTU1NTc1YzZhMDdmNTZjMGE5NTlhIiwic3ViIjoiQUM1MGI2MTQ3NmVhM2ZhZDE2YjE4MDkyNmY1ODIxYjk0MiIsIm5iZiI6MTQzMjQ0MTY4NSwiZXhwIjoxNDMyNTI4MDg1LCJncmFudHMiOlt7InJlcyI6Imh0dHBzOlwvXC9hcGkudHdpbGlvLmNvbVwvMjAxMC0wNC0wMVwvQWNjb3VudHNcL0FDNTBiNjE0NzZlYTNmYWQxNmIxODA5MjZmNTgyMWI5NDJcL1Rva2Vucy5qc29uIiwiYWN0IjpbIlBPU1QiXX0seyJyZXMiOiJzaXA6cXVpY2tzdGFydEBBQzUwYjYxNDc2ZWEzZmFkMTZiMTgwOTI2ZjU4MjFiOTQyLmVuZHBvaW50LnR3aWxpby5jb20iLCJhY3QiOlsibGlzdGVuIiwiaW52aXRlIl19XX0._NBJGCYOSfDiCsWG_sQ2GljQI-1EVZPgqWiIdsiBodM"];

Template.home.helpers({
  'activeUser' : function () {
    return Session.get('user') != null;
  }
});

Template.home.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;
    var count = usernames.find().count();
    // Create the end point for the application.
    endpoint = Twilio.Endpoint(accessTokens[count]);
    var usernamesProperties = {
      title: $(e.target).find('[name=username]').val(),
      content: count,
      createdAt: new Date(),
      address: endpoint.address
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

        endpoint.listen().then(
          endpointConnected,
          function () {
            console.log("This worked");
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
  'click #button-invite': function(e) {
    e.preventDefault();

    var randNum = Math.floor(Math.random() * usernames.find().count());
    var person = usernames.findOne({content: randNum});
    console.log(person);
    var inviteTo = person.address;

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
  }
});

// successfully connected!
function endpointConnected() {
  console.log("Connected to Twilio. Listening for incoming Invites as '" + endpoint.address + "'");

  endpoint.on('invite', function (invite) {
    console.log('Incoming invite from: ' + invite.from);
    invite.accept().then(conversationStarted);
  });
};

// conversation is live
function conversationStarted(conversation) {
  console.log('In an active Conversation');
  activeConversation = conversation;
  // draw local video, if not already previewing
  if (!previewMedia) {
    conversation.localMedia.attach('#local-media');
  }
  // when a participant joins, draw their video on screen
  conversation.on('participantConnected', function (participant) {
    console.log("Participant '" + participant.address + "' connected");
    participant.media.attach('#stranger-media');
  });
  // when a participant disconnects, note in log
  conversation.on('participantDisconnected', function (participant) {
    console.log("Participant '" + participant.address + "' disconnected");
  });
  // when the conversation ends, stop capturing local video
  conversation.on('ended', function (conversation) {
    console.log("Connected to Twilio. Listening for incoming Invites as '" + endpoint.address + "'");
    conversation.localMedia.stop();
    conversation.disconnect();
    activeConversation = null;
  });
};