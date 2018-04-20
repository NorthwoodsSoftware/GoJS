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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../release/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    *  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
    */
    var go = require("../release/go");
    var ExtendedBrush = /** @class */ (function (_super) {
        __extends(ExtendedBrush, _super);
        function ExtendedBrush(type) {
            var _this = _super.call(this) || this;
            _this._sharedTempCtx = null;
            _this._MIN_Lab_A = -93;
            _this._MAX_Lab_A = 92;
            _this._MIN_Lab_B = -114;
            _this._MAX_Lab_B = 92;
            _this._sRGBtoXYZMatrix = [
                [0.4124564, 0.3575761, 0.1804375],
                [0.2126729, 0.7151522, 0.0721750],
                [0.0193339, 0.1191920, 0.9503041]
            ];
            _this._XYZtosRGBMatrix = [
                [3.2404542, -1.5371385, -0.4985314],
                [-0.9692660, 1.8760108, 0.0415560],
                [0.0556434, -0.2040259, 1.0572252]
            ];
            _this._Lab_EPSILON = 216 / 24389;
            _this._Lab_KAPPA = 24389 / 27;
            if (arguments.length === 0)
                go.Brush.call(_this);
            else
                go.Brush.call(_this, type);
            ExtendedBrush['parse'] =
                ExtendedBrush['stringify'] =
                    _this._UNITS = ["px", "pt", "pc", "in", "cm", "mm"];
            return _this;
        }
        /**
        * This static method can be used to read in a {@link Brush} from a string that was produced by {@link ExtendedBrush.stringify}.
        * @param {string} str
        * @return {Brush}
        */
        ExtendedBrush.prototype.parse = function (str, w, h) {
            if (str.indexOf("linear") !== -1) {
                return this._parseLinearGradientCSS(str, w, h);
            }
            else if (str.indexOf("radial") !== -1) {
                return this._parseRadialGradientCSS(str, w, h);
            }
            else if (go.Brush.isValidColor(str)) {
                var b = new go.Brush(go.Brush.Solid);
                b.color = str;
                return b;
            }
            else { //only works with image urls right now
                //TODO deal with Canvas elements
                var b = new go.Brush(go.Brush.Pattern);
                var image = document.createElement("img");
                image.src = str;
                b.pattern = image;
                return b;
            }
        };
        ;
        /**
        * This static method can be used to write out a {@link Brush} as a string that can be read by {@link Brush.parse}.
        * @param {Brush} val
        * @return {string}
        */
        ExtendedBrush.prototype.stringify = function (val) {
            if (!(val instanceof go.Brush))
                throw new Error("ExtendedBrush.stringify requires a Brush argument, not: " + val);
            var str = "";
            if (val.type === go.Brush.Solid) {
                return val.color;
            }
            else if (val.type === go.Brush.Linear) {
                str = "linear-gradient(";
                var ang = this._angleBetweenSpots(val);
                if (isNaN(ang))
                    ang = 180;
                str += ang + "deg";
                str += this._convertStopsToCSS(val);
                str += ")";
            }
            else if (val.type === go.Brush.Radial) {
                str = "radial-gradient(";
                if (val.endRadius)
                    str += Math.round(val.endRadius) + "px ";
                if (val.ellipseHeight)
                    str += Math.round(val.ellipseHeight) + "px "; //temp until we figure out canvas scaling
                str += "at ";
                str += val.start.x * 100 + "% ";
                str += val.start.y * 100 + "% ";
                str += this._convertStopsToCSS(val);
                str += ")";
            }
            else if (val.type === go.Brush.Pattern) {
                if (val.pattern)
                    str = val.pattern.getAttribute("src");
            }
            return str;
        };
        ExtendedBrush.prototype._convertStopsToCSS = function (brush) {
            var it = brush.colorStops.iterator;
            var str = "";
            while (it.next()) {
                str += ", " + it.value + " " + it.key * 100 + "%";
            }
            return str;
        };
        ;
        ExtendedBrush.prototype._lengthToPX = function (length, unit) {
            var pxPerInch = 96;
            var cmPerInch = 2.54;
            switch (unit) {
                case "px": return length;
                case "pt": return length * 3 / 4;
                case "pc": return length * 9;
                case "in": return length * pxPerInch;
                case "cm": return length * pxPerInch / cmPerInch;
                case "mm": return length * pxPerInch / (cmPerInch * 10);
                default: return NaN;
            }
        };
        ;
        ExtendedBrush.prototype._pxToPercent = function (px, l, w, angle) {
            angle = parseFloat(angle.toString());
            if (angle % 180 === 0)
                return px / l;
            angle *= Math.PI / 180;
            return px / (Math.abs(w * Math.sin(angle)) + Math.abs(l * Math.cos(angle)));
        };
        ExtendedBrush.prototype._parseLinearGradientCSS = function (cssstring, w, h) {
            var css = (cssstring.toString()).match(/\((.*)\)/g);
            if (css === null)
                throw new Error("Invalid CSS Linear Gradient: " + cssstring);
            var cssString = css[0];
            //removes outer parentheses
            cssString = cssString.substring(1, css.length - 1);
            //splits string into components at commas not within parentheses
            //css = css.split(/,+(?![^\(]*\))/g);
            css = cssString.split(/,(?![^\(]*\))/g);
            css[0] = css[0].trim();
            var isValidColor = go.Brush.isValidColor(css[0].split(/\s(?![^\(]*\))/g)[0]);
            if (isValidColor) {
                // if the first param isn't a color, it's a CSS <angle>
                // or a malformed attempt at a color, such as "blavk"
                // if input's good it works for now, TODO improve later.
                css.splice(0, 0, "180deg");
            }
            //standardizes any angle measurement or direction to degrees
            css[0] = this._linearGradientAngleToDegrees(css[0], w, h).toString();
            var angle = parseFloat(css[0]) + 180; //adjusts for css having 180 as the default start point
            //converts color/percent strings to array objects
            var colors = this._createColorStopArray(css);
            /* by now we have the list of color stops, and the computed angle. The color stops need to be bound in a map that the Brush class will like,
            and the angle needs to be computed with the dimensions of the thing that the brush is coloring, in order to supply the brush with it's start
            and end spots. once that stuff is computed, stick them on the Brush 'b', below, and return it.
            */
            var b = new go.Brush(go.Brush.Linear);
            var spots = this._calculateLinearGradientSpots(angle, w, h);
            b.start = spots[0];
            b.end = spots[1];
            for (var i = 0; i < colors.length; i++) {
                b.addColorStop(colors[i].position, colors[i].color);
            }
            return b;
        };
        //parses array of gradient parameters to color stop array. used by both gradient parsers
        ExtendedBrush.prototype._createColorStopArray = function (css) {
            var colors = [];
            for (var i = 1; i < css.length; i++) {
                css[i] = css[i].trim();
                var arr;
                var arrStr = css[i].split(/\s+(?![^\(]*\))/g); //whitespace not within parentheses
                var value;
                var obj = {};
                if (!go.Brush.isValidColor(arrStr[0])) {
                    throw new Error("Invalid CSS Color in Linear Gradient: " + arr[0] + " in " + css);
                }
                if (arr[1] !== undefined) {
                    // we have a measurement
                    var unit = arrStr[1].match(/[^\d.]+/g)[0];
                    if (this._UNITS.indexOf(unit) !== -1) {
                        arr[1] = parseFloat(arrStr[1]); // bites off anything not a number: "90px" -> 90.0 ... "px" is still stored in unit
                        var len = this._lengthToPX(arr[1], unit);
                        obj["position"] = this._pxToPercent(len);
                        //obj["position"] = this._pxToPercent(len, w, h, angle);
                    }
                    else if (unit === "%") {
                        obj["position"] = arr[1] / 100;
                    }
                    else {
                        throw new Error("Invalid Linear Gradient Unit: " + unit + " in " + css);
                    }
                }
                else {
                    obj["position"] = NaN;
                }
                obj["color"] = arr[0];
                colors[i - 1] = obj;
            }
            if (isNaN(colors[0].position))
                colors[0].position = 0;
            if (isNaN(colors[colors.length - 1].position))
                colors[colors.length - 1].position = 1;
            //recursively fills in missing percents in the array
            this._fixLinearGradientPositions(colors);
            return colors;
        };
        ExtendedBrush.prototype._fixLinearGradientPositions = function (arr, start, end) {
            if (start === undefined)
                start = 0;
            if (end === undefined)
                end = arr.length;
            while (start < end - 1 && !isNaN(arr[start + 1].position))
                start++;
            if (start === end - 1)
                return;
            var tempEnd = start + 1;
            while (tempEnd < end && isNaN(arr[tempEnd].position))
                tempEnd++;
            var step = (arr[tempEnd].position - arr[start].position) / (tempEnd - start);
            for (var i = 1; i < tempEnd - start; i++) {
                arr[i + start].position = Math.round((arr[start].position + i * step) * 1000) / 1000;
            }
            if (tempEnd < end - 1) {
                this._fixLinearGradientPositions(arr, tempEnd, end);
            }
        };
        ;
        ExtendedBrush.prototype._calculateLinearGradientSpots = function (angle, w, h) {
            angle = parseFloat(angle.toString());
            angle = (angle % 360 + 360) % 360;
            if (angle === 90)
                return [new go.Spot(0, 0, w, h / 2), new go.Spot(0, 0, 0, h / 2)];
            if (angle === 270)
                return [new go.Spot(0, 0, 0, h / 2), new go.Spot(0, 0, w, h / 2)];
            var tempAngle = -Math.abs((angle % 180) - 90) + 90;
            90;
            var tan = Math.tan(tempAngle * Math.PI / 180);
            var x = (h * tan - w) * 0.5 / (tan * tan + 1);
            var y = x * tan;
            if (angle >= 90 && angle <= 270)
                y = h - y;
            if (angle < 180)
                x = w + x;
            else
                x = -x;
            return ([new go.Spot(0, 0, x, y), new go.Spot(0, 0, w - x, h - y)]);
        };
        ;
        ExtendedBrush.prototype._applyLinearGradientSpots = function (angle, w, h, brush) {
            var spots = this._calculateLinearGradientSpots(angle, w, h);
            brush.start = spots[0];
            brush.end = spots[1];
            return brush;
        };
        ExtendedBrush.prototype._linearGradientAngleToDegrees = function (string, w, h) {
            //true if there is a "to " at the start of the first parameter,
            //indicating that a direction was specified rather than angle
            var isNumericalInput = string.indexOf("to ") < 0;
            //0s without units still accepted
            var digit_arr = string.match(/\d/g);
            var zero_arr = string.match(/0/g);
            if (zero_arr !== null && (digit_arr.length === zero_arr.length))
                return 0;
            if (isNumericalInput) {
                var stringArr = string.match(/[^a-z]+|\D+/g);
                switch (string[1]) {
                    case ("deg"): return parseFloat(stringArr[0]);
                    case ("rad"): return parseFloat(stringArr[0]) * 180 / Math.PI;
                    case ("turn"): return parseFloat(stringArr[0]) * 360;
                    case ("grad"): return parseFloat(stringArr[0]) * 9 / 10;
                    default: throw new Error("Invalid CSS Linear Gradient direction: " + string[1]);
                }
            }
            else {
                var direction = 0;
                if (string.indexOf("right") >= 0)
                    direction = 90;
                else if (string.indexOf("left") >= 0)
                    direction = -90;
                var sign = direction === 0 ? 0 : direction > 0 ? 1 : -1; //needed because Chrome/IE/Safari/Opera/Mosaic/Netscape don't support Math.sign()
                if (string.indexOf("top") >= 0) {
                    direction -= sign * Math.atan(w / h) * 180 / Math.PI;
                }
                else if (string.indexOf("bottom") >= 0) {
                    if (direction === 0)
                        direction = 180;
                    else
                        direction += sign * Math.atan(w / h) * 180 / Math.PI;
                }
                if (direction === 0 && string.indexOf("top") < 0) {
                    throw new Error("Invalid CSS Linear Gradient direction: " + string);
                }
                return Math.round(direction);
            }
        };
        ;
        ExtendedBrush.prototype._angleBetweenSpots = function (brush) {
            var start = brush.start;
            var end = brush.end;
            if (isNaN(start.x + start.y + end.x + end.y))
                throw new Error("The brush does not have valid spots");
            var x = end.offsetX - start.offsetX;
            var y = start.offsetY - end.offsetY;
            var angle = Math.atan((start.offsetX - end.offsetX) / (end.offsetY - start.offsetY)) * 180 / Math.PI;
            if (start.offsetY > end.offsetY)
                angle += 180;
            return (angle + 360) % 360;
        };
        ExtendedBrush.prototype._parseRadialGradientCSS = function (css, w, h) {
            //removes browser specific tags
            var cssArr = css.match(/\((.*)\)/g);
            if (cssArr === null) {
                throw new Error("Invalid CSS Linear Gradient");
            }
            css = cssArr[0];
            css = css.substring(1, css.length - 1);
            //splits string into components at commas not within parenthesesd and removes whitespace
            cssArr = css.split(/,(?![^\(]*\))/g);
            cssArr[0] = cssArr[0].trim();
            var isValidColor = go.Brush.isValidColor(css[0].split(" ")[0]);
            //default shape paramenters
            var radii = [w / 2, h / 2]; //stores two radii
            var center = new go.Spot(0.5, 0.5, 0, 0); //stores the center of the gradient
            //goes through all cases to set radii and center
            if (!isValidColor) { //parses only if there were intial parameters specified
                //could be only a partial shape/position specification
                var shapeArr = css[0]; //first specified parameter of gradient
                var shape = shapeArr.split("at");
                if (shape.length === 1) {
                    center = new go.Spot(0.5, 0.5, 0, 0); //no center was specified, so it must be "at center";
                }
                else if (shape.length === 2) { //assigns something to center. one must have been specified if length===2
                    center = this._parseCenter(shape[1], w, h);
                }
                else {
                    throw new Error("invalid css radial gradient string");
                }
                //uses center to calculate radii
                radii = this._parseShapeDescription(shape[0], w, h, center);
            }
            var colors = this._createColorStopArray(cssArr);
            //  console.log("RADIAL: ", "\nCENTER: ", center, "\nRADII: ", radii, "\nCOLORS: ", colors);
            //  assigns stops, center, and radii to a brush
            var b = new go.Brush(go.Brush.Radial);
            b.start = center; //concentric in CSS, so start and end are the same
            b.end = center;
            b.startRadius = 0; //css starts at 0 automatically
            b.endRadius = radii[0]; //end radius is the width of the ending shape
            //TEMP until we implement scaling the gradient in canvas
            b.ellipseHeight = radii[1];
            for (var i = 0; i < colors.length; i++) {
                b.addColorStop(colors[i].position, colors[i].color);
            }
            return b;
        };
        //parses a position string to determine where the radial gradient is centered
        ExtendedBrush.prototype._parseCenter = function (str, w, h) {
            var arr = []; //stores the x and y coodinates
            str = str.trim();
            var parts = str.split(/\s+/g);
            if (parts.length === 1) {
                arr = this._englishPositionToCoordinate(parts[0]);
            }
            else if (parts.length === 2) {
                var digits = str.match(/\d+/g);
                //if specified only with english, no percents/pixels, compute center
                if (digits === null) {
                    arr = this._englishPositionToCoordinate(str);
                }
                else if (digits.length === 1) { //know one of the params are numbers
                    //if the first param is a string, second is a number
                    var num;
                    var pos;
                    if (parts[0].match(/\d+/g) === null) {
                        pos = parts[0];
                        num = parts[1];
                    }
                    else { //if second param is string and first is number
                        pos = parts[1];
                        num = parts[0];
                    }
                    num = this._parseLengthToPercent(num);
                    //correctly assigns the width coordinate
                    arr = this._englishPositionToCoordinate(pos);
                    //overwrites height to the user specified value
                    arr[1] = num;
                }
                else if (digits.length === 2) { //both the params are numbers
                    arr[0] = this._parseLengthToPercent(parts[0], w);
                    arr[1] = this._parseLengthToPercent(parts[1], h);
                }
            }
            else if (parts.length === 3) {
                //TODO must be two positions and a number
                //correct behavior here is not known, only works in IE. need to check css spec
            }
            else if (parts.length === 4) {
                switch (parts[0]) {
                    case ("right"):
                        arr[0] = 1 - this._parseLengthToPercent(arr[1].toString(), w);
                        break;
                    case ("left"):
                        arr[0] = this._parseLengthToPercent(arr[1].toString(), w);
                        break;
                    default:
                        throw new Error("invalid location keyword: " + parts[0]);
                }
                switch (parts[2]) {
                    case ("top"):
                        arr[0] = this._parseLengthToPercent(arr[3].toString(), h);
                    case ("bottom"):
                        arr[0] = 1 - this._parseLengthToPercent(arr[3].toString(), h);
                    default:
                        throw new Error("invalid location keyword: " + parts[2]);
                }
            }
            else {
                throw new Error("invalid CSS position description");
            }
            return new go.Spot(arr[0], arr[1], 0, 0);
        };
        ExtendedBrush.prototype._parseLengthToPercent = function (str, dimension) {
            if (str.indexOf("%") < 0) { //if specified by a length unit
                return this._parseLengthToPX(str) / (dimension);
            }
            else { //if specified by percentage
                return parseFloat(str) / 100;
            }
        };
        ExtendedBrush.prototype._parseLengthToPX = function (str, dimension) {
            var len = parseFloat(str.match(/\d+/g)[0]);
            var unit = str.match(/\D+/g)[0];
            return this._lengthToPX(len, unit);
        };
        ExtendedBrush.prototype._englishPositionToCoordinate = function (str) {
            var x = .5;
            var y = .5;
            if (str.indexOf("bottom") > -1)
                y = 1;
            else if (str.indexOf("top") > -1)
                y = 0;
            if (str.indexOf("left") > -1)
                x = 0;
            else if (str.indexOf("right") > -1)
                x = 1;
            return [x, y];
        };
        //needs to return something at some point
        ExtendedBrush.prototype._parseShapeDescription = function (str, w, h, center) {
            var x = center.x;
            var y = center.y;
            str = str.trim();
            var split = str.split(" ");
            if (split === null)
                return [w / 2, h / 2];
            if (split.length === 1) {
                //distance from center to farthest side horizontally and vertically
                var a = Math.abs(w / 2 - x * w) + w / 2;
                var b = Math.abs(h / 2 - y * h) + h / 2;
                if (str.indexOf("ellipse") > -1) {
                    return [a * Math.sqrt(2), b * Math.sqrt(2)];
                }
                else if (str.indexOf("circle") > -1) {
                    var r = Math.sqrt(a * a + b * b);
                    return [r, r];
                }
                else {
                    //must not contain explicit shape paramenters, only an extent, so parse that
                    return this._parseExtentKeyword(str, w, h, center);
                }
            }
            else if (split.length === 2) {
                var digits = str.match(/\d+/g);
                if (digits === null) {
                    //must be shape and extent
                    return this._parseExtentKeyword(str, w, h, center);
                }
                else if (digits.length === 1) {
                    //only valid description would be "circle" and a radius specified as a length, NOT a percentage
                    if (split[0].indexOf("circle") > -1 && split[1].indexOf("%") < 0) {
                        var r = this._parseLengthToPX(split[1]);
                        return [r, r];
                    }
                    else
                        throw new Error("Invalid CSS shape description");
                }
                else if (digits.length === 2) { //must both be ellipse radii
                    return [this._parseLengthToPX(split[0]),
                        this._parseLengthToPX(split[1])];
                }
                else {
                    throw new Error("Invalid CSS shape description");
                }
            }
            else if (split.length === 3) {
                if (split[0] !== "ellipse")
                    throw new Error("invalid CSS shape description");
                return [this._parseLengthToPercent(split[1], w) * w,
                    this._parseLengthToPercent(split[2], h) * h];
            }
            else {
                throw new Error("invalid CSS shape description");
            }
        };
        ExtendedBrush.prototype._parseExtentKeyword = function (str, w, h, center) {
            if (!str)
                return [w / 2, h / 2];
            var x = center.x;
            var y = center.y;
            //distance from center to farthest side horizontally and vertically
            var a = Math.abs(w / 2 - x * w) + w / 2;
            var b = Math.abs(h / 2 - y * h) + h / 2;
            var split = str.split(" ");
            var extent; //stores the extent keyword
            var arr; //stores the radii to be returned
            if (split === null)
                throw new Error("invalid extent keyword");
            else
                extent = split[split.length - 1];
            //either a circle or an ellipse, nothing specified defaults to ellipse
            if (str.indexOf("circle") > -1) {
                switch (extent) {
                    case ("closest-corner"):
                        var r = Math.sqrt((w - a) * (w - a) + (h - b) * (h - b));
                        break;
                    case ("farthest-corner"):
                        var r = Math.sqrt(a * a + b * b);
                        break;
                    case ("closest-side"):
                        var r = Math.min(w - a, h - b);
                        break;
                    case ("farthest-side"):
                        var r = Math.max(a, b);
                        break;
                    default:
                        throw new Error("invalid extent keyword: " + extent);
                }
                return [r, r];
            }
            else { //must be an ellipse
                switch (extent) {
                    case ("closest-corner"):
                        return [(w - a) * Math.sqrt(2), (h - b) * Math.sqrt(2)];
                    case ("farthest-corner"):
                        return [a * Math.sqrt(2), b * Math.sqrt(2)];
                    case ("closest-side"):
                        return [w - a, h - b];
                    case ("farthest-side"):
                        return [a, b];
                    default:
                        throw new Error("invalid extent keyword: " + extent);
                }
            }
        };
        ExtendedBrush.prototype._makePaletteFromOneColor = function (color, number) {
            var colorArr = this._RGB_to_Lab(this.CSSStringToRGB(color));
            var arr = [];
            var inc = 100 / (number + 2);
            var numBelow = Math.floor(colorArr[0] / inc) - 1;
            for (var i = 1; i <= number; i++) {
                arr[i - 1] = go.Brush.lightenBy(color, inc * (i - numBelow) / 100);
            }
            return arr;
        };
        ;
        ExtendedBrush.prototype._makePaletteFromTwoColors = function (color1, color2, number) {
            var color1Arr = this._RGB_to_Lab(this.CSSStringToRGB(color1));
            var color2Arr = this._RGB_to_Lab(this.CSSStringToRGB(color2));
            var arr = [];
            var deltaA = this._MAX_Lab_A - this._MIN_Lab_A;
            var deltaB = this._MAX_Lab_B - this._MIN_Lab_B;
            var btm = number - 1;
            var diffA = (color1Arr[1] - color2Arr[1]) / btm;
            var diffB = (color1Arr[2] - color2Arr[2]) / btm;
            var diffL = (color1Arr[0] - color2Arr[0]) / btm;
            for (var i = 0; i < number; i++) {
                var rgb = this._Lab_to_RGB([color2Arr[0] + i * diffL, color2Arr[1] + i * diffA, color2Arr[2] + i * diffB]);
                var css = this._RGBArrayToCSS(rgb);
                arr[i] = css;
            }
            return arr;
        };
        /**
         * Creates an array of valid equidistant colors.
         * @name ExtendedBrush#makeColorPalette
         * @param {string} color1 a valid color to be used as the basis for the color palette
         * @param {string=} color2 an additional color that will be used in conjunction with color1
         * @param {number=} number the amount of colors to be generated, the default is 3
         * @return {Array}
         */
        /** @type {Array} */
        ExtendedBrush.prototype.makeColorPalette = function (color1, color2, number) {
            // make sure we have 1-3 parameters
            if (arguments.length < 1) {
                throw new Error('Please provide at least one color, and at most two color and a number');
            }
            else if (arguments.length > 3) {
                throw new Error('Please provide no more than two colors, and an optional number argument');
            }
            // we have 1-3 parameters, proceed
            // if no palette length is provided we give them a palette of length 3
            var defaultPaletteLength = 3;
            // make sure that the first parameter is a string
            if (typeof color1 !== "string")
                throw new Error(color1 + " is not a string");
            /* check to see if the last parameter is undefined.
                 This is used later to see if the second parameter should be handled as a color string
                 or as a number for the length of the palette
            */
            var numundefined = number === undefined;
            /*
            This helper function will throw an error if the number passed into it is not real, and if it's not at least 1
            */
            var checkForNumberError = function (number) {
                if (typeof number !== "number" || isNaN(number) || number === Infinity || number < 1)
                    throw new Error('Please provide a number greater than or equal to one, not: ' + number);
            };
            if (arguments.length === 1) {
                // we only have a legal color string, so return a palette with the defaultPaletteLength
                return this._makePaletteFromOneColor(color1, defaultPaletteLength);
            }
            // by now we have a color, and any something else, be it another color, a number, or both
            if (typeof color2 === "string") {
                if (numundefined) {
                    // we only have 2 colors, so make a palette of them with the defaultPaletteLenght
                    return this._makePaletteFromTwoColors(color1, color2, defaultPaletteLength);
                }
                else {
                    checkForNumberError(number);
                    // we have two strings and a valid number, make a palette with those
                    return this._makePaletteFromTwoColors(color1, color2, number);
                }
            }
            else {
                if (typeof color2 === "number") {
                    if (numundefined) {
                        number = color2;
                        checkForNumberError(number);
                        // make a palette with one color and the specified length
                        if (number === 1) {
                            color1 = this.CSSStringToRGB(color1);
                            color1.splice(3, 1);
                            var x = [this._RGBArrayToCSS(color1)];
                            return x;
                        }
                        return this._makePaletteFromOneColor(color1, number);
                    }
                    else {
                        throw new Error("Please provide only only one number");
                    }
                }
                else {
                    throw new Error('Please provide either a color string or a number');
                }
            }
        };
        ExtendedBrush.prototype.CSSStringToRGB = function (CSSColorString) {
            if (!go.Brush.isValidColor(CSSColorString))
                throw new Error("Invalid CSS Color String: " + CSSColorString);
            var canvas = this._sharedTempCtx;
            if (canvas === null)
                canvas = this._sharedTempCtx = document.createElement('canvas').getContext('2d');
            canvas.clearRect(0, 0, 1, 1);
            canvas.fillStyle = CSSColorString;
            canvas.fillRect(0, 0, 1, 1);
            var data = canvas.getImageData(0, 0, 1, 1).data;
            var arr = [];
            for (var i = 0; i < data.length; i++)
                arr.push(data[i]);
            return arr;
        };
        ;
        ExtendedBrush.prototype._RGBArrayToCSS = function (RGB_Array) {
            if (RGB_Array.length === 3)
                var str = "rgb(";
            else if (RGB_Array.length === 4)
                var str = "rgba(";
            else
                throw new Error("invalid RGB or RGBa array: " + RGB_Array);
            for (var i = 0; i < RGB_Array.length; i++) {
                str += RGB_Array[i] + (i !== RGB_Array.length - 1 ? ", " : "");
            }
            return str + ")";
        };
        ;
        ExtendedBrush.prototype._RGB_to_Lab = function (rgb) {
            return this._XYZtoLab((this._RGBtoXYZ(rgb)));
        };
        ;
        ExtendedBrush.prototype._Lab_to_RGB = function (Lab) {
            return this._XYZtoRGB(this._LabtoXYZ(Lab));
        };
        ;
        ExtendedBrush.prototype._rowMultiplication = function (row, colorArray) {
            var sum = 0;
            for (var i = 0; i < colorArray.length; i++) {
                sum += row[i] * parseFloat(colorArray[i]);
            }
            return sum;
        };
        ;
        ExtendedBrush.prototype._RGB_XYZ_Inverse_Companding = function (RGB_value) {
            RGB_value /= 255;
            if (RGB_value <= .04045) {
                return RGB_value / 12.92;
            }
            return Math.pow(((RGB_value + .055) / 1.055), 2.4);
        };
        ;
        ExtendedBrush.prototype._XYZ_RGB_Companding = function (XYZ_value) {
            if (XYZ_value * 12.92 <= .04045)
                return XYZ_value * 12.92;
            return 1.055 * Math.pow(XYZ_value, .416667) - .055;
        };
        ;
        ExtendedBrush.prototype._RGBtoXYZ = function (rgb) {
            rgb.splice(3, 1); // remove alpha value the Canvas gives us
            var applied = [];
            var i;
            for (i = 0; i < rgb.length; i++)
                rgb[i] = this._RGB_XYZ_Inverse_Companding(parseFloat(rgb[i])).toString();
            for (i = 0; i < rgb.length; i++)
                applied[i] = this._rowMultiplication(this._sRGBtoXYZMatrix[i], rgb).toString();
            return applied;
        };
        ;
        ExtendedBrush.prototype._XYZtoRGB = function (xyz) {
            var applied = [];
            var i;
            for (i = 0; i < xyz.length; i++)
                applied[i] = this._rowMultiplication(this._XYZtosRGBMatrix[i], xyz);
            for (i = 0; i < xyz.length; i++) {
                applied[i] = this._XYZ_RGB_Companding(applied[i]) * 255;
                if (applied[i] < 0)
                    applied[i] = 0;
                applied[i] *= 100;
                applied[i] = Math.round(applied[i]);
                applied[i] /= 100;
                applied[i] = Math.floor(applied[i]);
                if (applied[i] > 255)
                    applied[i] = 255;
                if (applied[i] < 0)
                    applied[i] = 0;
            }
            return applied;
        };
        ;
        ExtendedBrush.prototype._XYZ_Lab_HelperFunction = function (inputXYZ) {
            if (inputXYZ > this._Lab_EPSILON) {
                return Math.pow(inputXYZ, 1 / 3);
            }
            return (this._Lab_KAPPA * inputXYZ + 16) / 116;
        };
        ;
        ExtendedBrush.prototype._XYZtoLab = function (xyz) {
            var Lab = [];
            var y = this._XYZ_Lab_HelperFunction(parseFloat(xyz[1]));
            Lab[0] = 116 * y - 16;
            Lab[1] = 500 * (this._XYZ_Lab_HelperFunction(parseFloat(xyz[0])) - y);
            Lab[2] = 200 * (y - this._XYZ_Lab_HelperFunction(parseFloat(xyz[2])));
            return Lab;
        };
        ;
        ExtendedBrush.prototype._Lab_XYZ_HelperFunction = function (inputLab) {
            var inputCbd = inputLab * inputLab * inputLab;
            if (inputCbd > this._Lab_EPSILON)
                return inputCbd;
            return (116 * inputLab - 16) / this._Lab_KAPPA;
        };
        ;
        ExtendedBrush.prototype._LabtoXYZ = function (Lab) {
            var working_arr = [];
            working_arr[1] = (Lab[0] + 16) / 116;
            working_arr[0] = (Lab[1] / 500) + working_arr[1];
            working_arr[2] = (-Lab[2] / 200) + working_arr[1];
            var XYZ = [];
            XYZ[1] = this._Lab_XYZ_HelperFunction(working_arr[1]).toString();
            XYZ[0] = this._Lab_XYZ_HelperFunction(working_arr[0]).toString();
            XYZ[2] = this._Lab_XYZ_HelperFunction(working_arr[2]).toString();
            return XYZ;
        };
        ;
        return ExtendedBrush;
    }(go.Brush));
    exports.ExtendedBrush = ExtendedBrush;
});
