import { Injectable, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public formatA4Horizontal = new Subject<number>();
  public formatA4Vertical = new Subject<number>();
  public formatTop = new Subject<number>();


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
    console.log(value);

  }

  public get formatWithHeight(): number {
    return this._formatWithHeight;
  }

  private _formatTopKey;

  public set formatTopKey(value: number) {
    this._formatTopKey = value;
    this.formatTop.next(value);
    console.log(value);
  }

  public get formatTopKey(): number {
    return this._formatTopKey;
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

    if (this.sizeValue === 'xs' && this.formatValue) {
      console.log('bbbbbbbbb');

      this.sizePrintKey = 5
      // } else if (this.xs && this.A4) {
      //   this.sizePrintKey = 5
      // } else if (this.xs && this.A3) {
      //   this.sizePrintKey = 5
      // } else if (this.s && this.A5) {
      //   this.sizePrintKey = 5
      // } else if (this.s && this.A4) {
      //   this.sizePrintKey = 5
      // } else if (this.s && this.A3) {
      //   this.sizePrintKey = 5
      // } else if (this.m && this.A5) {
      //   this.sizePrintKey = 5
      // } else if (this.m && this.A4) {
      //   this.sizePrintKey = 5
      // } else if (this.m && this.A3) {
      //   this.sizePrintKey = 5
      // } else if (this.l && this.A5) {
      //   this.sizePrintKey = 5
      // } else if (this.l && this.A4) {
      //   this.sizePrintKey = 5
      // } else if (this.l && this.A3) {
      //   this.sizePrintKey = 5
      // } else if (this.xl && this.A5) {
      //   this.sizePrintKey = 5
      // } else if (this.xl && this.A4) {
      //   this.sizePrintKey = 5
      // } else if (this.xl && this.A3) {
      //   this.sizePrintKey = 5
      // } else if (this.xxl && this.A5) {
      //   this.sizePrintKey = 5
      // } else if (this.xxl && this.A4) {
      //   this.sizePrintKey = 5
      // } else if (this.xxl && this.A3) {
      //   this.sizePrintKey = 5
    }
  }

  // public allLenght = A3Width +  (canvasWidth - 2* sleeveLenght * cos(45)) + chestWidth - A3


  public initCalculations() {


    this.sizePrintKey = 4.3;
    this.formatWithHeight = 1.414;
    this.formatTopKey = 0;


    this.canvasHtmlWidth = window.innerWidth - this.widthKey * window.innerWidth;

    this.canvasHtmlHeight = this.canvasHtmlWidth * this.heightKey;


    this.positionTopKey = this.canvasHtmlWidth * this.formatTopKey; // if wont to get up then it must be + in first, else get down -
    this.canvasSizeFormatWidth = this.canvasHtmlWidth - 2 * (this.canvasHtmlWidth / this.sizePrintKey + this.canvasHtmlWidth / 40);
    this.canvasSizeFormatTop = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey - this.positionTopKey;
    this.canvasSizeFormatHeight = this.canvasSizeFormatWidth * this.formatWithHeight;
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


