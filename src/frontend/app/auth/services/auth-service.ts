import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';

@Injectable()
export class AuthService {
  public isLoggedIn: boolean = false;
  logIn$: Subject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn);
  externalBS : any;

  constructor(){
    this.logIn$.asObservable();
    this.externalBS = this.logIn$;
    this.logIn$.subscribe( 
      () => console.log("Login Status of user changed to " + this.isLoggedIn),
      () => console.log("error"),
      () => console.log("completed")
    );
  }

  login(id_token : any){
    window.localStorage.setItem('id_token', id_token);
    this.isLoggedIn = true;
    this.logIn$.next(this.isLoggedIn);
  }

  logout(){
    if(this.isLoggedIn){
      window.localStorage.setItem('id_token','');
      this.isLoggedIn = false;
      this.logIn$.next(this.isLoggedIn);
    }
  }

  check() {
    return this.externalBS.asObservable().startWith(this.isLoggedIn);
  }
  /*
    private GoogleAuth = gapi.auth2.getAuthInstance();
    private GoogleUser = this.GoogleAuth.currentUser.get();
    private CurrentToken = this.GoogleUser.getAuthResponse().id_token;
    private GetUser() : User {
        var profile = this.GoogleUser.getBasicProfile();
        return new User(profile.getName(), profile.getEmail(), profile.getImageUrl());
    }

    constructor() {
      window.gapi.load('auth2', function(){
        window.gapi.auth2.init();

        //if(window.localStorage.getItem('google_signin_token') == null){
        if(cookie.getCookie('google_signin_token') == ""){
          gapi.signin2.render('GoogleSignInButton', {
            scope: 'profile',
            onsuccess: this.onSignIn,
            onfailure: this.onSignInFail
          });
        } else {
          $("#GoogleSignInButton").html("<a class='btn btn-primary' id='signoutbutton' href='#'>SIGNOUT</a>");
          $("#signoutbutton").on('click', onSignOut);
        }
      });
    }

    public onSignIn : void = function(googleUser){
      console.log('Signing in...');
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      sendToken(googleUser.getAuthResponse().id_token);
    }

    public onSignInFail() : void {
      GoogleAuth().signOut().then(function () {
        console.log('User signed out.');
      });
    }
  
    public onSignOut() : void {
      GoogleAuth().signOut().then(function () {
        console.log('User signed out.');
        cookie.setCookie('google_signin_token','',0);
        window.location.replace('/');
     });
    }
  
    private sendToken(id_token) : void {
      cookie.setCookie('google_signin_token',id_token,1);
      $.post('/api/auth/tokensignin', {idtoken: id_token} )
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
    */
}
