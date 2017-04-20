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
var Rx_1 = require("rxjs/Rx");
var AuthService = (function () {
    function AuthService() {
        var _this = this;
        this.isLoggedIn = false;
        this.logIn$ = new Rx_1.BehaviorSubject(this.isLoggedIn);
        this.logIn$.asObservable();
        this.externalBS = this.logIn$;
        this.logIn$.subscribe(function () { return console.log("Login Status of user changed to " + _this.isLoggedIn); }, function () { return console.log("error"); }, function () { return console.log("completed"); });
    }
    AuthService.prototype.login = function (id_token) {
        window.localStorage.setItem('id_token', id_token);
        this.isLoggedIn = true;
        this.logIn$.next(this.isLoggedIn);
    };
    AuthService.prototype.logout = function () {
        window.localStorage.setItem('id_token', '');
        this.isLoggedIn = false;
        this.logIn$.next(this.isLoggedIn);
    };
    AuthService.prototype.check = function () {
        return this.externalBS.asObservable().startWith(this.isLoggedIn);
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth-service.js.map