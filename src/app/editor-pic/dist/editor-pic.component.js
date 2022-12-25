"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditorPicComponent = void 0;
var core_1 = require("@angular/core");
require("fabric");
var core_2 = require("@angular/core");
var EditorPicComponent = /** @class */ (function () {
    function EditorPicComponent(siteLayout, element, dataService, orderDatas, productsService) {
        var _this = this;
        this.siteLayout = siteLayout;
        this.element = element;
        this.dataService = dataService;
        this.orderDatas = orderDatas;
        this.productsService = productsService;
        // private canvas1: fabric.Canvas;
        this.props = {
            canvasFill: null,
            drawFill: 'green',
            canvasImage: 'assets/img/Trafaret3.1.png',
            id: null,
            opacity: null,
            fill: null,
            fontSize: null,
            charSpacing: null,
            fontWeight: null,
            fontStyle: null,
            textAlign: null,
            fontFamily: null,
            distance: null,
            TextDecoration: '',
            diametr: 300,
            curvedTextLeft: null,
            curvedTextTop: null,
            textCurved: 1,
            inputDisabled: null,
            textStraight: null,
            brandName: ''
        };
        // public canvasHtml1;
        this.textString = '';
        this.url = '';
        this.objectType = false;
        this.globalEditor = false;
        this.textEditor = false;
        this.imageEditor = false;
        this.figureEditor = false;
        this.disableBtn = false;
        this.canvasCount = 0;
        this.canvasCountPNJ = 0;
        //delate button on pictures
        this.left = 10;
        this.top = -11;
        this.widthHeight = 10;
        this.value = null;
        this.id = '';
        this.filterName = '';
        this.imageCoordy = null;
        this.imageCoordxx = null;
        this.imageCoordyy = null;
        this.reqImage = null;
        this.reqImage1 = null;
        this.linkk = false;
        this.drawObject = null;
        // public objWidthLimit = 170;
        // public objHeightLimit = 170;
        this.test = null;
        this.path = null;
        this.svg_text = null;
        this.intCountText = null;
        this.imageFilter = null;
        this.textPadding = 15;
        // public checked = false;
        this.shadow = {
            color: 'rgba(0, 0, 0, 1)',
            blur: 70,
            offsetX: 10,
            offsetY: 10,
            opacity: 0.7,
            fillShadow: true,
            strokeShadow: true
        };
        this.shadowPNJ = {
            color: 'rgba(0, 0, 0, 1)',
            blur: 70,
            offsetX: 10,
            offsetY: 10,
            opacity: 0.7,
            affectStroke: false
        };
        this.shadowFigur = {
            color: 'rgba(0, 0, 0, 1)',
            blur: 10,
            offsetX: 5,
            offsetY: 5,
            opacity: 0.7,
            affectStroke: false
        };
        this.shadowTEXT = {
            color: 'rgba(0, 0, 0, 1)',
            blur: 4,
            offsetX: 5,
            offsetY: 5,
            opacity: 0.7,
            affectStroke: false
        };
        this.productsService.fetch().subscribe(function (res) {
            _this.props.canvasImage = res[1].type;
        });
        // this.props.canvasImage = this.productsService.;
        this.scaleKey = this.dataService.scaleKey;
        this.a = dataService.formatTopKey;
        this.dataService.formatTop.subscribe(function (res) { return _this.a = res; });
        this.b = dataService.sizePrintKey;
        this.dataService.formatA4Horizontal.subscribe(function (res) { return _this.b = res; });
        this.c = dataService.formatWithHeight;
        this.dataService.formatA4Vertical.subscribe(function (res) { return _this.c = res; });
        this.d = dataService.scaleKey;
        this.dataService.scaleKeyy.subscribe(function (res) { return _this.d = res; });
        // this.dataService.canvasCount1.subscribe(
        //   res => this.canvasCount = res      
        // );
        console.log(this.canvasCount);
    }
    EditorPicComponent.prototype.onResize = function (event) {
        // --!
        this.canvas.setWidth(this.siteLayout.canvasHtmlWidth);
        this.canvas.setHeight(this.siteLayout.canvasHtmlHeight);
        // this.canvas.backgroundImage = null;
        this.setCanvasImage();
        this.canvas.renderAll();
        // this.canvas1.setWidth(this.siteLayout.canvasHtmlWidth);
        // this.canvas1.setHeight(this.siteLayout.canvasHtmlHeight);
        // this.setCanvasImage1();
        // this.canvas1.renderAll();
    };
    EditorPicComponent.prototype.defoultUpdate = function () {
        var _this = this;
        $('.owl-theme').on('changed.owl-carousel', function (event) {
            var current = event.item.index;
            _this.id = $(event.target).find(".owl-item").eq(current).find("img").attr('id');
            console.log(_this.id, current);
        });
    };
    EditorPicComponent.prototype.ngOnInit = function () {
    };
    EditorPicComponent.prototype.ngAfterViewInit = function () {
        // setup front side canvas
        // this.props.canvasImage = this.siteLayout.firstBackCanvasImage;
        var _this = this;
        // this.canvas1 = new fabric.Canvas(this.htmlCanvas.nativeElement);
        // this.canvas1.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
        // this.canvas1.setBackgroundImage(this.htmlCanvas.nativeElement, this.canvas1.renderAll.bind(this.canvas1));
        this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue',
            preserveObjectStacking: true,
            selectionDashArray: [7, 6]
        });
        this.canvas.setWidth(this.siteLayout.canvasHtmlWidth);
        this.canvas.setHeight(this.siteLayout.canvasHtmlHeight);
        this.canvas.renderAll();
        // this.canvas1 = new fabric.Canvas(this.htmlCanvas1.nativeElement, {
        //   hoverCursor: 'pointer',
        //   selection: true,
        //   selectionBorderColor: 'blue',
        //   preserveObjectStacking: true,
        // });
        var numLeft = this.left;
        var numTop = this.top;
        this.canvas.on({
            'after:render': function (e) {
                _this.canvas.calcOffset();
            },
            'object:moving': function (e) {
                var obj = e.target;
                obj.setCoords();
                obj.saveState();
                var matrix = e.target.calcTransformMatrix();
                var imageCoordx = matrix[4];
                var imageCoordy = matrix[5];
                _this.siteLayout.imageCoordy = Math.floor(imageCoordy);
                _this.siteLayout.imageCoordx = Math.floor(imageCoordx);
                var moveSizeLimit = _this.canvas.width / _this.b;
                var cornerSize = _this.canvas.width / 40;
                var sumLeft = obj.getBoundingRect().left;
                var sumTop = obj.getBoundingRect().top;
                var sumWidth = obj.getBoundingRect().width;
                var sumHeight = obj.getBoundingRect().height;
                var Delta = _this.canvas.height - 2 * (moveSizeLimit + cornerSize) - (_this.canvas.width - 2 * (moveSizeLimit + cornerSize)) * _this.dataService.formatWithHeight;
                var formatWidth = (_this.canvas.width) - 2 * (moveSizeLimit + cornerSize);
                var formatHeight = formatWidth * _this.dataService.formatWithHeight;
                var angle = Math.abs(((_this.canvas.getActiveObject().angle) * Math.PI) / 180);
                var cos = Math.abs(Math.cos(angle));
                // if (obj.height > obj.canvas.height || obj.width > obj.canvas.width) {
                //   obj.originY;
                //   obj.originX;
                // }
                // top-left  corner
                console.log('fromEditor', _this.dataService.sizePrintKey, _this.b, _this.d);
                if (sumTop < cornerSize + moveSizeLimit - _this.canvas.width * _this.a || sumLeft < cornerSize + moveSizeLimit) {
                    obj.top = Math.max(obj.top, obj.top - sumTop + cornerSize + moveSizeLimit - _this.canvas.width * _this.a);
                    obj.left = Math.max(obj.left, obj.left - sumLeft + (cornerSize + moveSizeLimit));
                }
                // bot-right corner
                if (sumTop + sumHeight + Delta + cornerSize + moveSizeLimit + _this.canvas.width * _this.a > obj.canvas.height ||
                    sumLeft + sumWidth > obj.canvas.width - cornerSize - moveSizeLimit) {
                    obj.top = Math.min(obj.top, obj.canvas.height - sumHeight + obj.top - sumTop - cornerSize - moveSizeLimit - Delta - _this.canvas.width * _this.a);
                    obj.left = Math.min(obj.left, obj.canvas.width - sumWidth + obj.left - sumLeft - cornerSize - moveSizeLimit);
                }
                $(".deleteBtn").remove();
                $(".distance").remove();
                $(".distanceY").remove();
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrowUp(imageCoordx, 2);
                // addDistancePoint(imageCoordy, imageCoordy);
                _this.addArrow(imageCoordy, 2);
                // addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
                obj.setCoords();
                obj.saveState();
                _this.canvas.renderAll();
            },
            'object:scaling': function (e) {
                var obj = e.target;
                // this.dataService.scaleKey = obj.scaleX;
                // console.log(obj.scaleX, obj.scaleY);
                obj.setCoords();
                obj.saveState();
                var cornerSize = _this.canvas.width / 40;
                var moveSiseLimit = _this.canvas.width / _this.dataService.sizePrintKey;
                var sumLeft = obj.getBoundingRect().left;
                var sumTop = obj.getBoundingRect().top;
                var sumWith = obj.getBoundingRect().width;
                var sumHeight = obj.getBoundingRect().height;
                var matrix = e.target.calcTransformMatrix();
                var imageCoordx = matrix[4];
                var imageCoordy = matrix[5];
                var angle = Math.abs(((_this.canvas.getActiveObject().angle) * Math.PI) / 180);
                var activeObject = _this.canvas.getActiveObject();
                var nerqnadzic = Math.sqrt(Math.pow(activeObject.width, 2) + Math.pow(activeObject.height, 2));
                var cos = Math.abs(Math.cos(angle));
                var sin = Math.abs(Math.sin(angle));
                var formatWidth = (_this.canvas.width) - 2 * (moveSiseLimit + cornerSize);
                var formatHeight = formatWidth * _this.dataService.formatWithHeight;
                var moveSizeLimit = _this.canvas.width / _this.dataService.sizePrintKey;
                var Delta = _this.canvas.height - 2 * (moveSizeLimit + cornerSize) - (_this.canvas.width - 2 * (moveSizeLimit + cornerSize)) * _this.dataService.formatWithHeight;
                // top-left  corner
                if (sumLeft < cornerSize + moveSiseLimit) {
                    obj.left = Math.max(obj.left, obj.left - sumLeft + (cornerSize + moveSiseLimit));
                }
                if (sumTop < cornerSize + moveSiseLimit - _this.canvas.width * _this.a) {
                    obj.top = Math.max(obj.top, obj.top - sumTop + cornerSize + moveSiseLimit - _this.canvas.width * _this.a + 50);
                }
                //top right corner
                if (sumLeft + sumWith + cornerSize + moveSiseLimit > obj.canvas.width) {
                    obj.left = Math.min(obj.left, obj.canvas.width - sumWith + obj.left - sumLeft - cornerSize - moveSiseLimit);
                }
                // bot right corner
                if (sumTop + sumHeight + obj.cornerSize + moveSiseLimit + Delta + _this.canvas.width * _this.a > obj.canvas.width) {
                    obj.top = Math.min(obj.top, obj.canvas.height - sumHeight + obj.top - sumTop - obj.cornerSize - moveSiseLimit - Delta - _this.canvas.width * _this.a);
                }
                // With limit
                // this.canvas.getObjects().filter((o) => {
                //   if (o.get('type') === 'i-text') {
                //     this.imgPadding = 2800 / this.props.diametr
                //   }
                // })
                if (activeObject.angle === 0 || activeObject.angle === 180) {
                    _this.canvas.getObjects().filter(function (o) {
                        if (o.get('type') === 'i-text' && sumWith > formatWidth ||
                            o.get('type') === 'i-text' && sumHeight > formatHeight) {
                            activeObject.scaleX = formatWidth / (activeObject.width * 1.3);
                            activeObject.scaleY = formatWidth / (activeObject.width * 1.3);
                        }
                        if (o.get('type') !== 'i-text' && sumWith > formatWidth) {
                            activeObject.scaleX = formatWidth / (activeObject.width);
                            activeObject.scaleY = formatHeight / (activeObject.height);
                        }
                        if (o.get('type') !== 'i-text' && sumHeight > formatHeight) {
                            activeObject.scaleX = formatWidth / (activeObject.width);
                            activeObject.scaleY = formatHeight / (activeObject.height);
                        }
                    });
                }
                else {
                    _this.canvas.getObjects().filter(function (o) {
                        if (o.get('type') === 'i-text' && sumWith > formatWidth ||
                            o.get('type') === 'i-text' && sumWith > formatHeight) {
                            activeObject.scaleX = formatWidth / (activeObject.width / (cos * 0.75));
                            activeObject.scaleY = formatWidth / (activeObject.width / (cos * 0.75));
                        }
                        if (o.get('type') !== 'i-text' && sumWith > formatWidth) {
                            activeObject.scaleX = formatWidth / (activeObject.width / (cos * 0.75));
                            activeObject.scaleY = formatWidth / (activeObject.width / (cos * 0.75));
                        }
                        if (o.get('type') !== 'i-text' && sumHeight > formatHeight) {
                            activeObject.scaleX = formatHeight / (activeObject.height / (cos * 0.75));
                            activeObject.scaleY = formatHeight / (activeObject.height / (cos * 0.75));
                        }
                    });
                }
                // if (activeObject.angle === 0 || activeObject.angle === 180) {
                //   this.canvas.getObjects().filter((o) => {
                //     if (o.get('type') === 'i-text' && sumHeight > formatHeight * 0.6) {
                //       activeObject.scaleX = formatWidth / (activeObject.width * 1.67);
                //       activeObject.scaleY = formatWidth / (activeObject.width * 1.67);
                //     } else if (sumWith > formatWidth) {
                //       activeObject.scaleX = formatWidth / (activeObject.width);
                //       activeObject.scaleY = formatWidth / (activeObject.width);
                //     }
                //   })
                // } else {
                //   this.canvas.getObjects().filter((o) => {
                //     if (o.get('type') === 'i-text' && sumHeight > formatHeight) {
                //       activeObject.scaleX = formatWidth / (activeObject.width / (cos * 0.6));
                //       activeObject.scaleY = formatWidth / (activeObject.width / (cos * 0.6));
                //     } else if (sumHeight > formatHeight) {
                //       console.log('nnnnnnnn');
                //       activeObject.scaleX = formatWidth / (activeObject.width / (cos * 0.8));              
                //       activeObject.scaleY = formatWidth / (activeObject.width / (cos * 0.8));
                //     }
                //   })
                // }
                // } else if (sumHeight > formatHeight) {
                //   this.canvas.getObjects().filter((o) => {
                //     if (o.get('type') === 'i-text') {
                //       activeObject.scaleX = formatWidth / (activeObject.width * 2.2);
                //       activeObject.scaleY = formatWidth / (activeObject.width * 2.2);
                //     } else {
                //       activeObject.scaleX = formatHeight / (activeObject.height / (cos * 0.65));
                //       activeObject.scaleY = formatHeight / (activeObject.height / (cos * 0.65));
                //     }
                //   })
                // if (activeObject.angle === 0) {
                //   activeObject.scaleY = formatHeight / activeObject.height;
                // } else {
                //   activeObject.scaleX = formatWidth / nerqnadzic;
                //   activeObject.scaleY = formatWidth / nerqnadzic;
                // }
                // }
                if (activeObject.width * activeObject.scaleX > formatWidth && activeObject.angle !== 0) {
                    activeObject.scaleX = formatWidth / nerqnadzic;
                    activeObject.scaleY = formatWidth / nerqnadzic;
                }
                if (activeObject.height * activeObject.scaleY > formatHeight && activeObject.angle !== 0) {
                    activeObject.scaleX = formatHeight / nerqnadzic;
                    activeObject.scaleY = formatHeight / nerqnadzic;
                }
                obj.minScaleLimit = 0.02;
                $(".deleteBtn").remove();
                $(".distance").remove();
                $(".distanceY").remove();
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrowUp(imageCoordx, 2);
                // addDistancePoint(imageCoordy, imageCoordy);
                _this.addArrow(imageCoordy, 2);
                // addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
                obj.setCoords();
                obj.saveState();
                _this.canvas.renderAll();
            },
            'object:modified': function (e) {
                var obj = e.target;
                obj.setCoords();
                obj.saveState();
                var matrix = e.target.calcTransformMatrix();
                var boundingRect = obj.getBoundingRect(true);
                var imageCoordx = matrix[4];
                var imageCoordy = matrix[5];
                var moveSizeLimit = _this.canvas.width / _this.dataService.sizePrintKey;
                var cornerSize = _this.canvas.width / 40;
                var sumLeft = obj.getBoundingRect().left;
                var sumTop = obj.getBoundingRect().top;
                var sumWidth = obj.getBoundingRect().width;
                var sumHeight = obj.getBoundingRect().height;
                var Delta = _this.canvas.height - 2 * (moveSizeLimit + cornerSize) - (_this.canvas.width - 2 * (moveSizeLimit + cornerSize)) * _this.dataService.formatWithHeight;
                // top-left  corner
                if (sumLeft < (cornerSize + moveSizeLimit)) {
                    obj.left = Math.max(obj.left, obj.left - sumLeft + (cornerSize + moveSizeLimit));
                }
                if (sumTop < cornerSize + moveSizeLimit - _this.canvas.width * _this.a) {
                    obj.top = Math.max(obj.top, obj.top - sumTop + cornerSize + moveSizeLimit - _this.canvas.width * _this.a);
                }
                // bot-right corner
                if (sumLeft + sumWidth + cornerSize + moveSizeLimit > obj.canvas.width) {
                    obj.left = Math.min(obj.left, obj.canvas.width - sumWidth + obj.left - sumLeft - cornerSize - moveSizeLimit);
                }
                if (sumTop + sumHeight + cornerSize + moveSizeLimit + Delta + _this.canvas.width * _this.a > obj.canvas.height) {
                    obj.top = Math.min(obj.top, obj.canvas.height - sumHeight + obj.top - sumTop - cornerSize - moveSizeLimit - Delta - _this.canvas.width * _this.a);
                }
                _this.siteLayout.imageCoordy = Math.floor(imageCoordy);
                _this.siteLayout.imageCoordx = Math.floor(imageCoordx);
                $(".distance").remove();
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrow(imageCoordy, 2);
                $(".distanceY").remove();
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrowUp(imageCoordx, 2);
                _this.addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
                obj.setCoords();
                obj.saveState();
                _this.canvas.renderAll();
            },
            'selection:created': function (e) {
                var obj = e.target;
                // let sumTop = obj.getBoundingRect().top;
                // let sumWith = obj.getBoundingRect().width;
                // let sumHeight = obj.getBoundingRect().height;
                // let formatWidth = (this.canvas.width) - 2 * (1);
                // let angle = Math.abs(((this.canvas.getActiveObject().angle) * Math.PI) / 180);
                // let activeObject = this.canvas.getActiveObject();
                // let cos = Math.abs(Math.cos(angle));
                // if (activeObject.angle === 0 || activeObject.angle === 180) {
                //   this.canvas.getObjects().filter((o) => {
                //     if (o.get('type') === 'i-text') {
                //       activeObject.scaleX = formatWidth / (activeObject.width / (cos * 0.2));
                //       activeObject.scaleY = formatWidth / (activeObject.width / (cos * 0.2));
                //     } else if (sumWith > formatWidth) {
                //       activeObject.scaleX = formatWidth / (activeObject.width);
                //       activeObject.scaleY = formatWidth / (activeObject.width);
                //     }
                //   }) }
                // this.dataService.canvasSelect = true;
                // var mouse = this.canvas.getPointer(e.memo);
                //  const x = mouse.x;
                //  const y = mouse.y;  
                //   e.target.set({
                //     lockScalingX: true,
                //     lockScalingY: true
                // });
                obj.setCoords();
                obj.saveState();
                $(".deleteBtn").remove();
                // console.log('selected');
                _this.addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
                $(".distance").remove();
                var matrixx = e.target.calcTransformMatrix();
                var imageCoordxx = matrixx[4];
                var imageCoordyy = matrixx[5];
                // addDistancePoint(imageCoordyy, imageCoordxx);
                _this.addArrow(imageCoordyy, 2);
                $(".distanceY").remove();
                var matrixxx = e.target.calcTransformMatrix();
                var imageCoordxxx = matrixxx[4];
                var imageCoordyyy = matrixxx[5];
                // addDistancePoint(imageCoordyyy, imageCoordxxx);
                _this.addArrowUp(imageCoordxxx, 2);
                var matrix = e.target.calcTransformMatrix();
                var imageCoordx = matrix[4];
                var imageCoordy = matrix[5];
                _this.siteLayout.imageCoordy = Math.floor(imageCoordy);
                _this.siteLayout.imageCoordx = Math.floor(imageCoordx);
                var imgWith = obj.width * obj.scaleX;
                var imgHeight = obj.height * obj.scaleY;
                _this.siteLayout.imgWith = Math.floor(imgWith);
                _this.siteLayout.imgHeigt = Math.floor(imgHeight);
                _this.selected = obj.type;
                obj.hasRotatingPoint = true;
                obj.transparentCorners = false;
                obj.cornerColor = '#FF7F50';
                // e.target.bringToFront()
                // this.canvas.getActiveObject()
                _this.canvas.renderAll();
                _this.resetPanels();
                _this.getOpacity();
                _this.getDistance();
                obj.setCoords();
                obj.saveState();
                if (obj.type !== 'group' && obj) {
                    _this.getId();
                    _this.getOpacity();
                    _this.getDistance();
                    switch (obj.type) {
                        case 'rect':
                        case 'circle':
                        case 'triangle':
                            _this.figureEditor = true;
                            _this.getFill();
                            break;
                        case 'i-text':
                            _this.textEditor = true;
                            // this.getLineHeight();
                            // this.getCharSpacing();
                            _this.getBold();
                            _this.getFill();
                            _this.getTextDecoration();
                            _this.getTextAlign();
                            _this.getFontFamily();
                            _this.bringToFront();
                            // this.sendToBack()
                            // this.getLineHeight();
                            _this.getCharSpacing();
                            _this.getFontSize();
                            break;
                        case 'image':
                            _this.getOpacity();
                            _this.getDistance();
                            break;
                    }
                }
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrowUp(imageCoordx, 2);
                // addDistancePoint(imageCoordy, imageCoordy);
                _this.addArrow(imageCoordy, 2);
                // addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
                obj.setCoords();
                obj.saveState();
                _this.canvas.renderAll();
                if (_this.canvasCount !== 0) {
                    _this.dataService.canvasSelect = true;
                }
            },
            // 'selection:created': (e) => {
            //   if (this.canvasCount !== 0) {
            //     this.dataService.canvasSelect = true;
            //   }
            // },
            'before:selection:cleared': function (e) {
                if (_this.canvasCount !== 0) {
                    _this.dataService.canvasSelect = true;
                }
                $(".deleteBtn").remove();
                $(".distance").remove();
            },
            'selection:updated': function (e) {
                var obj = e.target;
                _this.addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
                $(".distance").remove();
                var matrixx = e.target.calcTransformMatrix();
                var imageCoordx = matrixx[4];
                var imageCoordy = matrixx[5];
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrow(imageCoordy, 2);
                $(".distanceY").remove();
                var matrixxx = e.target.calcTransformMatrix();
                var imageCoordx = matrixxx[4];
                var imageCoordy = matrixxx[5];
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrowUp(imageCoordx, 2);
                var matrix = e.target.calcTransformMatrix();
                var imageCoordx = matrix[4];
                var imageCoordy = matrix[5];
                _this.siteLayout.imageCoordy = Math.floor(imageCoordy);
                _this.siteLayout.imageCoordx = Math.floor(imageCoordx);
                var imgWith = obj.width * obj.scaleX;
                var imgHeight = obj.height * obj.scaleY;
                _this.siteLayout.imgWith = Math.floor(imgWith);
                _this.siteLayout.imgHeigt = Math.floor(imgHeight);
                _this.selected = obj.type;
                obj.hasRotatingPoint = true;
                obj.transparentCorners = false;
                obj.cornerColor = '#FF7F50';
                // e.target.bringToFront()
                // this.canvas.getActiveObject()
                _this.resetPanels();
                _this.getOpacity();
                _this.getDistance();
                if (obj.type !== 'group' && obj) {
                    _this.getId();
                    _this.getOpacity();
                    _this.getDistance();
                    switch (obj.type) {
                        case 'rect':
                        case 'circle':
                        case 'triangle':
                            _this.figureEditor = true;
                            _this.getFill();
                            break;
                        case 'i-text':
                            _this.textEditor = true;
                            // this.getLineHeight();
                            // this.getCharSpacing();
                            _this.getBold();
                            _this.getFill();
                            _this.getTextDecoration();
                            _this.getTextAlign();
                            _this.getFontFamily();
                            _this.bringToFront();
                            // this.sendToBack()
                            // this.getLineHeight();
                            _this.getCharSpacing();
                            _this.getFontSize();
                            break;
                        case 'image':
                            _this.getOpacity();
                            _this.getDistance();
                            break;
                    }
                }
                $(".distance").remove();
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrow(imageCoordy, 2);
                $(".distanceY").remove();
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrowUp(imageCoordx, 2);
                _this.addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
                obj.setCoords();
                obj.saveState();
                _this.canvas.renderAll();
            },
            'mouse:down': function (e) {
                console.log('mouse:down');
            },
            'selection:cleared': function (e) {
                _this.dataService.canvasSelect = false;
                $(".deleteBtn").remove();
                $(".distance").remove();
                var obj = e.target;
                // console.log('cleared');
                _this.selected = null;
                _this.resetPanels();
                // console.log('clear');
                _this.siteLayout.imageCoordx = null;
                _this.siteLayout.imageCoordy = null;
                _this.siteLayout.imgWith = null;
                _this.siteLayout.imgHeigt = null;
            },
            'object:rotating': function (e) {
                var obj = e.target;
                obj.setCoords();
                obj.saveState();
                var matrix = e.target.calcTransformMatrix();
                var angle = Math.abs(((_this.canvas.getActiveObject().angle) * Math.PI) / 180);
                var sumWidth = obj.getBoundingRect().width;
                var sumHeight = obj.getBoundingRect().height;
                var imageCoordx = matrix[4];
                var imageCoordy = matrix[5];
                var activeObject = _this.canvas.getActiveObject();
                // const nerqnadzicc = Math.sqrt(Math.pow(this.canvas.getActiveObject().width, 2) + Math.pow(this.canvas.getActiveObject().height, 2))
                var cos = Math.abs(Math.cos(angle));
                var sin = Math.abs(Math.sin(angle));
                var formatWidth = (window.innerWidth - _this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - _this.dataService.widthKey * window.innerWidth) / _this.b + (window.innerWidth - _this.dataService.widthKey * window.innerWidth) / 40);
                var formatHeight = formatWidth * _this.c;
                _this.canvas.getObjects().filter(function (o) {
                    if (o.get('type') === 'i-text' && sumWidth > formatWidth ||
                        o.get('type') === 'i-text' && sumHeight > formatHeight) {
                        console.log('ccccc');
                        activeObject.scaleX = formatWidth / (activeObject.width / (cos * 0.75));
                        activeObject.scaleY = formatWidth / (activeObject.width / (cos * 0.75));
                    }
                    if (o.get('type') !== 'i-text' && sumWidth > formatWidth) {
                        activeObject.scaleX = formatWidth / (activeObject.width / (cos * 0.75));
                        activeObject.scaleY = formatWidth / (activeObject.width / (cos * 0.75));
                    }
                    if (o.get('type') !== 'i-text' && sumHeight > formatHeight) {
                        console.log('kkkkkk');
                        activeObject.scaleX = formatHeight / (activeObject.height / (cos * 0.75));
                        activeObject.scaleY = formatHeight / (activeObject.height / (cos * 0.75));
                    }
                });
                $(".distance").remove();
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrow(imageCoordy, 2);
                $(".distanceY").remove();
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrowUp(imageCoordx, 2);
                _this.addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
                obj.setCoords();
                obj.saveState();
                _this.canvas.renderAll();
            },
            'path:created': function (e) {
                var obj = e.target;
                _this.canvasCount += 1;
                _this.canvas.isDrawingMode = false;
                // this.canvas.on('mouse:up', () => this.canvas.setActiveObject());
                // console.log(this.canvas.item(this.canvasCount - 1));
                _this.canvas.getObjects().indexOf(e.target);
                // this.canvas.setActiveObject(this.canvas.item(this.canvasCount- 1));
                _this.selectItemAfterAdded(_this.canvas.item(_this.canvasCount - 1));
                obj.setCoords();
                obj.saveState();
                _this.canvas.renderAll();
            },
            'object:added': function (e) {
                var obj = e.target;
                obj.setCoords();
                obj.saveState();
                var matrix = e.target.calcTransformMatrix();
                var imageCoordx = matrix[4];
                var imageCoordy = matrix[5];
                // this.canvas.getObjects().filter((o) => {
                //   if (o.get('type') === 'i-text') {
                //     this.imgPadding = 2800 / this.props.diametr
                //   }
                // })
                $(".deleteBtn").remove();
                // console.log('added');
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrow(imageCoordy, 2);
                $(".distanceY").remove();
                // addDistancePoint(imageCoordy, imageCoordx);
                _this.addArrowUp(imageCoordx, 2);
                _this.addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
                obj.setCoords();
                obj.saveState();
                _this.canvas.renderAll();
            }
        });
        // --!
        // this.canvas1.setWidth(this.siteLayout.canvasHtmlWidth);
        // this.canvas1.setHeight(this.siteLayout.canvasHtmlHeight);
        // this.canvas1.renderAll();
        // get references to the html canvas element & its context
        this.canvas.on('mouse:down', function (e) {
            var canvasElement = document.getElementById('canvas');
        });
        // this.canvas1.on('mouse:down', (e) => {
        //   const canvasElement: any = document.getElementById('canvas');
        // });
        this.canvas.on('mouse:over', function () {
            var color = _this.props.drawFill;
            _this.canvas.freeDrawingBrush.color = color;
            // alert("mouse up!");
            // this.canvas.add(refRect);
            // isMouseDown = false;
            // freeDrawing=false; // **Disables line drawing
        });
    };
    /*------------------------Block elements------------------------*/
    // Block "Size"
    // changeSize() {
    //   this.canvas.setWidth(this.siteLayout.canvasHtml);
    //   this.canvas.setHeight(500);
    //   this.canvas.renderAll()
    // }
    // Block "Add text"
    EditorPicComponent.prototype.addArrowUp = function (o, p) {
        var arrow = '<img src="../assets/img/output-onlinepngtools-up.png" class="distance" style="position:absolute; top:' + p + 'px; left:' + (o - 5) + 'px; cursor:crosshair; width:10px; height:40px;"/>';
        $(".canvas-container").append(arrow);
        this.canvas.renderAll();
    };
    EditorPicComponent.prototype.addArrow = function (o, p) {
        var arrow = '<img src="../assets/img/green-arrow-clipart-2.png" class="distance" style="position:absolute; top:' + o + 'px; left:' + p + 'px; cursor:crosshair; width:40px; height:10px;"/>';
        $(".canvas-container").append(arrow);
        this.canvas.renderAll();
    };
    EditorPicComponent.prototype.addDeleteBtn = function (x, y) {
        $(".deleteBtn").remove();
        var btnLeft = x - this.left;
        var btnTop = y + this.top;
        var deleteBtn = '<img src="../assets/img/remove-icon-png-15.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:30px;height:30px;"/>';
        $(".canvas-container").append(deleteBtn);
        this.canvas.renderAll();
    };
    EditorPicComponent.prototype.resizeEbiten = function (iframe, parentId, aspectRatio) {
        var parent = document.getElementById(parentId);
        var w = parent.clientWidth;
        iframe.width = w;
        iframe.height = w * aspectRatio;
        iframe.contentWindow.addEventListener('resize', function () {
            var w = parent.clientWidth;
            iframe.width = w;
            iframe.height = w * aspectRatio;
        });
    };
    EditorPicComponent.prototype.canvasDrawing = function (target) {
        var _this = this;
        $(document).on('click', ".deleteBtn", function (event) {
            event.stopImmediatePropagation();
            _this.canvasCount -= 1;
            console.log(_this.canvasCount);
            if (_this.canvasCount === 0) {
                // this.siteLayout.isOpasity=true;
                $('.owl-nav').show();
                $(".canvas").css("z-index", 0);
                _this.disableBtn = false;
                _this.siteLayout.toggle = false;
                console.log('delete---');
            }
            var activeObject = _this.canvas.getActiveObject();
            var activeGroup = _this.canvas.getActiveObjects();
            if (activeObject) {
                _this.canvas.remove(activeObject);
                $(".deleteBtn").remove();
                // this.textString = '';
            }
            else if (activeGroup) {
                _this.canvas.discardActiveObject();
                var self_1 = _this;
                activeGroup.forEach(function (object) {
                    self_1.canvas.remove(object);
                });
            }
        });
        switch (target) {
            case "select":
                this.canvas.isDrawingMode = false;
                break;
            case "erase":
                this.canvas.freeDrawingBrush = new fabric.EraserBrush(this.canvas);
                this.canvas.freeDrawingBrush.width = 10;
                this.canvas.isDrawingMode = true;
                break;
            case "undo":
                this.canvas.freeDrawingBrush = new fabric.EraserBrush(this.canvas);
                this.canvas.freeDrawingBrush.width = 10;
                this.canvas.isDrawingMode = true;
                break;
            case "draw":
                var color = this.props.drawFill;
                console.log(color);
                this.siteLayout.toggle = true;
                this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
                this.drawObject = this.canvas.freeDrawingBrush;
                this.canvas.freeDrawingBrush.color = color;
                this.canvas.freeDrawingBrush.width = 4;
                this.canvas.isDrawingMode = true;
                this.canvas.renderAll();
                this.selectItemAfterAdded(this.canvas.item(0));
                break;
            case "spray":
                var colorSpray = this.props.drawFill;
                this.siteLayout.toggle = true;
                this.canvas.freeDrawingBrush = new fabric.SprayBrush(this.canvas);
                this.canvas.freeDrawingBrush.color = colorSpray;
                this.canvas.freeDrawingBrush.width = 15;
                this.canvas.isDrawingMode = true;
                // this.canvas.setActiveObject(Object[0]);
                this.selectItemAfterAdded(this.canvas.item(0));
                break;
            default:
                break;
        }
    };
    EditorPicComponent.prototype.addText = function () {
        var _this = this;
        // console.log(this.props.textCurved);
        this.objectType = true;
        var numLeft = this.left;
        var numTop = this.top;
        function addDeleteBtn(x, y) {
            $(".deleteBtn").remove();
            var btnLeft = x - numLeft;
            var btnTop = y + numTop;
            var deleteBtn = '<img src="../assets/img/remove-icon-png-15.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:25px;height:25px;"/>';
            $(".canvas-container").append(deleteBtn);
        }
        this.canvas.on('selection:created', function (e) {
            $(".deleteBtn").remove();
            // console.log('selected');
            addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
        });
        console.log('texttt');
        if (this.props.diametr < 299) {
            console.log('<280');
            this.props.inputDisabled = 'inputDisabled';
            this.canvas.remove(this.canvas.getActiveObject());
            var path = new fabric.Path("'M 90 425 A " + this.props.diametr + " " + this.props.diametr + " 0 0 1 271 420 '", {
                strokeWidth: 1,
                absolutePositioned: true,
                fill: false
            });
            // const path = new fabric.Path(`'M 90 425 A ${this.props.diametr} ${this.props.diametr} 0 0 1 271 420 '`, {
            //   strokeWidth: 1,
            //   absolutePositioned: true,
            //   fill: false,
            // })
            // const pathText = this.props.path
            var pathInfo = fabric.util.getPathSegmentsInfo(path.path);
            path.segmentsInfo = pathInfo;
            var textPathLength = pathInfo[pathInfo.length - 1].length;
            var k = this.textString.length;
            var fontSize = 1.9 * textPathLength / this.textString.length;
            this.props.fontSize = fontSize;
            var textWidth = (window.innerWidth - this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - this.dataService.widthKey * window.innerWidth) / this.b + (window.innerWidth - this.dataService.widthKey * window.innerWidth) / 40);
            var textHeight = textWidth * this.c;
            if (this.textString) {
                // this.canvasCount += 1;
                var text_1 = new fabric.IText(this.textString, {
                    fontFamily: this.props.fontFamily || 'helvetica',
                    fontSize: fontSize,
                    path: path,
                    // top: path.top,
                    // left: path.left,
                    // originX: 'center',
                    // originY: 'center',
                    // left: 170,
                    // top: 115,
                    // fontSize: 30,
                    // color: "rgba(34, 34, 1, 0.3)",
                    // angle: 0,
                    fill: this.props.fill || '#000000',
                    // scaleX: 0.8,
                    // scaleY: 0.8,
                    // fontSize: 80,
                    hasRotatingPoint: true,
                    // strokeWidth: 30,
                    // strokeMiterLimit: 15,
                    // width: 50,
                    cornerSize: this.canvas.width / 40,
                    padding: this.textPadding,
                    centeredRotation: true
                }, this.path = path);
                $('#shadowText').on('click', function () {
                    if (!_this.siteLayout.shadowText) {
                        text_1.shadow = null;
                    }
                    else if (_this.siteLayout.shadowText) {
                        // text.setShadow(this.shadowTEXT) old version;
                        // text.set('shadow', new fabric.Shadow(this.shadowTEXT));
                        text_1.shadow = new fabric.Shadow(_this.shadowTEXT);
                        // text.set('shadow', new fabric.Shadow(this.shadowTEXT));
                        // console.log('text');
                    }
                    _this.canvas.renderAll();
                }),
                    text_1.scaleToHeight(textHeight / this.d / 1.5);
                text_1.scaleToWidth(textWidth / this.d / 1.5);
                console.log(this.a, this.b, this.d);
                this.extend(text_1, this.randomId());
                // text.charSpacing = pathLength;
                this.canvas.add(text_1);
                this.canvas.centerObjectH(text_1);
                text_1.top = this.canvas.width / 40 + this.canvas.width / this.b - this.canvas.width * this.a + 18;
                this.selectItemAfterAdded(text_1);
                this.canvas.renderAll();
                // this.canvas.add(path);
                // console.log(this.canvas.toSVG());
                // console.log(this.canvas.toSVG().toString().replace("<defs>", '').replace("</defs>", str));
                // text.left = this.props.curvedTextLeft;
                // this.textString = '';
            }
        }
        else {
            this.props.inputDisabled = 'inputDisabled';
            this.canvas.remove(this.canvas.getActiveObject());
            if (this.props.diametr === 300) {
                this.intCountText += 1;
                this.canvasCount += 1;
                console.log(this.canvasCount);
            }
            console.log('>280');
            $(document).on('click', ".deleteBtn", function (event) {
                _this.siteLayout.activatebutton = true;
                event.stopImmediatePropagation();
                _this.canvasCount -= 1;
                console.log(_this.canvasCount);
                // console.log(this.canvasCount);
                if (_this.canvasCount === 0) {
                    _this.siteLayout.firstImage = 0;
                    $('.owl-nav').show();
                    $(".canvas").css("z-index", 0);
                    _this.siteLayout.toggle = false;
                    _this.disableBtn = false;
                }
                var activeObject = _this.canvas.getActiveObject();
                var activeGroup = _this.canvas.getActiveObjects();
                if (activeObject) {
                    _this.canvas.remove(activeObject);
                    $(".deleteBtn").remove();
                    $(".distance").remove();
                    // this.textString = '';
                }
                else if (activeGroup) {
                    _this.canvas.discardActiveObject();
                    var self_2 = _this;
                    activeGroup.forEach(function (object) {
                        self_2.canvas.remove(object);
                    });
                }
            });
            var path = new fabric.Path("'M 69 435 A " + this.props.diametr + " " + this.props.diametr + " 0 0 1 271 420 '", {
                strokeWidth: 1,
                absolutePositioned: true,
                fill: false
            });
            // const pathText = this.props.path
            var pathInfo = fabric.util.getPathSegmentsInfo(path.path);
            path.segmentsInfo = pathInfo;
            var textPathLength = pathInfo[pathInfo.length - 1].length;
            // let k = this.textString.length;
            var textWidth = (window.innerWidth - this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - this.dataService.widthKey * window.innerWidth) / this.b + (window.innerWidth - this.dataService.widthKey * window.innerWidth) / 40);
            var textHeight = textWidth * this.c;
            var fontSize = 1.9 * this.props.diametr / this.textString.length;
            this.props.fontSize = fontSize;
            if (this.textString) {
                // this.canvasCount += 1;
                var text_2 = new fabric.IText(this.textString, {
                    fontFamily: 'helvetica',
                    fontSize: fontSize,
                    // path: path,
                    // top: path.top,
                    // left: path.left,
                    // originX: 'center',
                    // originY: 'center',
                    // left: 170,
                    // top: 115,
                    // fontSize: 30,
                    // color: "rgba(34, 34, 1, 0.3)",
                    // angle: 0,
                    fill: '#000000',
                    // scaleX: 0.5,
                    // scaleY: 0.5,
                    // fontSize: 80,
                    hasRotatingPoint: true,
                    // strokeWidth: 10,
                    // strokeMiterLimit: 15,
                    // width: 50,
                    cornerSize: this.canvas.width / 40,
                    padding: this.textPadding,
                    centeredRotation: true
                });
                this.props.textStraight = text_2;
                // if (text.height > 1300) {
                //   this.dataService.formatVal = this.dataService.formatValue = 'A3';
                // } else if (text.height > 500 && text.height < 1300) {
                //   this.dataService.formatVal = this.dataService.formatValue = 'A4';
                // }
                var scale = 1;
                if (this.dataService.horizontalVertical === true) {
                    // this.dataService.horizontalVertical = false;
                    // this.dataService.horVert = false;
                    // this.dataService.sizePrintKey = 686 / ((686 - 210) / 2);
                    // this.dataService.formatWithHeight = 1.414;
                    // this.dataService.formatTopKey = 0.03;
                    // this.dataService.scaleKey = 1;
                    // this.dataService.formatSizeSwich();
                    scale = 2;
                    text_2.scaleToHeight(textHeight / 1.2);
                    text_2.scaleToWidth(textWidth / 1.2);
                }
                else {
                    // this.dataService.horizontalVertical = false;
                    // this.dataService.scaleKey = 1;
                    // this.dataService.horVert = true;
                    // this.dataService.formatWithHeight = 0.707;
                    // this.dataService.sizePrintKey = 686 / ((686 - 297) / 2);
                    // this.dataService.formatTopKey = -0.03;
                    // this.dataService.formatSizeSwich();
                    scale = 2;
                    text_2.scaleToHeight(textHeight / 1.5);
                    text_2.scaleToWidth(textWidth / 1.5);
                    // scale = this.dataService.scaleKey;
                }
                $('#shadowText').on('click', function () {
                    if (!_this.siteLayout.shadowText) {
                        text_2.shadow = null;
                    }
                    else if (_this.siteLayout.shadowText) {
                        // text.setShadow(this.shadowTEXT) old version;
                        // text.set('shadow', new fabric.Shadow(this.shadowTEXT));
                        text_2.shadow = new fabric.Shadow(_this.shadowTEXT);
                        // text.set('shadow', new fabric.Shadow(this.shadowTEXT));
                        // console.log('text');
                    }
                    _this.canvas.renderAll();
                }),
                    console.log(this.a, this.b, this.d);
                this.extend(text_2, this.randomId());
                // text.charSpacing = pathLength;
                this.canvas.add(text_2);
                this.canvas.centerObjectH(text_2);
                text_2.top = this.canvas.width / 40 + this.canvas.width / this.b - this.canvas.width * this.a + 18;
                this.selectItemAfterAdded(text_2);
                this.canvas.renderAll();
                // this.canvas.add(path);
                // console.log(this.canvas.toSVG().toString().replace("<defs>", '').replace("</defs>", str));
                // this.canvas.centerObjectH(text);
                // text.top = this.canvas.height / 3;
                // this.textString = '';
                // console.log(this.canvasCount);
            }
        }
    };
    EditorPicComponent.prototype.discardActiveObj = function () {
        this.props.diametr = 300;
        this.canvas.discardActiveObject().renderAll();
    };
    EditorPicComponent.prototype.reRender = function () {
        var _this = this;
        this.canvas.getObjects().filter(function (o) {
            if (o.get('type') === 'i-text') {
                return _this.canvas.setActiveObject(o);
            }
        });
        if (this.intCountText !== 0) {
            this.canvas.remove(this.canvas.getActiveObject());
            this.canvas.add(this.props.textStraight);
            this.selectItemAfterAdded(this.props.textStraight);
            // this.canvas.setActiveObject(this.props.textStraight);
            this.canvas.renderAll();
        }
    };
    EditorPicComponent.prototype.reRender1 = function () {
        var _this = this;
        this.canvas.getObjects().filter(function (o) {
            if (o.get('type') === 'i-text') {
                return _this.canvas.setActiveObject(o);
            }
        });
        // if (this.canvasCount !== 0) {
        //   // this.selectItemAfterAdded(this.props.textStraight);
        //   this.canvas.remove(this.canvas.getActiveObject());
        //   this.canvas.add(this.props.textStraight);
        //   this.canvas.renderAll();
        // }
    };
    // Block "Add images"
    EditorPicComponent.prototype.getImgPolaroid = function (event) {
        var _this = this;
        this.canvas.includeDefaultValues;
        this.canvasCount += 1;
        var el = event;
        var scale = 1;
        $(document).on('click', '.deleteBtn', function (event) {
            _this.removeSelected();
        });
        fabric.Image.fromURL(el, function (image) {
            if (image.height > 1300) {
                _this.dataService.formatVal = _this.dataService.formatValue = 'A3';
                if (image.height / image.width > 1.1) {
                    console.log('mage.height / image.width > 1.1');
                    _this.dataService.horizontalVertical = true;
                    _this.dataService.horVert = false;
                    // this.dataService.sizePrintKey = 686 / ((686 - 210) / 2);
                    _this.dataService.formatWithHeight = 1.414;
                    _this.dataService.formatTopKey = -0.03;
                    // this.dataService.scaleKey = 1;
                    _this.dataService.formatSizeSwich();
                    scale = 1.05;
                }
                else {
                    console.log('mage.height / image.width > 1.1 else');
                    _this.dataService.horizontalVertical = false;
                    // this.dataService.scaleKey = 1;
                    _this.dataService.horVert = true;
                    _this.dataService.formatWithHeight = 0.707;
                    // this.dataService.sizePrintKey = 686 / ((686 - 297) / 2);
                    _this.dataService.formatTopKey = -0.03;
                    _this.dataService.formatSizeSwich();
                    scale = 1;
                    // scale = this.dataService.scaleKey;
                }
            }
            else if (image.height > 100 && image.height < 1300) {
                _this.dataService.formatVal = _this.dataService.formatValue = 'A4';
                if (image.height / image.width > 1.1) {
                    _this.dataService.horizontalVertical = true;
                    _this.dataService.horVert = false;
                    // this.dataService.sizePrintKey = 686 / ((686 - 210) / 2);
                    _this.dataService.formatWithHeight = 1.414;
                    _this.dataService.formatTopKey = 0.03;
                    // this.dataService.scaleKey = 1;
                    _this.dataService.formatSizeSwich();
                    scale = 1.05;
                }
                else {
                    _this.dataService.horizontalVertical = false;
                    // this.dataService.scaleKey = 1;
                    _this.dataService.horVert = true;
                    _this.dataService.formatWithHeight = 0.707;
                    // this.dataService.sizePrintKey = 686 / ((686 - 297) / 2);
                    _this.dataService.formatTopKey = -0.03;
                    _this.dataService.formatSizeSwich();
                    scale = 1;
                    // scale = this.dataService.scaleKey;
                }
            }
            // function sizing() {
            //   if (image.height / image.width > 1.1) {
            //     this.dataService.horizontalVertical = true;
            //     this.dataService.horVert = false;
            //     // this.dataService.sizePrintKey = 686 / ((686 - 210) / 2);
            //     this.dataService.formatWithHeight = 1.414;
            //     this.dataService.formatTopKey = 0.03;
            //     // this.dataService.scaleKey = 1;
            //     this.dataService.formatSizeSwich();
            //     scale = 1.1;
            //   } else {
            //     this.dataService.horizontalVertical = false;
            //     // this.dataService.scaleKey = 1;
            //     this.dataService.horVert = true;
            //     this.dataService.formatWithHeight = 0.707;
            //     // this.dataService.sizePrintKey = 686 / ((686 - 297) / 2);
            //     // this.dataService.formatTopKey = -0.03;
            //     this.dataService.formatSizeSwich();
            //     scale = 1;
            //     // scale = this.dataService.scaleKey;
            //   }
            // }
            // const image = fabric.util.groupSVGElements(objects, options);
            var imageWidth = (window.innerWidth - _this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - _this.dataService.widthKey * window.innerWidth) / _this.b + (window.innerWidth - _this.dataService.widthKey * window.innerWidth) / 40);
            var imageHeight = imageWidth * _this.c;
            image.set({
                // multiplier: 0.5,
                // originX: 'center',
                // originY: 'center',
                // shadow: this.shadow,
                // strokeWidth: 3,
                // stroke: '#000',
                left: 130,
                // top: 50,
                angle: 0,
                padding: 0,
                cornerSize: _this.canvas.width / 40,
                hasRotatingPoint: true
            });
            // value.shadow.affectStroke = false;
            // image.panToActiveObject()
            image.scaleToWidth(imageWidth / scale);
            image.scaleToHeight(imageHeight / scale);
            _this.extend(image, _this.randomId());
            image.filters.push(new fabric.Image.filters.ColorMatrix({
                duration: 200,
                matrix: [1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 1, 1, 0]
            }));
            image.applyFilters();
            _this.canvas.add(image);
            // this.canvas.centerObject(image);
            _this.canvas.centerObjectH(image);
            image.top = _this.canvas.width / 40 + _this.canvas.width / _this.b - _this.canvas.width * _this.a;
            _this.canvas.renderAll();
            $('#hue-value').on('change', function () {
                // console.log(this.siteLayout.removeColorValue);
                image.filters = [];
                if (_this.filterName == 'blackWhite') {
                    image.filters.push(new fabric.Image.filters.BlackWhite());
                }
                else if (_this.filterName == 'vintage') {
                    image.filters.push(new fabric.Image.filters.Vintage());
                }
                else if (_this.filterName == 'sepia') {
                    image.filters.push(new fabric.Image.filters.Sepia());
                }
                else if (_this.filterName == 'invert') {
                    image.filters.push(new fabric.Image.filters.Invert());
                }
                else if (_this.filterName == 'origin') {
                    image.filters = [];
                }
                image.filters.push(new fabric.Image.filters.RemoveColor({
                    distance: _this.props.distance
                }));
                image.applyFilters();
                _this.canvas.renderAll();
            });
            $('#saturation').on('change', function () {
                image.filters = [];
                image.filters.push(new fabric.Image.filters.Saturation({
                    saturation: _this.siteLayout.saturation
                }));
                image.applyFilters();
                _this.canvas.renderAll();
            });
            $('#blur').on('change', function () {
                image.filters = [];
                image.filters.push(new fabric.Image.filters.Blur({
                    blur: _this.siteLayout.blur
                }));
                image.applyFilters();
                _this.canvas.renderAll();
            });
            $('#contrast1').on('change', function () {
                image.filters = [];
                image.filters.push(new fabric.Image.filters.Contrast({
                    contrast: _this.siteLayout.contrast
                }));
                image.applyFilters();
                _this.canvas.renderAll();
            });
            $('#noise').on('change', function () {
                image.filters = [];
                image.filters.push(new fabric.Image.filters.Noise({
                    noise: _this.siteLayout.noise
                }));
                image.applyFilters();
                _this.canvas.renderAll();
            });
            // console.log(image);
            $('#shadowSVG').on('change', function () {
                var obj = _this.canvas.getActiveObject();
                if (_this.siteLayout.shadowSVG === false) {
                    image.shadow = null;
                }
                else if (_this.siteLayout.shadowSVG) {
                    image.shadow = new fabric.Shadow(_this.shadow);
                    // image.setShadow(this.shadow);
                    // console.log(image);
                    // image.shadow = new fabric.Shadow(this.shadow);
                    // image.set('shadow', new fabric.Shadow(this.shadow));
                }
                _this.canvas.renderAll();
            }),
                $('#grayscale').on('click', function () {
                    _this.filterName = 'blackWhite';
                    _this.props.distance = 0;
                    _this.siteLayout.saturation = 0;
                    _this.siteLayout.blur = 0;
                    _this.siteLayout.noise = 0;
                    _this.siteLayout.contrast = 0;
                    image.filters = [];
                    image.filters.push(new fabric.Image.filters.BlackWhite());
                    image.applyFilters();
                    _this.canvas.renderAll();
                }),
                $('#vintage').on('click', function () {
                    _this.filterName = 'vintage';
                    _this.props.distance = 0;
                    _this.siteLayout.saturation = 0;
                    _this.siteLayout.blur = 0;
                    _this.siteLayout.noise = 0;
                    _this.siteLayout.contrast = 0;
                    image.filters = [];
                    image.filters.push(new fabric.Image.filters.Vintage());
                    image.applyFilters();
                    _this.canvas.renderAll();
                }),
                $('#sepia').on('click', function () {
                    _this.filterName = 'sepia';
                    _this.props.distance = 0;
                    _this.siteLayout.saturation = 0;
                    _this.siteLayout.blur = 0;
                    _this.siteLayout.noise = 0;
                    _this.siteLayout.contrast = 0;
                    image.filters = [];
                    image.filters.push(new fabric.Image.filters.Sepia());
                    image.applyFilters();
                    // console.log(image);
                    //.filters[0].matrix[0]
                    _this.canvas.renderAll();
                }),
                $('#invert').on('click', function () {
                    _this.filterName = 'invert';
                    _this.props.distance = 0;
                    _this.siteLayout.saturation = 0;
                    _this.siteLayout.blur = 0;
                    _this.siteLayout.noise = 0;
                    _this.siteLayout.contrast = 0;
                    image.filters = [];
                    image.filters.push(new fabric.Image.filters.Invert());
                    image.applyFilters();
                    // console.log(image);
                    //.filters[0].matrix[0]
                    _this.canvas.renderAll();
                }),
                $('#origin').on('click', function () {
                    _this.filterName = 'origin';
                    _this.props.distance = 0;
                    _this.siteLayout.saturation = 0;
                    _this.siteLayout.blur = 0;
                    _this.siteLayout.noise = 0;
                    _this.siteLayout.contrast = 0;
                    image.filters = [];
                    // if (this.id == "svg") {
                    //   console.log("svg");
                    //   image.filters = [];
                    //   image.filters.push(new fabric.Image.filters.ColorMatrix({
                    //     matrix: [1, 0, 0, 0, 0,
                    //       0, 1, 0, 0, 0,
                    //       0, 0, 1, 0, 0,
                    //       0, 0, 1, 1, 0]
                    //   }));
                    //   image.applyFilters();
                    //   this.canvas.renderAll();
                    // }
                    // else if (this.id == "svgPhoto") {
                    //   console.log("svgPhoto");
                    //   image.filters = [];
                    //   image.filters.push(new fabric.Image.filters.ColorMatrix({
                    //     matrix: [1, 0, 0, 0, 0,
                    //       0, 1, 0, 0, 0,
                    //       0, 0, 1, 0, 0,
                    //       0, 0, 1, 1, 0]
                    //   }));
                    //   image.applyFilters();
                    //   this.canvas.renderAll();
                    // }
                    image.applyFilters();
                    _this.canvas.renderAll();
                }),
                _this.canvas.setActiveObject(image);
            _this.canvas.discardActiveObject().renderAll();
            _this.addDeleteBtn(image.oCoords.mb.x, image.oCoords.mb.y);
        });
        // event.target.left = 100;
        // event.target.top = 100;
        // event.target.setCoords({'left' : 50});
        console.log(this.canvas.getActiveObject());
        // event.target.saveState();
        // this.canvas.renderAll();
        // event.target.setCoords()
    };
    // Block "Upload Image"
    EditorPicComponent.prototype.addImageOnCanvas = function (url) {
        var _this = this;
        var numLeft = this.left;
        var numTop = this.top;
        function addDeleteBtn(x, y) {
            $(".deleteBtn").remove();
            var btnLeft = x - numLeft;
            var btnTop = y + numTop;
            var deleteBtn = '<img src="../assets/img/remove-icon-png-15.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px; cursor:pointer; width:40px; height:40px;"/>';
            $(".canvas-container").append(deleteBtn);
        }
        this.canvas.on('selection:created', function (e) {
            $(".deleteBtn").remove();
            // console.log('selected');
            addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
        });
        $(document).on('click', ".deleteBtn", function (event) {
            event.stopImmediatePropagation();
            var activeObject = _this.canvas.getActiveObject();
            var activeGroup = _this.canvas.getActiveObjects();
            _this.canvasCount -= 1;
            // console.log(this.canvasCount);
            if (_this.canvasCount === 0) {
                $('#shadow').prop('checked', false);
                _this.siteLayout.shadow = false;
                $('.owl-nav').show();
                $(".canvas").css("z-index", 0);
                // this.siteLayout.isCarouselOpen = true;
                _this.disableBtn = false;
                _this.siteLayout.toggle = false;
            }
            if (activeObject) {
                _this.canvas.remove(activeObject);
                $(".deleteBtn").remove();
                $(".distance").remove();
                // this.textString = '';
            }
            else if (activeGroup) {
                _this.canvas.discardActiveObject();
                var self_3 = _this;
                activeGroup.forEach(function (object) {
                    self_3.canvas.remove(object);
                });
            }
        });
        if (url) {
            this.canvasCount += 1;
            // console.log(url);
            var scale_1 = 1.1;
            // console.log(this.canvasCount);
            fabric.Image.fromURL(url, function (image1) {
                if (image1.height > 1300) {
                    _this.dataService.formatVal = _this.dataService.formatValue = 'A3';
                }
                else if (image1.height > 500 && image1.height < 1300) {
                    _this.dataService.formatVal = _this.dataService.formatValue = 'A4';
                }
                if (image1.height / image1.width > 1.1) {
                    _this.dataService.horizontalVertical = true;
                    _this.dataService.horVert = false;
                    // this.dataService.sizePrintKey = 686 / ((686 - 210) / 2);
                    _this.dataService.formatWithHeight = 1.414;
                    _this.dataService.formatTopKey = 0.03;
                    // this.dataService.scaleKey = 1;
                    // this.dataService.formatSizeSwich();
                    scale_1 = 1.1;
                }
                else {
                    _this.dataService.horizontalVertical = false;
                    // this.dataService.scaleKey = 1;
                    _this.dataService.horVert = true;
                    _this.dataService.formatWithHeight = 0.707;
                    // this.dataService.sizePrintKey = 686 / ((686 - 297) / 2);
                    _this.dataService.formatTopKey = -0.03;
                    // this.dataService.formatSizeSwich();
                    // scale = this.dataService.scaleKey;
                }
                var imageWidth = (window.innerWidth - _this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - _this.dataService.widthKey * window.innerWidth) / _this.b + (window.innerWidth - _this.dataService.widthKey * window.innerWidth) / 40);
                var imageHeight = imageWidth * _this.c;
                image1.set({
                    // originX: 'center',
                    // originY: 'center',
                    // left: 110,
                    // top: 50,
                    quality: 1,
                    angle: 0,
                    padding: 0,
                    cornerSize: _this.canvas.width / 40,
                    hasRotatingPoint: true
                });
                image1.scaleToWidth(imageWidth / scale_1);
                image1.scaleToHeight(imageHeight / scale_1);
                _this.extend(image1, _this.randomId());
                image1.filters.push(new fabric.Image.filters.ColorMatrix({
                    matrix: [1, 0, 0, 0, 0,
                        0, 1, 0, 0, 0,
                        0, 0, 1, 0, 0,
                        0, 0, 0, 1, 0]
                }));
                _this.canvas.add(image1);
                _this.canvas.centerObjectH(image1);
                image1.top = _this.canvas.width / 40 + _this.canvas.width / _this.b - _this.canvas.width * _this.a;
                image1.applyFilters();
                _this.canvas.renderAll();
                $('#hue-value').on('change', function () {
                    // console.log(this.siteLayout.removeColorValue);
                    image1.filters = [];
                    if (_this.filterName == 'blackWhite') {
                        image1.filters.push(new fabric.Image.filters.BlackWhite());
                    }
                    else if (_this.filterName == 'vintage') {
                        image1.filters.push(new fabric.Image.filters.Vintage());
                    }
                    else if (_this.filterName == 'sepia') {
                        image1.filters.push(new fabric.Image.filters.Sepia());
                    }
                    else if (_this.filterName == 'invert') {
                        image1.filters.push(new fabric.Image.filters.Invert());
                    }
                    else if (_this.filterName == 'origin') {
                        image1.filters.push(new fabric.Image.filters.ColorMatrix({
                            matrix: [1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0]
                        }));
                    }
                    image1.filters.push(new fabric.Image.filters.RemoveColor({
                        distance: _this.props.distance
                    }));
                    image1.applyFilters();
                    _this.canvas.renderAll();
                });
                $('#saturation').on('change', function () {
                    image1.filters = [];
                    image1.filters.push(new fabric.Image.filters.Saturation({
                        saturation: _this.siteLayout.saturation
                    }));
                    image1.applyFilters();
                    _this.canvas.renderAll();
                });
                $('#blur').on('change', function () {
                    image1.filters = [];
                    image1.filters.push(new fabric.Image.filters.Blur({
                        blur: _this.siteLayout.blur
                    }));
                    image1.applyFilters();
                    _this.canvas.renderAll();
                });
                $('#contrast1').on('change', function () {
                    image1.filters = [];
                    image1.filters.push(new fabric.Image.filters.Contrast({
                        contrast: _this.siteLayout.contrast
                    }));
                    image1.applyFilters();
                    _this.canvas.renderAll();
                });
                $('#noise').on('change', function () {
                    image1.filters = [];
                    image1.filters.push(new fabric.Image.filters.Noise({
                        noise: _this.siteLayout.noise
                    }));
                    image1.applyFilters();
                    _this.canvas.renderAll();
                });
                $('#shadow').on('change', function () {
                    var obj = _this.canvas.getActiveObject();
                    if (_this.siteLayout.shadow === false) {
                        image1.shadow = null;
                    }
                    else if (_this.siteLayout.shadow) {
                        image1.setShadow(_this.shadowPNJ);
                        // console.log('mmmm');
                    }
                    // this.canvas.toDataURL({
                    //   format: 'png',
                    //   quality: 1
                    // });
                    _this.canvas.renderAll();
                }),
                    $('#grayscale').on('click', function () {
                        _this.filterName = 'blackWhite';
                        _this.siteLayout.removeColorValue = 0;
                        _this.siteLayout.saturation = 0;
                        _this.siteLayout.blur = 0;
                        _this.siteLayout.noise = 0;
                        _this.siteLayout.contrast = 0;
                        image1.filters = [];
                        image1.filters.push(new fabric.Image.filters.BlackWhite());
                        image1.applyFilters();
                        _this.canvas.renderAll();
                    }),
                    $('#vintage').on('click', function () {
                        _this.filterName = 'vintage';
                        _this.siteLayout.removeColorValue = 0;
                        _this.siteLayout.saturation = 0;
                        _this.siteLayout.blur = 0;
                        _this.siteLayout.noise = 0;
                        _this.siteLayout.contrast = 0;
                        image1.filters = [];
                        image1.filters.push(new fabric.Image.filters.Vintage());
                        image1.applyFilters();
                        _this.canvas.renderAll();
                    }),
                    $('#sepia').on('click', function () {
                        _this.filterName = 'sepia';
                        _this.siteLayout.removeColorValue = 0;
                        _this.siteLayout.saturation = 0;
                        _this.siteLayout.blur = 0;
                        _this.siteLayout.noise = 0;
                        _this.siteLayout.contrast = 0;
                        image1.filters = [];
                        image1.filters.push(new fabric.Image.filters.Sepia());
                        image1.applyFilters();
                        // console.log(image1);
                        //.filters[0].matrix[0]
                        _this.canvas.renderAll();
                    }),
                    $('#invert').on('click', function () {
                        _this.filterName = 'invert';
                        _this.siteLayout.removeColorValue = 0;
                        _this.siteLayout.saturation = 0;
                        _this.siteLayout.blur = 0;
                        _this.siteLayout.noise = 0;
                        _this.siteLayout.contrast = 0;
                        image1.filters = [];
                        image1.filters.push(new fabric.Image.filters.Invert());
                        image1.applyFilters();
                        // console.log(image1);
                        //.filters[0].matrix[0]
                        _this.canvas.renderAll();
                    }),
                    $('#origin').on('click', function () {
                        _this.filterName = 'origin';
                        _this.siteLayout.removeColorValue = 0;
                        _this.siteLayout.saturation = 0;
                        _this.siteLayout.blur = 0;
                        _this.siteLayout.noise = 0;
                        _this.siteLayout.contrast = 0;
                        image1.filters = [];
                        image1.filters.push(new fabric.Image.filters.ColorMatrix({
                            matrix: [1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0]
                        }));
                        image1.applyFilters();
                        _this.canvas.renderAll();
                    }),
                    _this.selectItemAfterAdded(image1);
            });
        }
    };
    EditorPicComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (readerEvent) {
                _this.url = readerEvent.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    EditorPicComponent.prototype.removeWhite = function (url) {
        this.url = '';
    };
    // Block "Add figure"
    EditorPicComponent.prototype.addFigure = function (figure) {
        var _this = this;
        this.canvasCount += 1;
        // console.log(this.canvasCount);
        $(document).on('click', ".deleteBtn", function (event) {
            event.stopImmediatePropagation();
            _this.canvasCount -= 1;
            var activeObject = _this.canvas.getActiveObject();
            var activeGroup = _this.canvas.getActiveObjects();
            // console.log(this.canvasCount);
            if (_this.canvasCount === 0) {
                _this.siteLayout.firstImage = 0;
                // this.siteLayout.isOpasity=true;
                $('.owl-nav').show();
                $(".canvas").css("z-index", 0);
                _this.disableBtn = false;
                _this.siteLayout.toggle = false;
            }
            if (activeObject) {
                _this.canvas.remove(activeObject);
                $(".deleteBtn").remove();
                // this.textString = '';
            }
            else if (activeGroup) {
                _this.canvas.discardActiveObject();
                var self_4 = _this;
                activeGroup.forEach(function (object) {
                    self_4.canvas.remove(object);
                });
            }
        });
        var add;
        switch (figure) {
            case 'rectangle':
                add = new fabric.Rect({
                    cornerSize: 11,
                    padding: 0,
                    width: 200,
                    height: 100,
                    left: 20,
                    top: 50,
                    angle: 0,
                    fill: '#3f51b5'
                });
                break;
            case 'square':
                add = new fabric.Rect({
                    cornerSize: 11,
                    padding: 0,
                    width: 100, height: 100, left: 20, top: 20, angle: 0,
                    fill: '#4caf50'
                });
                break;
            case 'triangle':
                add = new fabric.Triangle({
                    cornerSize: 11,
                    padding: 0,
                    width: 100, height: 100, left: 20, top: 20, fill: '#2196f3'
                });
                break;
            case 'circle':
                add = new fabric.Circle({
                    cornerSize: 11,
                    padding: 0,
                    radius: 50, left: 20, top: 20, fill: '#ff5722'
                });
                break;
        }
        $('#shadow').on('click', function () {
            // console.log('figure');
            var obj = _this.canvas.getActiveObject();
            if (!_this.siteLayout.shadow) {
                add.shadow = null;
            }
            else if (_this.siteLayout.shadow) {
                add.setShadow(_this.shadowFigur);
            }
            // this.canvas.toDataURL({
            //   format: 'png',
            //   quality: 1
            // });
            _this.canvas.renderAll();
        }),
            this.extend(add, this.randomId());
        this.canvas.add(add);
        this.selectItemAfterAdded(add);
    };
    /*Canvas*/
    EditorPicComponent.prototype.moveWithFormat = function (scaleKey, scaleBlock) {
        var _a;
        console.log(this.a, this.b, this.c, 'scale', scaleBlock, this.d, scaleKey);
        this.scaleKey = 0;
        this.scaleKey = this.d;
        if (this.canvasCount !== 0) {
            this.canvas.discardActiveObject().renderAll();
            var sel = new fabric.Group(this.canvas.getObjects(), {
                canvas: this.canvas
            });
            (_a = this.canvas).remove.apply(_a, this.canvas.getObjects());
            // sel.setControlsVisibility({
            //   ml: false, //top left
            //   mr: false, //top right
            //   mb: false, //bottom left
            //   mt: false //bottom right
            // });
            sel.lockScalingFlip = true;
            // sel.uniformScaling = true;
            this.canvas.add(sel);
            var formatWidth = (window.innerWidth - this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - this.dataService.widthKey * window.innerWidth) / this.b + (window.innerWidth - this.dataService.widthKey * window.innerWidth) / 40);
            var formatHeight = formatWidth * this.c;
            this.canvasCount = 1;
            this.intCountText = 0;
            if (scaleBlock) {
                if (this.dataService.horVert) {
                    if (this.dataService.horizontalVertical) {
                        if (this.objectType) {
                            sel.scaleToWidth(formatWidth * scaleKey / 1.3);
                            sel.scaleToWidth(formatHeight * scaleKey / 1.3);
                        }
                        else {
                            sel.scaleToWidth(formatWidth * scaleKey / 1);
                            sel.scaleToHeight(formatHeight * scaleKey / 1);
                        }
                    }
                    else {
                        if (this.objectType) {
                            sel.scaleToWidth(formatWidth * scaleKey / 0.8);
                            sel.scaleToWidth(formatHeight * scaleKey / 0.8);
                        }
                        else {
                            sel.scaleToWidth(formatWidth * scaleKey / 1);
                            sel.scaleToHeight(formatHeight * scaleKey / 1);
                        }
                    }
                }
                else {
                    if (this.dataService.horizontalVertical) {
                        if (this.objectType) {
                            sel.scaleToWidth(formatWidth * scaleKey / 6);
                            sel.scaleToWidth(formatHeight * scaleKey / 6);
                        }
                        else {
                            sel.scaleToWidth(formatWidth * scaleKey / 4.8);
                            sel.scaleToHeight(formatHeight * scaleKey / 4.8);
                        }
                    }
                    else {
                        if (this.objectType) {
                            sel.scaleToWidth(formatWidth * scaleKey / 3.5);
                            sel.scaleToWidth(formatHeight * scaleKey / 3.5);
                        }
                        else {
                            sel.scaleToWidth(formatWidth * scaleKey / 4.8);
                            sel.scaleToHeight(formatHeight * scaleKey / 4.8);
                        }
                    }
                }
                // sel.With = (window.innerWidth - this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - this.dataService.widthKey * window.innerWidth) / this.b + (window.innerWidth - this.dataService.widthKey * window.innerWidth) / 40);
                // console.log('editor', this.d);
                // sel.Height = sel.width * this.c;
                // sel.setCoords();
                // sel.saveState();
                // this.canvas.renderAll();
            }
            sel.minScaleLimit = 0.02;
            // sel.lockScalingY = true;
            // this.canvas.centerObjectH(sel);
            // sel.top = this.canvas.height / 3.7;
            this.canvas.setActiveObject(sel);
            var matrix = sel.calcTransformMatrix();
            var imageCoordx = matrix[4];
            var imageCoordy = matrix[5];
            this.canvas.centerObjectH(sel);
            var top = this.canvas.width / 40 + this.canvas.width / this.b - this.canvas.width * this.a;
            sel.top = top;
            console.log('momos', scaleBlock);
            // this.canvas.centerObjectH(sel);
            sel.set({ cornerSize: this.canvas.width / 40 });
            // sel.minScaleLimit()
            // this.canvas.getActiveObject().left += 10;
            // this.canvas.getActiveObject().setCoords();
            // this.canvas.getActiveObject().saveState();
            // this.canvas.renderAll();
            $(".deleteBtn").remove();
            $(".distance").remove();
            $(".distanceY").remove();
            // console.log('added');
            // addDistancePoint(imageCoordy, imageCoordx);
            this.addArrow(imageCoordy, 2);
            $(".distanceY").remove();
            // addDistancePoint(imageCoordy, imageCoordx);
            this.addArrowUp(imageCoordx, 2);
            this.addDeleteBtn(sel.oCoords.mb.x, sel.oCoords.mb.y);
            sel.setCoords();
            sel.saveState();
            this.canvas.renderAll();
        }
    };
    EditorPicComponent.prototype.cleanSelect = function () {
        // this.canvas.discardActiveObject().renderAll();
        // var Group = new fabric.Group([...this.canvas.getObjects()]);
        // this.canvas.add(Group);
        // this.selectItemAfterAdded(this.canvas.item(0));
        // this.canvas.renderAll();
        var _a;
        this.canvas.discardActiveObject().renderAll();
        var sel = new fabric.Group(this.canvas.getObjects(), {
            canvas: this.canvas
        });
        (_a = this.canvas).remove.apply(_a, this.canvas.getObjects());
        this.canvas.add(sel);
        this.canvas.centerObjectH(sel);
        sel.top = this.canvas.height / 3.7;
        this.canvas.setActiveObject(sel);
        this.canvas.renderAll();
        // this.canvas.on({
        //   'object:scaling': onChange
        // })
        // function onChange(obj) {
        //   var 
        //     group = obj.target,
        //     scaleX = obj.target.item().width / group.getWidth(),
        //     scaleY = obj.target.item().height / group.getHeight();
        //     obj.target.item().setScaleX(scaleX);
        //     obj.target.item().setScaleY(scaleY);
        // }
    };
    EditorPicComponent.prototype.selectItemAfterAdded = function (obj) {
        this.getOpacity();
        this.canvas.discardActiveObject().renderAll();
        this.canvas.setActiveObject(obj);
    };
    EditorPicComponent.prototype.setCanvasFill = function () {
        // if (!this.props.canvasImage) {
        this.canvas.backgroundColor = this.props.canvasFill;
        this.canvas.renderAll();
        var inputProductColor = this.siteLayout.inputColor.nativeElement;
        inputProductColor.style.backgroundColor = this.props.canvasFill;
        inputProductColor.value = this.props.canvasFill;
        // this.siteLayout.IMG.nativeElement.innerHTML.backgroundColor = this.props.canvasFill;
        // this.canvas1.backgroundColor = this.props.canvasFill;
        // this.canvas1.renderAll();
        // }
    };
    EditorPicComponent.prototype.drawFill = function () {
        // if (!this.props.canvasImage) {
        // this.canvas.backgroundColor = this.props.canvasFill;
        this.canvas.renderAll();
        // this.canvas1.renderAll();
        // }
    };
    EditorPicComponent.prototype.extend = function (obj, id) {
        obj.toObject = (function (toObject) {
            return function () {
                return fabric.util.object.extend(toObject.call(this), {
                    id: id
                });
            };
        })(obj.toObject);
    };
    EditorPicComponent.prototype.productsTypeColor = function () {
        if (this.siteLayout.allColors === true) {
            this.props.canvasFill = this.siteLayout.arrColor[0];
            this.canvas.backgroundColor = this.siteLayout.arrColor[0];
        }
        else if (this.siteLayout.allColors === false) {
            this.props.canvasFill = this.siteLayout.productBrandColors[0];
            this.canvas.backgroundColor = this.siteLayout.productBrandColors[0];
            // this.canvas.renderAll();
        }
    };
    // productsTypeSise() {
    //   if (this.siteLayout.allColors === true) {
    //     this.siteLayout.productBrandSizes = this.siteLayout.arrColor[0];
    //     this.canvas.backgroundColor = this.siteLayout.arrColor[0];
    //   } else if (this.siteLayout.allColors === false) {
    //     this.props.canvasFill = this.siteLayout.productBrandColors[0];
    //     this.canvas.backgroundColor = this.siteLayout.productBrandColors[0];
    //     // this.canvas.renderAll();
    //   }
    // }
    EditorPicComponent.prototype.setCanvasImage = function () {
        var image = this.props.canvasImage;
        this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas), {
            opacity: 1,
            angle: 0,
            left: 0,
            top: 0,
            originX: 'left',
            originY: 'top',
            crossOrigin: 'anonymous',
            scaleX: this.canvas.width / 360,
            scaleY: this.canvas.height / 460
        });
        // const square = new fabric.Rect({
        //   width: this.canvas.width - 2 * (this.canvas.width / 4.37 + this.canvas.width / 40),
        //   height: this.canvas.height - 2 * (this.canvas.width / 4.37 + this.canvas.width / 40),
        //   left: this.canvas.width / 40 + this.canvas.width / 4.37,
        //   top: this.canvas.width / 40 + this.canvas.width / 4.37,
        //   // borderColor: '#000',
        //   // fill: '#000',
        //   // Color: '#000',
        //   hasControls: false,
        //   lockMovementX: true,
        //   lockMovementY: true,
        //   // strokeWidth: 5,
        //   strokeDashArray: [7],
        //   stroke: '#474747',
        //   strokeWidth: 2,
        //   fill: 'rgba(0,0,0,0)',
        //   selectable: false,
        //   evented: false,
        // });
        // this.canvas.add(square);
        // // this.canvasCount -=1;
        // // this.canvas.renderAll();
        // // this.canvas.setActiveObject(square);
    };
    // sizeFormat() {
    //   // const image = this.props.canvasImage;
    //   // this.canvas.setBackgroundImage(image,
    //   //   this.canvas.renderAll.bind(this.canvas), {)
    //   const square = new fabric.Rect({
    //     width: this.canvas.width - 2 * (this.canvas.width / 4.37 + this.canvas.width / 40),
    //     height: this.canvas.height - 2 * (this.canvas.width / 4.37 + this.canvas.width / 40),
    //     left: this.canvas.width / 40 + this.canvas.width / 4.37,
    //     top: this.canvas.width / 40 + this.canvas.width / 4.37,
    //     // borderColor: '#000',
    //     // fill: '#000',
    //     // Color: '#000',
    //     hasControls: false,
    //     lockMovementX: true,
    //     lockMovementY: true,
    //     // strokeWidth: 5,
    //     strokeDashArray: [7],
    //     stroke: '#474747',
    //     strokeWidth: 2,
    //     fill: 'rgba(0,0,0,0)',
    //     selectable: false,
    //     evented: false,
    //   });
    //   this.canvas.add(square);
    //    console.log(this.canvas.width / 40 + this.canvas.width / 4.37);
    // this.canvas.add(square);
    // if (checkWidth = 640) {
    //   this.canvas.add(square);
    //   return
    // }
    // if (checkWidth > 640 && checkWidth < 1007) {
    //   this.canvas.add(square);
    //   return
    // }
    // if (checkWidth > 1007) {
    //   this.canvas.add(square);
    //   return
    // }
    // this.canvasCount -=1;
    // this.canvas.renderAll();
    // this.canvas.setActiveObject(square); 
    // }
    // setCanvasImage1() {
    //   const image2 = this.props.canvasImage;
    //   this.canvas1.setBackgroundImage(image2,
    //     this.canvas1.renderAll.bind(this.canvas1), {
    //     opacity: 1,
    //     angle: 0,
    //     left: 0,
    //     top: 0,
    //     originX: 'left',
    //     originY: 'top',
    //     crossOrigin: 'anonymous',
    //     scaleX: this.canvas1.width / 360,
    //     scaleY: this.canvas1.height / 460,
    //     // width: this.siteLayout.canvasHtmlWidth,
    //     // height: this.siteLayout.canvasHtmlHeight + 93
    //     // crossOrigin: 'anonymous'
    //     // this.canvas.setBackgroundImage(img);
    //     // this.canvas.requestRenderAll();
    //   });
    //   console.log(this.canvas1.toSVG());
    // }
    EditorPicComponent.prototype.randomId = function () {
        return Math.floor(Math.random() * 999999) + 1;
    };
    /*------------------------Global actions for element------------------------*/
    EditorPicComponent.prototype.getActiveStyle = function (styleName, object) {
        object = object || this.canvas.getActiveObject();
        if (!object) {
            return '';
        }
        if (object.getSelectionStyles && object.isEditing) {
            return (object.getSelectionStyles()[styleName] || '');
        }
        else {
            return (object[styleName] || '');
        }
    };
    EditorPicComponent.prototype.setActiveStyle = function (styleName, value, object) {
        object = object || this.canvas.getActiveObject();
        if (!object) {
            return;
        }
        if (object.setSelectionStyles && object.isEditing) {
            var style = {};
            style[styleName] = value;
            if (typeof value === 'string') {
                if (value.includes('underline')) {
                    object.setSelectionStyles({ underline: true });
                }
                else {
                    object.setSelectionStyles({ underline: false });
                }
                if (value.includes('overline')) {
                    object.setSelectionStyles({ overline: true });
                }
                else {
                    object.setSelectionStyles({ overline: false });
                }
                if (value.includes('line-through')) {
                    object.setSelectionStyles({ linethrough: true });
                }
                else {
                    object.setSelectionStyles({ linethrough: false });
                }
            }
            object.setSelectionStyles(style);
            object.setCoords();
        }
        else {
            if (typeof value === 'string') {
                if (value.includes('underline')) {
                    object.set('underline', true);
                }
                else {
                    object.set('underline', false);
                }
                if (value.includes('overline')) {
                    object.set('overline', true);
                }
                else {
                    object.set('overline', false);
                }
                if (value.includes('line-through')) {
                    object.set('linethrough', true);
                }
                else {
                    object.set('linethrough', false);
                }
            }
            object.set(styleName, value);
        }
        object.setCoords();
        this.canvas.renderAll();
    };
    EditorPicComponent.prototype.getActiveProp = function (name) {
        var object = this.canvas.getActiveObject();
        if (!object) {
            return '';
        }
        return object[name] || '';
    };
    EditorPicComponent.prototype.setActiveProp = function (name, value) {
        var object = this.canvas.getActiveObject();
        if (!object) {
            return;
        }
        object.set(name, value).setCoords();
        this.canvas.renderAll();
    };
    EditorPicComponent.prototype.clone = function () {
        this.defoultUpdate();
        var activeObject = this.canvas.getActiveObject();
        var activeGroup = this.canvas.getActiveObjects();
        if (activeObject) {
            var clone = void 0;
            switch (activeObject.type) {
                case 'rect':
                    clone = new fabric.Rect(activeObject.toObject());
                    this.canvasCount += 1;
                    // console.log(this.canvasCount);
                    break;
                case 'circle':
                    clone = new fabric.Circle(activeObject.toObject());
                    this.canvasCount += 1;
                    // console.log(this.canvasCount);
                    break;
                case 'triangle':
                    clone = new fabric.Triangle(activeObject.toObject());
                    this.canvasCount += 1;
                    // console.log(this.canvasCount);
                    break;
                case 'i-text':
                    clone = new fabric.IText('', activeObject.toObject());
                    this.canvasCount += 1;
                    // console.log(this.canvasCount);
                    this.canvas.getActiveObject();
                    break;
                case 'image':
                    clone = fabric.util.object.clone(activeObject);
                    this.canvasCount += 1;
                    // console.log(this.canvasCount);
                    break;
            }
            if (clone) {
                clone.set({ left: 80, top: 80 });
                this.canvas.add(clone);
                this.selectItemAfterAdded(clone);
                this.defoultUpdate();
                this.canvas.getActiveObject();
            }
        }
    };
    EditorPicComponent.prototype.getId = function () {
        this.props.id = this.canvas.getActiveObject().toObject().id;
        this.canvas.toSVG();
        console.log(this.canvas);
    };
    EditorPicComponent.prototype.setId = function () {
        var val = this.props.id;
        var complete = this.canvas.getActiveObject().toObject();
        // console.log(complete);
        this.canvas.getActiveObject().toObject = function () {
            complete.id = val;
            return complete;
        };
    };
    EditorPicComponent.prototype.getDistance = function () {
        this.props.distance = this.getActiveStyle('distance', null) * 10;
        console.log('getDistance');
    };
    EditorPicComponent.prototype.setDistance = function () {
        this.setActiveStyle('distance', parseInt(this.props.distance, 10) / 100, null);
    };
    EditorPicComponent.prototype.getOpacity = function () {
        this.props.opacity = this.getActiveStyle('opacity', null) * 100;
    };
    EditorPicComponent.prototype.setOpacity = function () {
        this.setActiveStyle('opacity', parseInt(this.props.opacity, 10) / 100, null);
    };
    EditorPicComponent.prototype.getFill = function () {
        this.props.fill = this.getActiveStyle('fill', null);
    };
    EditorPicComponent.prototype.setFill = function () {
        this.setActiveStyle('fill', this.props.fill, null);
    };
    EditorPicComponent.prototype.getCharSpacing = function () {
        this.props.charSpacing = this.getActiveStyle('charSpacing', null);
    };
    EditorPicComponent.prototype.setCharSpacing = function () {
        this.setActiveStyle('charSpacing', this.props.charSpacing, null);
    };
    EditorPicComponent.prototype.getFontSize = function () {
        this.props.fontSize = this.getActiveStyle('fontSize', null);
        console.log('getFontSize');
    };
    EditorPicComponent.prototype.setFontSize = function () {
        this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
        console.log('setFontSize');
    };
    EditorPicComponent.prototype.getBold = function () {
        this.props.fontWeight = this.getActiveStyle('fontWeight', null);
    };
    EditorPicComponent.prototype.setBold = function () {
        this.props.fontWeight = !this.props.fontWeight;
        this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
    };
    EditorPicComponent.prototype.setFontStyle = function () {
        this.props.fontStyle = !this.props.fontStyle;
        if (this.props.fontStyle) {
            this.setActiveStyle('fontStyle', 'italic', null);
        }
        else {
            this.setActiveStyle('fontStyle', 'normal', null);
        }
    };
    EditorPicComponent.prototype.getTextDecoration = function () {
        this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
    };
    EditorPicComponent.prototype.setTextDecoration = function (value) {
        var iclass = this.props.TextDecoration;
        if (iclass.includes(value)) {
            iclass = iclass.replace(RegExp(value, 'g'), '');
        }
        else {
            iclass += " " + value;
        }
        this.props.TextDecoration = iclass;
        this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
    };
    EditorPicComponent.prototype.hasTextDecoration = function (value) {
        return this.props.TextDecoration.includes(value);
    };
    EditorPicComponent.prototype.getTextAlign = function () {
        this.props.textAlign = this.getActiveProp('textAlign');
    };
    EditorPicComponent.prototype.setTextAlign = function (value) {
        this.props.textAlign = value;
        this.setActiveProp('textAlign', this.props.textAlign);
    };
    EditorPicComponent.prototype.getFontFamily = function () {
        this.props.fontFamily = this.getActiveProp('fontFamily');
    };
    EditorPicComponent.prototype.setFontFamily = function () {
        this.setActiveProp('fontFamily', this.props.fontFamily);
    };
    /*System*/
    EditorPicComponent.prototype.removeSelected = function () {
        var _a;
        if (this.canvasCount === 1) {
            (_a = this.canvas).remove.apply(_a, this.canvas.getObjects());
            $('#shadowSVG').prop('checked', false);
            this.siteLayout.shadowSVG = false;
            $('.owl-nav').show();
            $(".canvas").css("z-index", 0);
            this.siteLayout.toggle = false;
            this.disableBtn = false;
            console.log(this.canvasCount);
            this.canvasCount -= 1;
        }
        $(".deleteBtn").remove();
        $(".distance").remove();
        // console.log(this.canvasCount);
        this.objectType = false;
        // this.dataService.scaleKey = 1;
        this.props.diametr = 300;
        if (this.canvas.getActiveObject().type === 'i-text') {
            this.intCountText -= 1;
            console.log(this.intCountText);
        }
        var activeObject = this.canvas.getActiveObject();
        var activeGroup = this.canvas.getActiveObjects();
        // this.siteLayout.firstImage = 2;
        if (this.canvasCount === 0) {
            $('#shadowSVG').prop('checked', false);
            this.siteLayout.shadowSVG = false;
            $('.owl-nav').show();
            $(".canvas").css("z-index", 0);
            this.siteLayout.toggle = false;
            this.disableBtn = false;
        }
        if (activeObject) {
            this.canvas.remove(activeObject);
            $(".deleteBtn").remove();
            $(".distance").remove();
            // this.textString = '';
        }
        else if (activeGroup) {
            // console.log('group');
            this.canvas.discardActiveObject();
            var self_5 = this;
            activeGroup.forEach(function (object) {
                self_5.canvas.remove(object);
            });
        }
        this.canvasCount -= 1;
        this.siteLayout.isCarouselOpen = true;
    };
    EditorPicComponent.prototype.bringToFront = function () {
        var activeObject = this.canvas.getActiveObject();
        var activeGroup = this.canvas.getActiveObjects();
        if (activeObject) {
            activeObject.bringToFront();
            // this.canvas.renderAll()
            // this.cleanSelect();
            // activeObject.opacity = 1;
        }
        else if (activeGroup) {
            this.canvas.discardActiveObject();
            activeGroup.forEach(function (object) {
                object.bringToFront();
                // this.canvas.renderAll()
            });
        }
    };
    EditorPicComponent.prototype.sendToBack = function () {
        var _this = this;
        var activeObject = this.canvas.getActiveObject();
        var activeGroup = this.canvas.getActiveObjects();
        if (activeObject) {
            this.canvas.sendToBack(activeObject);
            // activeObject.sendToBack();
            this.canvas.renderAll();
            // this.cleanSelect();
            // activeObject.opacity = 1;
        }
        else if (activeGroup) {
            this.canvas.discardActiveObject();
            activeGroup.forEach(function (object) {
                object.sendToBack();
                _this.canvas.renderAll();
            });
        }
    };
    EditorPicComponent.prototype.confirmClear = function () {
        var _a;
        if (confirm('Are you sure?')) {
            // location.reload(); 
            (_a = this.canvas).remove.apply(_a, this.canvas.getObjects());
            this.canvasCount = 0;
            $('.owl-nav').show();
            // $(".canvas").css("z-index", 0);
            this.disableBtn = false;
            this.siteLayout.toggle = false;
            // this.canvas.clear();
            // $(".distance").remove();
        }
    };
    // grayScale(url) {
    //   console.log(url);
    //   const activeObject = this.canvas.getActiveObject();
    //   fabric.Image.fromURL(url, (image) => {
    //     var filter =  fabric.Image.filters.Grayscale();
    //     image.filters.push(filter);
    //     // image.applyFilters();
    //     // this.canvas.add(image);
    //     image.applyFilters( this.canvas.renderAll.bind( this.canvas ) );
    //     this.canvas.renderAll();
    //   })
    // }
    EditorPicComponent.prototype.rasterize = function () {
        var image = new Image(360, 460);
        // const w = window.open('');
        // w.document.write(this.canvas.toSVG());
        image.src = this.canvas.toDataURL({ format: 'png', multiplier: 4 });
        // this.setCanvasImage();
        // const w = window.open();
        // w.document.write(
        //   `<div style='margin-top: 100px'>${image.outerHTML}</div>` 
        // // this.hello.nativeElement.innerHTML,
        // );
        this.reqImage = image.src;
        this.orderDatas.imageSrc = image.src;
        this.canvas.renderAll();
        var lastColor = this.props.canvasFill;
        // this.saveCanvasToJSON();
        this.canvas.backgroundImage = null;
        // this.canvas.backgroundColor = null;
        this.canvas.renderAll();
        this.canvas.backgroundImage = null;
        // this.canvas.remove(...this.canvas.getObjects())
        // console.log(this.canvas.toSVG());
        var svgUrll;
        switch (this.props.textCurved) {
            case 1:
                svgUrll = this.canvas.toSVG();
                // console.log(this.canvas.toSVG());
                break;
            case 2:
                svgUrll = this.canvas.toSVG().toString().replace(/<tspan/g, "<textPath xlink:href='#urve'><tspan").replace(/tspan>/g, "tspan></textPath>").replace(/tspan x="/g, 'tspan x="0*').replace("</defs>", "</defs> " + this.path.toSVG()).replace('style="stroke', 'id = "urve" style="stroke').replace("</defs>", "</defs> " + this.path.toSVG()).replace('style="stroke', 'id = "urve1" style="stroke');
                break;
        }
        // if (this.props.textCurved === 1) {
        //   svgUrll = this.canvas.toSVG();
        // } else if () {
        //   svgUrll = this.canvas.toSVG().toString().replace(/<tspan/i, "<textPath xlink:href='#urve'><tspan").replace(/tspan>/i, "tspan></textPath>").replace(/tspan x="/i, 'tspan x="0*').replace("</defs>", `</defs> ${this.path.toSVG()}`).replace('style="stroke', 'id = "urve" style="stroke').replace("</defs>", `</defs> ${this.path.toSVG()}`).replace('style="stroke', 'id = "urve1" style="stroke');
        // }
        // var svgUrl = this.canvas.toSVG().toString().replace(/<tspan/i, "<textPath xlink:href='#urve'><tspan").replace(/tspan>/i, "tspan></textPath>").replace(/tspan x="/i, 'tspan x="0*').replace("</defs>", `</defs> ${this.path.toSVG()}`).replace('style="stroke', 'id = "urve" style="stroke').replace("</defs>", `</defs> ${this.path.toSVG()}`).replace('style="stroke', 'id = "urve1" style="stroke');
        // var svgUrl = this.canvas.toSVG().replace("<defs>", '').replace("</defs>", this.test);
        // console.log(svgUrl);
        // console.log(svgUrl);
        var svg_image = "data:image/svg+xml," + encodeURIComponent(svgUrll);
        this.reqImage1 = svg_image;
        //  this.canvas.getActiveObject().width;
        //  this.canvas.getActiveObject().height;
        // console.log(link.outerHTML);
        this.loadCanvasFromJSON();
        this.setCanvasImage();
        // this.setCanvasImage1();
        // this.canvas.backgroundColor = lastColor;
        var CANVAS = localStorage.getItem('Canvas');
    };
    // cloneCanvas() {
    //   this.canvas1.loadFromJSON(JSON.stringify(this.canvas),
    //     () => this.canvas1.renderAll());
    // }
    EditorPicComponent.prototype.rasterizeSVG = function () {
        var image = new Image(360, 460);
        // image.scaleToWidth(150);
        // image.scaleToHeight(150);
        var w = window.open('');
        // this.canvas.toSVG()
        w.document.write(this.canvas.toSVG());
        var svgBlob = new Blob([this.canvas.toSVG()], { type: "image/svg+xml;charset=utf-8" });
        this.canvas.renderAll();
        var svgUrl = URL.createObjectURL(svgBlob);
        var link = document.createElement('a');
        link.href = svgUrl;
        link.download = image.outerHTML;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // return 'data:image/svg+xml;utf8,' + encodeURIComponent(this.canvas.toSVG());
        //stackowerflow
        // var svgData = $("#figureSvg")[0].outerHTML;
        // var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        // var svgUrl = URL.createObjectURL(svgBlob);
        // var downloadLink = document.createElement("a");
        // downloadLink.href = svgUrl;
        // downloadLink.download = "newesttree.svg";
        // document.body.appendChild(downloadLink);
        // downloadLink.click();
        // document.body.removeChild(downloadLink);
    };
    EditorPicComponent.prototype.saveCanvasToJSON = function () {
        var json = JSON.stringify(this.canvas);
        // localStorage.setItem('Kanvas', json);
        // console.log('json');
        // console.log(json);
    };
    EditorPicComponent.prototype.loadCanvasFromJSON = function () {
        // const CANVAS = localStorage.getItem('Kanvas');
        // console.log('CANVAS');
        // console.log(CANVAS);
        // // and load everything from the same json
        // this.canvas.loadFromJSON(CANVAS, () => {
        //   console.log('CANVAS untar');
        //   console.log(CANVAS);
        //   // making sure to render canvas at the end
        //   this.canvas.renderAll();
        //   // and checking if object's "name" is preserved
        //   console.log('this.canvas.item(0).name');
        //   console.log(this.canvas);
        // });
    };
    EditorPicComponent.prototype.topp = function () {
        // console.log(this.canvas._activeObject.top);
    };
    EditorPicComponent.prototype.rasterizeJSON = function () {
        this.json = JSON.stringify(this.canvas, null, 2);
    };
    EditorPicComponent.prototype.resetPanels = function () {
        this.textEditor = false;
        this.imageEditor = false;
        this.figureEditor = false;
    };
    __decorate([
        core_1.ViewChild('htmlCanvas')
    ], EditorPicComponent.prototype, "htmlCanvas");
    EditorPicComponent = __decorate([
        core_2.Injectable({
            providedIn: 'root'
        }),
        core_1.Component({
            selector: 'app-editor-pic',
            templateUrl: './editor-pic.component.html',
            styleUrls: ['./editor-pic.component.css']
        })
        // @HostListener('window:resize', ['$event'])
    ], EditorPicComponent);
    return EditorPicComponent;
}());
exports.EditorPicComponent = EditorPicComponent;
