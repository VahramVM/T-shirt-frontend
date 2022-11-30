"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SizeFormatComponent = void 0;
var core_1 = require("@angular/core");
var SizeFormatComponent = /** @class */ (function () {
    function SizeFormatComponent(dataService, siteLayout) {
        this.dataService = dataService;
        this.siteLayout = siteLayout;
        this.selectOpen = false;
        this.counter = 0;
        this.upDown = null;
        this.canvasSelect = null;
        this.scaleBlock = false;
        this.formatValue = 'A4';
        this.horVert = true;
        this.endPrise = 0;
        this.obj = { objectWidth: null, objectWidthHeight: null, topUpDown: 0 };
        this.canvasHtmlWidth = this.dataService.canvasHtmlWidth;
        this.canvasHtmlHeight = this.dataService.canvasHtmlHeight;
        this.canvasSizeFormatTop = this.dataService.canvasSizeFormatTop;
        this.canvasCenteredPosition = this.dataService.canvasCenteredPosition;
        this.canvasSizeFormatWidth = this.dataService.canvasSizeFormatWidth;
        this.canvasSizeFormatHeight = this.dataService.canvasSizeFormatHeight;
        this.canvasSizeFormatLeft = this.dataService.canvasSizeFormatLeft;
        this.sizePrintKey = this.dataService.sizePrintKey;
        this.formatWithHeight = this.dataService.formatWithHeight;
        this.positionTopKey = this.dataService.formatTopKey;
        this.objectWidth = this.dataService.sizePrintKey;
        this.objectWidthHeight = this.dataService.formatWithHeight;
        this.scaleKey = this.dataService.scaleKey;
        this.getUpdatedMessage();
    }
    ;
    SizeFormatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.canvasDivSelect.subscribe(function (res) {
            _this.canvasSelect = res;
            // console.log(res);
            _this.setFormatHeightTop();
        });
        // this.canvas.setHeight(this.canvasHtmlHeight);
        // this.canv = this.dataService.canvasSelect
    };
    SizeFormatComponent.prototype.getUpdatedMessage = function () {
        var _this = this;
        this.dataService.formatA4Horizontal.subscribe(function (res) {
            _this.sizePrintKey = res;
            // console.log(res);
            _this.setFormatHeightTop();
        });
        this.dataService.scaleKeyy.subscribe(function (res) {
            _this.scaleKey = res;
            console.log(res);
            _this.setFormatHeightTop();
        });
        this.dataService.formatA4Vertical.subscribe(function (res) {
            _this.formatWithHeight = res;
            // console.log(res);
            _this.setFormatHeightTop();
        });
        this.dataService.formatTop.subscribe(function (res) {
            _this.positionTopKey = res;
            // console.log(res);
            _this.setFormatHeightTop();
        });
        this.dataService.endPriseValue.subscribe(function (res) {
            _this.endPrise = res;
            // console.log(res);
            _this.setFormatHeightTop();
        });
        this.setFormatHeightTop();
    };
    SizeFormatComponent.prototype.changePosition = function () {
        this.siteLayout.moveWithFormat(this.scaleKey, this.scaleBlock);
    };
    SizeFormatComponent.prototype.formatA4H = function () {
        // this.counter = 0;
        this.dataService.horVert = this.horVert = true;
        this.dataService.formatValue = this.formatValue;
        this.scaleBlock = true;
        this.changePosition();
        this.obj.objectWidthHeight = this.objectWidthHeight = 1.414 / 2;
        this.dataService.formatSizeSwich();
        // this.sizePrintKey = 686 / ((686 - 297) / 2);
        // this.dataService.scaleKey = this.canvasSizeFormatWidth / 145;
        // this.obj.objectWidth = this.objectWidth = this.dataService.sizePrintKey;
        // this.obj.topUpDown = 0;
        this.scaleBlock = false;
    };
    SizeFormatComponent.prototype.formatA4V = function () {
        // this.counter = 0;
        this.dataService.horVert = this.horVert = false;
        // this.scaleKey = 2.3;
        this.dataService.formatValue = this.formatValue;
        this.scaleBlock = true;
        this.changePosition();
        this.obj.objectWidthHeight = this.objectWidthHeight = 1.414;
        this.dataService.formatSizeSwich();
        // const cafficient = 1.0229;
        // this.sizePrintKey = 686 * cafficient / ((686 - 210) / 2);
        // this.dataService.scaleKey = this.canvasSizeFormatWidth / 55;
        // this.obj.objectWidth = this.objectWidth = this.dataService.sizePrintKey;
        // this.obj.topUpDown = 0.07;
        this.scaleBlock = false;
    };
    SizeFormatComponent.prototype.counterNum = function () {
        // this.counter = 0;
        if (this.upDown) {
            return this.counter = 0.05;
        }
        else {
            return this.counter = -0.05;
        }
    };
    SizeFormatComponent.prototype.counterTop = function () {
        this.obj.objectWidth = this.objectWidth;
        this.obj.objectWidthHeight = this.objectWidthHeight;
        this.obj.topUpDown += this.counterNum();
    };
    SizeFormatComponent.prototype.setformatScale = function () {
        // this.dataService.sizePrintKey = this.obj.objectWidth;
        this.dataService.formatWithHeight = this.obj.objectWidthHeight;
        this.dataService.formatTopKey = this.obj.topUpDown;
        this.dataService.calcEndPrise();
    };
    SizeFormatComponent.prototype.onResize = function () {
        this.dataService.initCalculations();
        // this.counterTop();
        this.formatA4V();
        this.formatA4H();
        // this.setformatScale();
        // this.getUpdatedMessage();
        // this.counterNum();
        this.canvasHtmlWidth = this.dataService.canvasHtmlWidth;
        this.canvasHtmlHeight = this.dataService.canvasHtmlHeight;
        this.canvasCenteredPosition = this.dataService.canvasCenteredPosition;
        this.canvasSizeFormatWidth = this.dataService.canvasSizeFormatWidth;
        this.canvasSizeFormatHeight = this.dataService.canvasSizeFormatHeight;
        this.canvasSizeFormatTop = this.dataService.canvasSizeFormatTop;
        this.canvasSizeFormatLeft = this.dataService.canvasSizeFormatLeft;
        this.siteLayout.moveWithFormat(this.scaleKey, true);
    };
    SizeFormatComponent.prototype.setFormatHeightTop = function () {
        // this.dataService.formatTopKey = 0.5;
        var positionTopKey = this.canvasHtmlWidth * this.positionTopKey;
        this.canvasSizeFormatWidth = this.canvasHtmlWidth - 2 * (this.canvasHtmlWidth / this.sizePrintKey + this.canvasHtmlWidth / 40);
        // console.log('width', this.canvasSizeFormatWidth);
        this.canvasSizeFormatTop = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey - positionTopKey;
        this.canvasSizeFormatHeight = this.canvasSizeFormatWidth * this.formatWithHeight;
        // console.log('height', this.canvasSizeFormatHeight);
        this.canvasSizeFormatLeft = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey;
        this.canvasCenteredPosition = window.innerWidth / this.dataService.positionKey;
    };
    SizeFormatComponent = __decorate([
        core_1.Component({
            selector: 'app-size-format',
            templateUrl: './size-format.component.html',
            styleUrls: ['./size-format.component.scss']
        })
    ], SizeFormatComponent);
    return SizeFormatComponent;
}());
exports.SizeFormatComponent = SizeFormatComponent;
