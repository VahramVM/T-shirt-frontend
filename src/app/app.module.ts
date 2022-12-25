import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { EditorPicModule } from './editor-pic/editor-pic.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { SideDesignComponent } from './side-design/side-design.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { PipesPipe } from './shared/pipes.pipe';
import { BackgroundDirective } from './shared/background.directive';
import { SizeFormatComponent } from './shared/layouts/site-layout/size-format/size-format.component';
import { ShopingPageComponent } from './shoping-page/shoping-page.component';
// import { EditorPicComponent } from './editor-pic/editor-pic.component';
// import {MatSelectModule} from '@angular/material/select';


// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  

// import { OverlayModule } from '@angular/cdk/overlay';
// import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    MainPageComponent,
    SideDesignComponent,
    PipesPipe,
    BackgroundDirective,
    SizeFormatComponent,
    ShopingPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ColorPickerModule,
    EditorPicModule,
    BrowserAnimationsModule,
    CarouselModule,


    // SwiperModule

    // OwlModule
    // NgbModule
    // OverlayModule

    // MatTooltipModule
  ],
  providers: [EditorPicModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

