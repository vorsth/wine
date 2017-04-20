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
var router_1 = require("@angular/router");
var wine_1 = require("../models/wine");
var wine_service_1 = require("../services/wine-service");
require("rxjs/add/operator/switchMap");
var WineDetailComponent = (function () {
    function WineDetailComponent(route, wineService) {
        this.route = route;
        this.wineService = wineService;
        this.wine = new wine_1.Wine(0, "", 0, "", "", "", 0);
        this.comments = [];
    }
    WineDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.wineService.getWineDetail(+params['id']); })
            .subscribe(function (result) {
            _this.wine = result.wine;
            _this.comments = result.comments;
        });
    };
    return WineDetailComponent;
}());
WineDetailComponent = __decorate([
    core_1.Component({
        selector: 'wine-detail',
        templateUrl: './wine-detail.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, wine_service_1.WineService])
], WineDetailComponent);
exports.WineDetailComponent = WineDetailComponent;
//# sourceMappingURL=wine-detail.js.map