/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
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
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * The DragCreatingTool lets the user create a new node by dragging in the background
     * to indicate its size and position.
     *
     * The default drag selection box is a magenta rectangle.
     * You can modify the {@link #box} to customize its appearance.
     *
     * This tool will not be able to start running unless you have set the
     * {@link #archetypeNodeData} property to an object that can be copied and added to the diagram's model.
     *
     * You can use this tool in a modal manner by executing:
     * ```js
     *   diagram.currentTool = new DragCreatingTool();
     * ```
     *
     * Use this tool in a mode-less manner by executing:
     * ```js
     *   myDiagram.toolManager.mouseMoveTools.insertAt(2, new DragCreatingTool());
     * ```
     *
     * However when used mode-lessly as a mouse-move tool, in {@link ToolManager#mouseMoveTools},
     * this cannot start running unless there has been a motionless delay
     * after the mouse-down event of at least {@link #delay} milliseconds.
     *
     * This tool does not utilize any {@link Adornment}s or tool handles,
     * but it does temporarily add the {@link #box} Part to the diagram.
     * This tool does conduct a transaction when inserting the new node.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/DragCreating.html">Drag Creating</a> sample.
     * @category Tool Extension
     */
    var DragCreatingTool = /** @class */ (function (_super) {
        __extends(DragCreatingTool, _super);
        /**
         * Constructs a DragCreatingTool, sets {@link #box} to a magenta rectangle, and sets name of the tool.
         */
        function DragCreatingTool() {
            var _this = _super.call(this) || this;
            _this._archetypeNodeData = null;
            _this._delay = 175;
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
            _this.name = 'DragCreating';
            return _this;
        }
        Object.defineProperty(DragCreatingTool.prototype, "box", {
            /**
             * Gets or sets the {@link Part} used as the "rubber-band box"
             * that is stretched to follow the mouse, as feedback for what area will
             * be passed to {@link #insertPart} upon a mouse-up.
             *
             * Initially this is a {@link Part} containing only a simple magenta rectangular {@link Shape}.
             * The object to be resized should be named "SHAPE".
             * Setting this property does not raise any events.
             *
             * Modifying this property while this tool {@link Tool#isActive} might have no effect.
             */
            get: function () { return this._box; },
            set: function (val) { this._box = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragCreatingTool.prototype, "delay", {
            /**
             * Gets or sets the time in milliseconds for which the mouse must be stationary
             * before this tool can be started.
             *
             * The default value is 175 milliseconds.
             * A value of zero will allow this tool to run without any wait after the mouse down.
             * Setting this property does not raise any events.
             */
            get: function () { return this._delay; },
            set: function (val) { this._delay = val; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragCreatingTool.prototype, "archetypeNodeData", {
            /**
             * Gets or sets a data object that will be copied and added to the diagram's model each time this tool executes.
             *
             * The default value is null.
             * The value must be non-null for this tool to be able to run.
             * Setting this property does not raise any events.
             */
            get: function () { return this._archetypeNodeData; },
            set: function (val) { this._archetypeNodeData = val; },
            enumerable: true,
            configurable: true
        });
        /**
         * This tool can run when there has been a mouse-drag, far enough away not to be a click,
         * and there has been delay of at least {@link #delay} milliseconds
         * after the mouse-down before a mouse-move.
         */
        DragCreatingTool.prototype.canStart = function () {
            if (!this.isEnabled)
                return false;
            // gotta have some node data that can be copied
            if (this.archetypeNodeData === null)
                return false;
            var diagram = this.diagram;
            // heed IsReadOnly & AllowInsert
            if (diagram.isReadOnly || diagram.isModelReadOnly)
                return false;
            if (!diagram.allowInsert)
                return false;
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
        DragCreatingTool.prototype.doActivate = function () {
            var diagram = this.diagram;
            this.isActive = true;
            diagram.isMouseCaptured = true;
            diagram.add(this.box);
            this.doMouseMove();
        };
        /**
         * Release the mouse and remove any {@link #box}.
         */
        DragCreatingTool.prototype.doDeactivate = function () {
            var diagram = this.diagram;
            diagram.remove(this.box);
            diagram.isMouseCaptured = false;
            this.isActive = false;
        };
        /**
         * Update the {@link #box}'s position and size according to the value
         * of {@link #computeBoxBounds}.
         */
        DragCreatingTool.prototype.doMouseMove = function () {
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
         * Call {@link #insertPart} with the value of a call to {@link #computeBoxBounds}.
         */
        DragCreatingTool.prototype.doMouseUp = function () {
            if (this.isActive) {
                var diagram = this.diagram;
                diagram.remove(this.box);
                try {
                    diagram.currentCursor = 'wait';
                    this.insertPart(this.computeBoxBounds());
                }
                finally {
                    diagram.currentCursor = '';
                }
            }
            this.stopTool();
        };
        /**
         * This just returns a {@link Rect} stretching from the mouse-down point to the current mouse point.
         * @return {Rect} a {@link Rect} in document coordinates.
         */
        DragCreatingTool.prototype.computeBoxBounds = function () {
            var diagram = this.diagram;
            var start = diagram.firstInput.documentPoint;
            var latest = diagram.lastInput.documentPoint;
            return new go.Rect(start, latest);
        };
        /**
         * Create a node by adding a copy of the {@link #archetypeNodeData} object
         * to the diagram's model, assign its {@link GraphObject#position} and {@link GraphObject#desiredSize}
         * according to the given bounds, and select the new part.
         *
         * The actual part that is added to the diagram may be a {@link Part}, a {@link Node},
         * or even a {@link Group}, depending on the properties of the {@link #archetypeNodeData}
         * and the type of the template that is copied to create the part.
         * @param {Rect} bounds a Point in document coordinates.
         * @return {Part} the newly created Part, or null if it failed.
         */
        DragCreatingTool.prototype.insertPart = function (bounds) {
            var diagram = this.diagram;
            var arch = this.archetypeNodeData;
            if (arch === null)
                return null;
            diagram.raiseDiagramEvent('ChangingSelection', diagram.selection);
            this.startTransaction(this.name);
            var part = null;
            if (arch !== null) {
                var data = diagram.model.copyNodeData(arch);
                if (data) {
                    diagram.model.addNodeData(data);
                    part = diagram.findPartForData(data);
                }
            }
            if (part !== null) {
                part.position = bounds.position;
                part.resizeObject.desiredSize = bounds.size;
                if (diagram.allowSelect) {
                    diagram.clearSelection();
                    part.isSelected = true;
                }
            }
            // set the TransactionResult before raising event, in case it changes the result or cancels the tool
            this.transactionResult = this.name;
            this.stopTransaction();
            diagram.raiseDiagramEvent('ChangedSelection', diagram.selection);
            return part;
        };
        return DragCreatingTool;
    }(go.Tool));
    exports.DragCreatingTool = DragCreatingTool;
});
