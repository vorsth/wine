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
var UrlService = (function () {
    function UrlService() {
        this.ApiUrl = "api";
    }
    UrlService.prototype.BuildUrl = function (route, params) {
        var url = this.ApiUrl + route;
        if (params) {
            var paramsList = [];
            paramsList.push('wine_id=' + params.wine_id);
            url += '?' + paramsList.join('&');
        }
        console.log("URL:" + url);
        return url;
    };
    return UrlService;
}());
UrlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url-service.js.map