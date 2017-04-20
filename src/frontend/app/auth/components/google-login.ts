import { Component, AfterViewInit, ChangeDetectionStrategy, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from '../../shared/services/cookie-service';
import { UrlService } from '../../shared/services/url-service';
import { AuthService } from '../services/auth-service';

export class GoogleLoginSuccess {
    public googleUser: gapi.auth2.GoogleUser;

    constructor(googleUser: gapi.auth2.GoogleUser,
                private http: Http,
                private authService: AuthService,
                private urlService: UrlService,
                private cookieService: CookieService){
        this.googleUser = googleUser;
        this.sendToken(googleUser.getAuthResponse().id_token);
    }

    private handleError(error: any) : Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private sendToken(id_token: string) : Promise<any> {
        this.cookieService.set('google_signin_token', id_token);
        return this.http.post(this.urlService.BuildUrl('/auth/tokensignin'), {'idtoken': id_token})
                 .toPromise()
                 .then(response => {
                     console.log('Token Verified ' + response);
                     return response;
                 })
                 .catch(error => {
                     console.log('Token Error ' + error);
                     return error;
                 });

/*
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
*/
    }
}

export class GoogleLoginFailure {
}

@Component({
    selector: 'google-login',
    templateUrl: './google-login.html'
})
export class GoogleLoginComponent implements AfterViewInit {
    private id: string = 'google-signin2';
    public IsLoggedIn : boolean = false;

    // Render options
    @Input() private scope: string;

    private _width: number;
    get width(): string {
        return this._width.toString();
    }
    @Input() set width(value: string){
        this._width= Number(value);
    }

    private _height: number;
    get height(): string{
        return this._height.toString();
    }
    @Input() set height(value: string){
        this._height = Number(value);
    }

    private _longTitle: boolean;
    get longTitle(): string {
        return this._longTitle.toString();
    }
    @Input() set longTitle(value: string){
        this._longTitle = Boolean(value);
    }

    @Input() private theme: string;

    // Init params
    @Input() private clientId : string;
    @Input() private cookiePolicy: string;

    private _fetchBasicProfile: boolean;
    get fetchBasicProfile(): boolean {
        return this._fetchBasicProfile;
    }
    @Input() set fetchBasicProfile(value: boolean){
        this._fetchBasicProfile = value;
    }

    @Input() private hostedDomain: string;
    @Input() private openidRealm: string;

    @Output() googleLoginSuccess: EventEmitter<GoogleLoginSuccess> = new EventEmitter<GoogleLoginSuccess>();
    @Output() googleLoginFailure: EventEmitter<GoogleLoginFailure> = new EventEmitter<GoogleLoginFailure>();

    ngAfterViewInit(){
        this.auth2Init();
        this.renderSignInButton();
    }

    private auth2Init(){
        if(this.clientId == null){
            throw new Error('clientId propery is necessary. (<google-login [clientId]="..."></google-login>)');
        }

        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: this.clientId,
                cookie_policy: this.cookiePolicy,
                fetch_basic_profile: this.fetchBasicProfile,
                hosted_domain: this.hostedDomain,
                openid_realm: this.openidRealm
            });
        });
    }

    private handleFailure(){
        this.googleLoginFailure.next(new GoogleLoginFailure());
    }

    private handleSuccess(googleUser: gapi.auth2.GoogleUser){
        console.log("handle Success");
        this.googleLoginSuccess.next(
            new GoogleLoginSuccess(
                googleUser,
                this.http,
                this.authService,
                this.urlService,
                this.cookieService
            ));
        this.authService.login(true);
        this.authService.check().subscribe(
            (s : boolean) => { this.zone.run( () => { this.IsLoggedIn = s; } )},
            (f : any) => console.log("Check F: " + f),
            (c : any) => console.log("Check C: " + c)
        );
    }

    private renderSignInButton(){
        gapi.signin2.render(
            this.id, {
                scope: this.scope,
                width: this._width,
                height: this._height,
                longtitle: this._longTitle,
                theme: this.theme,
                onsuccess: (googleUser: gapi.auth2.GoogleUser) => this.handleSuccess(googleUser),
                onfailure: () => this.handleFailure()
            });
    }

    private logout(){
        console.log("Log Out");
        gapi.auth2.getAuthInstance().signOut();
        this.authService.logout();
    }
    
    ngOnInit(){
    }

    constructor(private http: Http,
                private authService: AuthService,
                private urlService: UrlService,
                private cookieService: CookieService,
                private zone: NgZone){
    }

}