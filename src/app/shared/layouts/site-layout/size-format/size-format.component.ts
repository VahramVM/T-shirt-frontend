import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { nextTick } from 'process';
import { EditorPicComponent } from 'src/app/editor-pic/editor-pic.component';
import { DataService } from '../../servises/data.service';
import { SiteLayoutComponent } from '../site-layout.component';

declare const fabric: any;


@Component({
  selector: 'app-size-format',
  templateUrl: './size-format.component.html',
  styleUrls: ['./size-format.component.scss']
})

export class SizeFormatComponent implements OnInit {

  // @Input() name: string;
  // @ViewChild ('canvas', { static: false }) canvas: EditorPicComponent;

  public sizePrintKey: number;
  public formatWithHeight: number;
  public positionTopKey: number;


  public canvasHtmlWidth: number;
  public canvasHtmlHeight: number;
  public canvasCenteredPosition: number;
  public canvasSizeFormatWidth: number;
  public canvasSizeFormatHeight: number;
  public canvasSizeFormatTop: number;
  public canvasSizeFormatLeft: number;

  public selectOpen: boolean = false;
  public counter: number = 0;
  public upDown: boolean = null;
  public canvasSelect: boolean = null;

  public objectWidth: number;
  public objectWidthHeight: number;

  public scaleKey: number = 2.3;
  public scaleBlock: boolean = false;
  public formatValue: string;


  constructor(private dataService: DataService,
    private siteLayout: SiteLayoutComponent) {
    this.canvasHtmlWidth = this.dataService.canvasHtmlWidth;
    this.canvasHtmlHeight = this.dataService.canvasHtmlHeight;
    this.canvasSizeFormatTop = this.dataService.canvasSizeFormatTop;
    this.canvasCenteredPosition = this.dataService.canvasCenteredPosition;
    this.canvasSizeFormatWidth = this.dataService.canvasSizeFormatWidth;
    this.canvasSizeFormatHeight = this.dataService.canvasSizeFormatHeight;
    this.canvasSizeFormatLeft = this.dataService.canvasSizeFormatLeft;

    this.sizePrintKey = this.dataService.sizePrintKey;
    this.formatWithHeight = this.dataService.formatWithHeight;
    this.positionTopKey = this.dataService.formatTopKey;

    this.objectWidth = this.dataService.sizePrintKey;
    this.objectWidthHeight = this.dataService.formatWithHeight;

    this.getUpdatedMessage();

  };


  ngOnInit(): void {

    this.dataService.canvasDivSelect.subscribe(
      res => {
        this.canvasSelect = res;
        // console.log(res);

        this.setFormatHeightTop();
      }
    );
    // this.canvas.setHeight(this.canvasHtmlHeight);
    // this.canv = this.dataService.canvasSelect
  }



  private getUpdatedMessage() {


    this.dataService.formatA4Horizontal.subscribe(
      res => {
        this.sizePrintKey = res;
        // console.log(res);

        this.setFormatHeightTop();
      }
    );

    this.dataService.scaleKeyy.subscribe(
      res => {
        this.scaleKey = res;
        console.log(res);

        this.setFormatHeightTop();
      }
    );

    this.dataService.formatA4Vertical.subscribe(
      res => {
        this.formatWithHeight = res;
        // console.log(res);

        this.setFormatHeightTop();
      }
    );

    this.dataService.formatTop.subscribe(
      res => {
        this.positionTopKey = res;
        // console.log(res);

        this.setFormatHeightTop();
      }
    );

    this.setFormatHeightTop();

  }


  public changePosition() {

    this.siteLayout.moveWithFormat(this.scaleKey, this.scaleBlock);

  }




  formatA4H() {

    this.counter = 0;
    this.dataService.horVert = true;

    this.dataService.formatValue = this.formatValue;
    this.scaleBlock = true;
    this.changePosition();
    this.obj.objectWidthHeight = this.objectWidthHeight = 1.414 / 2;
    this.dataService.formatSizeSwich();
    // this.scaleKey = this.dataService.scaleKey;


    this.obj.objectWidth = this.objectWidth = this.dataService.sizePrintKey;
    // this.obj.topUpDown = 0;


  }


  formatA4V() {

    this.counter = 0;
    this.dataService.horVert = false;
    // this.scaleKey = 2.3;

    this.dataService.formatValue = this.formatValue;
    this.scaleBlock = true;
    this.changePosition();
    this.obj.objectWidthHeight = this.objectWidthHeight = 1.414;
    this.dataService.formatSizeSwich();


    this.obj.objectWidth = this.objectWidth = this.dataService.sizePrintKey;
    // this.obj.topUpDown = 0.07;



  }


  counterNum() {

    if (this.upDown) {
      return this.counter = 0.05
    } else {
      return this.counter = - 0.05
    }

  }

  counterTop() {


    this.obj.objectWidth = this.objectWidth;
    this.obj.objectWidthHeight = this.objectWidthHeight;
    this.obj.topUpDown += this.counterNum();

  }



  public obj = { objectWidth: null, objectWidthHeight: null, topUpDown: null }


  setformatScale() {

    // this.dataService.sizePrintKey = this.obj.objectWidth;
    this.dataService.formatWithHeight = this.obj.objectWidthHeight;
    this.dataService.formatTopKey = this.obj.topUpDown;

  }


  onResizeFormat() {


    this.dataService.initCalculations();
    this.siteLayout.moveWithFormat(this.scaleKey, this.scaleBlock);
    // this.counterTop();

    this.formatA4V();
    this.formatA4H();

    // this.setformatScale();
    // this.getUpdatedMessage();

    // this.counterNum();
    this.canvasHtmlWidth = this.dataService.canvasHtmlWidth;
    this.canvasHtmlHeight = this.dataService.canvasHtmlHeight;
    this.canvasCenteredPosition = this.dataService.canvasCenteredPosition;
    this.canvasSizeFormatWidth = this.dataService.canvasSizeFormatWidth;
    this.canvasSizeFormatHeight = this.dataService.canvasSizeFormatHeight;
    this.canvasSizeFormatTop = this.dataService.canvasSizeFormatTop;
    this.canvasSizeFormatLeft = this.dataService.canvasSizeFormatLeft;

  }


  private setFormatHeightTop(): void {

    // this.dataService.formatTopKey = 0.5;
    let positionTopKey = this.canvasHtmlWidth * this.positionTopKey;

    this.canvasSizeFormatWidth = this.canvasHtmlWidth - 2 * (this.canvasHtmlWidth / this.sizePrintKey + this.canvasHtmlWidth / 40);
    console.log('width', this.canvasSizeFormatWidth);

    this.canvasSizeFormatTop = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey - positionTopKey;
    this.canvasSizeFormatHeight = this.canvasSizeFormatWidth * this.formatWithHeight;
    console.log('height', this.canvasSizeFormatHeight);

    this.canvasSizeFormatLeft = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey;
    this.canvasCenteredPosition = window.innerWidth / this.dataService.positionKey;

  }

}
