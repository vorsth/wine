function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  sendToken(googleUser.getAuthResponse().id_token);
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      console.log('User signed out.');
  });
}

function sendToken(id_token){
  $.post('/tokensignin', {idtoken: id_token} )
      .done( function(data) {
         console.log('Token Verified ' + data);
      })
      .fail( function(data) {
         console.log('Token not verified');
      });
}
