/*
* Copyright (C) 1998-2021 by Northwoods Software Corporation
* All Rights Reserved.
*
* FloorplanPalette Class
* A FloorplanPalette is a Palette with special rules
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
        define(["require", "exports", "../../../release/go"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var go = require("../../../release/go");
    var FloorplanPalette = /** @class */ (function (_super) {
        __extends(FloorplanPalette, _super);
        function FloorplanPalette(div, floorplan /*, nodeDataArray: Array<any>*/) {
            var _this = _super.call(this, div) || this;
            var $ = go.GraphObject.make;
            _this.contentAlignment = go.Spot.Center;
            _this.nodeTemplateMap = floorplan.nodeTemplateMap;
            // palette also contains "floor" nodes -- nodes of particular floor types that can be dragged and dropped into wall-enclosed areas to create Room Nodes
            _this.nodeTemplateMap.add('FloorNode', $(go.Node, 'Auto', $(go.Shape, { fill: makeFloorBrush(null), desiredSize: new go.Size(100, 100) }, new go.Binding('fill', 'floorImage', function (src) {
                return makeFloorBrush(src);
            })), $(go.TextBlock, 'Drag me out to a wall-enclosed space to create a room', { desiredSize: new go.Size(90, NaN) }, new go.Binding('visible', '', function (node) {
                if (node.diagram instanceof go.Palette) {
                    return true;
                }
                return false;
            }).ofObject())));
            _this.toolManager.contextMenuTool.isEnabled = false;
            // add this new FloorplanPalette to the "palettes" field of its associated Floorplan
            floorplan.palettes.push(_this);
            return _this;
        } // end FloorplanPalette constructor
        return FloorplanPalette;
    }(go.Palette));
    exports.FloorplanPalette = FloorplanPalette;
    /**
     * Make a Pattern brush for floor nodes
     * @param src The relative path of the image to use for the pattern brush. If this is not specified, a default path is tried
     */
    function makeFloorBrush(src) {
        var $ = go.GraphObject.make;
        if (src === null || src === undefined) {
            src = 'images/textures/floor1.jpg';
        }
        var floorImage = new Image();
        floorImage.src = src;
        return $(go.Brush, 'Pattern', { pattern: floorImage });
    }
});
// export = FloorplanPalette;
