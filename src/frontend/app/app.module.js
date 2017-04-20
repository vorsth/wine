"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var dashboard_1 = require("./dashboard/components/dashboard");
var google_login_1 = require("./auth/components/google-login");
var nav_bar_1 = require("./shared/components/nav-bar");
var user_card_1 = require("./shared/components/user-card");
var new_wine_form_1 = require("./wine/components/new-wine-form");
var wine_count_card_1 = require("./wine/components/wine-count-card");
var wine_list_1 = require("./wine/components/wine-list");
var wine_detail_1 = require("./wine/components/wine-detail");
var auth_service_1 = require("./auth/services/auth-service");
var cookie_service_1 = require("./shared/services/cookie-service");
var url_service_1 = require("./shared/services/url-service");
var wine_service_1 = require("./wine/services/wine-service");
var appRoutes = [
    {
        path: '',
        component: dashboard_1.DashboardComponent
    },
    {
        path: 'wine',
        component: wine_list_1.WineListComponent
    },
    {
        path: 'wine/new',
        component: new_wine_form_1.NewWineFormComponent
    },
    {
        path: 'wine/:id',
        component: wine_detail_1.WineDetailComponent
    },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot(appRoutes)
        ],
        declarations: [
            app_component_1.AppComponent,
            dashboard_1.DashboardComponent,
            nav_bar_1.NavBarComponent,
            user_card_1.UserCardComponent,
            wine_count_card_1.WineCountCardComponent,
            wine_list_1.WineListComponent,
            wine_detail_1.WineDetailComponent,
            new_wine_form_1.NewWineFormComponent,
            google_login_1.GoogleLoginComponent
        ],
        providers: [
            auth_service_1.AuthService,
            cookie_service_1.CookieService,
            url_service_1.UrlService,
            wine_service_1.WineService,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map