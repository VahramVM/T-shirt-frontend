import { Injectable, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs'
import { SizeFormatComponent } from '../site-layout/size-format/size-format.component';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public formatA4Horizontal = new Subject<number>();
  public formatA4Vertical = new Subject<number>();
  public formatTop = new Subject<number>();
  public canvasDivSelect = new Subject<boolean>();
  public scaleKeyy = new Subject<number>();


  public widthKey: number = 0.68;
  public heightKey: number = 1.233;
  public positionKey: number = 5.75;

  public widthHeight: number = 1.414;

  public canvasHtmlWidth: number;
  public canvasHtmlHeight: number;
  public positionTopKey: number; // if wont to get up then it must be + in first, else get down -


  public canvasCenteredPosition: number;
  public canvasSizeFormatWidth: number;
  public canvasSizeFormatHeight: number;
  public canvasSizeFormatTop: number;
  public canvasSizeFormatLeft: number;

  public scaleBlock: boolean = false;

  public sizeValue: string = '';
  public formatValue: string = '';


  public horVert: boolean = false;

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

  constructor() {
    this.initCalculations();
    this.initFromServer();
  }



  ngOnInit(): void {

  }

  formatSizeSwich() {

    const cafficient = 1.0229;

    if (this.sizeValue === 'xs' && this.formatValue === 'A4') {
      console.log("HV");

      if (this.horVert) {
        this.sizePrintKey = 609 / ((609 - 297) / 2);
        this.scaleKey = this.canvasSizeFormatWidth/ 185
      } else {
        this.sizePrintKey = 609 * cafficient / ((609 - 210) / 2);
        this.scaleKey = this.canvasSizeFormatWidth/ 95
      }
    }

    if (this.sizeValue === 's' && this.formatValue === 'A4') {
      console.log("HV");

      if (this.horVert) {
        this.sizePrintKey = 648 / ((648 - 297) / 2);
      } else {
        this.sizePrintKey = 648 * cafficient / ((648 - 210) / 2);
      }
    }

    if (this.sizeValue === 'm' && this.formatValue === 'A4') {
      console.log("HV");

      if (this.horVert) {
        this.sizePrintKey = 686 / ((686 - 297) / 2);
        this.scaleKey = this.canvasSizeFormatWidth/ 185
      } else {
        this.sizePrintKey = 686 * cafficient / ((686 - 210) / 2);
        this.scaleKey = this.canvasSizeFormatWidth/ 95
      }
    }
  }

  // public allLenght = A3Width +  (canvasWidth - 2* sleeveLenght * cos(45)) + chestWidth - A3


  public initCalculations() {


    this.sizePrintKey = 4.3;
    this.formatWithHeight = 1.414;
    this.formatTopKey = 0;


    function calc(bigWidth, smallWidth) {
      return bigWidth * 2 / (bigWidth - smallWidth)
    }

    // console.log('calculator', calc(547, 294));


    this.canvasHtmlWidth = window.innerWidth - this.widthKey * window.innerWidth;

    this.canvasHtmlHeight = this.canvasHtmlWidth * this.heightKey;


    this.positionTopKey = this.canvasHtmlWidth * this.formatTopKey; // if wont to get up then it must be + in first, else get down -
    this.canvasSizeFormatWidth = this.canvasHtmlWidth - 2 * (this.canvasHtmlWidth / this.sizePrintKey + this.canvasHtmlWidth / 40);
    // console.log('width', this.canvasSizeFormatWidth);

    this.canvasSizeFormatTop = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey - this.positionTopKey;
    this.canvasSizeFormatHeight = this.canvasSizeFormatWidth * this.formatWithHeight;
    // console.log('heihgt', this.canvasSizeFormatHeight);

    this.canvasSizeFormatLeft = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey;
    this.canvasCenteredPosition = window.innerWidth / this.positionKey;

    // this.canvasSizeFormatWidth = this.formatWidth = this.canvasHtmlWidth - 2 * (this.canvasHtmlWidth / this._sizePrintKey + this.canvasHtmlWidth / 40);
    // this.canvasSizeFormatHeight = this.formatHeight = this.formatWidth * this.formatWithHeight;

    // this.canvasSizeFormatTop = this.formatTop;
    // this.canvasSizeFormatLeft = this.formatLeft;

    // this.formatTop = this.canvasHtmlWidth / 40 + (this.canvasHtmlWidth / this._sizePrintKey);
    // this.formatLeft = this.canvasHtmlWidth / 40 + (this.canvasHtmlWidth / this._sizePrintKey);
  }

  private initFromServer() {
    // call server function
  }

}


