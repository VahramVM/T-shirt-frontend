"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.DataService = void 0;

var core_1 = require("@angular/core");

var rxjs_1 = require("rxjs");

var DataService =
/** @class */
function () {
  /*
     private jorik;
     public get gago(): string {
    return this.jorik;
  }
     public set gago(bobo: string) {
    if (bobo === 'kanach' || bobo === 'rozovi') {
      this.jorik = bobo;
    }
  }
     */
  // const myService = new DataService();
  // myService.gago = 'bobo';
  // myService.setMyGago('gago');
  function DataService(produtsService) {
    // this.sizePrintKey = 686 / ((686 - 297) / 2);
    // this.formatWithHeight = 0.707;
    // this.formatTopKey = 0;
    var _this = this;

    this.produtsService = produtsService;
    this.formatA4Horizontal = new rxjs_1.Subject();
    this.formatA4Vertical = new rxjs_1.Subject();
    this.formatTop = new rxjs_1.Subject();
    this.canvasDivSelect = new rxjs_1.Subject();
    this.scaleKeyy = new rxjs_1.Subject();
    this.endPriseValue = new rxjs_1.Subject();
    this.horVertt = new rxjs_1.Subject();
    this.formatValue1 = new rxjs_1.Subject();
    this.widthKey = 0.67;
    this.heightKey = 1.26;
    this.positionKey = 5.9;
    this.scaleBlock = false;
    this.sizeValue = 'M';
    this.formatValue = 'A4';
    this.products = [];
    this.indexBrandType = 0;
    this.formats = [{
      format: 'A3',
      formatSize: 297,
      formatPrise: 500
    }, {
      format: 'A4',
      formatSize: 297,
      formatPrise: 400
    }, {
      format: 'A5',
      formatSize: 210,
      formatPrise: 300
    }, {
      format: 'A6',
      formatSize: 148,
      formatPrise: 400
    }];
    this.initCalculations();
    this.initFromServer();
    this.produtsService.fetch().subscribe(function (res) {
      _this.products = res;
    });
  }

  Object.defineProperty(DataService.prototype, "sizePrintKey", {
    get: function get() {
      return this._sizePrintKey;
    },
    set: function set(value) {
      this._sizePrintKey = value;
      this.formatA4Horizontal.next(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DataService.prototype, "formatWithHeight", {
    get: function get() {
      return this._formatWithHeight;
    },
    set: function set(value) {
      this._formatWithHeight = value;
      this.formatA4Vertical.next(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DataService.prototype, "formatTopKey", {
    get: function get() {
      return this._formatTopKey;
    },
    set: function set(value) {
      this._formatTopKey = value;
      this.formatTop.next(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DataService.prototype, "canvasSelect", {
    get: function get() {
      return this._canvasSelect;
    },
    set: function set(value) {
      this._canvasSelect = value;
      this.canvasDivSelect.next(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DataService.prototype, "scaleKey", {
    get: function get() {
      return this._scaleKey;
    },
    set: function set(value) {
      this._scaleKey = value;
      this.scaleKeyy.next(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DataService.prototype, "endPrise", {
    get: function get() {
      return this._endPrise;
    },
    set: function set(value) {
      this._endPrise = value;
      this.endPriseValue.next(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DataService.prototype, "horVert", {
    get: function get() {
      return this._horVert;
    },
    set: function set(value) {
      this._horVert = value;
      this.horVertt.next(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DataService.prototype, "formatVal", {
    get: function get() {
      return this._formatVal;
    },
    set: function set(value) {
      this._formatVal = value;
      this.formatValue1.next(value);
    },
    enumerable: false,
    configurable: true
  });

  DataService.prototype.ngOnInit = function () {// this.formatSizeSwich();
  };

  DataService.prototype.formatSizeSwich = function () {
    var realSize = this.products[this.indexBrandType].realSize;
    var cafficient = 1.0229; // const realSizes = { XS: 609, S: 648, M: 686, L: 724, XL: 762, XXL: 800 };
    // const formats = ['A3', 'A4', 'A5'];

    for (var ind = 0; ind < this.formats.length; ind++) {
      for (var i = 0; i < Object.keys(realSize).length; i++) {
        if (this.sizeValue === Object.keys(realSize)[i] && this.formatValue === this.formats[ind].format) {
          if (this.horVert) {
            this.sizePrintKey = Object.values(realSize)[i] / ((Object.values(realSize)[i] - this.formats[ind].formatSize) / 2);
            this.scaleKey = 1;
          } else {
            if (this.horizontalVertical) {
              if (this.formatValue === this.formats[0].format) {
                this.sizePrintKey = Object.values(realSize)[i] * cafficient / ((Object.values(realSize)[i] - this.formats[ind].formatSize) / 2);
                this.scaleKey = 4.5;
              } else {
                this.sizePrintKey = Object.values(realSize)[i] * cafficient / ((Object.values(realSize)[i] - this.formats[ind + 1].formatSize) / 2);
                this.scaleKey = 4.5;
              }
            } else {
              if (this.formatValue === this.formats[0].format) {
                this.sizePrintKey = Object.values(realSize)[i] * cafficient / ((Object.values(realSize)[i] - this.formats[ind].formatSize) / 2);
                this.scaleKey = 2.5;
              } else {
                this.sizePrintKey = Object.values(realSize)[i] * cafficient / ((Object.values(realSize)[i] - this.formats[ind + 1].formatSize) / 2);
                this.scaleKey = 2.5;
              }
            }
          }
        }
      }
    } // if (this.sizeValue === 'XS' && this.formatValue === 'A4') {
    //   if (this.horVert) {
    //     console.log("A4 loook");
    //     this.sizePrintKey = 609 / ((609 - 297) / 2);
    //     this.scaleKey = 1.1;
    //   } else {
    //     this.sizePrintKey = 609 * cafficient / ((609 - 210) / 2);
    //     this.scaleKey = 2.3;
    //   }
    // }
    // if (this.sizeValue === 'S' && this.formatValue === 'A4') {
    //   if (this.horVert) {
    //     this.sizePrintKey = 648 / ((648 - 297) / 2);
    //   } else {
    //     this.sizePrintKey = 648 * cafficient / ((648 - 210) / 2);
    //   }
    // }
    // if (this.sizeValue === 'M' && this.formatValue === 'A4') {
    //   if (this.horVert) {
    //     this.sizePrintKey = 686 / ((686 - 297) / 2);
    //     this.scaleKey = 1.1;
    //   } else {
    //     this.sizePrintKey = 686 * cafficient / ((686 - 210) / 2);
    //     this.scaleKey = 2.3;
    //   }
    // }
    // if (this.sizeValue === 'M' && this.formatValue === 'A5') {
    //   if (this.horVert) {
    //     this.sizePrintKey = 686 / ((686 - 210) / 2);
    //     this.scaleKey = 1.1;
    //   } else {
    //     this.sizePrintKey = 686 * cafficient / ((686 - 148) / 2);
    //     this.scaleKey = 2.3;
    //   }
    // }

  };

  DataService.prototype.calcEndPrise = function () {
    for (var i = 0; i < this.formats.length; i++) {
      if (this.formatValue === this.formats[i].format) {
        this.endPrise = this.formats[i].formatPrise;
        console.log(this.endPrise);
      }
    }
  }; // public allLenght = A3Width +  (canvasWidth - 2* sleeveLenght * cos(45)) + chestWidth - A3


  DataService.prototype.initCalculations = function () {
    this.sizePrintKey = 686 / ((686 - 297) / 2);
    this.formatWithHeight = 0.707; // 0.707

    this.formatTopKey = -0.03;
    this.horVert = true; // if (this.horVert) {
    //   this.scaleKey = 1
    // } else {
    //   console.log('ggggg');
    //   this.scaleKey = 4.3
    // }

    this.scaleKey = 1.1;
    this.canvasHtmlWidth = window.innerWidth - this.widthKey * window.innerWidth;
    this.canvasHtmlHeight = this.canvasHtmlWidth * this.heightKey;
    this.positionTopKey = this.canvasHtmlWidth * this.formatTopKey; // if wont to get up then it must be + in first, else get down -

    this.canvasSizeFormatWidth = this.canvasHtmlWidth - 2 * (this.canvasHtmlWidth / this.sizePrintKey + this.canvasHtmlWidth / 40);
    this.canvasSizeFormatTop = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey - this.positionTopKey;
    this.canvasSizeFormatHeight = this.canvasSizeFormatWidth * this.formatWithHeight;
    this.canvasSizeFormatLeft = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey;
    this.canvasCenteredPosition = window.innerWidth / this.positionKey;
  };

  DataService.prototype.initFromServer = function () {// call server function
  };

  DataService = __decorate([core_1.Injectable({
    providedIn: 'root'
  })], DataService);
  return DataService;
}();

exports.DataService = DataService;