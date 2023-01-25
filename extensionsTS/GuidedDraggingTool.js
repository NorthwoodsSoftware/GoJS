/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
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
    exports.GuidedDraggingTool = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * The GuidedDraggingTool class makes guidelines visible as the parts are dragged around a diagram
     * when the selected part is nearly aligned with another part.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsJSM/GuidedDragging.html">Guided Dragging</a> sample.
     * @category Tool Extension
     */
    var GuidedDraggingTool = /** @class */ (function (_super) {
        __extends(GuidedDraggingTool, _super);
        /**
         * Constructs a GuidedDraggingTool and sets up the temporary guideline parts.
         */
        function GuidedDraggingTool() {
            var _this = _super.call(this) || this;
            // properties that the programmer can modify
            _this._guidelineSnapDistance = 6;
            _this._isGuidelineEnabled = true;
            _this._horizontalGuidelineColor = 'gray';
            _this._verticalGuidelineColor = 'gray';
            _this._centerGuidelineColor = 'gray';
            _this._guidelineWidth = 1;
            _this._searchDistance = 1000;
            _this._isGuidelineSnapEnabled = true;
            var partProperties = { layerName: 'Tool', isInDocumentBounds: false };
            var shapeProperties = { stroke: 'gray', isGeometryPositioned: true };
            var $ = go.GraphObject.make;
            // temporary parts for horizonal guidelines
            _this.guidelineHtop =
                $(go.Part, partProperties, $(go.Shape, shapeProperties, { geometryString: 'M0 0 100 0' }));
            _this.guidelineHbottom =
                $(go.Part, partProperties, $(go.Shape, shapeProperties, { geometryString: 'M0 0 100 0' }));
            _this.guidelineHcenter =
                $(go.Part, partProperties, $(go.Shape, shapeProperties, { geometryString: 'M0 0 100 0' }));
            // temporary parts for vertical guidelines
            _this.guidelineVleft =
                $(go.Part, partProperties, $(go.Shape, shapeProperties, { geometryString: 'M0 0 0 100' }));
            _this.guidelineVright =
                $(go.Part, partProperties, $(go.Shape, shapeProperties, { geometryString: 'M0 0 0 100' }));
            _this.guidelineVcenter =
                $(go.Part, partProperties, $(go.Shape, shapeProperties, { geometryString: 'M0 0 0 100' }));
            return _this;
        }
        Object.defineProperty(GuidedDraggingTool.prototype, "guidelineSnapDistance", {
            /**
             * Gets or sets the margin of error for which guidelines show up.
             *
             * The default value is 6.
             * Guidelines will show up when the aligned nodes are ± 6px away from perfect alignment.
             */
            get: function () { return this._guidelineSnapDistance; },
            set: function (val) {
                if (typeof val !== 'number' || isNaN(val) || val < 0)
                    throw new Error('new value for GuidedDraggingTool.guidelineSnapDistance must be a non-negative number');
                this._guidelineSnapDistance = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GuidedDraggingTool.prototype, "isGuidelineEnabled", {
            /**
             * Gets or sets whether the guidelines are enabled or disables.
             *
             * The default value is true.
             */
            get: function () { return this._isGuidelineEnabled; },
            set: function (val) {
                if (typeof val !== 'boolean')
                    throw new Error('new value for GuidedDraggingTool.isGuidelineEnabled must be a boolean value.');
                this._isGuidelineEnabled = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GuidedDraggingTool.prototype, "horizontalGuidelineColor", {
            /**
             * Gets or sets the color of horizontal guidelines.
             *
             * The default value is "gray".
             */
            get: function () { return this._horizontalGuidelineColor; },
            set: function (val) {
                if (this._horizontalGuidelineColor !== val) {
                    this._horizontalGuidelineColor = val;
                    if (this.guidelineHbottom)
                        this.guidelineHbottom.elements.first().stroke = this._horizontalGuidelineColor;
                    if (this.guidelineHtop)
                        this.guidelineHtop.elements.first().stroke = this._horizontalGuidelineColor;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GuidedDraggingTool.prototype, "verticalGuidelineColor", {
            /**
             * Gets or sets the color of vertical guidelines.
             *
             * The default value is "gray".
             */
            get: function () { return this._verticalGuidelineColor; },
            set: function (val) {
                if (this._verticalGuidelineColor !== val) {
                    this._verticalGuidelineColor = val;
                    if (this.guidelineVleft)
                        this.guidelineVleft.elements.first().stroke = this._verticalGuidelineColor;
                    if (this.guidelineVright)
                        this.guidelineVright.elements.first().stroke = this._verticalGuidelineColor;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GuidedDraggingTool.prototype, "centerGuidelineColor", {
            /**
             * Gets or sets the color of center guidelines.
             *
             * The default value is "gray".
             */
            get: function () { return this._centerGuidelineColor; },
            set: function (val) {
                if (this._centerGuidelineColor !== val) {
                    this._centerGuidelineColor = val;
                    if (this.guidelineVcenter)
                        this.guidelineVcenter.elements.first().stroke = this._centerGuidelineColor;
                    if (this.guidelineHcenter)
                        this.guidelineHcenter.elements.first().stroke = this._centerGuidelineColor;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GuidedDraggingTool.prototype, "guidelineWidth", {
            /**
             * Gets or sets the strokeWidth of the guidelines.
             *
             * The default value is 1.
             */
            get: function () { return this._guidelineWidth; },
            set: function (val) {
                if (typeof val !== 'number' || isNaN(val) || val < 0)
                    throw new Error('New value for GuidedDraggingTool.guidelineWidth must be a non-negative number.');
                if (this._guidelineWidth !== val) {
                    this._guidelineWidth = val;
                    if (this.guidelineVcenter)
                        this.guidelineVcenter.elements.first().strokeWidth = val;
                    if (this.guidelineHcenter)
                        this.guidelineHcenter.elements.first().strokeWidth = val;
                    if (this.guidelineVleft)
                        this.guidelineVleft.elements.first().strokeWidth = val;
                    if (this.guidelineVright)
                        this.guidelineVright.elements.first().strokeWidth = val;
                    if (this.guidelineHbottom)
                        this.guidelineHbottom.elements.first().strokeWidth = val;
                    if (this.guidelineHtop)
                        this.guidelineHtop.elements.first().strokeWidth = val;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GuidedDraggingTool.prototype, "searchDistance", {
            /**
             * Gets or sets the distance around the selected part to search for aligned parts.
             *
             * The default value is 1000.
             * Set this to Infinity if you want to search the entire diagram no matter how far away.
             */
            get: function () { return this._searchDistance; },
            set: function (val) {
                if (typeof val !== 'number' || isNaN(val) || val <= 0)
                    throw new Error('new value for GuidedDraggingTool.searchDistance must be a positive number.');
                this._searchDistance = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GuidedDraggingTool.prototype, "isGuidelineSnapEnabled", {
            /**
             * Gets or sets whether snapping to guidelines is enabled.
             *
             * The default value is true.
             */
            get: function () { return this._isGuidelineSnapEnabled; },
            set: function (val) {
                if (typeof val !== 'boolean')
                    throw new Error('new value for GuidedDraggingTool.isGuidelineSnapEnabled must be a boolean.');
                this._isGuidelineSnapEnabled = val;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Removes all of the guidelines from the grid.
         */
        GuidedDraggingTool.prototype.clearGuidelines = function () {
            if (this.guidelineHbottom)
                this.diagram.remove(this.guidelineHbottom);
            if (this.guidelineHcenter)
                this.diagram.remove(this.guidelineHcenter);
            if (this.guidelineHtop)
                this.diagram.remove(this.guidelineHtop);
            if (this.guidelineVleft)
                this.diagram.remove(this.guidelineVleft);
            if (this.guidelineVright)
                this.diagram.remove(this.guidelineVright);
            if (this.guidelineVcenter)
                this.diagram.remove(this.guidelineVcenter);
        };
        /**
         * Calls the base method and removes the guidelines from the graph.
         */
        GuidedDraggingTool.prototype.doDeactivate = function () {
            _super.prototype.doDeactivate.call(this);
            // clear any guidelines when dragging is done
            this.clearGuidelines();
        };
        /**
         * Shows vertical and horizontal guidelines for the dragged part.
         */
        GuidedDraggingTool.prototype.doDragOver = function (pt, obj) {
            // clear all existing guidelines in case either show... method decides to show a guideline
            this.clearGuidelines();
            // gets the selected part
            var draggingParts = this.copiedParts || this.draggedParts;
            if (draggingParts === null)
                return;
            var partItr = draggingParts.iterator;
            if (partItr.next()) {
                var part = partItr.key;
                this.showHorizontalMatches(part, this.isGuidelineEnabled, false);
                this.showVerticalMatches(part, this.isGuidelineEnabled, false);
            }
        };
        /**
         * On a mouse-up, snaps the selected part to the nearest guideline.
         * If not snapping, the part remains at its position.
         */
        GuidedDraggingTool.prototype.doDropOnto = function (pt, obj) {
            this.clearGuidelines();
            // gets the selected (perhaps copied) Part
            var draggingParts = this.copiedParts || this.draggedParts;
            if (draggingParts === null)
                return;
            var partItr = draggingParts.iterator;
            if (partItr.next()) {
                var part = partItr.key;
                // snaps only when the mouse is released without shift modifier
                var e = this.diagram.lastInput;
                var snap = this.isGuidelineSnapEnabled && !e.shift;
                this.showHorizontalMatches(part, false, snap); // false means don't show guidelines
                this.showVerticalMatches(part, false, snap);
            }
        };
        /**
         * When nodes are shifted due to being guided upon a drop, make sure all connected link routes are invalidated,
         * since the node is likely to have moved a different amount than all its connected links in the regular
         * operation of the DraggingTool.
         */
        GuidedDraggingTool.prototype.invalidateLinks = function (node) {
            if (node instanceof go.Node)
                node.invalidateConnectedLinks();
        };
        /**
         * This predicate decides whether or not the given Part should guide the dragged part.
         * @param {Part} part  a stationary Part to which the dragged part might be aligned
         * @param {Part} guidedpart  the Part being dragged
         */
        GuidedDraggingTool.prototype.isGuiding = function (part, guidedpart) {
            return part instanceof go.Part &&
                !part.isSelected &&
                !(part instanceof go.Link) &&
                guidedpart instanceof go.Part &&
                part.containingGroup === guidedpart.containingGroup &&
                part.layer !== null && !part.layer.isTemporary;
        };
        /**
         * This finds parts that are aligned near the selected part along horizontal lines. It compares the selected
         * part to all parts within a rectangle approximately twice the {@link #searchDistance} wide.
         * The guidelines appear when a part is aligned within a margin-of-error equal to {@link #guidelineSnapDistance}.
         * @param {Node} part
         * @param {boolean} guideline if true, show guideline
         * @param {boolean} snap if true, snap the part to where the guideline would be
         */
        GuidedDraggingTool.prototype.showHorizontalMatches = function (part, guideline, snap) {
            var _this = this;
            var objBounds = part.locationObject.getDocumentBounds();
            var p0 = objBounds.y;
            var p1 = objBounds.y + objBounds.height / 2;
            var p2 = objBounds.y + objBounds.height;
            var marginOfError = this.guidelineSnapDistance;
            var distance = this.searchDistance;
            if (distance === Infinity)
                distance = this.diagram.documentBounds.width;
            // compares with parts within narrow vertical area
            var area = objBounds.copy();
            area.inflate(distance, marginOfError + 1);
            var otherObjs = this.diagram.findObjectsIn(area, function (obj) { return obj.part; }, function (p) { return _this.isGuiding(p, part); }, true);
            var bestDiff = marginOfError;
            var bestObj = null; // TS 2.6 won't let this be go.Part | null
            var bestSpot = go.Spot.Default;
            var bestOtherSpot = go.Spot.Default;
            // horizontal line -- comparing y-values
            otherObjs.each(function (other) {
                if (other === part)
                    return; // ignore itself
                var otherBounds = other.locationObject.getDocumentBounds();
                var q0 = otherBounds.y;
                var q1 = otherBounds.y + otherBounds.height / 2;
                var q2 = otherBounds.y + otherBounds.height;
                // compare center with center of OTHER part
                if (_this.guidelineHcenter && Math.abs(p1 - q1) < bestDiff) {
                    bestDiff = Math.abs(p1 - q1);
                    bestObj = other;
                    bestSpot = go.Spot.Center;
                    bestOtherSpot = go.Spot.Center;
                }
                // compare top side with top and bottom sides of OTHER part
                if (_this.guidelineHtop && Math.abs(p0 - q0) < bestDiff) {
                    bestDiff = Math.abs(p0 - q0);
                    bestObj = other;
                    bestSpot = go.Spot.Top;
                    bestOtherSpot = go.Spot.Top;
                }
                else if (_this.guidelineHtop && Math.abs(p0 - q2) < bestDiff) {
                    bestDiff = Math.abs(p0 - q2);
                    bestObj = other;
                    bestSpot = go.Spot.Top;
                    bestOtherSpot = go.Spot.Bottom;
                }
                // compare bottom side with top and bottom sides of OTHER part
                if (_this.guidelineHbottom && Math.abs(p2 - q0) < bestDiff) {
                    bestDiff = Math.abs(p2 - q0);
                    bestObj = other;
                    bestSpot = go.Spot.Bottom;
                    bestOtherSpot = go.Spot.Top;
                }
                else if (_this.guidelineHbottom && Math.abs(p2 - q2) < bestDiff) {
                    bestDiff = Math.abs(p2 - q2);
                    bestObj = other;
                    bestSpot = go.Spot.Bottom;
                    bestOtherSpot = go.Spot.Bottom;
                }
            });
            if (bestObj !== null) {
                var offsetX = objBounds.x - part.actualBounds.x;
                var offsetY = objBounds.y - part.actualBounds.y;
                var bestBounds = bestObj.locationObject.getDocumentBounds();
                // line extends from x0 to x2
                var x0 = Math.min(objBounds.x, bestBounds.x) - 10;
                var x2 = Math.max(objBounds.x + objBounds.width, bestBounds.x + bestBounds.width) + 10;
                // find bestObj's desired Y
                var bestPoint = new go.Point().setRectSpot(bestBounds, bestOtherSpot);
                if (bestSpot === go.Spot.Center) {
                    if (snap) {
                        // call Part.move in order to automatically move member Parts of Groups
                        part.move(new go.Point(objBounds.x - offsetX, bestPoint.y - objBounds.height / 2 - offsetY));
                        this.invalidateLinks(part);
                    }
                    if (guideline) {
                        this.guidelineHcenter.position = new go.Point(x0, bestPoint.y);
                        this.guidelineHcenter.elt(0).width = x2 - x0;
                        this.diagram.add(this.guidelineHcenter);
                    }
                }
                else if (bestSpot === go.Spot.Top) {
                    if (snap) {
                        part.move(new go.Point(objBounds.x - offsetX, bestPoint.y - offsetY));
                        this.invalidateLinks(part);
                    }
                    if (guideline) {
                        this.guidelineHtop.position = new go.Point(x0, bestPoint.y);
                        this.guidelineHtop.elt(0).width = x2 - x0;
                        this.diagram.add(this.guidelineHtop);
                    }
                }
                else if (bestSpot === go.Spot.Bottom) {
                    if (snap) {
                        part.move(new go.Point(objBounds.x - offsetX, bestPoint.y - objBounds.height - offsetY));
                        this.invalidateLinks(part);
                    }
                    if (guideline) {
                        this.guidelineHbottom.position = new go.Point(x0, bestPoint.y);
                        this.guidelineHbottom.elt(0).width = x2 - x0;
                        this.diagram.add(this.guidelineHbottom);
                    }
                }
            }
        };
        /**
         * This finds parts that are aligned near the selected part along vertical lines. It compares the selected
         * part to all parts within a rectangle approximately twice the {@link #searchDistance} tall.
         * The guidelines appear when a part is aligned within a margin-of-error equal to {@link #guidelineSnapDistance}.
         * @param {Part} part
         * @param {boolean} guideline if true, show guideline
         * @param {boolean} snap if true, don't show guidelines but just snap the part to where the guideline would be
         */
        GuidedDraggingTool.prototype.showVerticalMatches = function (part, guideline, snap) {
            var _this = this;
            var objBounds = part.locationObject.getDocumentBounds();
            var p0 = objBounds.x;
            var p1 = objBounds.x + objBounds.width / 2;
            var p2 = objBounds.x + objBounds.width;
            var marginOfError = this.guidelineSnapDistance;
            var distance = this.searchDistance;
            if (distance === Infinity)
                distance = this.diagram.documentBounds.height;
            // compares with parts within narrow vertical area
            var area = objBounds.copy();
            area.inflate(marginOfError + 1, distance);
            var otherObjs = this.diagram.findObjectsIn(area, function (obj) { return obj.part; }, function (p) { return _this.isGuiding(p, part); }, true);
            var bestDiff = marginOfError;
            var bestObj = null; // TS 2.6 won't let this be go.Part | null
            var bestSpot = go.Spot.Default;
            var bestOtherSpot = go.Spot.Default;
            // vertical line -- comparing x-values
            otherObjs.each(function (other) {
                if (other === part)
                    return; // ignore itself
                var otherBounds = other.locationObject.getDocumentBounds();
                var q0 = otherBounds.x;
                var q1 = otherBounds.x + otherBounds.width / 2;
                var q2 = otherBounds.x + otherBounds.width;
                // compare center with center of OTHER part
                if (_this.guidelineVcenter && Math.abs(p1 - q1) < bestDiff) {
                    bestDiff = Math.abs(p1 - q1);
                    bestObj = other;
                    bestSpot = go.Spot.Center;
                    bestOtherSpot = go.Spot.Center;
                }
                // compare left side with left and right sides of OTHER part
                if (_this.guidelineVleft && Math.abs(p0 - q0) < bestDiff) {
                    bestDiff = Math.abs(p0 - q0);
                    bestObj = other;
                    bestSpot = go.Spot.Left;
                    bestOtherSpot = go.Spot.Left;
                }
                else if (_this.guidelineVleft && Math.abs(p0 - q2) < bestDiff) {
                    bestDiff = Math.abs(p0 - q2);
                    bestObj = other;
                    bestSpot = go.Spot.Left;
                    bestOtherSpot = go.Spot.Right;
                }
                // compare right side with left and right sides of OTHER part
                if (_this.guidelineVright && Math.abs(p2 - q0) < bestDiff) {
                    bestDiff = Math.abs(p2 - q0);
                    bestObj = other;
                    bestSpot = go.Spot.Right;
                    bestOtherSpot = go.Spot.Left;
                }
                else if (_this.guidelineVright && Math.abs(p2 - q2) < bestDiff) {
                    bestDiff = Math.abs(p2 - q2);
                    bestObj = other;
                    bestSpot = go.Spot.Right;
                    bestOtherSpot = go.Spot.Right;
                }
            });
            if (bestObj !== null) {
                var offsetX = objBounds.x - part.actualBounds.x;
                var offsetY = objBounds.y - part.actualBounds.y;
                var bestBounds = bestObj.locationObject.getDocumentBounds();
                // line extends from y0 to y2
                var y0 = Math.min(objBounds.y, bestBounds.y) - 10;
                var y2 = Math.max(objBounds.y + objBounds.height, bestBounds.y + bestBounds.height) + 10;
                // find bestObj's desired X
                var bestPoint = new go.Point().setRectSpot(bestBounds, bestOtherSpot);
                if (bestSpot === go.Spot.Center) {
                    if (snap) {
                        // call Part.move in order to automatically move member Parts of Groups
                        part.move(new go.Point(bestPoint.x - objBounds.width / 2 - offsetX, objBounds.y - offsetY));
                        this.invalidateLinks(part);
                    }
                    if (guideline) {
                        this.guidelineVcenter.position = new go.Point(bestPoint.x, y0);
                        this.guidelineVcenter.elt(0).height = y2 - y0;
                        this.diagram.add(this.guidelineVcenter);
                    }
                }
                else if (bestSpot === go.Spot.Left) {
                    if (snap) {
                        part.move(new go.Point(bestPoint.x - offsetX, objBounds.y - offsetY));
                        this.invalidateLinks(part);
                    }
                    if (guideline) {
                        this.guidelineVleft.position = new go.Point(bestPoint.x, y0);
                        this.guidelineVleft.elt(0).height = y2 - y0;
                        this.diagram.add(this.guidelineVleft);
                    }
                }
                else if (bestSpot === go.Spot.Right) {
                    if (snap) {
                        part.move(new go.Point(bestPoint.x - objBounds.width - offsetX, objBounds.y - offsetY));
                        this.invalidateLinks(part);
                    }
                    if (guideline) {
                        this.guidelineVright.position = new go.Point(bestPoint.x, y0);
                        this.guidelineVright.elt(0).height = y2 - y0;
                        this.diagram.add(this.guidelineVright);
                    }
                }
            }
        };
        return GuidedDraggingTool;
    }(go.DraggingTool));
    exports.GuidedDraggingTool = GuidedDraggingTool;
});
