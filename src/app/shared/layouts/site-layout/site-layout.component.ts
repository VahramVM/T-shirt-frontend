import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { EditorPicComponent } from 'src/app/editor-pic/editor-pic.component';
import { Material } from '../../classes/material.service';

// import { Caman } from 'caman'

import { Router } from '@angular/router';
import { AuthServices } from '../servises/services';
import { CategoriesService } from '../servises/categories.service';
import { Images, Products, ProductsColor, Fonts } from '../../interface';
import { ProdutsService } from '../servises/products.service';
import { ProdutsColorService } from '../servises/productscolor.service';
import { FontService } from '../servises/fonts.service';

import { SlidesOutputData, OwlOptions, } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
  encapsulation: ViewEncapsulation.None

})



export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('canvas', { static: false }) canvas: EditorPicComponent;
  @ViewChild('imagePath') IMG: ElementRef;
  @ViewChild('coord') coord: ElementRef;
  @ViewChild('owlElement') owlElement: ElementRef;



  title = 'EditorPic';

  isOpen = false;
  selectColor = '';
  select = false;
  isClicked = false;
  isClickedBold = false;
  isClickedItalic = false;
  isClickedUnderline = false;
  isClickedOverline = false;
  isClickedCenterline = false;
  isOpasity = false;
  isOpasity1 = true;
  expression = false;

  public category = '';


  origin = true;
  shadow = false;
  shadowText = true;
  shadowSVG = false;

  removeColorValue = 0;
  saturation = 0;
  blur = 0;
  contrast = 0;
  noise = 0;

  activatebutton = true;


  // public imageCoordyy = this.canvas.imageCoordy

  //owl-carousel
  bob = null;
  isCarouselOpen: boolean = true;
  toggle: boolean = false;
  public imageCoordy;
  public imageCoordx;
  public scaleX



  public length = null;

  public fonts: Fonts[] = [];
  public images: Images[] = [];
  public products: Products[] = [];
  public productsColor: ProductsColor[] = [];
  public categories = [];

  public index = 0;

  public firstImage = 0;

  public colorFilter;

  public productType;

  public arrColor = [];


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

  // imageProducts = [
  //   { type: 'assets/img/Vintage.png' },
  //   { type: 'assets/img/Trafaret3.png' },
  //   { type: 'assets/img/Trafaret.png' },
  //   { type: 'assets/img/Vintage.png' },
  // ]

  constructor(
    private router: Router,
    private httpService: AuthServices,
    private catecoriesService: CategoriesService,
    private produtsService: ProdutsService,
    private productscolorService: ProdutsColorService,
    private fontService: FontService,

  ) { }


  activeSlides: SlidesOutputData;

  owlDragging(e) {
    console.log(e);
    // console.log(this.src);

  }

  getPassedData(data: SlidesOutputData) {


    this.activeSlides = data;
    let index = this.activeSlides.startPosition

    let src = $('.owlCarousel').find(".owl-item").eq(index).find("img").attr('src');
    $('.divv').text(src)

    this.firstImage = 1;
    index = 0;


    // $('.owl-carousel').owlCarousel().on('changed.owl.carousel', function (event) {
    //   var current = event.item.index;
    //   var src = $(event.target).find(".owl-item").eq(current).find("img").attr('src');
    //   $('.divv').text(src)
    // });
  }



  customOptions: OwlOptions = {

    // stagePadding: 200,
    // margin: 0,
    // loop: true,
    // navText: [ "<img src='myprevimage.png'>","<img src='mynextimage.png'>"],
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
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
        stagePadding: 90,

      },

      400: {

        items: 1,
        margin: 110,
        stagePadding: 110,

      },

      760: {
        items: 3,
        margin: 60,
        // stagePadding: 85,
      },

      1000: {
        items: 3,
        margin: 60,
        // stagePadding: 150,
      },

    },
  }


  funk() {
    this.firstImage = 2;
    console.log(this.firstImage);

  }


  Themes() {
    // this.firstImage = 1
    this.IMG.nativeElement.innerHTML = this.images[0].imageSrc;
    console.log(this.images[0].imageSrc, 'ooooooooo');
    console.log(this.images, 'array');


    // this.firstImage = this.images[0].imageSrc;
    // this.categories = []

    this.catecoriesService.Themes(this.category).subscribe(
      (res: Images[]) => {
        this.images = res;
      }
    )

    // $('.owl-nav').show();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate(['main']);

    //   this.router.navigateByUrl('main', { skipLocationChange: true }).then(() => {
    //     this.router.navigate(['main']);
    // });

  }





  ngOnInit(): void {

    // console.log(this.marvelHeroes);

    const arrr = this.images

    // this.catecoriesService.fetch().subscribe(
    //   (res: Images[]) => {
    //     this.images = res;
    //   }

    // )


    this.catecoriesService.Themes(this.category).subscribe(
      (res: Images[]) => {
        this.images = res;
        console.log(this.images);

        const addresses = res; // Some array I got from async call

        const uniqueAddresses = Array.from(new Set(addresses.map(a => a.name)))
          .map(name => {
            return addresses.find(a => a.name === name)
          })
        this.categories = uniqueAddresses
        console.log(uniqueAddresses)

      }
    )

    //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate(['main']);
    // })



    this.produtsService.fetch().subscribe(
      (res: Products[]) => {
        this.products = res;
        console.log(res);
      }
    );


    this.productscolorService.fetch().subscribe(
      (res: ProductsColor[]) => {
        this.productsColor = res;
        console.log(res);
      }
    )

    this.fontService.fetch().subscribe(
      (res: Fonts[]) => {
        this.fonts = res;
        console.log(res);
      }
    )




    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }


  sendMail() {

    this.canvas.rasterize()

    let image = {
      image: this.canvas.reqImage,
      image1: this.canvas.reqImage1
    }

    this.httpService.sendEmail("http://localhost:5000/sendmail", image)
    data => {
      let res: any = data;
      console.log('all is ok');
    }
    console.log('i am here!!!');
  }

  valueChanged(e) {

    // console.log(e.target.value);
    // this.canvas.value = e.target.value

  }


  ngAfterViewInit(): void {


    Material.nav()
    Material.tab()
    Material.zoomImg()
    // Material.carousel()
    // Material.selectOpt()
    // Material.scrolSpy()
    // Material.dropDown()

    console.log('afterViewinit');

    // console.log(this.category);

    // this.catecoriesService.fetch(this.category).subscribe(
    //   (res: Category[]) => {
    //     this.categories = res;
    //     console.log(this.categories, 'AAA');

    //   }
    // )


    this.canvas.setCanvasImage();
    // if (this.canvas.canvasCount == 0) {
    //   this.imageCoordy = 'no select'
    // } else if (this.canvas.canvasCount !== 0) {
    //   this.imageCoordy = this.canvas.imageCoordy
    // }


    // $('.owl-carousel').owlCarousel().on('changed.owl.carousel', function (event) {
    //   var current = event.item.index;
    //   var src = $(event.target).find(".owl-item").eq(current).find("img").attr('src');
    //   $('.divv').text(src)
    //   console.log(src);
    // });



    // document.querySelector('.owlCarousel').addEventListener('changed.owl.carousel', function (event) {
    //   var current = event
    //   var src = document.querySelector(".owl-item").querySelector("img");
    //   document.querySelector('.divv').text(src)
    //   console.log('src');
    // });




  }


  public selectPicture() {

    console.log(this.products);


    this.toggle = true;
    // $('.owlCarousel').hide()
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
      this.canvas.getImgPolaroid(this.IMG.nativeElement.innerHTML)
    }
    // console.log(this.IMG.nativeElement.innerHTML);

  }

  public filter(event) {
    console.log('event', event.target.value);

    return event

  }

  routerlink() {
    // this.roter.navigate(['/register'])
    // console.log('kkkkk');

  }


  public rasterize() {
    this.canvas.rasterize();
  }

  public rasterizeSVG() {
    this.canvas.rasterizeSVG();
  }

  public saveCanvasToJSON() {
    this.canvas.saveCanvasToJSON();
  }

  public loadCanvasFromJSON() {
    this.canvas.loadCanvasFromJSON();
  }

  public confirmClear() {
    this.canvas.confirmClear();
    console.log(this.images);
    console.log(this.length);
  }

  public changeSize() {
    this.canvas.changeSize();
  }

  public addText() {
    this.canvas.addText();
  }

  public getImgPolaroid(event) {
    this.canvas.getImgPolaroid(event);
  }

  public removeImgPolaroid(event) {
    console.log(event);

  }

  public addImageOnCanvas(url) {

    this.canvas.addImageOnCanvas(url);
  }


  public readUrl(event) {
    this.canvas.readUrl(event);
  }

  public removeWhite(url) {
    this.canvas.removeWhite(url);
  }

  public addFigure(figure) {
    this.canvas.addFigure(figure);
  }

  public removeSelected() {
    this.canvas.removeSelected();
  }

  public sendToBack() {
    this.canvas.sendToBack();
  }

  public bringToFront() {
    this.canvas.bringToFront();
  }

  public clone() {
    this.canvas.clone();
  }

  public cleanSelect() {
    this.canvas.cleanSelect();
  }

  public setCanvasFill() {
    this.canvas.setCanvasFill();
  }

  public setCanvasImage() {


    this.arrColor.length = 0;

    this.productType = this.products.filter(element => {
      return element.type == this.canvas.props.canvasImage;
    })

    for (let index = 0; index < this.productType[0].hex.length; index++) {
      const element = this.productType[0].hex[index];
      this.arrColor.push(element);
    }

    this.canvas.setCanvasImage();

  }

  public productsType() {
  }

  public setId() {
    this.canvas.setId();
  }

  public setDistance() {
    this.canvas.setDistance();
  }

  public setOpacity() {
    this.canvas.setOpacity();
  }

  public setFill() {
    this.canvas.setFill();
  }

  public setFontFamily() {
    this.canvas.setFontFamily();
  }

  public setTextAlign(value) {
    this.canvas.setTextAlign(value);
  }

  public setBold() {
    this.canvas.setBold();
  }

  public setFontStyle() {
    this.canvas.setFontStyle();
  }

  public hasTextDecoration(value) {
    this.canvas.hasTextDecoration(value);
  }

  public setTextDecoration(value) {
    this.canvas.setTextDecoration(value);
  }

  public setFontSize() {
    this.canvas.setFontSize();
  }

  public setLineHeight() {
    this.canvas.setLineHeight();
  }

  public setCharSpacing() {
    this.canvas.setCharSpacing();
  }

  public rasterizeJSON() {
    this.canvas.rasterizeJSON();
  }

  public link() {
    console.log(this.canvas.linkk);

  }



}
