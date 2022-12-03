"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// import {MatTooltipModule} from '@angular/material/tooltip';
// import { CarouselModule } from 'ngx-owl-carousel-o';
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_page_component_1 = require("./login-page/login-page.component");
var auth_layout_component_1 = require("./shared/layouts/auth-layout/auth-layout.component");
var site_layout_component_1 = require("./shared/layouts/site-layout/site-layout.component");
var register_page_component_1 = require("./register-page/register-page.component");
var http_1 = require("@angular/common/http");
var main_page_component_1 = require("./main-page/main-page.component");
var editor_pic_module_1 = require("./editor-pic/editor-pic.module");
var ngx_color_picker_1 = require("ngx-color-picker");
var side_design_component_1 = require("./side-design/side-design.component");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_owl_carousel_o_1 = require("ngx-owl-carousel-o");
var pipes_pipe_1 = require("./shared/pipes.pipe");
var background_directive_1 = require("./shared/background.directive");
var size_format_component_1 = require("./shared/layouts/site-layout/size-format/size-format.component");
var shoping_page_component_1 = require("./shoping-page/shoping-page.component");
// import { EditorPicComponent } from './editor-pic/editor-pic.component';
// import {MatSelectModule} from '@angular/material/select';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  
// import { OverlayModule } from '@angular/cdk/overlay';
// import { SwiperModule } from 'swiper/angular';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_page_component_1.LoginPageComponent,
                auth_layout_component_1.AuthLayoutComponent,
                site_layout_component_1.SiteLayoutComponent,
                register_page_component_1.RegisterPageComponent,
                main_page_component_1.MainPageComponent,
                side_design_component_1.SideDesignComponent,
                pipes_pipe_1.PipesPipe,
                background_directive_1.BackgroundDirective,
                size_format_component_1.SizeFormatComponent,
                shoping_page_component_1.ShopingPageComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                ngx_color_picker_1.ColorPickerModule,
                editor_pic_module_1.EditorPicModule,
                animations_1.BrowserAnimationsModule,
                ngx_owl_carousel_o_1.CarouselModule,
            ],
            providers: [editor_pic_module_1.EditorPicModule],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
