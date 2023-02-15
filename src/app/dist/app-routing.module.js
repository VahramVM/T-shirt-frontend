"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_page_component_1 = require("./login-page/login-page.component");
var auth_layout_component_1 = require("./shared/layouts/auth-layout/auth-layout.component");
var register_page_component_1 = require("./register-page/register-page.component");
var site_layout_component_1 = require("./shared/layouts/site-layout/site-layout.component");
var authguard_1 = require("./shared/classes/authguard");
var main_page_component_1 = require("./main-page/main-page.component");
var shoping_page_component_1 = require("./shoping-page/shoping-page.component");
var routes = [
    {
        path: '', component: auth_layout_component_1.AuthLayoutComponent, children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'login', component: login_page_component_1.LoginPageComponent },
            { path: 'register', component: register_page_component_1.RegisterPageComponent },
        ]
    },
    {
        path: '', component: main_page_component_1.MainPageComponent, canActivate: [authguard_1.AuthGuard], children: [
            { path: 'main', component: site_layout_component_1.SiteLayoutComponent, canActivate: [authguard_1.AuthGuard] },
            { path: 'order', component: shoping_page_component_1.ShopingPageComponent, canActivate: [authguard_1.AuthGuard] },
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
