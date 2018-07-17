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
    /**
    * @constructor
    * @extends ResizingTool
    * @class
    * A custom tool for resizing multiple objects at once.
    */
    var ResizeMultipleTool = /** @class */ (function (_super) {
        __extends(ResizeMultipleTool, _super);
        function ResizeMultipleTool() {
            var _this = _super.call(this) || this;
            _this.name = "ResizeMultiple";
            return _this;
        }
        /**
        * Overrides ResizingTool.resize to resize all selected objects to the same size.
        * @this {ResizeMultipleTool}
        * @param {Rect} newr the intended new rectangular bounds for each Part's {@link Part#resizeObject}.
        */
        ResizeMultipleTool.prototype.resize = function (newr) {
            var diagram = this.diagram;
            if (diagram === null)
                return;
            diagram.selection.each(function (part) {
                if (part instanceof go.Link || part instanceof go.Group)
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
                part.position = pos;
            });
        };
        return ResizeMultipleTool;
    }(go.ResizingTool));
    exports.ResizeMultipleTool = ResizeMultipleTool;
});
