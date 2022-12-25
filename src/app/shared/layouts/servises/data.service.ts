import { Injectable, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs'
import { Products } from '../../interface';
import { SizeFormatComponent } from '../site-layout/size-format/size-format.component';
import { ProdutsService } from './products.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public formatA4Horizontal = new Subject<number>();
  public formatA4Vertical = new Subject<number>();
  public formatTop = new Subject<number>();
  public canvasDivSelect = new Subject<boolean>();
  public scaleKeyy = new Subject<number>();
  public endPriseValue = new Subject<number>();
  public horVertt = new Subject<boolean>();
  public formatValue1 = new Subject<string>();


  public widthKey: number = 0.67;
  public heightKey: number = 1.26;
  public positionKey: number = 5.9;

  // public widthHeight: number = 1.414;

  public canvasHtmlWidth: number;
  public canvasHtmlHeight: number;
  public positionTopKey: number; // if wont to get up then it must be + in first, else get down -


  public canvasCenteredPosition: number;
  public canvasSizeFormatWidth: number;
  public canvasSizeFormatHeight: number;
  public canvasSizeFormatTop: number;
  public canvasSizeFormatLeft: number;

  public scaleBlock: boolean = false;

  public sizeValue: string = 'M';
  public formatValue: string = 'A4';

  public horizontalVertical: boolean;


  // public horVert: boolean = true;

  public scaleKeyForCanvas: number;
  public products: Products[] = [];
  public indexBrandType: number = 0;

  // public endPrise: number = 0;
  // public scaleKeyyy: number = 2.3;
  // public scaleBlock: boolean;


  // public canvasHtmlHeight: number = this.canvasHtmlWidth * this.heightKey;
  // public canvasCenteredPosition: number = window.innerWidth / this.positionKey;

  // public canvasSizeFormatWidth: number;
  // public canvasSizeFormatHeight: number;
  // public canvasSizeFormatTop: number;
  // public canvasSizeFormatLeft: number;



  // private formatWidth: number;
  // private formatHeight: number;

  // private formatTop: number;
  // private formatLeft: number;

  private _sizePrintKey;

  public set sizePrintKey(value: number) {
    this._sizePrintKey = value;
    this.formatA4Horizontal.next(value);
  }

  public get sizePrintKey(): number {
    return this._sizePrintKey;
  }

  private _formatWithHeight;

  public set formatWithHeight(value: number) {
    this._formatWithHeight = value;
    this.formatA4Vertical.next(value);

  }

  public get formatWithHeight(): number {
    return this._formatWithHeight;
  }

  private _formatTopKey;

  public set formatTopKey(value: number) {
    this._formatTopKey = value;
    this.formatTop.next(value);
  }

  public get formatTopKey(): number {
    return this._formatTopKey;
  }

  private _canvasSelect;

  public set canvasSelect(value: boolean) {
    this._canvasSelect = value;
    this.canvasDivSelect.next(value);
  }

  public get canvasSelect(): boolean {
    return this._canvasSelect;
  }

  private _scaleKey;

  public set scaleKey(value: number) {
    this._scaleKey = value;
    this.scaleKeyy.next(value);
  }

  public get scaleKey(): number {
    return this._scaleKey;
  }

  private _endPrise;

  public set endPrise(value: number) {
    this._endPrise = value;
    this.endPriseValue.next(value);
  }

  public get endPrise(): number {
    return this._endPrise;
  }

  private _horVert;

  public set horVert(value: boolean) {
    this._horVert = value;
    this.horVertt.next(value);
  }

  public get horVert(): boolean {
    return this._horVert;
  }

  private _formatVal;

  public set formatVal(value: string) {
    this._formatVal = value;
    this.formatValue1.next(value);
  }

  public get formatVal(): string {
    return this._formatVal;
  }

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

  constructor(private produtsService: ProdutsService) {

    // this.sizePrintKey = 686 / ((686 - 297) / 2);
    // this.formatWithHeight = 0.707;
    // this.formatTopKey = 0;

    this.initCalculations();
    this.initFromServer();

    this.produtsService.fetch().subscribe(
      (res: Products[]) => {
        this.products = res;
      }
    );


  }


  ngOnInit(): void {
    // this.formatSizeSwich();


  }

  public formats = [{ format: 'A3', formatSize: 297, formatPrise: 500 }, { format: 'A4', formatSize: 297, formatPrise: 400 }, { format: 'A5', formatSize: 210, formatPrise: 300 }, { format: 'A6', formatSize: 148, formatPrise: 400 }];


  formatSizeSwich() {

    this.endPrise = 100;
    const realSize = this.products[this.indexBrandType].realSize;
    const cafficient = 1.0229;

    // const realSizes = { XS: 609, S: 648, M: 686, L: 724, XL: 762, XXL: 800 };
    // const formats = ['A3', 'A4', 'A5'];


    for (let ind = 0; ind < this.formats.length; ind++) {
      for (let i = 0; i < Object.keys(realSize).length; i++) {

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
    }

    // if (this.sizeValue === 'XS' && this.formatValue === 'A4') {
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
  }

  calcEndPrise() {

    for (let i = 0; i < this.formats.length; i++) {
      if (this.formatValue === this.formats[i].format) {
        this.endPrise = this.formats[i].formatPrise;
        console.log(this.endPrise);
      }
    }

  }

  // public allLenght = A3Width +  (canvasWidth - 2* sleeveLenght * cos(45)) + chestWidth - A3


  public initCalculations() {

    this.sizePrintKey = 686 / ((686 - 297) / 2);
    this.formatWithHeight = 0.707; // 0.707
    this.formatTopKey = -0.03;
    this.horVert = true;
    // if (this.horVert) {
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


  }

  private initFromServer() {
    // call server function


  }

}


