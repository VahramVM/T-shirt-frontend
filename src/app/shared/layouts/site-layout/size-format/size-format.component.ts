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
  @ViewChild ('canvas', { static: false }) canvas: EditorPicComponent;

  public sizePrintKey: number = this.dataService.sizePrintKey;
  public formatWithHeight: number = this.dataService.formatWithHeight;
  public positionTopKey: number = this.dataService.formatTopKey;


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
  public canv;


  constructor(private dataService: DataService,
    public canvass: EditorPicComponent,
    private siteLayout: SiteLayoutComponent) {
    this.canvasHtmlWidth = this.dataService.canvasHtmlWidth;
    this.canvasHtmlHeight = this.dataService.canvasHtmlHeight;
    this.canvasSizeFormatTop = this.dataService.canvasSizeFormatTop;
    this.canvasCenteredPosition = this.dataService.canvasCenteredPosition;
    this.canvasSizeFormatWidth = this.dataService.canvasSizeFormatWidth;
    this.canvasSizeFormatHeight = this.dataService.canvasSizeFormatHeight;
    this.canvasSizeFormatLeft = this.dataService.canvasSizeFormatLeft;


    this.getUpdatedMessage();

  };


  ngOnInit(): void {

    this.canv =  this.canvass;
    // this.canvas.setHeight(this.canvasHtmlHeight);
    console.log(this.canvass);
    
  }



  private getUpdatedMessage() {

    this.setFormatHeightTop();

    this.dataService.formatA4Horizontal.subscribe(
      res => {
        this.sizePrintKey = res;
        console.log(res);

        this.setFormatHeightTop();
      }
    );

    this.dataService.formatA4Vertical.subscribe(
      res => {
        this.formatWithHeight = res;
        console.log(res);

        this.setFormatHeightTop();
      }
    );

    this.dataService.formatTop.subscribe(
      res => {
        this.positionTopKey = res;
        console.log(res);

        this.setFormatHeightTop();
      }
    );
  }

  public scaleKey: number = 2.3;
  public scaleBlock: boolean = false;
  public formatValue: string;


  public changePosition() {

    // b = false;

    this.siteLayout.moveWithFormat(this.scaleKey, this.scaleBlock);

  }

  public objectWidth = this.dataService.sizePrintKey;
  public objectWidthHeight = this.dataService.formatWithHeight;


  formatA4H() {

    this.counter = 0;

    this.dataService.formatValue = this.formatValue;
    this.scaleBlock = true;
    this.changePosition();
    this.dataService.formatSizeSwich();
    

    this.scaleKey = 1.3;

    // this.obj.objectWidth = this.objectWidth = 4.3;
    // this.obj.topUpDown = 0;

    this.obj.objectWidthHeight = this.objectWidthHeight = 1.414 / 2;

    
  }


  formatA4V() {

    this.counter = 0;

    this.dataService.formatValue = this.formatValue;
    this.scaleBlock = true;
    this.changePosition();
    this.dataService.formatSizeSwich();

    this.scaleKey = 2.3;

    // this.obj.objectWidth = this.objectWidth = 3.295;
    // this.obj.topUpDown = 0.07;

    this.obj.objectWidthHeight = this.objectWidthHeight = 1.414;

    
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

    

    this.dataService.sizePrintKey = this.obj.objectWidth;
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
    console.log(this.canvasSizeFormatWidth);

    this.canvasSizeFormatTop = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey - positionTopKey;
    this.canvasSizeFormatHeight = this.canvasSizeFormatWidth * this.formatWithHeight;
    console.log(this.canvasSizeFormatHeight);

    this.canvasSizeFormatLeft = this.canvasHtmlWidth / 40 + this.canvasHtmlWidth / this.sizePrintKey;
    this.canvasCenteredPosition = window.innerWidth / this.dataService.positionKey;

  }

}
