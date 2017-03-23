define(['cookie'], function(cookie){

  var GoogleAuth = function(){
    return window.gapi.auth2.getAuthInstance();
  }

  var GoogleUser = function(){
    return GoogleAuth().currentUser.get();
  }

  var CurrentToken = function(){
    return GoogleUser().getAuthResponse().id_token;
  }

  var User = function(){
    var profile = GoogleUser().getBasicProfile();
    return {
      'name': profile.getName(),
      'image': profile.getImageUrl(),
      'email': profile.getEmail()
    };
  }

  var onSignIn = function(googleUser) {
      console.log('Signing in...');
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      sendToken(googleUser.getAuthResponse().id_token);
  }

  var onSignInFail = function(){
    GoogleAuth().signOut().then(function () {
        console.log('User signed out.');
    });
  }
  
  var onSignOut = function() {
    GoogleAuth().signOut().then(function () {
        console.log('User signed out.');
        cookie.setCookie('google_signin_token','',0);
        window.location.replace('/');
    });
  }
  
  function sendToken(id_token){
    cookie.setCookie('google_signin_token',id_token,1);
    $.post('/auth/tokensignin', {idtoken: id_token} )
      .done( function(data) {
        if(data == 'SUCCESS'){
          console.log('Token Verified ' + data);
          // Redirect to index, with token
          window.location.replace('/');
        } else if (data == 'PASS'){
          console.log('Token not available');
        }
      })
      .fail( function(data) {
        onSignOut();
        console.log('Token not verified');
      });
  }
  
  var Initialize = function(){
    window.gapi.load('auth2', function(){
      window.gapi.auth2.init();

      //if(window.localStorage.getItem('google_signin_token') == null){
      if(cookie.getCookie('google_signin_token') == ""){
        gapi.signin2.render('GoogleSignInButton', {
          scope: 'profile',
          onsuccess: onSignIn,
          onfailure: onSignInFail
        });
      }else{
        $("#GoogleSignInButton").html("<a id='signoutbutton' href='#'>SIGNOUT</a>");
        $("#signoutbutton").on('click', onSignOut);
      }
    });

  }

  return {
    initialize: Initialize,
    currentToken: CurrentToken,
    user: User,
    signOut: onSignOut
  }
});
