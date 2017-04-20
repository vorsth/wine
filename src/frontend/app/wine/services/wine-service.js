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
var url_service_1 = require("../../shared/services/url-service");
require("rxjs/add/operator/toPromise");
var WineService = (function () {
    function WineService(http, urlService) {
        this.http = http;
        this.urlService = urlService;
    }
    WineService.prototype.getWineCount = function () {
        return this.http.get(this.urlService.BuildUrl('/wine/metadata'))
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    WineService.prototype.getAllWines = function () {
        return this.http.get(this.urlService.BuildUrl('/wine'))
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    WineService.prototype.getWineDetail = function (wine_id) {
        return this.http.get(this.urlService.BuildUrl('/wine/' + wine_id))
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    WineService.prototype.addWine = function (wine) {
        return this.http.post(this.urlService.BuildUrl('/wine'), wine)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    WineService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return WineService;
}());
WineService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, url_service_1.UrlService])
], WineService);
exports.WineService = WineService;
//# sourceMappingURL=wine-service.js.map