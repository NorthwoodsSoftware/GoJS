/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
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
        define(["require", "exports", "../release/go.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DragZoomingTool = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * The DragZoomingTool lets the user zoom into a diagram by stretching a box
     * to indicate the new contents of the diagram's viewport (the area of the
     * model shown by the Diagram).
     * Hold down the Shift key in order to zoom out.
     *
     * The default drag selection box is a magenta rectangle.
     * You can modify the {@link #box} to customize its appearance.
     *
     * The diagram that is zoomed by this tool is specified by the {@link #zoomedDiagram} property.
     * If the value is null, the tool zooms its own {@link Tool#diagram}.
     *
     * You can use this tool in a modal manner by executing:
     * ```js
     *   diagram.currentTool = new DragZoomingTool();
     * ```
     *
     * Use this tool in a mode-less manner by executing:
     * ```js
     *   myDiagram.toolManager.mouseMoveTools.insertAt(2, new DragZoomingTool());
     * ```
     *
     * However when used mode-lessly as a mouse-move tool, in {@link ToolManager#mouseMoveTools},
     * this cannot start running unless there has been a motionless delay
     * after the mouse-down event of at least {@link #delay} milliseconds.
     *
     * This tool does not utilize any {@link Adornment}s or tool handles,
     * but it does temporarily add the {@link #box} part to the diagram.
     * This tool does not modify the model or conduct any transaction.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/DragZooming.html">Drag Zooming</a> sample.
     * @category Tool Extension
     */
    var DragZoomingTool = /** @class */ (function (_super) {
        __extends(DragZoomingTool, _super);
        /**
         * Constructs a DragZoomingTool, sets {@link #box} to a magenta rectangle, and sets name of the tool.
         */
        function DragZoomingTool() {
            var _this = _super.call(this) || this;
            _this._delay = 175;
            _this._zoomedDiagram = null;
            var b = new go.Part();
            var r = new go.Shape();
            b.layerName = 'Tool';
            b.selectable = false;
            r.name = 'SHAPE';
            r.figure = 'Rectangle';
            r.fill = null;
            r.stroke = 'magenta';
            r.position = new go.Point(0, 0);
            b.add(r);
            _this._box = b;
            _this.name = 'DragZooming';
            return _this;
        }
        Object.defineProperty(DragZoomingTool.prototype, "box", {
            /**
             * Gets or sets the {@link Part} used as the "rubber-band zoom box"
             * that is stretched to follow the mouse, as feedback for what area will
             * be passed to {@link #zoomToRect} upon a mouse-up.
             *
             * Initially this is a {@link Part} containing only a simple magenta rectangular {@link Shape}.
             * The object to be resized should be named "SHAPE".
             * Setting this property does not raise any events.
             *
             * Modifying this property while this tool {@link Tool#isActive} might have no effect.
             */
            get: function () { return this._box; },
            set: function (val) { this._box = val; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DragZoomingTool.prototype, "delay", {
            /**
             * Gets or sets the time in milliseconds for which the mouse must be stationary
             * before this tool can be started.
             *
             * The default value is 175 milliseconds.
             * Setting this property does not raise any events.
             */
            get: function () { return this._delay; },
            set: function (val) { this._delay = val; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DragZoomingTool.prototype, "zoomedDiagram", {
            /**
             * Gets or sets the {@link Diagram} whose {@link Diagram#position} and {@link Diagram#scale}
             * should be set to display the drawn {@link #box} rectangular bounds.
             *
             * The default value is null, which causes {@link #zoomToRect} to modify this tool's {@link Tool#diagram}.
             * Setting this property does not raise any events.
             */
            get: function () { return this._zoomedDiagram; },
            set: function (val) { this._zoomedDiagram = val; },
            enumerable: false,
            configurable: true
        });
        /**
         * This tool can run when there has been a mouse-drag, far enough away not to be a click,
         * and there has been delay of at least {@link #delay} milliseconds
         * after the mouse-down before a mouse-move.
         */
        DragZoomingTool.prototype.canStart = function () {
            if (!this.isEnabled)
                return false;
            var diagram = this.diagram;
            var e = diagram.lastInput;
            // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
            if (!e.left)
                return false;
            // don't include the following checks when this tool is running modally
            if (diagram.currentTool !== this) {
                if (!this.isBeyondDragSize())
                    return false;
                // must wait for "delay" milliseconds before that tool can run
                if (e.timestamp - diagram.firstInput.timestamp < this.delay)
                    return false;
            }
            return true;
        };
        /**
         * Capture the mouse and show the {@link #box}.
         */
        DragZoomingTool.prototype.doActivate = function () {
            var diagram = this.diagram;
            this.isActive = true;
            diagram.isMouseCaptured = true;
            diagram.skipsUndoManager = true;
            diagram.add(this.box);
            this.doMouseMove();
        };
        /**
         * Release the mouse and remove any {@link #box}.
         */
        DragZoomingTool.prototype.doDeactivate = function () {
            var diagram = this.diagram;
            diagram.remove(this.box);
            diagram.skipsUndoManager = false;
            diagram.isMouseCaptured = false;
            this.isActive = false;
        };
        /**
         * Update the {@link #box}'s position and size according to the value
         * of {@link #computeBoxBounds}.
         */
        DragZoomingTool.prototype.doMouseMove = function () {
            var diagram = this.diagram;
            if (this.isActive && this.box !== null) {
                var r = this.computeBoxBounds();
                var shape = this.box.findObject('SHAPE');
                if (shape === null)
                    shape = this.box.findMainElement();
                if (shape !== null)
                    shape.desiredSize = r.size;
                this.box.position = r.position;
            }
        };
        /**
         * Call {@link #zoomToRect} with the value of a call to {@link #computeBoxBounds}.
         */
        DragZoomingTool.prototype.doMouseUp = function () {
            if (this.isActive) {
                var diagram = this.diagram;
                diagram.remove(this.box);
                try {
                    diagram.currentCursor = 'wait';
                    this.zoomToRect(this.computeBoxBounds());
                }
                finally {
                    diagram.currentCursor = '';
                }
            }
            this.stopTool();
        };
        /**
         * This just returns a {@link Rect} stretching from the mouse-down point to the current mouse point
         * while maintaining the aspect ratio of the {@link #zoomedDiagram}.
         * @return {Rect} a {@link Rect} in document coordinates.
         */
        DragZoomingTool.prototype.computeBoxBounds = function () {
            var diagram = this.diagram;
            var start = diagram.firstInput.documentPoint;
            var latest = diagram.lastInput.documentPoint;
            var adx = latest.x - start.x;
            var ady = latest.y - start.y;
            var observed = this.zoomedDiagram;
            if (observed === null)
                observed = diagram;
            if (observed === null) {
                return new go.Rect(start, latest);
            }
            var vrect = observed.viewportBounds;
            if (vrect.height === 0 || ady === 0) {
                return new go.Rect(start, latest);
            }
            var vratio = vrect.width / vrect.height;
            var lx;
            var ly;
            if (Math.abs(adx / ady) < vratio) {
                lx = start.x + adx;
                ly = start.y + Math.ceil(Math.abs(adx) / vratio) * (ady < 0 ? -1 : 1);
            }
            else {
                lx = start.x + Math.ceil(Math.abs(ady) * vratio) * (adx < 0 ? -1 : 1);
                ly = start.y + ady;
            }
            return new go.Rect(start, new go.Point(lx, ly));
        };
        /**
         * This method is called to change the {@link #zoomedDiagram}'s viewport to match the given rectangle.
         * @param {Rect} r a rectangular bounds in document coordinates.
         */
        DragZoomingTool.prototype.zoomToRect = function (r) {
            if (r.width < 0.1)
                return;
            var diagram = this.diagram;
            var observed = this.zoomedDiagram;
            if (observed === null)
                observed = diagram;
            if (observed === null)
                return;
            // zoom out when using the Shift modifier
            if (diagram.lastInput.shift) {
                observed.scale = Math.max(observed.scale * r.width / observed.viewportBounds.width, observed.minScale);
                observed.centerRect(r);
            }
            else {
                // do scale first, so the Diagram's position normalization isn't constrained unduly when increasing scale
                observed.scale = Math.min(observed.viewportBounds.width * observed.scale / r.width, observed.maxScale);
                observed.position = new go.Point(r.x, r.y);
            }
        };
        return DragZoomingTool;
    }(go.Tool));
    exports.DragZoomingTool = DragZoomingTool;
});
