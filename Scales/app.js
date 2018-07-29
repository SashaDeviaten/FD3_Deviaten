var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scales = /** @class */ (function () {
    function Scales() {
        this.productsArray = []; // products in Scales
    }
    Scales.prototype.add = function (product) {
        this.productsArray.push(product);
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        this.productsArray.forEach(function (el) {
            sumScale += el.getScale();
        });
        return sumScale;
    };
    Scales.prototype.getNameList = function () {
        var nameList = [];
        this.productsArray.forEach(function (el) {
            nameList.push(el.getName());
        });
        return nameList;
    };
    return Scales;
}());
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Product.prototype.getScale = function () {
        return this.scale;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tomato;
}(Product));
var apple1 = new Apple('apple1', 100);
var tomato1 = new Tomato('tomato1', 50);
var myScales = new Scales();
myScales.add(apple1);
myScales.add(tomato1);
console.log('myScales get products:', myScales.getNameList());
console.log('myScales get scale:', myScales.getSumScale());
//# sourceMappingURL=app.js.map