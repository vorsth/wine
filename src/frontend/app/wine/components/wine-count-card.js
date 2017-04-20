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
var wine_service_1 = require("../services/wine-service");
var auth_service_1 = require("../../auth/services/auth-service");
var WineCountCardComponent = (function () {
    function WineCountCardComponent(wineService, authService, zone) {
        var _this = this;
        this.wineService = wineService;
        this.authService = authService;
        this.zone = zone;
        this.IsLoggedIn = false;
        this.wineService.getWineCount().then(function (bc) { return _this.bottleCount = bc; });
        this.authService.check().subscribe(function (s) { _this.zone.run(function () { _this.IsLoggedIn = s; }); }, function (f) { return console.log("Check F: " + f); }, function (c) { return console.log("Check C: " + c); });
    }
    return WineCountCardComponent;
}());
WineCountCardComponent = __decorate([
    core_1.Component({
        selector: 'wine-count-card',
        templateUrl: './wine-count-card.html'
    }),
    __metadata("design:paramtypes", [wine_service_1.WineService, auth_service_1.AuthService, core_1.NgZone])
], WineCountCardComponent);
exports.WineCountCardComponent = WineCountCardComponent;
//# sourceMappingURL=wine-count-card.js.map