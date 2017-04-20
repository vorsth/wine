"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var cookie_service_1 = require("../../shared/services/cookie-service");
var url_service_1 = require("../../shared/services/url-service");
var auth_service_1 = require("../services/auth-service");
var GoogleLoginSuccess = (function () {
    function GoogleLoginSuccess(googleUser, http, authService, urlService, cookieService) {
        this.http = http;
        this.authService = authService;
        this.urlService = urlService;
        this.cookieService = cookieService;
        this.googleUser = googleUser;
        this.sendToken(googleUser.getAuthResponse().id_token);
    }
    GoogleLoginSuccess.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    GoogleLoginSuccess.prototype.sendToken = function (id_token) {
        this.cookieService.set('google_signin_token', id_token);
        return this.http.post(this.urlService.BuildUrl('/auth/tokensignin'), { 'idtoken': id_token })
            .toPromise()
            .then(function (response) {
            console.log('Token Verified ' + response);
            return response;
        })
            .catch(function (error) {
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
    };
    return GoogleLoginSuccess;
}());
exports.GoogleLoginSuccess = GoogleLoginSuccess;
var GoogleLoginFailure = (function () {
    function GoogleLoginFailure() {
    }
    return GoogleLoginFailure;
}());
exports.GoogleLoginFailure = GoogleLoginFailure;
var GoogleLoginComponent = (function () {
    function GoogleLoginComponent(http, authService, urlService, cookieService, zone) {
        this.http = http;
        this.authService = authService;
        this.urlService = urlService;
        this.cookieService = cookieService;
        this.zone = zone;
        this.id = 'google-signin2';
        this.IsLoggedIn = false;
        this.googleLoginSuccess = new core_1.EventEmitter();
        this.googleLoginFailure = new core_1.EventEmitter();
    }
    Object.defineProperty(GoogleLoginComponent.prototype, "width", {
        get: function () {
            return this._width.toString();
        },
        set: function (value) {
            this._width = Number(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleLoginComponent.prototype, "height", {
        get: function () {
            return this._height.toString();
        },
        set: function (value) {
            this._height = Number(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleLoginComponent.prototype, "longTitle", {
        get: function () {
            return this._longTitle.toString();
        },
        set: function (value) {
            this._longTitle = Boolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleLoginComponent.prototype, "fetchBasicProfile", {
        get: function () {
            return this._fetchBasicProfile;
        },
        set: function (value) {
            this._fetchBasicProfile = value;
        },
        enumerable: true,
        configurable: true
    });
    GoogleLoginComponent.prototype.ngAfterViewInit = function () {
        this.auth2Init();
        this.renderSignInButton();
    };
    GoogleLoginComponent.prototype.auth2Init = function () {
        var _this = this;
        if (this.clientId == null) {
            throw new Error('clientId propery is necessary. (<google-login [clientId]="..."></google-login>)');
        }
        gapi.load('auth2', function () {
            gapi.auth2.init({
                client_id: _this.clientId,
                cookie_policy: _this.cookiePolicy,
                fetch_basic_profile: _this.fetchBasicProfile,
                hosted_domain: _this.hostedDomain,
                openid_realm: _this.openidRealm
            });
        });
    };
    GoogleLoginComponent.prototype.handleFailure = function () {
        this.googleLoginFailure.next(new GoogleLoginFailure());
    };
    GoogleLoginComponent.prototype.handleSuccess = function (googleUser) {
        var _this = this;
        console.log("handle Success");
        this.googleLoginSuccess.next(new GoogleLoginSuccess(googleUser, this.http, this.authService, this.urlService, this.cookieService));
        this.authService.login(true);
        this.authService.check().subscribe(function (s) { _this.zone.run(function () { _this.IsLoggedIn = s; }); }, function (f) { return console.log("Check F: " + f); }, function (c) { return console.log("Check C: " + c); });
    };
    GoogleLoginComponent.prototype.renderSignInButton = function () {
        var _this = this;
        gapi.signin2.render(this.id, {
            scope: this.scope,
            width: this._width,
            height: this._height,
            longtitle: this._longTitle,
            theme: this.theme,
            onsuccess: function (googleUser) { return _this.handleSuccess(googleUser); },
            onfailure: function () { return _this.handleFailure(); }
        });
    };
    GoogleLoginComponent.prototype.logout = function () {
        console.log("Log Out");
        gapi.auth2.getAuthInstance().signOut();
        this.authService.logout();
    };
    GoogleLoginComponent.prototype.ngOnInit = function () {
    };
    return GoogleLoginComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GoogleLoginComponent.prototype, "scope", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], GoogleLoginComponent.prototype, "width", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], GoogleLoginComponent.prototype, "height", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], GoogleLoginComponent.prototype, "longTitle", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GoogleLoginComponent.prototype, "theme", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GoogleLoginComponent.prototype, "clientId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GoogleLoginComponent.prototype, "cookiePolicy", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], GoogleLoginComponent.prototype, "fetchBasicProfile", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GoogleLoginComponent.prototype, "hostedDomain", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GoogleLoginComponent.prototype, "openidRealm", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GoogleLoginComponent.prototype, "googleLoginSuccess", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GoogleLoginComponent.prototype, "googleLoginFailure", void 0);
GoogleLoginComponent = __decorate([
    core_1.Component({
        selector: 'google-login',
        templateUrl: './google-login.html'
    }),
    __metadata("design:paramtypes", [http_1.Http,
        auth_service_1.AuthService,
        url_service_1.UrlService,
        cookie_service_1.CookieService,
        core_1.NgZone])
], GoogleLoginComponent);
exports.GoogleLoginComponent = GoogleLoginComponent;
//# sourceMappingURL=google-login.js.map