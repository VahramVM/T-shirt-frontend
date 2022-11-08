"use strict";
exports.__esModule = true;
exports.Material = void 0;
// export class MaterialService {
//     static toast(message: string) {
//         M.toast({ html: message })
//         // M.toast({html: 'I am a toast!', classes: 'rounded'});
//     }
// }
var Material = /** @class */ (function () {
    function Material() {
    }
    Material.mat = function (sms) {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.tooltip');
            var instances = M.Tooltip.init(elems);
            var instances = M.toast({ html: sms });
        });
        document.querySelector('.tooltip');
    };
    Material.nav = function () {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems, { edge: 'right' });
        });
    };
    Material.zoomImg = function () {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.materialboxed');
            var instances = M.Materialbox.init(elems, 275);
        });
    };
    Material.tab = function () {
        var elems = document.querySelectorAll('.tabs');
        var instance = M.Tabs.init(elems, {
            swipeable: false,
            duration: 300,
            responsiveThreshold: Infinity
        });
    };
    Material.carousel = function () {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.carousel1');
            var instances = M.Carousel.init(elems, {
                duration: 70,
                dist: -10,
                shift: 60,
                padding: 150,
                numVisible: 5,
                fullWidth: false,
                indicators: false,
                noWrap: false,
                onCycleTo: function (ele) {
                    // console.log(ele);
                    console.log((ele).index()); // the slide's index
                },
                interval: 1000 // default - interval: 6000
            });
            return;
        });
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.carousel2');
            var instances = M.Carousel.init(elems, {
                duration: 70,
                dist: -30,
                shift: 30,
                padding: 55,
                numVisible: 5,
                fullWidth: false,
                indicators: false,
                noWrap: false,
                onCycleTo: null,
                interval: 1000 // default - interval: 6000
            });
        });
    };
    // static reload() {
    //   $(window).resize(function(){location.reload();});
    // }
    Material.selectOpt = function () {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems, {
                dropdown: 10
            });
        });
    };
    Material.scrolSpy = function () {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.scrollspy');
            var instances = M.ScrollSpy.init(elems);
        });
    };
    Material.dropDown = function () {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.dropdown-trigger');
            var instances = M.Dropdown.init(elems, {});
        });
    };
    return Material;
}());
exports.Material = Material;
