/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        define(["require", "exports", "../release/go.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResizeMultipleTool = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * The ResizeMultipleTool class lets the user resize multiple objects at once.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsJSM/ResizeMultiple.html">Resize Multiple</a> sample.
     * @category Tool Extension
     */
    var ResizeMultipleTool = /** @class */ (function (_super) {
        __extends(ResizeMultipleTool, _super);
        /**
         * Constructs a ResizeMultipleTool and sets the name for the tool.
         */
        function ResizeMultipleTool() {
            var _this = _super.call(this) || this;
            _this.name = 'ResizeMultiple';
            return _this;
        }
        /**
         * Overrides {@link ResizingTool#resize} to resize all selected objects to the same size.
         * @param {Rect} newr the intended new rectangular bounds for each Part's {@link Part#resizeObject}.
         */
        ResizeMultipleTool.prototype.resize = function (newr) {
            var diagram = this.diagram;
            diagram.selection.each(function (part) {
                if (part instanceof go.Link)
                    return; // only Nodes and simple Parts
                var obj = part.resizeObject;
                // calculate new location
                var pos = part.position.copy();
                var angle = obj.getDocumentAngle();
                var sc = obj.getDocumentScale();
                var radAngle = Math.PI * angle / 180;
                var angleCos = Math.cos(radAngle);
                var angleSin = Math.sin(radAngle);
                var deltaWidth = newr.width - obj.naturalBounds.width;
                var deltaHeight = newr.height - obj.naturalBounds.height;
                var angleRight = (angle > 270 || angle < 90) ? 1 : 0;
                var angleBottom = (angle > 0 && angle < 180) ? 1 : 0;
                var angleLeft = (angle > 90 && angle < 270) ? 1 : 0;
                var angleTop = (angle > 180 && angle < 360) ? 1 : 0;
                pos.x += sc * ((newr.x + deltaWidth * angleLeft) * angleCos - (newr.y + deltaHeight * angleBottom) * angleSin);
                pos.y += sc * ((newr.x + deltaWidth * angleTop) * angleSin + (newr.y + deltaHeight * angleLeft) * angleCos);
                obj.desiredSize = newr.size;
                part.move(pos);
            });
        };
        return ResizeMultipleTool;
    }(go.ResizingTool));
    exports.ResizeMultipleTool = ResizeMultipleTool;
});
