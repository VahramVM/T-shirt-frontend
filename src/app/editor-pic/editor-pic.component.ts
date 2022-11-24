import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input, HostListener, ChangeDetectorRef } from '@angular/core';
import 'fabric';
import { Color } from 'fabric/fabric-impl';
import { Width } from 'ngx-owl-carousel-o/lib/services/carousel.service';
import { DataService } from '../shared/layouts/servises/data.service';
import { OrderDatasService } from '../shared/layouts/servises/order-datas.service';
import { Injectable } from '@angular/core'

// var svgToMiniDataURI = require('mini-svg-data-uri');
// import 'jquery';

import { SiteLayoutComponent } from '../shared/layouts/site-layout/site-layout.component'
import { SizeFormatComponent } from '../shared/layouts/site-layout/size-format/size-format.component';
import { ProdutsColorService } from '../shared/layouts/servises/productscolor.service';
import { Products } from '../shared/interface';
import { ProdutsService } from '../shared/layouts/servises/products.service';
// import { SiteLayoutComponent } from '../ass'


declare var Caman: any;
declare const fabric: any;
declare const $: any;

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-editor-pic',
  templateUrl: './editor-pic.component.html',
  styleUrls: ['./editor-pic.component.css']
})

// @HostListener('window:resize', ['$event'])


export class EditorPicComponent implements AfterViewInit {
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;

  // @ViewChild('htmlCanvas') htmlCanvas1: ElementRef;

  // @HostListener('window:resize', ['$event'])
  public canvas: fabric.Canvas;
  // private canvas1: fabric.Canvas;

  public props = {

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
    brandName: '',
  };

  public canvasHtml;
  // public canvasHtml1;
  public textString: string = '';
  public url: string | ArrayBuffer = '';
  public scaleKey: number;



  onResize(event) {
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
  }



  // public sizeCanvas: { width: number, height: number } = {
  //   // left: 350,
  //   width:  430, 
  //   height: 530
  // };




  public json: any;
  private globalEditor = false;
  public textEditor = false;
  private imageEditor = false;
  public figureEditor = false;
  public selected: any;

  public disableBtn: boolean = false;
  public canvasCount: number = 0;
  public canvasCountPNJ: number = 0;

  //delate button on pictures
  public left: number = 10;
  public top: number = -11;
  public widthHeight = 10;

  public value = null;
  public id: string = '';
  public filterName = '';

  public imageCoordy = null;

  public imageCoordxx = null;
  public imageCoordyy = null;
  public reqImage = null;
  public reqImage1 = null;

  public _handleScaling
  public _setScalingProperties

  public linkk = false;
  public drawObject = null;

  // public objWidthLimit = 170;
  // public objHeightLimit = 170;

  public test = null;
  public path = null;
  public svg_text = null;
  public intCountText = null;

  public imageFilter = null;
  public imgPadding = 0;



  // public checked = false;

  public shadow = {
    color: 'rgba(0, 0, 0, 1)',
    blur: 70,
    offsetX: 10,
    offsetY: 10,
    opacity: 0.7,
    fillShadow: true,
    strokeShadow: true
  }

  public shadowPNJ = {
    color: 'rgba(0, 0, 0, 1)',
    blur: 70,
    offsetX: 10,
    offsetY: 10,
    opacity: 0.7,
    affectStroke: false
  }

  public shadowFigur = {
    color: 'rgba(0, 0, 0, 1)',
    blur: 10,
    offsetX: 5,
    offsetY: 5,
    opacity: 0.7,
    affectStroke: false
  }


  public shadowTEXT = {
    color: 'rgba(0, 0, 0, 1)',
    blur: 4,
    offsetX: 5,
    offsetY: 5,
    opacity: 0.7,
    affectStroke: false
  }

  public a: number;
  public b: number;
  public c: number;
  public d: number;


  constructor(private siteLayout: SiteLayoutComponent,
    private element: ElementRef,
    private dataService: DataService,
    private orderDatas: OrderDatasService,
    private productsService: ProdutsService
  ) {

    this.productsService.fetch().subscribe(
      (res: Products[]) => {
        this.props.canvasImage = res[1].type;
      }
    );

    // this.props.canvasImage = this.productsService.;
    this.scaleKey = this.dataService.scaleKey;


    this.a = dataService.formatTopKey;

    this.dataService.formatTop.subscribe(
      res => this.a = res
    );

    this.b = dataService.sizePrintKey;

    this.dataService.formatA4Horizontal.subscribe(
      res => this.b = res
    );

    this.c = dataService.formatWithHeight;

    this.dataService.formatA4Vertical.subscribe(
      res => this.c = res
    );

    this.dataService.scaleKeyy.subscribe(

      res => this.d = res
    );


  }

  defoultUpdate() {
    $('.owl-theme').on('changed.owl-carousel', (event) => {
      var current = event.item.index;
      this.id = $(event.target).find(".owl-item").eq(current).find("img").attr('id');
      // console.log(this.id);

    })
  }

  ngOnInit(): void {

  }



  ngAfterViewInit(): void {
    // setup front side canvas
    // this.props.canvasImage = this.siteLayout.firstBackCanvasImage;


    // this.canvas1 = new fabric.Canvas(this.htmlCanvas.nativeElement);
    // this.canvas1.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
    // this.canvas1.setBackgroundImage(this.htmlCanvas.nativeElement, this.canvas1.renderAll.bind(this.canvas1));


    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      preserveObjectStacking: true,
      selectionDashArray: [7, 6],
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

    let numLeft = this.left;
    let numTop = this.top;







    this.canvas.on({


      'after:render': (e) => {
        this.canvas.calcOffset();

      },

      'object:moving': (e) => {

        let obj = e.target;
        obj.setCoords();
        obj.saveState();
        let matrix = e.target.calcTransformMatrix();
        let imageCoordx = matrix[4];
        let imageCoordy = matrix[5];
        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);
        let moveSizeLimit = this.canvas.width / this.b;
        let cornerSize = this.canvas.width / 40;
        let sumLeft = obj.getBoundingRect().left;
        let sumTop = obj.getBoundingRect().top;
        let sumWidth = obj.getBoundingRect().width;
        let sumHeight = obj.getBoundingRect().height;
        let Delta = this.canvas.height - 2 * (moveSizeLimit + cornerSize) - (this.canvas.width - 2 * (moveSizeLimit + cornerSize)) * this.dataService.formatWithHeight;

        // if (obj.height > obj.canvas.height || obj.width > obj.canvas.width) {
        //   obj.originY;
        //   obj.originX;
        // }

        // top-left  corner
        console.log('fromEditor', this.dataService.sizePrintKey, this.b, this.d);


        if (sumTop < cornerSize + moveSizeLimit - this.canvas.width * this.a || sumLeft < cornerSize + moveSizeLimit
        ) {

          obj.top = Math.max(obj.top, obj.top - sumTop + cornerSize + moveSizeLimit - this.canvas.width * this.a);
          obj.left = Math.max(obj.left, obj.left - sumLeft + (cornerSize + moveSizeLimit));
        }

        // bot-right corner

        if (sumTop + sumHeight + Delta + cornerSize + moveSizeLimit + this.canvas.width * this.a > obj.canvas.height ||
          sumLeft + sumWidth > obj.canvas.width - cornerSize - moveSizeLimit) {

          obj.top = Math.min(obj.top, obj.canvas.height - sumHeight + obj.top - sumTop - cornerSize - moveSizeLimit - Delta - this.canvas.width * this.a);
          obj.left = Math.min(obj.left, obj.canvas.width - sumWidth + obj.left - sumLeft - cornerSize - moveSizeLimit);
        }

        $(".deleteBtn").remove();
        $(".distance").remove();
        $(".distanceY").remove();

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrowUp(imageCoordx, 2)

        // addDistancePoint(imageCoordy, imageCoordy);
        this.addArrow(imageCoordy, 2);

        // addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
        obj.setCoords();
        obj.saveState();
        this.canvas.renderAll()

      },

      'object:scaling': (e) => {


        let obj = e.target;
        // this.dataService.scaleKey = obj.scaleX;
        console.log(obj.scaleX, obj.scaleY);

        obj.setCoords();
        obj.saveState();
        let cornerSize = this.canvas.width / 40;
        let moveSiseLimit = this.canvas.width / this.dataService.sizePrintKey;
        let sumLeft = obj.getBoundingRect().left;
        let sumTop = obj.getBoundingRect().top;
        let sumWith = obj.getBoundingRect().width;
        let sumHeight = obj.getBoundingRect().height;

        let matrix = e.target.calcTransformMatrix();
        let imageCoordx = matrix[4];
        let imageCoordy = matrix[5];

        let angle = Math.abs(((this.canvas.getActiveObject().angle) * Math.PI) / 180);
        let activeObject = this.canvas.getActiveObject();
        let nerqnadzic = Math.sqrt(Math.pow(activeObject.width, 2) + Math.pow(activeObject.height, 2));
        let cos = Math.abs(Math.cos(angle));
        let sin = Math.abs(Math.sin(angle));
        let formatWidth = (this.canvas.width) - 2 * (moveSiseLimit + cornerSize);
        let formatHeight = formatWidth * this.dataService.formatWithHeight;
        let moveSizeLimit = this.canvas.width / this.dataService.sizePrintKey;
        let Delta = this.canvas.height - 2 * (moveSizeLimit + cornerSize) - (this.canvas.width - 2 * (moveSizeLimit + cornerSize)) * this.dataService.formatWithHeight;



        // top-left  corner
        if (sumLeft < cornerSize + moveSiseLimit) {
          obj.left = Math.max(obj.left, obj.left - sumLeft + (cornerSize + moveSiseLimit));
        }

        if (sumTop < cornerSize + moveSiseLimit - this.canvas.width * this.a) {
          obj.top = Math.max(obj.top, obj.top - sumTop + cornerSize + moveSiseLimit - this.canvas.width * this.a);
        }

        //top right corner
        if (sumLeft + sumWith + cornerSize + moveSiseLimit > obj.canvas.width) {
          obj.left = Math.min(obj.left, obj.canvas.width - sumWith + obj.left - sumLeft - cornerSize - moveSiseLimit);
        }

        // bot right corner
        if (sumTop + sumHeight + obj.cornerSize + moveSiseLimit + Delta + this.canvas.width * this.a > obj.canvas.width) {

          obj.top = Math.min(obj.top, obj.canvas.height - sumHeight + obj.top - sumTop - obj.cornerSize - moveSiseLimit - Delta - this.canvas.width * this.a);
        }

        // With limit

        if (sumWith > formatWidth) {
          if (activeObject.angle === 0 || activeObject.angle === 180) {
            this.canvas.getObjects().filter((o) => {
              if (o.get('type') === 'i-text') {
                activeObject.scaleX = formatWidth / (activeObject.width * 1.5);

              } else {
                activeObject.scaleX = formatWidth / activeObject.width;

              }
            })

          } else {
            this.canvas.getObjects().filter((o) => {
              if (o.get('type') === 'i-text') {
                activeObject.scaleX = formatWidth / (activeObject.width * 2);
                activeObject.scaleY = formatWidth / (nerqnadzic * 2);

              } else {
                activeObject.scaleX = formatWidth / activeObject.width * 1.6;
                activeObject.scaleY = formatWidth / nerqnadzic * 1.6;

              }
            })



          }
        }

        if (sumHeight > formatHeight) {
          if (activeObject.angle === 0) {
            activeObject.scaleY = formatHeight / activeObject.height;

          } else {
            activeObject.scaleX = formatWidth / nerqnadzic;
            activeObject.scaleY = formatWidth / nerqnadzic;
          }
        }


        if (activeObject.width * activeObject.scaleX > formatWidth && activeObject.angle !== 0) {

          activeObject.scaleX = formatWidth / nerqnadzic;
          activeObject.scaleY = formatWidth / nerqnadzic;

        }

        if (activeObject.height * activeObject.scaleY > formatHeight && activeObject.angle !== 0) {
          activeObject.scaleX = formatHeight / nerqnadzic;
          activeObject.scaleY = formatHeight / nerqnadzic;

        }


        obj.minScaleLimit = 0.04;

        $(".deleteBtn").remove();
        $(".distance").remove();
        $(".distanceY").remove();

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrowUp(imageCoordx, 2)

        // addDistancePoint(imageCoordy, imageCoordy);
        this.addArrow(imageCoordy, 2);

        // addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
        obj.setCoords();
        obj.saveState();
        this.canvas.renderAll()


      },

      'object:modified': (e) => {

        let obj = e.target;
        obj.setCoords();
        obj.saveState();
        let matrix = e.target.calcTransformMatrix();
        let boundingRect = obj.getBoundingRect(true);
        let imageCoordx = matrix[4];
        let imageCoordy = matrix[5];
        let moveSizeLimit = this.canvas.width / this.dataService.sizePrintKey;
        let cornerSize = this.canvas.width / 40;
        let sumLeft = obj.getBoundingRect().left;
        let sumTop = obj.getBoundingRect().top;
        let sumWidth = obj.getBoundingRect().width;
        let sumHeight = obj.getBoundingRect().height;
        let Delta = this.canvas.height - 2 * (moveSizeLimit + cornerSize) - (this.canvas.width - 2 * (moveSizeLimit + cornerSize)) * this.dataService.formatWithHeight;


        // top-left  corner
        if (sumLeft < (cornerSize + moveSizeLimit)) {
          obj.left = Math.max(obj.left, obj.left - sumLeft + (cornerSize + moveSizeLimit));
        }

        if (sumTop < cornerSize + moveSizeLimit - this.canvas.width * this.a) {
          obj.top = Math.max(obj.top, obj.top - sumTop + cornerSize + moveSizeLimit - this.canvas.width * this.a);
        }

        // bot-right corner
        if (sumLeft + sumWidth + cornerSize + moveSizeLimit > obj.canvas.width) {
          obj.left = Math.min(obj.left, obj.canvas.width - sumWidth + obj.left - sumLeft - cornerSize - moveSizeLimit);
        }

        if (sumTop + sumHeight + cornerSize + moveSizeLimit + Delta + this.canvas.width * this.a > obj.canvas.height) {
          obj.top = Math.min(obj.top, obj.canvas.height - sumHeight + obj.top - sumTop - cornerSize - moveSizeLimit - Delta - this.canvas.width * this.a);
        }


        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);


        $(".distance").remove();

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrow(imageCoordy, 2)

        $(".distanceY").remove();

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrowUp(imageCoordx, 2);

        this.addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
        obj.setCoords();
        obj.saveState();
        this.canvas.renderAll();
      },

      'selection:created': (e) => {
        let obj = e.target;

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
        this.addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);

        $(".distance").remove();
        let matrixx = e.target.calcTransformMatrix();
        let imageCoordxx = matrixx[4];
        let imageCoordyy = matrixx[5];
        // addDistancePoint(imageCoordyy, imageCoordxx);
        this.addArrow(imageCoordyy, 2)

        $(".distanceY").remove();
        let matrixxx = e.target.calcTransformMatrix();
        let imageCoordxxx = matrixxx[4]
        let imageCoordyyy = matrixxx[5]
        // addDistancePoint(imageCoordyyy, imageCoordxxx);
        this.addArrowUp(imageCoordxxx, 2)

        let matrix = e.target.calcTransformMatrix();
        var imageCoordx = matrix[4];
        var imageCoordy = matrix[5];
        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);

        let imgWith = obj.width * obj.scaleX;
        let imgHeight = obj.height * obj.scaleY;
        this.siteLayout.imgWith = Math.floor(imgWith);
        this.siteLayout.imgHeigt = Math.floor(imgHeight);


        this.selected = obj.type;
        obj.hasRotatingPoint = true;
        obj.transparentCorners = false;
        obj.cornerColor = '#FF7F50';
        // e.target.bringToFront()
        // this.canvas.getActiveObject()
        this.canvas.renderAll()
        this.resetPanels();

        this.getOpacity();
        this.getDistance();
        obj.setCoords();
        obj.saveState();

        if (obj.type !== 'group' && obj) {

          this.getId();
          this.getOpacity();
          this.getDistance();

          switch (obj.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.figureEditor = true;
              this.getFill();
              break;
            case 'i-text':
              this.textEditor = true;
              // this.getLineHeight();
              // this.getCharSpacing();
              this.getBold();
              this.getFill();
              this.getTextDecoration();
              this.getTextAlign();
              this.getFontFamily();
              this.bringToFront()
              // this.sendToBack()
              // this.getLineHeight();
              this.getCharSpacing();
              this.getFontSize();
              break;
            case 'image':
              this.getOpacity();
              this.getDistance();
              break;
          }
        }

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrowUp(imageCoordx, 2)

        // addDistancePoint(imageCoordy, imageCoordy);
        this.addArrow(imageCoordy, 2);

        // addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
        obj.setCoords();
        obj.saveState();
        this.canvas.renderAll();

        if (this.canvasCount !== 0) {
          this.dataService.canvasSelect = true;
        }

      },

      // 'selection:created': (e) => {

      //   if (this.canvasCount !== 0) {
      //     this.dataService.canvasSelect = true;
      //   }
      // },

      'before:selection:cleared': (e) => {

        if (this.canvasCount !== 0) {
          this.dataService.canvasSelect = true;
        }
        $(".deleteBtn").remove();
        $(".distance").remove();
      },

      'selection:updated': (e) => {

        let obj = e.target

        this.addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

        $(".distance").remove();
        let matrixx = e.target.calcTransformMatrix();
        var imageCoordx = matrixx[4]
        var imageCoordy = matrixx[5]
        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrow(imageCoordy, 2);

        $(".distanceY").remove();
        let matrixxx = e.target.calcTransformMatrix();
        var imageCoordx = matrixxx[4]
        var imageCoordy = matrixxx[5]

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrowUp(imageCoordx, 2)

        let matrix = e.target.calcTransformMatrix();
        var imageCoordx = matrix[4];
        var imageCoordy = matrix[5];
        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);

        let imgWith = obj.width * obj.scaleX;
        let imgHeight = obj.height * obj.scaleY;
        this.siteLayout.imgWith = Math.floor(imgWith);
        this.siteLayout.imgHeigt = Math.floor(imgHeight);


        this.selected = obj.type;
        obj.hasRotatingPoint = true;
        obj.transparentCorners = false;
        obj.cornerColor = '#FF7F50';
        // e.target.bringToFront()
        // this.canvas.getActiveObject()
        this.resetPanels();

        this.getOpacity();
        this.getDistance();


        if (obj.type !== 'group' && obj) {

          this.getId();
          this.getOpacity();
          this.getDistance();

          switch (obj.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.figureEditor = true;
              this.getFill();
              break;
            case 'i-text':
              this.textEditor = true;
              // this.getLineHeight();
              // this.getCharSpacing();
              this.getBold();
              this.getFill();
              this.getTextDecoration();
              this.getTextAlign();
              this.getFontFamily();
              this.bringToFront()
              // this.sendToBack()
              // this.getLineHeight();
              this.getCharSpacing();
              this.getFontSize();

              break;
            case 'image':
              this.getOpacity();
              this.getDistance();

              break;
          }
        }

        $(".distance").remove();

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrow(imageCoordy, 2)

        $(".distanceY").remove();

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrowUp(imageCoordx, 2);

        this.addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
        obj.setCoords();
        obj.saveState();
        this.canvas.renderAll();

      },

      'selection:cleared': (e) => {

        this.dataService.canvasSelect = false;

        $(".deleteBtn").remove();
        $(".distance").remove();


        let obj = e.target
        // console.log('cleared');
        this.selected = null;
        this.resetPanels();
        // console.log('clear');
        this.siteLayout.imageCoordx = null;
        this.siteLayout.imageCoordy = null;
        this.siteLayout.imgWith = null;
        this.siteLayout.imgHeigt = null;


      },

      'object:rotating': (e) => {
        const obj = e.target;
        obj.setCoords();
        obj.saveState();
        let matrix = e.target.calcTransformMatrix();
        const angle = Math.abs(((this.canvas.getActiveObject().angle) * Math.PI) / 180);
        const sumWidth = obj.getBoundingRect().width;
        const sumHeight = obj.getBoundingRect().width;
        let imageCoordx = matrix[4];
        let imageCoordy = matrix[5];
        // const nerqnadzicc = Math.sqrt(Math.pow(this.canvas.getActiveObject().width, 2) + Math.pow(this.canvas.getActiveObject().height, 2))
        const cos = Math.abs(Math.cos(angle));
        const sin = Math.abs(Math.sin(angle));

        const formatWidth = (window.innerWidth - this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - this.dataService.widthKey * window.innerWidth) / this.b + (window.innerWidth - this.dataService.widthKey * window.innerWidth) / 40);
        const formatHeight = formatWidth * this.c;

        if (sumWidth > formatWidth) {

          this.canvas.getActiveObject().scaleX = formatWidth / (this.canvas.getActiveObject().width / (cos * 0.8));
          this.canvas.getActiveObject().scaleY = formatWidth / (this.canvas.getActiveObject().width / (cos * 0.8));

        }

        if (sumHeight > formatHeight) {
          this.canvas.getActiveObject().scaleX = formatHeight / (this.canvas.getActiveObject().height / (cos * 0.65));
          this.canvas.getActiveObject().scaleY = formatHeight / (this.canvas.getActiveObject().height / (cos * 0.65));
        }


        $(".distance").remove();

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrow(imageCoordy, 2)

        $(".distanceY").remove();

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrowUp(imageCoordx, 2);

        this.addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);
        obj.setCoords();
        obj.saveState();
        this.canvas.renderAll();

      },

      'path:created': (e) => {


        this.canvasCount += 1;

        this.canvas.isDrawingMode = false;
        // this.canvas.on('mouse:up', () => this.canvas.setActiveObject());
        console.log(this.canvas.item(this.canvasCount - 1));

        this.canvas.getObjects().indexOf(e.target)
        // this.canvas.setActiveObject(this.canvas.item(this.canvasCount- 1));
        this.selectItemAfterAdded(this.canvas.item(this.canvasCount - 1))
      },

      'object:added': (e) => {
        let obj = e.target;
        var matrix = e.target.calcTransformMatrix();
        let imageCoordx = matrix[4];
        let imageCoordy = matrix[5];

        this.canvas.getObjects().filter((o) => {
          if (o.get('type') === 'i-text') {
            this.imgPadding = 2800 / this.props.diametr
          }
        })

        $(".deleteBtn").remove();
        // console.log('added');


        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrow(imageCoordy, 2)

        $(".distanceY").remove();

        // addDistancePoint(imageCoordy, imageCoordx);
        this.addArrowUp(imageCoordx, 2);

        this.addDeleteBtn(obj.oCoords.mb.x, obj.oCoords.mb.y);

        obj.setCoords();
        obj.saveState();
        this.canvas.renderAll();

      },



    });

    // --!


    // this.canvas1.setWidth(this.siteLayout.canvasHtmlWidth);
    // this.canvas1.setHeight(this.siteLayout.canvasHtmlHeight);
    // this.canvas1.renderAll();
    // get references to the html canvas element & its context
    this.canvas.on('mouse:down', (e) => {
      const canvasElement: any = document.getElementById('canvas');
    });

    // this.canvas1.on('mouse:down', (e) => {
    //   const canvasElement: any = document.getElementById('canvas');
    // });

    this.canvas.on('mouse:over', () => {

      const color = this.props.drawFill;

      this.canvas.freeDrawingBrush.color = color;

      // alert("mouse up!");
      // this.canvas.add(refRect);
      // isMouseDown = false;
      // freeDrawing=false; // **Disables line drawing
    });

  }

  /*------------------------Block elements------------------------*/

  // Block "Size"

  // changeSize() {
  //   this.canvas.setWidth(this.siteLayout.canvasHtml);
  //   this.canvas.setHeight(500);
  //   this.canvas.renderAll()

  // }

  // Block "Add text"


  addArrowUp(o, p) {
    var arrow = '<img src="../assets/img/output-onlinepngtools-up.png" class="distance" style="position:absolute; top:' + p + 'px; left:' + (o - 5) + 'px; cursor:crosshair; width:10px; height:40px;"/>';
    $(".canvas-container").append(arrow);
  }

  addArrow(o, p) {
    var arrow = '<img src="../assets/img/green-arrow-clipart-2.png" class="distance" style="position:absolute; top:' + o + 'px; left:' + p + 'px; cursor:crosshair; width:40px; height:10px;"/>';
    $(".canvas-container").append(arrow);
  }

  addDeleteBtn(x, y) {

    $(".deleteBtn").remove();
    var btnLeft = x - this.left;
    var btnTop = y + this.top;
    var deleteBtn = '<img src="../assets/img/remove-icon-png-15.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:25px;height:25px;"/>';
    $(".canvas-container").append(deleteBtn);

  }


  resizeEbiten(iframe, parentId, aspectRatio) {
    let parent = document.getElementById(parentId);
    let w = parent.clientWidth;
    iframe.width = w;
    iframe.height = w * aspectRatio;
    iframe.contentWindow.addEventListener('resize', () => {
      let w = parent.clientWidth;
      iframe.width = w;
      iframe.height = w * aspectRatio;
    });
  }



  canvasDrawing(target) {


    $(document).on('click', ".deleteBtn", (event) => {

      event.stopImmediatePropagation()
      this.canvasCount -= 1;

      console.log(this.canvasCount);
      if (this.canvasCount === 0) {
        // this.siteLayout.isOpasity=true;
        $('.owl-nav').show();
        $(".canvas").css("z-index", 0);
        this.disableBtn = false;
        this.siteLayout.toggle = false;
        console.log('delete---');

      }
      const activeObject = this.canvas.getActiveObject();
      const activeGroup = this.canvas.getActiveObjects();
      if (activeObject) {
        this.canvas.remove(activeObject);
        $(".deleteBtn").remove();

        // this.textString = '';
      } else if (activeGroup) {
        this.canvas.discardActiveObject();
        const self = this;
        activeGroup.forEach((object) => {
          self.canvas.remove(object);
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
        let color = this.props.drawFill;
        console.log(color);
        this.siteLayout.toggle = true;
        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
        this.drawObject = this.canvas.freeDrawingBrush;
        this.canvas.freeDrawingBrush.color = color;
        this.canvas.freeDrawingBrush.width = 4;
        this.canvas.isDrawingMode = true;
        this.canvas.renderAll();
        this.selectItemAfterAdded(this.canvas.item(0))
        break;
      case "spray":
        let colorSpray = this.props.drawFill;
        this.siteLayout.toggle = true;
        this.canvas.freeDrawingBrush = new fabric.SprayBrush(this.canvas);
        this.canvas.freeDrawingBrush.color = colorSpray;
        this.canvas.freeDrawingBrush.width = 15;
        this.canvas.isDrawingMode = true;
        // this.canvas.setActiveObject(Object[0]);
        this.selectItemAfterAdded(this.canvas.item(0))

        break;
      default:
        break;
    }
  }



  addText() {

    // console.log(this.props.textCurved);

    let numLeft = this.left;
    let numTop = this.top;

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



    if (this.props.diametr < 299) {

      console.log('<280');
      this.props.inputDisabled = 'inputDisabled';

      this.canvas.remove(this.canvas.getActiveObject())


      const path = new fabric.Path(`'M 90 425 A ${this.props.diametr} ${this.props.diametr} 0 0 1 271 420 '`, {
        strokeWidth: 1,
        absolutePositioned: true,
        fill: false,
      })

      // const path = new fabric.Path(`'M 90 425 A ${this.props.diametr} ${this.props.diametr} 0 0 1 271 420 '`, {
      //   strokeWidth: 1,
      //   absolutePositioned: true,
      //   fill: false,
      // })

      // const pathText = this.props.path


      var pathInfo = fabric.util.getPathSegmentsInfo(path.path);
      path.segmentsInfo = pathInfo;
      let textPathLength = pathInfo[pathInfo.length - 1].length;
      let k = this.textString.length;
      let fontSize = 1.9 * textPathLength / this.textString.length;
      this.props.fontSize = fontSize;

      if (this.textString) {
        // this.canvasCount += 1;
        const text = new fabric.IText(this.textString, {
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
          scaleX: 0.8,
          scaleY: 0.8,
          // fontSize: 80,
          hasRotatingPoint: true,
          // strokeWidth: 30,
          // strokeMiterLimit: 15,
          // width: 50,
          cornerSize: this.canvas.width / 40,
          padding: this.imgPadding,
          centeredRotation: true,
          // charSpacing: 50,
          // pathStartOffset: 80,
          // centerTransform: true,
          // textAlign: 'center',
          // pathSide: 'right',
          // strokeDashOffset: 30, 
          // originX: 'center',
          // originY: 'center',
        },
          this.path = path,

        );


        $('#shadowText').on('click', () => {
          if (!this.siteLayout.shadowText) {
            text.shadow = null;

          } else if (this.siteLayout.shadowText) {

            // text.setShadow(this.shadowTEXT) old version;

            // text.set('shadow', new fabric.Shadow(this.shadowTEXT));
            text.shadow = new fabric.Shadow(this.shadowTEXT);
            // text.set('shadow', new fabric.Shadow(this.shadowTEXT));
            // console.log('text');

          }

          this.canvas.renderAll();

        }),

          this.extend(text, this.randomId());

        this.canvas.add(text);

        this.canvas.renderAll();
        // this.canvas.add(path);
        // console.log(this.canvas.toSVG());

        // console.log(this.canvas.toSVG().toString().replace("<defs>", '').replace("</defs>", str));
        // text.left = this.props.curvedTextLeft;
        // text.top = this.props.curvedTextTop;
        this.canvas.centerObjectH(text);
        text.top = this.canvas.height / 3;
        this.selectItemAfterAdded(text);
        // this.textString = '';
      }

    } else {

      this.props.inputDisabled = 'inputDisabled';
      this.canvas.remove(this.canvas.getActiveObject())

      if (this.props.diametr === 300) {
        this.intCountText += 1;
        this.canvasCount += 1;
        console.log(this.canvasCount);
      }

      console.log('>280');


      $(document).on('click', ".deleteBtn", (event) => {
        this.siteLayout.activatebutton = true;

        event.stopImmediatePropagation()
        this.canvasCount -= 1;
        console.log(this.canvasCount);

        // console.log(this.canvasCount);
        if (this.canvasCount === 0) {
          this.siteLayout.firstImage = 0;
          $('.owl-nav').show();
          $(".canvas").css("z-index", 0);
          this.siteLayout.toggle = false;
          this.disableBtn = false;

        }


        const activeObject = this.canvas.getActiveObject();
        const activeGroup = this.canvas.getActiveObjects();
        if (activeObject) {

          this.canvas.remove(activeObject);
          $(".deleteBtn").remove();
          $(".distance").remove();
          // this.textString = '';
        } else if (activeGroup) {
          this.canvas.discardActiveObject();
          const self = this;
          activeGroup.forEach((object) => {
            self.canvas.remove(object);
          });
        }
      });

      const path = new fabric.Path(`'M 69 435 A ${this.props.diametr} ${this.props.diametr} 0 0 1 271 420 '`, {
        strokeWidth: 1,
        absolutePositioned: true,
        fill: false,
      })

      // const pathText = this.props.path


      var pathInfo = fabric.util.getPathSegmentsInfo(path.path);
      path.segmentsInfo = pathInfo;
      let textPathLength = pathInfo[pathInfo.length - 1].length;
      // let k = this.textString.length;
      let fontSize = 1.9 * this.props.diametr / this.textString.length;
      this.props.fontSize = fontSize;

      if (this.textString) {
        // this.canvasCount += 1;
        const text = new fabric.IText(this.textString, {
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
          scaleX: 0.5,
          scaleY: 0.5,
          // fontSize: 80,
          hasRotatingPoint: true,
          // strokeWidth: 10,
          // strokeMiterLimit: 15,
          // width: 50,
          cornerSize: this.canvas.width / 40,
          padding: this.imgPadding,
          centeredRotation: true,
          // charSpacing: 50,
          // pathStartOffset: 80,
          // centerTransform: true,
          // textAlign: 'center',
          // pathSide: 'right',
          // strokeDashOffset: 30, 
          // originX: 'center',
          // originY: 'center',
        },
          // this.path = path,
        );

        this.props.textStraight = text

        $('#shadowText').on('click', () => {
          if (!this.siteLayout.shadowText) {
            text.shadow = null;

          } else if (this.siteLayout.shadowText) {

            // text.setShadow(this.shadowTEXT) old version;

            // text.set('shadow', new fabric.Shadow(this.shadowTEXT));
            text.shadow = new fabric.Shadow(this.shadowTEXT);
            // text.set('shadow', new fabric.Shadow(this.shadowTEXT));
            // console.log('text');

          }

          this.canvas.renderAll();

        }),

          this.extend(text, this.randomId());



        // text.charSpacing = pathLength;


        this.canvas.add(text);

        this.canvas.renderAll();
        // this.canvas.add(path);

        // console.log(this.canvas.toSVG().toString().replace("<defs>", '').replace("</defs>", str));

        this.canvas.centerObjectH(text);
        text.top = this.canvas.height / 3;
        this.selectItemAfterAdded(text);
        // this.textString = '';
        console.log(this.canvasCount);
      }
    }

  }








  discardActiveObj() {
    this.props.diametr = 300;
    this.canvas.discardActiveObject().renderAll()
  }

  reRender() {

    this.canvas.getObjects().filter((o) => {
      if (o.get('type') === 'i-text') {
        return this.canvas.setActiveObject(o);
      }
    });

    if (this.canvasCount !== 0) {

      // this.selectItemAfterAdded(this.props.textStraight);
      this.canvas.remove(this.canvas.getActiveObject());
      this.canvas.add(this.props.textStraight);
      this.canvas.renderAll();
    }

  }

  reRender1() {

    this.canvas.getObjects().filter((o) => {
      if (o.get('type') === 'i-text') {
        return this.canvas.setActiveObject(o);
      }
    });

    // if (this.canvasCount !== 0) {

    //   // this.selectItemAfterAdded(this.props.textStraight);
    //   this.canvas.remove(this.canvas.getActiveObject());
    //   this.canvas.add(this.props.textStraight);
    //   this.canvas.renderAll();
    // }

  }



  // Block "Add images"

  getImgPolaroid(event: any) {


    this.canvas.includeDefaultValues;


    $(document).on('click', ".deleteBtn", (event) => {

      event.stopImmediatePropagation()
      // console.log('delete');
      const activeObject = this.canvas.getActiveObject();
      const activeGroup = this.canvas.getActiveObjects();
      this.canvasCount -= 1;


      if (this.canvasCount === 0) {
        this.siteLayout.firstImage = 0;
        $('#shadowSVG').prop('checked', false);
        this.siteLayout.shadowSVG = false;
        $('.owl-nav').show();
        this.siteLayout.toggle = false;
        // $('.owlCarousel').show()

        $(".canvas").css("z-index", 0);
        // this.siteLayout.isCarouselOpen = true;
        this.disableBtn = false;
      }
      if (activeObject) {
        this.canvas.remove(activeObject);
        $(".deleteBtn").remove();
        $(".distance").remove();
        // this.textString = '';
      } else if (activeGroup) {
        // console.log('group');

        this.canvas.discardActiveObject();
        const self = this;
        activeGroup.forEach((object) => {
          self.canvas.remove(object);
        });
      }
    });

    this.canvasCount += 1;
    const el = event;


    fabric.Image.fromURL(el, (image) => {
      // const image = fabric.util.groupSVGElements(objects, options);
      const imageWidth = (window.innerWidth - this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - this.dataService.widthKey * window.innerWidth) / this.b + (window.innerWidth - this.dataService.widthKey * window.innerWidth) / 40);
      const imageHeight = imageWidth * this.c;

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
        cornerSize: this.canvas.width / 40,
        hasRotatingPoint: true,
        // top: this.canvas.height / 3.7,
        // originX: 'left',
        // width: 100,
        // height: 100 
        // originY:s 'center'

      });
      // value.shadow.affectStroke = false;
      // image.panToActiveObject()

      image.scaleToWidth(imageWidth / this.scaleKey);
      image.scaleToHeight(imageHeight / this.scaleKey);
      this.extend(image, this.randomId());


      image.filters.push(new fabric.Image.filters.ColorMatrix({
        matrix: [1, 0, 0, 0, 0,
          0, 1, 0, 0, 0,
          0, 0, 1, 0, 0,
          0, 0, 1, 1, 0]
      }));



      image.applyFilters();
      this.canvas.add(image);
      // this.canvas.centerObject(image);
      this.canvas.centerObjectH(image);
      image.top = this.canvas.width / 40 + this.canvas.width / this.b - this.canvas.width * this.a;

      this.canvas.renderAll();

      $('#hue-value').on('change', () => {
        // console.log(this.siteLayout.removeColorValue);
        image.filters = [];
        if (this.filterName == 'blackWhite') {
          image.filters.push(new fabric.Image.filters.BlackWhite());
        } else if (this.filterName == 'vintage' && this.canvas.getActiveObject()) {
          image.filters.push(new fabric.Image.filters.Vintage());
        } else if (this.filterName == 'sepia') {

          image.filters.push(new fabric.Image.filters.Sepia());
        } else if (this.filterName == 'invert') {
          image.filters.push(new fabric.Image.filters.Invert());
        } else if (this.filterName == 'origin') {
          image.filters.push(new fabric.Image.filters.ColorMatrix({
            matrix: [1, 0, 0, 0, 0,
              0, 1, 0, 0, 0,
              0, 0, 1, 0, 0,
              0, 0, 1, 1, 0]
          }));
          // console.log('ooooooooooooooooo');

        }
        image.filters.push(new fabric.Image.filters.RemoveColor({
          distance: this.props.distance,

        }
        ));

        console.log(this.props.distance);
        this.imageFilter = image;
        image.applyFilters();
        this.canvas.renderAll();



      });

      // $(document).on('click', ".but", (event) => {
      //   image.left += 10;
      //   image.setCoords();
      //   image.saveState();
      //   this.canvas.renderAll();
      // }),




      $('#saturation').on('change', () => {
        image.filters = [];

        image.filters.push(new fabric.Image.filters.Saturation({

          saturation: this.siteLayout.saturation
        }
        ));
        image.applyFilters();

        this.canvas.renderAll();
      });

      $('#blur').on('change', () => {
        image.filters = [];
        image.filters.push(new fabric.Image.filters.Blur({
          blur: this.siteLayout.blur
        }
        ));
        image.applyFilters();
        this.canvas.renderAll();
      });

      $('#contrast1').on('change', () => {

        image.filters = [];
        image.filters.push(new fabric.Image.filters.Contrast({
          contrast: this.siteLayout.contrast
        }
        ));
        image.applyFilters();
        this.canvas.renderAll();
      });

      $('#noise').on('change', () => {

        image.filters = [];
        image.filters.push(new fabric.Image.filters.Noise({
          noise: this.siteLayout.noise
        }
        ));
        image.applyFilters();
        this.canvas.renderAll();
      })

      // console.log(image);


      $('#shadowSVG').on('change', () => {
        const obj = this.canvas.getActiveObject()
        if (this.siteLayout.shadowSVG === false) {
          image.shadow = null;

        } else if (this.siteLayout.shadowSVG) {

          image.setShadow(this.shadow);
          // console.log(image);

          // image.shadow = new fabric.Shadow(this.shadow);

          // image.set('shadow', new fabric.Shadow(this.shadow));

        }

        this.canvas.renderAll();

      }),

        $('#grayscale').on('click', () => {
          this.filterName = 'blackWhite';
          this.siteLayout.removeColorValue = 0;
          this.siteLayout.saturation = 0;
          this.siteLayout.blur = 0;
          this.siteLayout.noise = 0;
          this.siteLayout.contrast = 0;

          image.filters = [];

          image.filters.push(new fabric.Image.filters.BlackWhite());
          image.applyFilters();
          this.canvas.renderAll();
        }),

        $('#vintage').on('click', () => {
          this.filterName = 'vintage'
          this.siteLayout.removeColorValue = 0;
          this.siteLayout.saturation = 0;
          this.siteLayout.blur = 0;
          this.siteLayout.noise = 0;
          this.siteLayout.contrast = 0;

          image.filters = [];

          image.filters.push(new fabric.Image.filters.Vintage());
          image.applyFilters();
          this.canvas.renderAll();
        }),

        $('#sepia').on('click', () => {
          this.filterName = 'sepia';
          this.siteLayout.removeColorValue = 0;
          this.siteLayout.saturation = 0;
          this.siteLayout.blur = 0;
          this.siteLayout.noise = 0;
          this.siteLayout.contrast = 0;

          image.filters = [];

          image.filters.push(new fabric.Image.filters.Sepia());
          image.applyFilters();
          // console.log(image);
          //.filters[0].matrix[0]
          this.canvas.renderAll();
        }),

        $('#invert').on('click', () => {
          this.filterName = 'invert';
          this.siteLayout.removeColorValue = 0;
          this.siteLayout.saturation = 0;
          this.siteLayout.blur = 0;
          this.siteLayout.noise = 0;
          this.siteLayout.contrast = 0;

          image.filters = [];

          image.filters.push(new fabric.Image.filters.Invert());
          image.applyFilters();
          // console.log(image);
          //.filters[0].matrix[0]
          this.canvas.renderAll();
        }),

        $('#origin').on('click', () => {
          this.filterName = 'origin'
          this.siteLayout.removeColorValue = 0;
          this.siteLayout.saturation = 0;
          this.siteLayout.blur = 0;
          this.siteLayout.noise = 0;
          this.siteLayout.contrast = 0;

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
          this.canvas.renderAll();
        }),

        this.selectItemAfterAdded(image);
    });

    // event.target.left = 100;
    // event.target.top = 100;

    // event.target.setCoords({'left' : 50});
    console.log(this.canvas.getActiveObject());
    // event.target.saveState();

    // this.canvas.renderAll();

    // event.target.setCoords()
  }


  // Block "Upload Image"

  addImageOnCanvas(url) {

    let numLeft = this.left;
    let numTop = this.top;

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



    $(document).on('click', ".deleteBtn", (event) => {

      event.stopImmediatePropagation()

      const activeObject = this.canvas.getActiveObject();
      const activeGroup = this.canvas.getActiveObjects();
      this.canvasCount -= 1;
      // console.log(this.canvasCount);
      if (this.canvasCount === 0) {
        $('#shadow').prop('checked', false);
        this.siteLayout.shadow = false;
        $('.owl-nav').show();
        $(".canvas").css("z-index", 0);
        // this.siteLayout.isCarouselOpen = true;
        this.disableBtn = false;
        this.siteLayout.toggle = false;
      }

      if (activeObject) {
        this.canvas.remove(activeObject);
        $(".deleteBtn").remove();
        $(".distance").remove();
        // this.textString = '';
      } else if (activeGroup) {
        this.canvas.discardActiveObject();
        const self = this;
        activeGroup.forEach((object) => {
          self.canvas.remove(object);
        });
      }
    });



    if (url) {
      this.canvasCount += 1;
      console.log(url);

      // console.log(this.canvasCount);
      fabric.Image.fromURL(url, (image1) => {


        image1.set({
          // originX: 'center',
          // originY: 'center',
          // left: 110,
          // top: 50,
          quality: 1,
          angle: 0,
          padding: 0,
          cornerSize: this.canvas.width / 40,
          hasRotatingPoint: true
        });
        image1.scaleToWidth(this.canvas.width / 3);
        image1.scaleToHeight(this.canvas.width / 3);
        this.extend(image1, this.randomId());
        image1.filters.push(new fabric.Image.filters.ColorMatrix({
          matrix: [1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0]
        }));


        this.canvas.add(image1);
        this.canvas.centerObjectH(image1);
        image1.top = this.canvas.height / 2.7;
        image1.applyFilters();
        this.canvas.renderAll();

        $('#hue-value').on('change', () => {
          // console.log(this.siteLayout.removeColorValue);
          image1.filters = [];
          if (this.filterName == 'blackWhite') {
            image1.filters.push(new fabric.Image.filters.BlackWhite());
          } else if (this.filterName == 'vintage') {
            image1.filters.push(new fabric.Image.filters.Vintage());
          } else if (this.filterName == 'sepia') {
            image1.filters.push(new fabric.Image.filters.Sepia());
          } else if (this.filterName == 'invert') {
            image1.filters.push(new fabric.Image.filters.Invert());
          } else if (this.filterName == 'origin') {
            image1.filters.push(new fabric.Image.filters.ColorMatrix({
              matrix: [1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0]
            }));
          }
          image1.filters.push(new fabric.Image.filters.RemoveColor({
            distance: this.props.distance
          }
          ));
          image1.applyFilters();
          this.canvas.renderAll();
        });

        $('#saturation').on('change', () => {
          image1.filters = [];

          image1.filters.push(new fabric.Image.filters.Saturation({

            saturation: this.siteLayout.saturation
          }
          ));
          image1.applyFilters();

          this.canvas.renderAll();
        });

        $('#blur').on('change', () => {
          image1.filters = [];
          image1.filters.push(new fabric.Image.filters.Blur({
            blur: this.siteLayout.blur
          }
          ));
          image1.applyFilters();
          this.canvas.renderAll();
        });

        $('#contrast1').on('change', () => {

          image1.filters = [];
          image1.filters.push(new fabric.Image.filters.Contrast({
            contrast: this.siteLayout.contrast
          }
          ));
          image1.applyFilters();
          this.canvas.renderAll();
        });

        $('#noise').on('change', () => {

          image1.filters = [];
          image1.filters.push(new fabric.Image.filters.Noise({
            noise: this.siteLayout.noise
          }
          ));
          image1.applyFilters();
          this.canvas.renderAll();
        })

        $('#shadow').on('change', () => {
          const obj = this.canvas.getActiveObject()
          if (this.siteLayout.shadow === false) {
            image1.shadow = null;

          } else if (this.siteLayout.shadow) {

            image1.setShadow(this.shadowPNJ);
            // console.log('mmmm');

          }
          // this.canvas.toDataURL({
          //   format: 'png',
          //   quality: 1
          // });
          this.canvas.renderAll();

        }),


          $('#grayscale').on('click', () => {
            this.filterName = 'blackWhite';
            this.siteLayout.removeColorValue = 0;
            this.siteLayout.saturation = 0;
            this.siteLayout.blur = 0;
            this.siteLayout.noise = 0;
            this.siteLayout.contrast = 0;

            image1.filters = [];

            image1.filters.push(new fabric.Image.filters.BlackWhite());
            image1.applyFilters();
            this.canvas.renderAll();
          }),

          $('#vintage').on('click', () => {
            this.filterName = 'vintage'
            this.siteLayout.removeColorValue = 0;
            this.siteLayout.saturation = 0;
            this.siteLayout.blur = 0;
            this.siteLayout.noise = 0;
            this.siteLayout.contrast = 0;

            image1.filters = [];

            image1.filters.push(new fabric.Image.filters.Vintage());
            image1.applyFilters();
            this.canvas.renderAll();
          }),

          $('#sepia').on('click', () => {
            this.filterName = 'sepia';
            this.siteLayout.removeColorValue = 0;
            this.siteLayout.saturation = 0;
            this.siteLayout.blur = 0;
            this.siteLayout.noise = 0;
            this.siteLayout.contrast = 0;

            image1.filters = [];

            image1.filters.push(new fabric.Image.filters.Sepia());
            image1.applyFilters();
            // console.log(image1);
            //.filters[0].matrix[0]
            this.canvas.renderAll();
          }),

          $('#invert').on('click', () => {
            this.filterName = 'invert';
            this.siteLayout.removeColorValue = 0;
            this.siteLayout.saturation = 0;
            this.siteLayout.blur = 0;
            this.siteLayout.noise = 0;
            this.siteLayout.contrast = 0;

            image1.filters = [];

            image1.filters.push(new fabric.Image.filters.Invert());
            image1.applyFilters();
            // console.log(image1);
            //.filters[0].matrix[0]
            this.canvas.renderAll();
          }),

          $('#origin').on('click', () => {
            this.filterName = 'origin'
            this.siteLayout.removeColorValue = 0;
            this.siteLayout.saturation = 0;
            this.siteLayout.blur = 0;
            this.siteLayout.noise = 0;
            this.siteLayout.contrast = 0;

            image1.filters = [];

            image1.filters.push(new fabric.Image.filters.ColorMatrix({
              matrix: [1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0]
            }));
            image1.applyFilters();
            this.canvas.renderAll();
          }),

          this.selectItemAfterAdded(image1)


      });
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.url = readerEvent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite(url) {
    this.url = '';
  }

  // Block "Add figure"

  addFigure(figure) {



    this.canvasCount += 1;
    // console.log(this.canvasCount);


    $(document).on('click', ".deleteBtn", (event) => {


      event.stopImmediatePropagation();

      this.canvasCount -= 1;
      const activeObject = this.canvas.getActiveObject();
      const activeGroup = this.canvas.getActiveObjects();
      // console.log(this.canvasCount);
      if (this.canvasCount === 0) {
        this.siteLayout.firstImage = 0;
        // this.siteLayout.isOpasity=true;
        $('.owl-nav').show();
        $(".canvas").css("z-index", 0);
        this.disableBtn = false;
        this.siteLayout.toggle = false;

      }

      if (activeObject) {
        this.canvas.remove(activeObject);
        $(".deleteBtn").remove();

        // this.textString = '';
      } else if (activeGroup) {
        this.canvas.discardActiveObject();
        const self = this;
        activeGroup.forEach((object) => {
          self.canvas.remove(object);
        });
      }
    });


    let add: any;
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
    $('#shadow').on('click', () => {
      // console.log('figure');

      const obj = this.canvas.getActiveObject()
      if (!this.siteLayout.shadow) {
        add.shadow = null;

      } else if (this.siteLayout.shadow) {

        add.setShadow(this.shadowFigur);


      }
      // this.canvas.toDataURL({
      //   format: 'png',
      //   quality: 1
      // });
      this.canvas.renderAll();

    }),
      this.extend(add, this.randomId());
    this.canvas.add(add);

    this.selectItemAfterAdded(add);
  }

  /*Canvas*/


  public moveWithFormat(scaleKey, scaleBlock) {
    console.log(this.a, this.b, this.c, 'scale', scaleBlock, this.d, scaleKey);
    this.scaleKey = 0;

    this.scaleKey = this.d;

    if (this.canvasCount !== 0) {

      this.canvasCount = 1;
      this.canvas.discardActiveObject().renderAll();
      var sel = new fabric.Group(this.canvas.getObjects(), {
        canvas: this.canvas,
        // uniScaleTransform: true,

        // uniformScaling : false

      })
      this.canvas.remove(...this.canvas.getObjects());


      sel.setControlsVisibility({
        ml: false, //top left
        mr: false, //top right
        mb: false, //bottom left
        mt: false //bottom right
      });
      sel.lockScalingFlip = true;
      // sel.uniformScaling = true;

      

      this.canvas.add(sel);
      const formatWidth = (window.innerWidth - this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - this.dataService.widthKey * window.innerWidth) / this.b + (window.innerWidth - this.dataService.widthKey * window.innerWidth) / 40);
      const formatHeight = formatWidth * this.c;

      if (scaleBlock) {
        if (this.dataService.horVert) {

          // sel.uniScaleTransform = true;
          // sel.lockUniScaling = true;
          console.log(this.dataService.horVert, this.d, scaleKey);

          sel.scaleToWidth(formatWidth * scaleKey / 1.3);
          sel.scaleToHeight(formatHeight * scaleKey / 1.3);

          
        } else {
          console.log(this.dataService.horVert, "kkkkkkkkk");

          sel.scaleToWidth(formatWidth * scaleKey / 5.3);
          sel.scaleToHeight(formatHeight * scaleKey / 5.3);
          
        }
        // sel.With = (window.innerWidth - this.dataService.widthKey * window.innerWidth) - 2 * ((window.innerWidth - this.dataService.widthKey * window.innerWidth) / this.b + (window.innerWidth - this.dataService.widthKey * window.innerWidth) / 40);
        console.log('editor', this.d);

        // sel.Height = sel.width * this.c;
        sel.setCoords();
        sel.saveState();
        this.canvas.renderAll();
      }



      sel.minScaleLimit = 0.5;

      // sel.lockScalingY = true;
      // this.canvas.centerObjectH(sel);
      // sel.top = this.canvas.height / 3.7;
      this.canvas.setActiveObject(sel);
      let matrix = sel.calcTransformMatrix();
      let imageCoordx = matrix[4];
      let imageCoordy = matrix[5];

      this.canvas.centerObjectH(sel);
      let top = this.canvas.width / 40 + this.canvas.width / this.b - this.canvas.width * this.a;
      sel.top = top;
      console.log('momos', scaleBlock);


      // this.canvas.centerObjectH(sel);
      sel.set({ cornerSize: this.canvas.width / 40 });
      // sel.minScaleLimit()
      sel.setCoords();
      sel.saveState();
      this.canvas.renderAll();
      // this.canvas.getActiveObject().left += 10;
      // this.canvas.getActiveObject().setCoords();
      // this.canvas.getActiveObject().saveState();
      // this.canvas.renderAll();

      $(".deleteBtn").remove();
      $(".distance").remove();
      $(".distanceY").remove();
      // console.log('added');


      // addDistancePoint(imageCoordy, imageCoordx);
      this.addArrow(imageCoordy, 2)

      $(".distanceY").remove();

      // addDistancePoint(imageCoordy, imageCoordx);
      this.addArrowUp(imageCoordx, 2);

      this.addDeleteBtn(sel.oCoords.mb.x, sel.oCoords.mb.y);

      sel.setCoords();
      sel.saveState();
      this.canvas.renderAll();
    }


  }



  cleanSelect() {

    // this.canvas.discardActiveObject().renderAll();
    // var Group = new fabric.Group([...this.canvas.getObjects()]);
    // this.canvas.add(Group);
    // this.selectItemAfterAdded(this.canvas.item(0));
    // this.canvas.renderAll();

    this.canvas.discardActiveObject().renderAll();
    var sel = new fabric.Group(this.canvas.getObjects(), {
      canvas: this.canvas
    })
    this.canvas.remove(...this.canvas.getObjects());

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

  }

  selectItemAfterAdded(obj) {
    this.getOpacity()
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }

  setCanvasFill() {
    // if (!this.props.canvasImage) {
    this.canvas.backgroundColor = this.props.canvasFill;
    this.canvas.renderAll();

    const inputProductColor = this.siteLayout.inputColor.nativeElement;
    inputProductColor.style.backgroundColor = this.props.canvasFill;
    inputProductColor.value = this.props.canvasFill;
    // this.siteLayout.IMG.nativeElement.innerHTML.backgroundColor = this.props.canvasFill;

    // this.canvas1.backgroundColor = this.props.canvasFill;
    // this.canvas1.renderAll();

    // }
  }

  drawFill() {
    // if (!this.props.canvasImage) {
    // this.canvas.backgroundColor = this.props.canvasFill;
    this.canvas.renderAll();
    // this.canvas1.renderAll();

    // }
  }

  extend(obj, id) {
    obj.toObject = ((toObject) => {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id
        });
      };
    })(obj.toObject);
  }

  productsTypeColor() {


    if (this.siteLayout.allColors === true) {

      this.props.canvasFill = this.siteLayout.arrColor[0];
      this.canvas.backgroundColor = this.siteLayout.arrColor[0];

    } else if (this.siteLayout.allColors === false) {

      this.props.canvasFill = this.siteLayout.productBrandColors[0];
      this.canvas.backgroundColor = this.siteLayout.productBrandColors[0];

      // this.canvas.renderAll();
    }

  }

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


  setCanvasImage() {


    const image = this.props.canvasImage;
    this.canvas.setBackgroundImage(image,
      this.canvas.renderAll.bind(this.canvas), {
      opacity: 1,
      angle: 0,
      left: 0,
      top: 0,
      originX: 'left',
      originY: 'top',
      crossOrigin: 'anonymous',

      scaleX: this.canvas.width / 360,
      scaleY: this.canvas.height / 460,
      // width: this.siteLayout.canvasHtmlWidth,
      // height: this.siteLayout.canvasHtmlHeight + 93
      // crossOrigin: 'anonymous'
      // this.canvas.setBackgroundImage(img);
      // this.canvas.requestRenderAll();

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

  }



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

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }




  /*------------------------Global actions for element------------------------*/

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) { return ''; }

    if (object.getSelectionStyles && object.isEditing) {
      return (object.getSelectionStyles()[styleName] || '');
    } else {
      return (object[styleName] || '');
    }
  }


  setActiveStyle(styleName, value: string | number, object: fabric.IText) {
    object = object || this.canvas.getActiveObject() as fabric.IText;
    if (!object) { return; }
    if (object.setSelectionStyles && object.isEditing) {
      const style = {};
      style[styleName] = value;

      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.setSelectionStyles({ underline: true });
        } else {
          object.setSelectionStyles({ underline: false });
        }

        if (value.includes('overline')) {
          object.setSelectionStyles({ overline: true });
        } else {
          object.setSelectionStyles({ overline: false });
        }

        if (value.includes('line-through')) {
          object.setSelectionStyles({ linethrough: true });
        } else {
          object.setSelectionStyles({ linethrough: false });
        }
      }

      object.setSelectionStyles(style);
      object.setCoords();

    } else {
      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.set('underline', true);
        } else {
          object.set('underline', false);
        }

        if (value.includes('overline')) {
          object.set('overline', true);
        } else {
          object.set('overline', false);
        }

        if (value.includes('line-through')) {
          object.set('linethrough', true);
        } else {
          object.set('linethrough', false);
        }
      }

      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }


  getActiveProp(name) {
    const object = this.canvas.getActiveObject();
    if (!object) { return ''; }

    return object[name] || '';
  }

  setActiveProp(name, value) {
    const object = this.canvas.getActiveObject();
    if (!object) { return; }
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  clone() {
    this.defoultUpdate()

    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      let clone;
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
        this.defoultUpdate()
        this.canvas.getActiveObject();

      }
    }
  }

  getId() {
    this.props.id = this.canvas.getActiveObject().toObject().id;
    this.canvas.toSVG();
    console.log(this.canvas);

  }

  setId() {
    const val = this.props.id;
    const complete = this.canvas.getActiveObject().toObject();
    // console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }




  getDistance() {
    this.props.distance = this.getActiveStyle('distance', null) * 10;
    console.log('getDistance');

  }

  setDistance() {
    this.setActiveStyle('distance', parseInt(this.props.distance, 10) / 100, null);
  }

  getOpacity() {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity() {
    this.setActiveStyle('opacity', parseInt(this.props.opacity, 10) / 100, null);
  }

  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {

    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFontSize() {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
    console.log('getFontSize');

  }

  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
    console.log('setFontSize');

  }

  getBold() {
    this.props.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  setBold() {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    if (this.props.fontStyle) {
      this.setActiveStyle('fontStyle', 'italic', null);
    } else {
      this.setActiveStyle('fontStyle', 'normal', null);
    }
  }

  getTextDecoration() {
    this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  setTextDecoration(value) {
    let iclass = this.props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, 'g'), '');
    } else {
      iclass += ` ${value}`;
    }
    this.props.TextDecoration = iclass;
    this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
  }

  hasTextDecoration(value) {
    return this.props.TextDecoration.includes(value);
  }

  getTextAlign() {
    this.props.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign(value) {
    this.props.textAlign = value;
    this.setActiveProp('textAlign', this.props.textAlign);
  }

  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily() {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }

  /*System*/


  removeSelected() {
    console.log(this.canvasCount);

    this.props.diametr = 300;
    if (this.canvas.getActiveObject().type === 'i-text') {
      this.intCountText -= 1;
      console.log(this.intCountText);
    }

    this.canvasCount -= 1;

    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();
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
    } else if (activeGroup) {
      // console.log('group');
      this.canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach((object) => {
        self.canvas.remove(object);
      });
    }
  }

  bringToFront() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();


    if (activeObject) {
      activeObject.bringToFront();
      // this.canvas.renderAll()
      // this.cleanSelect();
      // activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.bringToFront();
        // this.canvas.renderAll()
      });
    }
  }

  sendToBack() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.sendToBack(activeObject);
      // activeObject.sendToBack();
      this.canvas.renderAll();
      // this.cleanSelect();
      // activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.sendToBack();
        this.canvas.renderAll()

      });
    }
  }

  confirmClear() {

    if (confirm('Are you sure?')) {
      // location.reload(); 
      this.canvas.remove(...this.canvas.getObjects());
      this.canvasCount = 0;
      $('.owl-nav').show();
      // $(".canvas").css("z-index", 0);
      this.disableBtn = false;
      this.siteLayout.toggle = false;
      // this.canvas.clear();
      // $(".distance").remove();

    }
  }



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


  rasterize() {

    const image = new Image(360, 460);


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

    const lastColor = this.props.canvasFill;




    // this.saveCanvasToJSON();

    this.canvas.backgroundImage = null;
    // this.canvas.backgroundColor = null;




    this.canvas.renderAll();
    this.canvas.backgroundImage = null;

    // this.canvas.remove(...this.canvas.getObjects())

    // console.log(this.canvas.toSVG());
    let svgUrll

    switch (this.props.textCurved) {
      case 1:
        svgUrll = this.canvas.toSVG();

        break;

      case 2:
        svgUrll = this.canvas.toSVG().toString().replace(/<tspan/g, "<textPath xlink:href='#urve'><tspan").replace(/tspan>/g, "tspan></textPath>").replace(/tspan x="/g, 'tspan x="0*').replace("</defs>", `</defs> ${this.path.toSVG()}`).replace('style="stroke', 'id = "urve" style="stroke').replace("</defs>", `</defs> ${this.path.toSVG()}`).replace('style="stroke', 'id = "urve1" style="stroke');

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

    const CANVAS = localStorage.getItem('Canvas');

  }

  // cloneCanvas() {
  //   this.canvas1.loadFromJSON(JSON.stringify(this.canvas),
  //     () => this.canvas1.renderAll());

  // }

  rasterizeSVG() {

    const image = new Image(360, 460);
    // image.scaleToWidth(150);
    // image.scaleToHeight(150);
    const w = window.open('');

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

  }

  saveCanvasToJSON() {
    const json = JSON.stringify(this.canvas);
    // localStorage.setItem('Kanvas', json);
    // console.log('json');
    // console.log(json);

  }

  loadCanvasFromJSON() {
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

  }

  topp() {
    // console.log(this.canvas._activeObject.top);

  }

  rasterizeJSON() {

    this.json = JSON.stringify(this.canvas, null, 2);
  }

  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }

}
