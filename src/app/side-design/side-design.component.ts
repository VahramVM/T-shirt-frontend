import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { EditorPicComponent } from '../editor-pic/editor-pic.component';

@Component({
  selector: 'app-side-design',
  templateUrl: './side-design.component.html',
  styleUrls: ['./side-design.component.css']
})
export class SideDesignComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'EditorPic';

  isOpen = false;
  selectColor = '';

  colors = [
    { hex: '#cba6a6', name: 'pink' },
    { hex: '#b4a24b', name: 'pino' },
    { hex: '#28e139', name: 'pink' },
    { hex: '#5a7cc6', name: 'pink' },
    { hex: '#cba6a6', name: 'pink' },
    { hex: '#e1a24b', name: 'pino' },
    { hex: '#11e139', name: 'pink' },
    { hex: '#4b2cc6', name: 'pink' }

  ]

  @ViewChild('canvas', { static: false }) canvas: EditorPicComponent;
  
  ngAfterViewInit(): void {
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
  1
  public confirmClear() {
    this.canvas.confirmClear();
  }

  public changeSize() {
    // this.canvas.changeSize();
  }

  public addText() {
    this.canvas.addText();
  }

  public getImgPolaroid(event) {
    this.canvas.getImgPolaroid(event);
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
    // this.canvas.setCanvasImage();
  }

  public setId() {
    this.canvas.setId();
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
    // this.canvas.setLineHeight();
  }

  public setCharSpacing() {
    this.canvas.setCharSpacing();
  }

  public rasterizeJSON() {
    this.canvas.rasterizeJSON();
  }

}
