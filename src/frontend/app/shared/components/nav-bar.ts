import { Component } from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.html'
})
export class NavBarComponent {
  constructor(){

  }

  private myClientId: string  = '360458871723-f4mqrclsfh0hke6f1vbc0a60snimfkk6.apps.googleusercontent.com';

  onGoogleSignInSuccess(event: GoogleSignInSuccess) : void {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' +
      profile
        .getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
  }
}
