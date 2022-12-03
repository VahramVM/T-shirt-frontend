"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShopingPageComponent = void 0;
var core_1 = require("@angular/core");
var ShopingPageComponent = /** @class */ (function () {
    function ShopingPageComponent(order) {
        this.order = order;
        this.colorDefoult = this.order.orderDatas.colorDefoult;
        this.props = {
            productTypeName: this.order.orderDatas.productTypeName,
            brendName: this.order.orderDatas.brendName,
            productColor: this.order.orderDatas.productColor,
            colorDefoult: this.order.orderDatas.colorDefoult,
            productSize: this.order.orderDatas.productSize
        };
    }
    ShopingPageComponent.prototype.ngOnInit = function () {
        var image = new Image();
        image.src = this.order.imageSrc;
        this.imageSrc = this.order.imageSrc;
        console.log(this.props);
    };
    ShopingPageComponent = __decorate([
        core_1.Component({
            selector: 'app-shoping-page',
            templateUrl: './shoping-page.component.html',
            styleUrls: ['./shoping-page.component.scss']
        })
    ], ShopingPageComponent);
    return ShopingPageComponent;
}());
exports.ShopingPageComponent = ShopingPageComponent;
