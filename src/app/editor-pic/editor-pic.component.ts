import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input, HostListener, ChangeDetectorRef } from '@angular/core';
import 'fabric';

// var svgToMiniDataURI = require('mini-svg-data-uri');
// import 'jquery';

import { SiteLayoutComponent } from '../shared/layouts/site-layout/site-layout.component'
// import { SiteLayoutComponent } from '../ass'


declare var Caman: any;
declare const fabric: any;
declare const $: any;

@Component({
  selector: 'app-editor-pic',
  templateUrl: './editor-pic.component.html',
  styleUrls: ['./editor-pic.component.css']
})

// @HostListener('window:resize', ['$event'])


export class EditorPicComponent implements AfterViewInit {
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;
  // @HostListener('window:resize', ['$event'])
  private canvas: fabric.Canvas;


  public props = {

    canvasFill: '#flffhf',
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
  };

  public canvasHtml
  public textString: string = '';
  public url: string | ArrayBuffer = '';



  onResize(event) {
    // console.log(window.innerWidth);

    this.canvas.setWidth(this.siteLayout.canvasHtmlWidth);
    this.canvas.setHeight(this.siteLayout.canvasHtmlHeight);
    this.setCanvasImage()
    this.canvas.renderAll()
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

  public objWidthLimit = 170;
  public objHeightLimit = 170;

  public test = null;
  public path = null;
  public svg_text = null;
  public intCountText = null;


  public imageFilter = null;


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

  constructor(private siteLayout: SiteLayoutComponent, private element: ElementRef) {

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
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      preserveObjectStacking: true
    });


    this.canvas.on({

      'after:render': (e) => {
        this.canvas.calcOffset();
        // this.addText();
        // console.log('ofsett', this.canvas.calcOffset().backgroundColor);

      },

      'object:moving': (e) => {

        let matrix = e.target.calcTransformMatrix();
        var imageCoordx = matrix[4];
        var imageCoordy = matrix[5];
        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);


        var obj = e.target;
        if (obj.height > obj.canvas.height || obj.width > obj.canvas.width) {
          obj.originY;
          obj.originX;
        }
        obj.setCoords();

        // top-left  corner
        if (obj.getBoundingRect().top - (obj.cornerSize + 100) < 0 ||
          obj.getBoundingRect().left - (obj.cornerSize + 100) < 0
        ) {
          obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top + (obj.cornerSize + 100));
          obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left + (obj.cornerSize + 100));
        }

        // bot-right corner

        if (obj.getBoundingRect().top + obj.getBoundingRect().height + obj.cornerSize + 100 > obj.canvas.height ||
          obj.getBoundingRect().left + obj.getBoundingRect().width + obj.cornerSize + 100 > obj.canvas.width) {

          obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top - obj.cornerSize - 100);
          obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left - obj.cornerSize - 100);
        }

      },

      'object:scaling': (e) => {

        let obj = e.target;

        // let maxScaleX = 0.17;
        // let maxScaleY = 0.17;
        // let minScaleX = 0.05;
        // let minScaleY = 0.05;

        // if(obj.scaleX > maxScaleX) {
        //   obj.scaleX = maxScaleX;
        //   obj.left = this.left;
        //   obj.top = this.top;
        // }
        // if(obj.scaleY > maxScaleY) {
        //   obj.scaleY = maxScaleY;
        //   obj.left = this.left;
        //   obj.top = this.top;
        // }
        // this.top = obj.top;
        // this.left = obj.left;

        // console.log(obj.minScaleLimit, obj.left);


        let matrix = e.target.calcTransformMatrix();
        var imageCoordx = matrix[4];
        var imageCoordy = matrix[5];
        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);


        let imgWith = obj.width * obj.scaleX;
        let imgHeight = obj.height * obj.scaleY;
        this.siteLayout.imgWith = Math.floor(imgWith);
        this.siteLayout.imgHeigt = Math.floor(imgHeight);

        // console.log(imageCoordy, imageCoordx, obj.getBoundingRect().left);


        if (this.canvas.getActiveObject().width * this.canvas.getActiveObject().scaleX > this.objWidthLimit) {
          this.canvas.getActiveObject().scaleX = this.objWidthLimit / this.canvas.getActiveObject().width;
        }

        if (this.canvas.getActiveObject().height * this.canvas.getActiveObject().scaleY > this.objHeightLimit) {
          this.canvas.getActiveObject().scaleY = this.objHeightLimit / this.canvas.getActiveObject().height;
        }


        if (imageCoordx > 252) {
          // console.log(this.canvas.getActiveObject().minScaleLimit, 'activeObject');
          // imageCoordx = 10;
          obj.oCoords.tr.x = 252 - e.target.width * e.target.scaleX + 60;
          this.canvas.getActiveObject().left = this.canvas.getActiveObject().getBoundingRect().left + this.canvas.getActiveObject().cornerSize;
          this.canvas.getActiveObject().top = this.canvas.getActiveObject().getBoundingRect().top + this.canvas.getActiveObject().cornerSize;
        } else if (imageCoordx < 215) {
          obj.oCoords.bl.x = 215;
          console.log('working');

          this.canvas.getActiveObject().left = this.canvas.getActiveObject().getBoundingRect().left;
          this.canvas.getActiveObject().top = this.canvas.getActiveObject().getBoundingRect().top - 30;

        } else if (imageCoordy > 330) {
          obj.oCoords.br.y = 330 - e.target.height * e.target.scaleY + 60;
          obj.left = obj.getBoundingRect().left + obj.cornerSize;
          obj.top = obj.getBoundingRect().top + obj.cornerSize;
        }


        this.canvas.getActiveObject().left = this.canvas.getActiveObject().getBoundingRect().left + this.canvas.getActiveObject().cornerSize;
        this.canvas.getActiveObject().top = this.canvas.getActiveObject().getBoundingRect().top + this.canvas.getActiveObject().cornerSize;

        //minimum imagr size
        obj.minScaleLimit = 0.02;
        // console.log('General', obj.minScaleLimit);



        //   let obj = e.target;

        //   obj.minScaleLimit = 0.08;

        //   obj.strokeWidth = 0.5;


        // let maxScaleX = 0.7;
        // let maxScaleY = 0.7;
        // let minScaleX = 0.05;
        // let minScaleY = 0.05;

        // var lastGoodTop, lastGoodLeft;

        // console.log(obj.scaleX);


        // if (obj.scaleX > maxScaleX) {

        //   obj.scaleX = maxScaleX;
        //   obj.left = obj.getBoundingRect().left + obj.cornerSize;
        //   obj.top = obj.getBoundingRect().top + obj.cornerSize;

        // }
        // if (obj.scaleY > maxScaleY) {
        //   obj.scaleY = maxScaleY;
        //   obj.left = obj.getBoundingRect().left + obj.cornerSize;
        //   obj.top = obj.getBoundingRect().top + obj.cornerSize;
        // }

        // obj.set({
        //   width: width * scaleX,
        //   height: height * scaleY,
        //   scaleX: 0.5,
        //   scaleY: 0.5
        // });

        // var maxScaleX = 2;
        // var maxScaleY = 2;

        // var scaleX = 100

        // if (scaleX > maxScaleX) {
        //   this.scaleX = maxScaleX;
        //   this.left = this.lastGoodLeft;
        //   this.top = this.lastGoodTop;
        // }
        // if (this.scaleY > maxScaleY) {
        //   this.scaleY = maxScaleY;
        //   this.left = this.lastGoodLeft;
        //   this.top = this.lastGoodTop;
        // }
        // this.lastGoodTop = this.top;
        // this.lastGoodLeft = this.left;

        // var obj = e.target;
        // if (obj.height > obj.canvas.height || obj.width > obj.canvas.width) {
        //   obj.originY;
        //   obj.originX;
        // }
        // obj.setCoords();

        // // top-left  corner
        // if (obj.getBoundingRect().top - (obj.cornerSize + 100) < 0 ||
        //   obj.getBoundingRect().left - (obj.cornerSize + 100) < 0
        // ) {
        //   obj.height = 100;
        //   obj.width = 100;
        //   obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left + (obj.cornerSize + 100));
        // }

        // // bot-right corner

        // if (obj.getBoundingRect().top + obj.getBoundingRect().height + obj.cornerSize + 100 > obj.canvas.height ||
        //   obj.getBoundingRect().left + obj.getBoundingRect().width + obj.cornerSize + 100 > obj.canvas.width) {

        //   obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top - obj.cornerSize - 100);
        //   obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left - obj.cornerSize - 100);
        // }

      },




      'object:modified': (e) => {

        let obj = e.target;

        let matrix = e.target.calcTransformMatrix();

        var imageCoordx = matrix[4];
        var imageCoordy = matrix[5];
        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);

      },


      'selection:created': (e) => {
        console.log('create');
        let obj = e.target

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
      },

      'selection:updated': (e) => {
        console.log('selection:updated');
        let obj = e.target

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
      },

      'selection:cleared': (e) => {

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

      // 'before:path:created': (e) => {
      //   var path = new fabric.Path('M 88 320 A 196 50 0 0 1 280 319', {
      //     strokeWidth: 1,
      //     absolutePositioned: true
      //   })
      //   var pathInfo = fabric.util.getPathSegmentsInfo(path.path);
      //   path.segmentsInfo = pathInfo;
      //   var pathLength = pathInfo[pathInfo.length - 1].length;
      //   var text = 'This is a demo ';
      //   var fontSize = 3.5 * pathLength / text.length;
      //   const text1 = new fabric.Text(text, { fontSize: fontSize, path: path, top: path.top, left: path.left });

      //   text1.width = 115;
      //   text1.height = 65;
      //   this.canvas.add(text1);


      // },

      'path:created': (e) => {
        this.canvasCount += 1;


        this.canvas.isDrawingMode = false;
        // this.canvas.on('mouse:up', () => this.canvas.setActiveObject());
        console.log(this.canvas.item(this.canvasCount - 1));

        this.canvas.getObjects().indexOf(e.target)
        // this.canvas.setActiveObject(this.canvas.item(this.canvasCount- 1));
        this.selectItemAfterAdded(this.canvas.item(this.canvasCount - 1))
      }

    });


    this.canvas.setWidth(this.siteLayout.canvasHtmlWidth);
    this.canvas.setHeight(this.siteLayout.canvasHtmlHeight);
    this.canvas.renderAll()
    // get references to the html canvas element & its context
    this.canvas.on('mouse:down', (e) => {
      const canvasElement: any = document.getElementById('canvas');
    });





    this.canvas.on('mouse:over', () => {

      let color = this.props.drawFill;

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


    let numLeft = this.left;
    let numTop = this.top;

    console.log(this.canvasCount);
    console.log(this.props.drawFill);

    function addDeleteBtn(x, y) {

      $(".deleteBtn").remove();
      var btnLeft = x - numLeft;
      var btnTop = y + numTop;
      var deleteBtn = '<img src="../assets/img/remove-icon-png-15.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:25px;height:25px;"/>';
      $(".canvas-container").append(deleteBtn);
    }



    this.canvas.on('object:modified', function (e) {
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
      // console.log(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });

    this.canvas.on('selection:updated', function (e) {
      // console.log('updated');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
    });

    this.canvas.on('object:added', function (e) {
      $(".deleteBtn").remove();
      // console.log('added');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
    });

    this.canvas.on('object:selected', function (e) {
      $(".deleteBtn").remove();
      // console.log('selected');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);


    });

    this.canvas.on('object:selected', function (e) {
      $(".deleteBtn").remove();
      // console.log('selected');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

    });

    this.canvas.on('object:removed', function (e) {
      $(".deleteBtn").remove();
      // console.log('removed');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
    });

    this.canvas.on('before:selection:cleared', function (e) {
      $(".deleteBtn").remove();
      // console.log('deselected');
    });

    this.canvas.on('object:scaling', function (e) {
      $(".deleteBtn").remove();
      let obj = e.target
      obj.minScaleLimit = 0.02;

    });
    this.canvas.on('object:moving', function (e) {
      $(".deleteBtn").remove();
    });
    this.canvas.on('object:rotating', function (e) {
      $(".deleteBtn").remove();
    });


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

    console.log(this.canvasCount);


    if (this.props.diametr < 299) {

      console.log('<280');
      this.props.inputDisabled = 'inputDisabled';

      this.canvas.remove(this.canvas.getActiveObject())

      let numLeft = this.left;
      let numTop = this.top;

      this.canvas.on('before:selection:cleared', function (e) {
        // console.log('deselected');
        $(".deleteBtn").remove();
        $(".distance").remove();
      });


      this.canvas.on('object:scaling', function (e) {

        let obj = e.target

        // obj.minScaleLimit = 0.45;

        // console.log('Text', obj.minScaleLimit);


        $(".deleteBtn").remove();
        $(".distance").remove();
      });

      this.canvas.on('object:moving', function (e) {
        $(".deleteBtn").remove();
        $(".distance").remove();
      });
      this.canvas.on('object:rotating', function (e) {
        $(".deleteBtn").remove();
        $(".distance").remove();
      });

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
          // strokeWidth: 10,
          // strokeMiterLimit: 15,
          // width: 50,
          cornerSize: this.canvas.width / 40,
          padding: 0,
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



        // text.charSpacing = pathLength;

        // this.canvas.on('object:modified', function (e) {



        //   console.log(e.target, e.target.oCoords.mb.y);
        //   // this.props.curvedTextLeft = e.target.oCoords.mb.x;
        //   // this.props.curvedTextTop = e.target.oCoords.mb.y;

        // });

        // this.canvas.setActiveObject(text)
        console.log(this.canvas.getActiveObject());


        this.canvas.add(text);

        this.canvas.renderAll();
        // this.canvas.add(path);
        console.log(this.canvas.toSVG());

        // console.log(this.canvas.toSVG().toString().replace("<defs>", '').replace("</defs>", str));
        // text.left = this.props.curvedTextLeft;
        // text.top = this.props.curvedTextTop;
        this.canvas.centerObjectH(text);
        text.top = this.canvas.height / 3;
        this.selectItemAfterAdded(text);
        // this.textString = '';
        console.log(this.canvasCount);

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


      let numLeft = this.left;
      let numTop = this.top;

      this.canvas.on('before:selection:cleared', function (e) {
        // console.log('deselected');
        $(".deleteBtn").remove();
        $(".distance").remove();
      });


      this.canvas.on('object:scaling', function (e) {

        let obj = e.target

        // obj.minScaleLimit = 0.45;

        // console.log('Text', obj.minScaleLimit);


        $(".deleteBtn").remove();
        $(".distance").remove();
      });

      this.canvas.on('object:moving', function (e) {
        $(".deleteBtn").remove();
        $(".distance").remove();
      });
      this.canvas.on('object:rotating', function (e) {
        $(".deleteBtn").remove();
        $(".distance").remove();
      });

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
          padding: 0,
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

    // this.canvas.remove(...this.canvas.getObjects())


    // console.log(this.canvas.toSVG());
    // console.log(this.props.fontSize);

    // this.canvas.add(text1);
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


    // this.canvas.add(svg_image);
    // this.canvas.renderAll();



    this.canvas.includeDefaultValues;


    // console.log(' I am image');

    // let matrix = this.canvas.getActiveObject().calcTransformMatrix();

    // let imageCoordx = matrix[4];
    // let imageCoordy = matrix[5];
    // console.log(matrix);

    let numLeft = this.left;
    let numTop = this.top;

    function addDistancePoint(m, n) {
      // var point = '<img src="../assets/img/output-onlinepngtools.png" class="distance" style="position:absolute; top:' + m + 'px; left:' + n + 'px; cursor:pointer; width:20px; height:10px;"/>';
      var arrowDown = '<img src="../assets/img/green-crosshair-png-4.png" class="distance" style="position:absolute; top:' + (m - 13.1) + 'px; left:' + (n - 18) + 'px; cursor:crosshair; width:35px; height:35px;"/>';
      // var text = '<div style="position:absolute; top:' + (m - 10) + 'px; left:' + (n - 13) + `'px; cursor:pointer; width:25px; height:47px;"> ${} </div>'`
      $(".canvas-container").append(arrowDown);
    }

    function addArrowUp(o, p) {
      var arrow = '<img src="../assets/img/output-onlinepngtools-up.png" class="distance" style="position:absolute; top:' + p + 'px; left:' + (o - 5) + 'px; cursor:crosshair; width:10px; height:40px;"/>';
      $(".canvas-container").append(arrow);
    }

    function addArrow(o, p) {
      var arrow = '<img src="../assets/img/green-arrow-clipart-2.png" class="distance" style="position:absolute; top:' + o + 'px; left:' + p + 'px; cursor:crosshair; width:40px; height:10px;"/>';
      $(".canvas-container").append(arrow);
    }

    function addDeleteBtn(x, y) {

      $(".deleteBtn").remove();
      var btnLeft = x - numLeft;
      var btnTop = y + numTop;
      var deleteBtn = '<img src="../assets/img/remove-icon-png-15.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:25px;height:25px;"/>';
      $(".canvas-container").append(deleteBtn);
    }


    this.canvas.on('object:modified', function (e) {



      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

      $(".distance").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4]
      var imageCoordy = matrix[5]
      addDistancePoint(imageCoordy, imageCoordx);
      addArrow(imageCoordy, 2)

      $(".distanceY").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4]
      var imageCoordy = matrix[5]
      addDistancePoint(imageCoordy, imageCoordx);
      addArrowUp(imageCoordx, 2)

    });



    this.canvas.on('selection:updated', function (e) {
      // console.log('updated');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

      $(".distance").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4]
      var imageCoordy = matrix[5]
      addDistancePoint(imageCoordy, imageCoordx);
      addArrow(imageCoordy, 2);

      $(".distanceY").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4]
      var imageCoordy = matrix[5]

      addDistancePoint(imageCoordy, imageCoordx);
      addArrowUp(imageCoordx, 2)

    });

    this.canvas.on('object:added', function (e) {

      $(".deleteBtn").remove();
      // console.log('added');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

      $(".distance").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4]
      var imageCoordy = matrix[5]
      addDistancePoint(imageCoordy, imageCoordx);
      addArrow(imageCoordy, 2);

      $(".distanceY").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4]
      var imageCoordy = matrix[5]
      addDistancePoint(imageCoordy, imageCoordx);
      addArrowUp(imageCoordx, 2)

    });

    this.canvas.on('object:selected', function (e) {

      $(".deleteBtn").remove();

      // console.log('selected');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

      $(".distance").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4]
      var imageCoordy = matrix[5]
      addDistancePoint(imageCoordy, imageCoordx);
      addArrow(imageCoordy, 2)

      $(".distanceY").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4]
      var imageCoordy = matrix[5]
      addDistancePoint(imageCoordy, imageCoordx);
      addArrowUp(imageCoordx, 2)
    });

    this.canvas.on('object:removed', function (e) {
      // console.log('removed');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
      $(".deleteBtn").remove();

      $(".distance").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4]
      var imageCoordy = matrix[5]
      addDistancePoint(imageCoordy, imageCoordx);

    });

    this.canvas.on('before:selection:cleared', function (e) {
      $(".deleteBtn").remove();
      // console.log('deselected');

      $(".distance").remove();
      // var matrix = e.target.calcTransformMatrix();
      // var imageCoordx = matrix[4]
      // var imageCoordy = matrix[5]
      // addDistancePoint(imageCoordy, imageCoordx);
    });


    this.canvas.on('object:moving', function (e) {

      $(".deleteBtn").remove();
      $(".distance").remove();
      var obj = e.target;
      // console.log(obj.top);

      // let matrix = e.target.calcTransformMatrix();
      // let imageCoordx = matrix[4];
      // let imageCoordy = matrix[5];
      // this.siteLayout.imageCoordy = 10;
      // var text = Math.floor(imageCoordy)
      // $(".canvas-container").append('text');

    });
    this.canvas.on('object:rotating', function (e) {
      $(".deleteBtn").remove();
      $(".distance").remove();
    });

    this.canvas.on('object:scaling', function (e) {

      let obj = e.target

      // obj.minScaleLimit = 0.18;

      // console.log('image', obj.minScaleLimit);


      // let obj = e.target

      // let maxScaleX = 0.18;
      // let maxScaleY = 0.18;

      // obj.minScaleLimit = 0.08;

      // console.log(obj.scaleX);


      // if (obj.scaleX > maxScaleX) {

      //   obj.scaleX = maxScaleX;
      // }
      // if (obj.scaleY > maxScaleY) {
      //   obj.scaleY = maxScaleY;
      // }

      // obj.left = obj.getBoundingRect().left + obj.cornerSize;
      // obj.top = obj.getBoundingRect().top + obj.cornerSize;

      $(".deleteBtn").remove();
      $(".distance").remove();
    });



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
    // console.log(this.canvasCount);
    const el = event;
    // console.log(el);


    fabric.Image.fromURL(el, (image) => {
      // const image = fabric.util.groupSVGElements(objects, options);
      console.log(this.canvas.getWidth());

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
        top: this.canvas.height / 3.7
        // originX: 'left',
        // width: image.width * image.scaleX -80,
        // height: image.height * image.scaleY - 80
        // originY:s 'center'

      });
      // value.shadow.affectStroke = false;
      // image.panToActiveObject()
      image.scaleToWidth(this.canvas.width / 3);
      image.scaleToHeight(this.canvas.width / 3);
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
      image.top = this.canvas.height / 3.7;
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
  }





  shadowify() {

  };

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

    this.canvas.on('object:modified', function (e) {
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
      // console.log(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });

    this.canvas.on('selection:updated', function (e) {
      // console.log('updated');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

    });

    this.canvas.on('object:added', function (e) {
      $(".deleteBtn").remove();
      // console.log('added');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
    });

    this.canvas.on('object:selected', function (e) {
      this.onObjectSelected(e)


      $(".deleteBtn").remove();
      // console.log('selected');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

    });

    // this.canvas.on('object:selected', this.onObjectSelected(e));

    this.canvas.on('object:removed', function (e) {
      $(".deleteBtn").remove();
      // console.log('removed');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
    });

    this.canvas.on('before:selection:cleared', function (e) {
      $(".deleteBtn").remove();
      // console.log('deselected');
    });

    this.canvas.on('object:scaling', function (e) {
      let obj = e.target

      obj.minScaleLimit = 0.02;

      $(".deleteBtn").remove();

    });
    this.canvas.on('object:moving', function (e) {
      $(".deleteBtn").remove();
    });
    this.canvas.on('object:rotating', function (e) {
      $(".deleteBtn").remove();
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

    let numLeft = this.left;
    let numTop = this.top;

    this.canvasCount += 1;
    // console.log(this.canvasCount);

    function addDeleteBtn(x, y) {

      $(".deleteBtn").remove();
      var btnLeft = x - numLeft;
      var btnTop = y + numTop;
      var deleteBtn = '<img src="../assets/img/remove-icon-png-15.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px;left:' + btnLeft + 'px;cursor:pointer;width:25px;height:25px;"/>';
      $(".canvas-container").append(deleteBtn);
    }



    this.canvas.on('object:modified', function (e) {
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
      // console.log(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });

    this.canvas.on('selection:updated', function (e) {
      // console.log('updated');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
    });

    this.canvas.on('object:added', function (e) {
      $(".deleteBtn").remove();
      // console.log('added');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
    });

    this.canvas.on('object:selected', function (e) {
      $(".deleteBtn").remove();
      // console.log('selected');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

    });

    this.canvas.on('object:removed', function (e) {
      $(".deleteBtn").remove();
      // console.log('removed');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);
    });

    this.canvas.on('before:selection:cleared', function (e) {
      $(".deleteBtn").remove();
      // console.log('deselected');
    });

    this.canvas.on('object:scaling', function (e) {
      $(".deleteBtn").remove();
      let obj = e.target
      obj.minScaleLimit = 0.02;

    });
    this.canvas.on('object:moving', function (e) {
      $(".deleteBtn").remove();
    });
    this.canvas.on('object:rotating', function (e) {
      $(".deleteBtn").remove();
    });


    $(document).on('click', ".deleteBtn", (event) => {

      event.stopImmediatePropagation()
      this.canvasCount -= 1;

      // console.log(this.canvasCount);
      if (this.canvasCount === 0) {
        this.siteLayout.firstImage = 0;
        // this.siteLayout.isOpasity=true;
        $('.owl-nav').show();
        $(".canvas").css("z-index", 0);
        this.disableBtn = false;
        this.siteLayout.toggle = false;

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

  cleanSelect() {

    this.canvas.discardActiveObject().renderAll();
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
    // }
  }

  drawFill() {
    // if (!this.props.canvasImage) {
    // this.canvas.backgroundColor = this.props.canvasFill;
    this.canvas.renderAll();
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
    this.canvas.backgroundColor = this.siteLayout.arrColor[0]
  }

  setCanvasImage() {

    const image = this.props.canvasImage;
    this.canvas.setBackgroundImage(image,
      this.canvas.renderAll.bind(this.canvas), {
      opacity: 1,
      angle: 20,
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
  }

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


    this.props.diametr = 300;
    this.canvasCount -= 1;
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (this.canvas.getActiveObject().type === 'i-text') {
      this.intCountText -= 1;
      console.log(this.intCountText);

    }

    if (this.canvasCount === 0) {
      this.siteLayout.firstImage = 0;

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
      location.reload();

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
    // this.canvas.toSVG();
    // const w = window.open('');
    // w.document.write(this.canvas.toSVG());

    image.src = this.canvas.toDataURL({ format: 'png', multiplier: 4 });
    // this.setCanvasImage();


    var txt;
    var r = confirm("Press a button!");
    if (r == true) {
      txt = "You pressed OK!";
    } else {
      txt = "You pressed Cancel!";
      alert(txt);
      return
    }
    alert(txt);

    // const w = window.open();
    // w.document.write( image.outerHTML );
    this.reqImage = image.src;

    this.canvas.renderAll();

    const lastColor = this.props.canvasFill;




    // this.saveCanvasToJSON();

    this.canvas.backgroundImage = null;
    this.canvas.backgroundColor = null;




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
    // this.canvas.backgroundColor = lastColor;

    const CANVAS = localStorage.getItem('Canvas');

  }

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
