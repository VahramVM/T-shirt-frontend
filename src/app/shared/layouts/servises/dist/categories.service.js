"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriesService = void 0;
var core_1 = require("@angular/core");
var CategoriesService = /** @class */ (function () {
    function CategoriesService(http) {
        this.http = http;
    }
    CategoriesService.prototype.Themes = function (a) {
        return this.http.get('/api/category?name=' + a).pipe();
    };
    CategoriesService.prototype.fetch = function () {
        return this.http.get('/api/category').pipe();
    };
    CategoriesService.prototype.create = function (name, image) {
        var fd = new FormData();
        if (image) {
            fd.append('image', image, image.name);
        }
        fd.append('name', name);
        return this.http.post('/api/category', fd);
    };
    CategoriesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CategoriesService);
    return CategoriesService;
}());
exports.CategoriesService = CategoriesService;
