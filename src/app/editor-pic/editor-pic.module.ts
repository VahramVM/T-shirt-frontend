import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { EditorPicComponent } from './editor-pic.component';


@NgModule({
  declarations: [EditorPicComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ColorPickerModule
  ],
  exports: [EditorPicComponent]
})
export class EditorPicModule { }
