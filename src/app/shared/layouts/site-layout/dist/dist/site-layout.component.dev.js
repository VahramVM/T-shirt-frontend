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
exports.SiteLayoutComponent = void 0;

var core_1 = require("@angular/core");

var material_service_1 = require("../../classes/material.service");

var SiteLayoutComponent =
/** @class */
function () {
  // public marvelHeroes =  this.productsColor.filter((hero) => {
  //   return hero.hex == this.productsColor[this.index].hex;
  // });
  // fontss = [
  //   {value: 'arial', name: 'Arial'},
  //   {value: 'Roboto', name: 'Roboto'},
  //   {value: 'Kaufmann BT', name: 'Kaufmann BT'},
  //   {value: 'Calisto Mt', name: 'Calisto Mt'},
  //   {value: 'Brush Script Mt', name: 'Brush Script Mt'},
  //   {value: 'TypoUpright BT', name: 'TypoUpright BT'},
  //   {value: 'Lucida Handwriting', name: 'Lucida Handwriting'},
  //   {value: 'grapalat', name: 'grapalat'},
  //   {value: 'Calisto Mt', name: 'Calisto Mt'},
  //   {value: 'fantasy', name:'fantasy'},
  //   {value: 'Comic Sans MS', name:'Comic Sans MS'},
  // ]
  // images = [
  //   { id: 'svg', path: '../assets/img/vintage_car_2.svg' },
  //   { id: 'svg', path: '../assets/img/300054197 (1).svg' },
  //   { id: 'svg', path: '../assets/img/643684912.svg' },
  //   { id: 'svg', path: '../assets/img/1238039455.svg' },
  //   { id: 'svg', path: '../assets/img/1653563747.svg' },
  //   { id: 'svg', path: '../assets/img/Penelope-Cruz-By-Heblo.svg' },
  //   { id: 'svg', path: '../assets/img/model.svg' },
  //   { id: 'svg', path: '../assets/img/Music.svg' },
  //   { id: 'svg', path: '../assets/img/PNG.svg' },
  //   { id: 'svg', path: '../assets/img/Grim_Reaper.eps' },
  //   { id: 9, path: '../assets/img/Origin.png' },
  //   { id: 'svgPhoto', path: '../assets/img/Art/91b91213cf99e2ac0c9a5a9141d8c4c0.svg' },
  //   { id: 'svgPhoto', path: '../assets/img/Art/-image_dali-persistence-of-memory-lg.svg' },
  //   { id: 'svgPhoto', path: '../assets/img/Art/15815906134355_8293849786237666996_n.svg' },
  //   { id: 'svgPhoto', path: '../assets/img/Art/26517021889248_8026067559252081096_n.svg' },
  //   { id: 'svgPhoto', path: '../assets/img/Art/44418993232044_7382442637724156660_n.svg' },
  //   { id: 'svgPhoto', path: '../assets/img/Art/45016015545963_3411506491084716110_n.svg' },
  //   { id: 'svgPhoto', path: '../assets/img/Art/1051040349.svg' }
  // ]
  // colors = [
  //   { hex: '#ffffff', name: 'pink' },
  //   { hex: '#b4a24b', name: 'pino' },
  //   { hex: '#353535', name: 'pink' },
  //   { hex: '#5a7cc6', name: 'pink' },
  //   { hex: '#cba6a6', name: 'pink' },
  //   { hex: '#e1a24b', name: 'pino' },
  //   { hex: '#11e139', name: 'pink' },
  //   { hex: '#4b2cc6', name: 'pink' }
  // ]
  function SiteLayoutComponent(router, httpService, catecoriesService, produtsService, productscolorService, fontService) {
    this.router = router;
    this.httpService = httpService;
    this.catecoriesService = catecoriesService;
    this.produtsService = produtsService;
    this.productscolorService = productscolorService;
    this.fontService = fontService;
    this.title = 'EditorPic';
    this.isOpen = false;
    this.isOpenDraw = false;
    this.selectColor = '';
    this.select = false;
    this.isClicked = false;
    this.isClickedBold = false;
    this.isClickedItalic = false;
    this.isClickedUnderline = false;
    this.isClickedOverline = false;
    this.isClickedCenterline = false;
    this.isOpasity = false;
    this.isOpasity1 = true;
    this.expression = false;
    this.category = '';
    this.origin = true;
    this.shadow = false;
    this.shadowText = true;
    this.shadowSVG = false;
    this.removeColorValue = 0;
    this.saturation = 0;
    this.blur = 0;
    this.contrast = 0;
    this.noise = 0;
    this.activatebutton = true; // public imageCoordyy = this.canvas.imageCoordy
    //owl-carousel

    this.bob = null;
    this.isCarouselOpen = true;
    this.toggle = false;
    this.allColors = true;
    this.length = null;
    this.productSizes = null; //new

    this.fonts = [];
    this.images = [];
    this.products = [];
    this.productsColor = [];
    this.categories = [];
    this.arrColor = [];
    this.productBrandColors = [];
    this.productBrands = [{
      name: 'Melante',
      linkeBrand: 'https://www.facebook.com/melante.am',
      productColor: ['orange', 'blu', 'green', '#444444'],
      size: {
        XS: 'teue',
        S: 'teue',
        M: 'teue',
        L: 'teue',
        XL: 'teue',
        XXL: 'teue'
      },
      src: 'data:image/jpeg;base64,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'
    }, {
      name: 'Mosini',
      linkeBrand: 'https://www.facebook.com/Mosinifashion',
      productColor: ['red', 'blue', 'orange', 'yellow', '#444444'],
      size: {
        XS: 'teue',
        S: 'teue',
        M: 'teue',
        L: 'teue',
        XL: 'teue',
        XXL: 'teue'
      },
      src: 'data:image/jpeg;base64,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'
    }, {
      name: 'Tosp',
      linkeBrand: 'https://www.facebook.com/tosp.armenia',
      productColor: ['white', 'pink', 'red'],
      size: {
        XS: 'teue',
        S: 'teue',
        M: 'teue',
        L: 'teue',
        XL: 'teue',
        XXL: 'teue'
      },
      src: 'data:image/png;base64,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'
    }]; // imageProducts = [
    //   { type: 'assets/img/Vintage.png' },
    //   { type: 'assets/img/Trafaret3.png' },
    //   { type: 'assets/img/Trafaret.png' },
    //   { type: 'assets/img/Vintage.png' },
    // ]

    this.index = 0;
    this.firstImage = 0;
    this.firstImageCarousel = '';
    this.canvasHtmlWidth = window.innerWidth - 0.68 * window.innerWidth;
    this.canvasHtmlHeight = this.canvasHtmlWidth * 1.233;
    this.customOptions = {
      // stagePadding: 200,
      // margin: 0,
      // loop: true,
      // navText: [ "<img src='myprevimage.png'>","<img src='mynextimage.png'>"],
      navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      // navClass: ['owl-prev', 'owl-next'],
      // lazyLoad: true,
      nav: true,
      dots: false,
      autoHeight: true,
      // autoplay:true,
      // autoWidth: true,s
      smartSpeed: 1000,
      center: true,
      responsive: {
        0: {
          items: 1,
          margin: 90,
          stagePadding: 90
        },
        400: {
          items: 3,
          margin: 10,
          stagePadding: 50
        },
        760: {
          items: 3,
          margin: 60
        },
        1000: {
          items: 3,
          margin: 60
        }
      }
    };
  }

  SiteLayoutComponent.prototype.owlDragging = function (e) {
    console.log(e); // console.log(this.src);
  };

  SiteLayoutComponent.prototype.modelChangeFn = function () {
    this.setCharSpacing();
  };

  SiteLayoutComponent.prototype.getPassedData = function (data) {
    this.activeSlides = data;
    var index = this.activeSlides.startPosition;
    var src = $('.owlCarousel').find(".owl-item").eq(index).find("img").attr('src');
    $('.divv').text(src);
    this.firstImage = 1;
    index = 0; // $('.owlCarousel').on('changed.owlCarousel', (event) => {
    //   var current = event.item.index;
    //   var src = $(event.target).find(".owl-item").eq(current).find("img").attr('src');
    //   $('.divv').text(src)
    // });
  };

  SiteLayoutComponent.prototype.onload = function () {
    console.log('onload');
  };

  SiteLayoutComponent.prototype.onResize = function (event) {
    var checkWidth = $(window).width();

    if (checkWidth >= 800) {
      console.log(500, 'ok');
      $('#myCarousel').trigger('refresh.owl.carousel');
    }

    console.log(event); // this.canvasHtmlWidth = window.innerWidth - 0.68 * window.innerWidth;

    this.canvasHtmlWidth = event.target.innerWidth - 0.68 * event.target.innerWidth;
    this.canvasHtmlHeight = this.canvasHtmlWidth * 1.233;
  };

  SiteLayoutComponent.prototype.Resize = function () {
    console.log('resize');
    return this.customOptions;
  };

  SiteLayoutComponent.prototype.funk = function () {//   if ( $(window).width() < 768 ) {
    //     var owlActive = owl.owlCarousel(owlOptions);
    // } else {
    //     owl.addClass('off');
    // }
    // $(window).resize(function() {
    //     if ( $(window).width() < 768 ) {
    //         if ( $('.owl-carousel').hasClass('off') ) {
    //             var owlActive = owl.owlCarousel(owlOptions);
    //             owl.removeClass('off');
    //         }
    //     } else {
    //         if ( !$('.owl-carousel').hasClass('off') ) {
    //             owl.addClass('off').trigger('destroy.owl.carousel');
    //             owl.find('.owl-stage-outer').children(':eq(0)').unwrap();
    //         }
    //     }
    // });
    //   this.firstImage = 2;
    //   console.log(this.firstImage);
  };

  SiteLayoutComponent.prototype.Themes = function () {
    var _this = this; // this.firstImage = 1


    this.IMG.nativeElement.innerHTML = this.images[0].imageSrc;
    console.log(this.images[0].imageSrc, 'ooooooooo');
    console.log(this.images, 'array'); // this.firstImage = this.images[0].imageSrc;
    // this.categories = []

    this.catecoriesService.Themes(this.category).subscribe(function (res) {
      _this.images = res;
    }); // $('.owl-nav').show();

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.onSameUrlNavigation = 'reload'; // this.router.navigate(['main']);
    //   this.router.navigateByUrl('main', { skipLocationChange: true }).then(() => {
    //     this.router.navigate(['main']);
    // });
  };

  SiteLayoutComponent.prototype.ngOnInit = function () {
    // console.log(this.marvelHeroes);
    var _this = this;

    var arrr = this.images; // this.catecoriesService.fetch().subscribe(
    //   (res: Images[]) => {
    //     this.images = res;
    //   }
    // )

    this.catecoriesService.Themes(this.category).subscribe(function (res) {
      _this.images = res;
      console.log(_this.images);
      _this.firstImageCarousel = res[0].imageSrc;
      var addresses = res; // Some array I got from async call

      var uniqueAddresses = Array.from(new Set(addresses.map(function (a) {
        return a.name;
      }))).map(function (name) {
        return addresses.find(function (a) {
          return a.name === name;
        });
      });
      _this.categories = uniqueAddresses;
      console.log(uniqueAddresses);
    }); //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate(['main']);
    // })

    this.produtsService.fetch().subscribe(function (res) {
      _this.products = res;
      _this.firstBackCanvasImage = res[1].type;
      console.log(res[1].type);
    });
    this.productscolorService.fetch().subscribe(function (res) {
      _this.productsColor = res;
      console.log(res);
    });
    this.fontService.fetch().subscribe(function (res) {
      _this.fonts = res;
      console.log(res);
    }); //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  };

  SiteLayoutComponent.prototype.sendMail = function () {
    this.canvas.rasterize();
    console.log(this.canvas.reqImage1);
    var image = {
      image: this.canvas.reqImage,
      image1: this.canvas.reqImage1
    };
    this.httpService.sendEmail("http://localhost:5000/sendmail", image);

    (function (data) {
      var res = data;
      console.log('all is ok');
    });
  };

  SiteLayoutComponent.prototype.valueChanged = function (e) {// console.log(e.target.value);
    // this.canvas.value = e.target.value
  };

  SiteLayoutComponent.prototype.ngAfterViewInit = function () {
    material_service_1.Material.nav();
    material_service_1.Material.tab();
    material_service_1.Material.zoomImg(); // Material.carousel()
    // Material.selectOpt()
    // Material.scrolSpy()
    // Material.dropDown()

    console.log('afterViewinit'); // console.log(this.category);
    // this.catecoriesService.fetch(this.category).subscribe(
    //   (res: Category[]) => {
    //     this.categories = res;
    //     console.log(this.categories, 'AAA');
    //   }
    // )

    this.canvas.setCanvasImage();
  };

  SiteLayoutComponent.prototype.selectPicture = function () {
    console.log(this.products);
    this.toggle = true; // $('.owlCarousel').hide()

    if (this.firstImage == 0) {
      if (this.IMG.nativeElement.innerHTML == '') {
        this.canvas.getImgPolaroid(this.images[0].imageSrc);
        console.log(this.IMG.nativeElement.innerHTML, 'empty');
      } else {
        this.canvas.getImgPolaroid(this.IMG.nativeElement.innerHTML);
        console.log(this.IMG.nativeElement.innerHTML, '0');
      }
    } else if (this.firstImage == 1) {
      this.canvas.getImgPolaroid(this.IMG.nativeElement.innerHTML);
    } else if (this.firstImage == 2) {
      console.log(this.images, 'yuu');
      this.canvas.getImgPolaroid(this.images[0].imageSrc);
    } else {
      this.canvas.getImgPolaroid(this.IMG.nativeElement.innerHTML);
    } // console.log(this.IMG.nativeElement.innerHTML);

  };

  SiteLayoutComponent.prototype.filter = function (event) {
    console.log('event', event.target.value);
    return event;
  };

  SiteLayoutComponent.prototype.routerlink = function () {// this.roter.navigate(['/register'])
    // console.log('kkkkk');
  };

  SiteLayoutComponent.prototype.rasterize = function () {
    this.canvas.rasterize();
  };

  SiteLayoutComponent.prototype.rasterizeSVG = function () {
    this.canvas.rasterizeSVG();
  };

  SiteLayoutComponent.prototype.saveCanvasToJSON = function () {
    this.canvas.saveCanvasToJSON();
  };

  SiteLayoutComponent.prototype.loadCanvasFromJSON = function () {
    this.canvas.loadCanvasFromJSON();
  };

  SiteLayoutComponent.prototype.confirmClear = function () {
    this.canvas.confirmClear();
  }; // public changeSize() {
  //   // this.canvas.changeSize();
  // }


  SiteLayoutComponent.prototype.addText = function () {
    this.canvas.addText();
  };

  SiteLayoutComponent.prototype.getImgPolaroid = function (event) {
    this.canvas.getImgPolaroid(event);
  };

  SiteLayoutComponent.prototype.removeImgPolaroid = function (event) {
    console.log(event);
  };

  SiteLayoutComponent.prototype.addImageOnCanvas = function (url) {
    this.canvas.addImageOnCanvas(url);
  };

  SiteLayoutComponent.prototype.readUrl = function (event) {
    this.canvas.readUrl(event);
  };

  SiteLayoutComponent.prototype.removeWhite = function (url) {
    this.canvas.removeWhite(url);
  };

  SiteLayoutComponent.prototype.addFigure = function (figure) {
    this.canvas.addFigure(figure);
  };

  SiteLayoutComponent.prototype.removeSelected = function () {
    this.canvas.removeSelected();
  };

  SiteLayoutComponent.prototype.sendToBack = function () {
    this.canvas.sendToBack();
  };

  SiteLayoutComponent.prototype.bringToFront = function () {
    this.canvas.bringToFront();
  };

  SiteLayoutComponent.prototype.clone = function () {
    this.canvas.clone();
  };

  SiteLayoutComponent.prototype.cleanSelect = function () {
    this.canvas.cleanSelect();
  };

  SiteLayoutComponent.prototype.setCanvasFill = function () {
    this.canvas.setCanvasFill();
  };

  SiteLayoutComponent.prototype.drawFill = function () {
    this.canvas.drawFill();
  };

  SiteLayoutComponent.prototype.productSize = function () {
    this.productSizes = this.productBrands[0].size; // for (let i = 0; i < Object.keys(this.productBrands[0].size).length; i++) {
    //   const element = [i];
    // }
    // this.productBrands[0].size
  };

  SiteLayoutComponent.prototype.setCanvasImage = function () {
    // this.arrColor.length = 0;
    var _this = this;

    var productType = this.products.filter(function (element) {
      return element.type === _this.canvas.props.canvasImage;
    });
    this.arrColor = productType[0].hex;
    this.canvas.setCanvasImage();
    this.productBrandColor();
  };

  SiteLayoutComponent.prototype.productBrandColor = function () {
    var _this = this;

    this.canvas.productsTypeColor(); // this.productBrandColors.length = 0;

    var productBrandName = this.productBrands.filter(function (element) {
      // console.log(this.productBrandName);
      return element.name === _this.canvas.props.brandName;
    });
    this.productBrandColors = productBrandName[0].productColor;
    var filterByColorBrand = this.arrColor.filter(function (o1) {
      return _this.productBrandColors.some(function (o2) {
        return o1 === o2;
      });
    });
    this.productBrandColors = filterByColorBrand;
    console.log(filterByColorBrand);
  };

  SiteLayoutComponent.prototype.productsTypeColor = function () {
    this.canvas.productsTypeColor();
  };

  SiteLayoutComponent.prototype.setId = function () {
    this.canvas.setId();
  };

  SiteLayoutComponent.prototype.setDistance = function () {
    this.canvas.setDistance();
    console.log('distance');
  };

  SiteLayoutComponent.prototype.setOpacity = function () {
    this.canvas.setOpacity();
  };

  SiteLayoutComponent.prototype.setFill = function () {
    this.canvas.setFill();
  };

  SiteLayoutComponent.prototype.setFontFamily = function () {
    this.canvas.setFontFamily();
  };

  SiteLayoutComponent.prototype.setTextAlign = function (value) {
    this.canvas.setTextAlign(value);
  };

  SiteLayoutComponent.prototype.setBold = function () {
    this.canvas.setBold();
  };

  SiteLayoutComponent.prototype.setFontStyle = function () {
    this.canvas.setFontStyle();
  }; // public hasTextDecoration(value) {
  //   this.canvas.hasTextDecoration(value);
  //   console.log(value);
  // }


  SiteLayoutComponent.prototype.canvasDrawing = function (value) {
    this.canvas.canvasDrawing(value);
  };

  SiteLayoutComponent.prototype.setTextDecoration = function (value) {
    this.canvas.setTextDecoration(value);
  };

  SiteLayoutComponent.prototype.setFontSize = function () {
    this.canvas.setFontSize();
  };

  SiteLayoutComponent.prototype.setLineHeight = function () {// this.canvas.setLineHeight();
  };

  SiteLayoutComponent.prototype.setCharSpacing = function () {
    this.canvas.setCharSpacing();
  };

  SiteLayoutComponent.prototype.rasterizeJSON = function () {
    this.canvas.rasterizeJSON();
  };

  SiteLayoutComponent.prototype.link = function () {
    console.log(this.canvas.linkk);
  };

  __decorate([core_1.ViewChild('canvas', {
    "static": false
  })], SiteLayoutComponent.prototype, "canvas");

  __decorate([core_1.ViewChild('imagePath')], SiteLayoutComponent.prototype, "IMG");

  __decorate([core_1.ViewChild('coord')], SiteLayoutComponent.prototype, "coord");

  __decorate([core_1.ViewChild('owlElement')], SiteLayoutComponent.prototype, "owlElement");

  SiteLayoutComponent = __decorate([core_1.Component({
    selector: 'app-site-layout',
    templateUrl: './site-layout.component.html',
    styleUrls: ['./site-layout.component.scss'],
    encapsulation: core_1.ViewEncapsulation.None
  }), core_1.HostListener('window:load')], SiteLayoutComponent);
  return SiteLayoutComponent;
}();

exports.SiteLayoutComponent = SiteLayoutComponent;