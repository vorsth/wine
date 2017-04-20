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
var auth_service_1 = require("../../auth/services/auth-service");
var UserCardComponent = (function () {
    function UserCardComponent(authService, zone) {
        var _this = this;
        this.authService = authService;
        this.zone = zone;
        this.IsLoggedIn = false;
        this.authService.check().subscribe(function (success) { _this.zone.run(function () { return _this.IsLoggedIn = success; }); }, function (failure) { return console.log("Check F: " + failure); }, function (complete) { return console.log("Check C: " + complete); });
    }
    return UserCardComponent;
}());
UserCardComponent = __decorate([
    core_1.Component({
        selector: 'user-card',
        templateUrl: './user-card.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, core_1.NgZone])
], UserCardComponent);
exports.UserCardComponent = UserCardComponent;
//# sourceMappingURL=user-card.js.map