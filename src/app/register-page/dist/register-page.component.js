"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterPageComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_service_1 = require("../shared/classes/material.service");
var RegisterPageComponent = /** @class */ (function () {
    function RegisterPageComponent(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    RegisterPageComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            email: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.minLength(6)])
        });
    };
    RegisterPageComponent.prototype.ngOnDestroy = function () {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    };
    RegisterPageComponent.prototype.onSubmit = function () {
        var _this = this;
        this.form.disable();
        this.aSub = this.auth.register(this.form.value).subscribe(function () {
            _this.router.navigate(['/login'], {
                queryParams: {
                    registered: true
                }
            });
        }, function (error) {
            console.log(error.error.Message),
                alert(error.error.Message);
            material_service_1.Material.mat(error.error.Message);
            _this.form.enable();
        });
    };
    RegisterPageComponent = __decorate([
        core_1.Component({
            selector: 'app-register-page',
            templateUrl: './register-page.component.html',
            styleUrls: ['./register-page.component.scss']
        })
    ], RegisterPageComponent);
    return RegisterPageComponent;
}());
exports.RegisterPageComponent = RegisterPageComponent;
