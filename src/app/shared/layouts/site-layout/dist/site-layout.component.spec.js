"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var site_layout_component_1 = require("./site-layout.component");
describe('SiteLayoutComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [site_layout_component_1.SiteLayoutComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(site_layout_component_1.SiteLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
