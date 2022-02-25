import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import 'fabric';
import { max } from 'rxjs/operators';
// import 'jquery';

import { SiteLayoutComponent } from '../shared/layouts/site-layout/site-layout.component'
// import { SiteLayoutComponent } from '../ass'


declare var Caman: any;
declare const fabric: any;
declare const $: any

@Component({
  selector: 'app-editor-pic',
  templateUrl: './editor-pic.component.html',
  styleUrls: ['./editor-pic.component.css']
})
export class EditorPicComponent implements AfterViewInit {
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;

  private canvas: fabric.Canvas;
  public props = {
    canvasFill: '#flffhf',
    canvasImage: 'assets/img/Trafaret3.png',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    distance: null,
    TextDecoration: '',
  };

  private clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
  };
  public textString: string;
  public url: string | ArrayBuffer = '';
  public size: any = {
    // left: 350,
    width: 430,
    height: 530
  };

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

  public objWidthLimit = 170;
  public objHeightLimit = 170;


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
      console.log(this.id);

    })
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {

    // setup front side canvas
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });



    this.canvas.on({



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

        console.log(obj.minScaleLimit, obj.left);


        let matrix = e.target.calcTransformMatrix();
        var imageCoordx = matrix[4];
        var imageCoordy = matrix[5];
        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);

        // console.log(imageCoordy, imageCoordx, obj.getBoundingRect().left);


        if (this.canvas.getActiveObject().width * this.canvas.getActiveObject().scaleX > this.objWidthLimit) {
          this.canvas.getActiveObject().scaleX = this.objWidthLimit / this.canvas.getActiveObject().width;
        }

        if (this.canvas.getActiveObject().height * this.canvas.getActiveObject().scaleY > this.objHeightLimit) {
          this.canvas.getActiveObject().scaleY = this.objHeightLimit / this.canvas.getActiveObject().height;
        }




        if (imageCoordx > 252) {
          console.log(this.canvas.getActiveObject().minScaleLimit, 'activeObject');
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
        obj.minScaleLimit = 0.08;
        console.log('General', obj.minScaleLimit);



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

        let matrix = e.target.calcTransformMatrix();
        var imageCoordx = matrix[4];
        var imageCoordy = matrix[5];
        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);
      },
      'object:selected': (e) => {

        this.canvas._activeObject.angle


        let obj = e.target;


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

        // e.target.bringToFront()
        const selectedObject = e.target;

        let matrix = e.target.calcTransformMatrix();
        var imageCoordx = matrix[4];
        var imageCoordy = matrix[5];
        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);

        this.selected = selectedObject.type;
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        selectedObject.cornerColor = '#FF7F50';


        this.resetPanels();
        this.getOpacity();
        this.getDistance();
        this.canvas.renderAll();


        if (selectedObject.type !== 'group' && selectedObject) {

          this.getId();
          this.getOpacity();
          this.getDistance();

          switch (selectedObject.type) {
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
              this.getLineHeight();
              this.getCharSpacing();
              this.getFontSize();
              break;
            case 'image':
              // this.imageEditor = true;
              this.getOpacity();
              this.getDistance();
              break;
          }
        }
      },
      'selection:updated': (e) => {

        let matrix = e.target.calcTransformMatrix();
        var imageCoordx = matrix[4];
        var imageCoordy = matrix[5];
        this.siteLayout.imageCoordy = Math.floor(imageCoordy);
        this.siteLayout.imageCoordx = Math.floor(imageCoordx);

        const selectedObject = e.target;
        this.selected = selectedObject.type;
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        selectedObject.cornerColor = '#FF7F50';
        // e.target.bringToFront()
        // this.canvas.getActiveObject()
        this.canvas.renderAll()
        this.resetPanels();

        this.getOpacity();
        this.getDistance();


        if (selectedObject.type !== 'group' && selectedObject) {

          this.getId();
          this.getOpacity();
          this.getDistance();

          switch (selectedObject.type) {
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
              this.getLineHeight();
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
        // console.log('cleared');
        this.selected = null;
        this.resetPanels();
        console.log('clear');



      }
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);

    // get references to the html canvas element & its context
    this.canvas.on('mouse:down', (e) => {
      const canvasElement: any = document.getElementById('canvas');
    });

  }


  /*------------------------Block elements------------------------*/

  // Block "Size"

  changeSize() {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);

  }

  // Block "Add text"

  addText() {


    console.log('I am text');


    $(".but").on('click', () => {
      console.log('lolo')
    })
    this.canvas.selection

    let numLeft = this.left;
    let numTop = this.top;

    function addDistancePoint(m, n) {
      var point = '<img src="../assets/img/green-crosshair-png-4.png" class="distance" style="position:absolute; top:' + (m - 13.1) + 'px; left:' + (n - 18) + 'px; cursor:crosshair; width:35px; height:35px;"/>';
      $(".canvas-container").append(point);
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

      $(".distance").remove();
      var btnLeft = x - numLeft;
      var btnTop = y + numTop + 1;
      var deleteBtn = '<img src="../assets/img/remove-icon-png-15.png" class="deleteBtn" style="position:absolute;top:' + btnTop + 'px; left:' + btnLeft + 'px; cursor:pointer; width:25px; height:25px;"/>';
      $(".canvas-container").append(deleteBtn);

    }


    this.canvas.on('object:modified', function (e) {

      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

      $(".distance").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4];
      var imageCoordy = matrix[5];
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
      // console.log('selected');
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

    this.canvas.on('object:removed', function (e) {
      $(".deleteBtn").remove();
      // console.log('removed');
      addDeleteBtn(e.target.oCoords.mb.x, e.target.oCoords.mb.y);

      $(".distance").remove();
      var matrix = e.target.calcTransformMatrix();
      var imageCoordx = matrix[4]
      var imageCoordy = matrix[5]
      addDistancePoint(imageCoordy, imageCoordx);

    });

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



    if (this.textString) {
      this.canvasCount += 1;
      console.log(this.canvasCount);


      const text = new fabric.IText(this.textString, {

        left: 170,
        top: 115,
        fontFamily: 'helvetica',
        color: "rgba(34, 34, 1, 0.3)",
        angle: 0,
        fill: '#000000',
        // scaleX: 0.8,
        // scaleY: 0.8,
        fontWeight: '',
        // fontSize: 80,
        hasRotatingPoint: true,
        strokeWidth: 10,
        strokeMiterLimit: 15,
        cornerSize: 11,
        padding: 10,

      });



      $('#shadowText').on('click', () => {
        if (!this.siteLayout.shadowText) {
          text.shadow = null;

        } else if (this.siteLayout.shadowText) {

          text.setShadow(this.shadowTEXT);
          text.shadow = new fabric.Shadow(this.shadowTEXT);
          // text.set('shadow', new fabric.Shadow(this.shadowTEXT));
          console.log('text');

        }

        this.canvas.renderAll();

      }),

        this.extend(text, this.randomId());
      this.canvas.add(text);
      this.selectItemAfterAdded(text);
      this.textString = '';
    }
  }

  // Block "Add images"

  getImgPolaroid(event: any) {

    this.canvas.includeDefaultValues;

    console.log(' I am image');

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
      console.log(this.canvasCount);
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
    console.log(this.canvasCount);
    const el = event;
    console.log(el);

    fabric.loadSVGFromURL(el, (objects, options) => {
      const image = fabric.util.groupSVGElements(objects, options);

      image.set({
        // shadow: this.shadow,
        // strokeWidth: 3,
        // stroke: '#000',
        left: 140,
        top: 150,
        angle: 0,
        padding: 10,
        cornerSize: 11,
        hasRotatingPoint: true,
        originX: 'left',
        // width: image.width * image.scaleX -80,
        // height: image.height * image.scaleY - 80
        // originY: 'center'

      });
      // value.shadow.affectStroke = false;
      image.scaleToWidth(130);
      image.scaleToHeight(130);
      this.extend(image, this.randomId());


      // image.filters.push(new fabric.Image.filters.ColorMatrix({
      //   matrix: [1, 0, 0, 0, 0,
      //     0, 1, 0, 0, 0,
      //     0, 0, 1, 0, 0,
      //     0, 0, 0, 1, 1]
      // }));



      this.canvas.add(image);
      this.canvas.renderAll();

      $('#hue-value').on('change', () => {
        console.log(this.siteLayout.removeColorValue);
        image.filters = [];
        if (this.filterName == 'blackWhite') {
          image.filters.push(new fabric.Image.filters.BlackWhite());
        } else if (this.filterName == 'vintage') {
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
              0, 0, 0, 1, 0]
          }));
          console.log('ooooooooooooooooo');

        }
        image.filters.push(new fabric.Image.filters.RemoveColor({
          distance: this.siteLayout.removeColorValue
        }
        ));
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

      console.log(image);


      $('#shadowSVG').on('change', () => {
        const obj = this.canvas.getActiveObject()
        if (this.siteLayout.shadowSVG === false) {
          image.shadow = null;

        } else if (this.siteLayout.shadowSVG) {

          image.setShadow(this.shadow);
          console.log(image);

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
          console.log(image);
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
          console.log(image);
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

          if (this.id == "svg") {
            console.log(this.id);
            image.filters = [];

            image.filters.push(new fabric.Image.filters.ColorMatrix({
              matrix: [1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0]
            }));
            image.applyFilters();
            this.canvas.renderAll();
          }
          else if (this.id == "svgPhoto") {
            console.log(this.id);
            image.filters = [];

            image.filters.push(new fabric.Image.filters.ColorMatrix({
              matrix: [1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 1]
            }));
            image.applyFilters();
            this.canvas.renderAll();
          }


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
      let obj = e.target

      obj.minScaleLimit = 0.08;

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
      console.log(this.canvasCount);
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

      console.log(this.canvasCount);
      fabric.Image.fromURL(url, (image1) => {


        image1.set({
          left: 110,
          top: 50,
          angle: 0,
          padding: 10,
          cornerSize: 11,
          hasRotatingPoint: true
        });
        image1.scaleToWidth(160);
        image1.scaleToHeight(160);
        this.extend(image1, this.randomId());
        image1.filters.push(new fabric.Image.filters.ColorMatrix({
          matrix: [1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0]
        }));
        this.canvas.add(image1);
        image1.applyFilters();
        this.canvas.renderAll();

        $('#hue-value').on('change', () => {
          console.log(this.siteLayout.removeColorValue);
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
            distance: this.siteLayout.removeColorValue
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
            console.log('mmmm');

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
            console.log(image1);
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
            console.log(image1);
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
    console.log(this.canvasCount);

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
      obj.minScaleLimit = 0.25;

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
          padding: 30,
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
          padding: 10,
          width: 100, height: 100, left: 20, top: 20, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          cornerSize: 11,
          padding: 10,
          width: 100, height: 100, left: 20, top: 20, fill: '#2196f3'

        });


        break;
      case 'circle':
        add = new fabric.Circle({
          cornerSize: 11,
          padding: 10,
          radius: 50, left: 20, top: 20, fill: '#ff5722'
        });
        break;
    }
    $('#shadow').on('click', () => {
      console.log('figure');

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

  extend(obj, id) {
    obj.toObject = ((toObject) => {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id
        });
      };
    })(obj.toObject);
  }

  setCanvasImage() {
    this.canvas.backgroundColor = this.siteLayout.arrColor[0]

    const image = this.props.canvasImage;
    this.canvas.setBackgroundImage(image,
      this.canvas.renderAll.bind(this.canvas), {
      opacity: 1,
      angle: 0,
      left: 0,
      top: 0,
      originX: 'left',
      originY: 'top',
      scaleX: 0.85,
      scaleY: 0.85,
      width: this.size.width + 76,
      height: this.size.height + 93
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
          console.log(this.canvasCount);
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          this.canvasCount += 1;
          console.log(this.canvasCount);
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          this.canvasCount += 1;
          console.log(this.canvasCount);
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          this.canvasCount += 1;
          console.log(this.canvasCount);
          this.canvas.getActiveObject();

          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          this.canvasCount += 1;
          console.log(this.canvasCount);
          break;
      }
      if (clone) {
        clone.set({ left: 20, top: 20 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
        this.defoultUpdate()
        this.canvas.getActiveObject();

      }
    }
  }

  getId() {
    this.props.id = this.canvas.getActiveObject().toObject().id;
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

  getLineHeight() {
    this.props.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  setLineHeight() {
    this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
  }

  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFontSize() {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
  }

  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
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

    this.canvasCount -= 1;
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

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
      this.canvas.renderAll()
      // this.cleanSelect();
      // activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.bringToFront();
        this.canvas.renderAll()
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

    image.src = this.canvas.toDataURL({ format: 'png', multiplier: 4 });
    // this.setCanvasImage();

    this.canvas.renderAll();
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
    const json = JSON.stringify(this.canvas);
    const lastColor = this.props.canvasFill;


    localStorage.setItem('Canvas', json);

    // const w = window.open('');
    // `<img style="margin-left:300px; top:-280px"  height="1000px" src="assets/img/Trafaret3.png" br> myFunction() { alert('ok')}  <button onclick="myFunction()">Print</button>`
    // console.log(this.canvas.toDataURL());
    this.saveCanvasToJSON();

    this.canvas.backgroundImage = null;
    this.canvas.backgroundColor = null;
    ;
    console.log('I am here');

    // this.canvas.renderAll();
    const image1 = new Image();
    image1.src = this.canvas.toDataURL({ format: 'png', multiplier: 4 });
    this.reqImage1 = image1.src;

    this.canvas.backgroundColor = JSON.parse(localStorage.getItem('Canvas')).background

    // this.canvas.backgroundColor = ;

    // this.loadCanvasFromJSON();
    this.setCanvasImage();
    this.canvas.backgroundColor = lastColor;

    const CANVAS = localStorage.getItem('Canvas');
    console.log(CANVAS, 'lololo');

    // this.canvas.loadFromJSON(CANVAS, () => {

    //   this.canvas.renderAll();
    // });

    // this.canvas.setBackgroundImage('assets/img/Trafaret3.png', 
    // this.canvas.renderAll.bind(this.canvas), {
  }

  rasterizeSVG() {

    const image = new Image();
    // image.scaleToWidth(150);
    // image.scaleToHeight(150);
    const w = window.open('');
    // this.canvas.toSVG()
    w.document.write(this.canvas.toSVG());

    var svgBlob = new Blob([this.canvas.toSVG()], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var link = document.createElement('a');
    link.href = svgUrl;
    link.download = image.outerHTML;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);



    return 'data:image/svg+xml;utf8,' + encodeURIComponent(this.canvas.toSVG());

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
    console.log('json');
    console.log(json);

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
    console.log(this.canvas._activeObject.top);

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
