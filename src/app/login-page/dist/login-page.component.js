"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginPageComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_service_1 = require("../shared/classes/material.service");
// import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/mate'
var LoginPageComponent = /** @class */ (function () {
    function LoginPageComponent(auth, router, route) {
        this.auth = auth;
        this.router = router;
        this.route = route;
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            email: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.minLength(6)])
        });
        this.route.queryParams.subscribe(function (params) {
            //  this.router.navigate(['/login'], {
            //   queryParams: {
            //     registered: true
            //   }
            // }),
            console.log(params['registered']);
            if (params['registered']) {
                console.log(params);
                material_service_1.Material.mat('Created. Now you can login');
                alert('Created. Now you can login');
            }
            else if (params['accessDenied']) {
                material_service_1.Material.mat('first log in to the system');
                alert('first log in to the system ');
            }
        });
    };
    LoginPageComponent.prototype.ngOnDestroy = function () {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    };
    LoginPageComponent.prototype.onSubmit = function () {
        var _this = this;
        this.form.disable();
        this.aSub = this.auth.login(this.form.value).subscribe(function () { return _this.router.navigate(['/main'], {
            queryParams: {
                registered: true
            }
        }); }, function (error) {
            console.log(error);
            alert(error.error.message);
            material_service_1.Material.mat(error.error.message);
            _this.form.enable();
        });
    };
    LoginPageComponent = __decorate([
        core_1.Component({
            selector: 'app-login-page',
            templateUrl: './login-page.component.html',
            styleUrls: ['./login-page.component.scss']
        })
    ], LoginPageComponent);
    return LoginPageComponent;
}());
exports.LoginPageComponent = LoginPageComponent;
