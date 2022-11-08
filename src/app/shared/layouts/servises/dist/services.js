"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthServices = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var AuthServices = /** @class */ (function () {
    function AuthServices(http) {
        this.http = http;
        this.token = null;
    }
    AuthServices.prototype.sendEmail = function (url, data) {
        return this.http.post(url, data).subscribe(function (data) {
            var res = data;
            console.log('scssessfuli');
        });
    };
    ;
    AuthServices.prototype.data = function () {
        return this.http.get('api/category').pipe();
    };
    AuthServices.prototype.register = function (user) {
        return this.http.post('http://localhost:5000/api/auth/register', user);
    };
    AuthServices.prototype.login = function (user) {
        var _this = this;
        return this.http.post('http://localhost:5000/api/auth/login', user).
            pipe(operators_1.tap(function (_a) {
            var token = _a.token;
            localStorage.setItem('auth-token', token);
            _this.setToken(token);
        }));
    };
    AuthServices.prototype.setToken = function (token) {
        this.token = token;
    };
    AuthServices.prototype.getToken = function () {
        return this.token;
    };
    AuthServices.prototype.isAuthenticaded = function () {
        return !!this.token;
    };
    AuthServices.prototype.logout = function () {
        this.setToken(null);
        localStorage.clear();
    };
    AuthServices = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthServices);
    return AuthServices;
}());
exports.AuthServices = AuthServices;
