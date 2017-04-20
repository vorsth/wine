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
var wine_1 = require("../models/wine");
var wine_service_1 = require("../services/wine-service");
var auth_service_1 = require("../../auth/services/auth-service");
var NewWineFormComponent = (function () {
    function NewWineFormComponent(wineService, authService) {
        var _this = this;
        this.wineService = wineService;
        this.authService = authService;
        this.loggedIn = false;
        this.ratings = [
            { value: 1, "description": "Terrible Beware Of This One" },
            { value: 2, "description": "Drinkable If It's The Only Option" },
            { value: 3, "description": "Mediocre. Won't Mind Drinking Again" },
            { value: 4, "description": "Good. Would Like To Have This Again" },
            { value: 5, "description": "Spectacular! Buy At Any Chance" },
        ];
        this.submitted = false;
        this.model = new wine_1.Wine(0, "", 0, "", "", "", 0);
        authService.check().subscribe(function (logInStatus) { console.log("WS: success" + logInStatus); _this.loggedIn = logInStatus; }, function () { return console.log("WS: fail"); }, function () { return console.log("WS: complete"); });
    }
    NewWineFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.wineService.addWine(this.model);
        console.log("Submitting");
        console.log(this.model);
    };
    NewWineFormComponent.prototype.toString = function () {
        return JSON.stringify(this.model);
    };
    return NewWineFormComponent;
}());
NewWineFormComponent = __decorate([
    core_1.Component({
        selector: 'new-wine-form',
        templateUrl: './new-wine-form.html'
    }),
    __metadata("design:paramtypes", [wine_service_1.WineService, auth_service_1.AuthService])
], NewWineFormComponent);
exports.NewWineFormComponent = NewWineFormComponent;
//# sourceMappingURL=new-wine-form.js.map