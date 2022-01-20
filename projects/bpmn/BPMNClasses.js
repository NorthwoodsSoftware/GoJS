/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
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
        define(["require", "exports", "../../release/go.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BPMNRelinkingTool = exports.BPMNLinkingTool = exports.PoolLink = void 0;
    var go = require("../../release/go.js");
    // Contains PoolLink and BPMNLinkingTool classes for the BPMN sample
    /**
     * PoolLink, a special Link class for message flows from edges of pools
     *
     * Used in the <a href="../../projects/bpmn/BPMN.html">BPMN extension</a>.
     */
    var PoolLink = /** @class */ (function (_super) {
        __extends(PoolLink, _super);
        function PoolLink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @hidden @internal
         */
        PoolLink.prototype.getLinkPoint = function (node, port, spot, from, ortho, othernode, otherport) {
            var r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft), port.getDocumentPoint(go.Spot.BottomRight));
            var op = _super.prototype.getLinkPoint.call(this, othernode, otherport, spot, from, ortho, node, port);
            var below = op.y > r.centerY;
            var y = below ? r.bottom : r.top;
            if (node.category === 'privateProcess') {
                if (op.x < r.left)
                    return new go.Point(r.left, y);
                if (op.x > r.right)
                    return new go.Point(r.right, y);
                return new go.Point(op.x, y);
            }
            else { // otherwise get the standard link point by calling the base class method
                return _super.prototype.getLinkPoint.call(this, node, port, spot, from, ortho, othernode, otherport);
            }
        };
        /**
         * @hidden @internal
         * If there are two links from & to same node... and pool is offset in X from node... the link toPoints collide on pool
         */
        PoolLink.prototype.computeOtherPoint = function (othernode, otherport) {
            var op = _super.prototype.computeOtherPoint.call(this, othernode, otherport);
            var node = this.toNode;
            if (node === othernode)
                node = this.fromNode;
            if (node !== null) {
                if (othernode.category === 'privateProcess') {
                    op.x = node.getDocumentPoint(go.Spot.MiddleBottom).x;
                }
                else {
                    if ((node === this.fromNode) !== (node.actualBounds.centerY < othernode.actualBounds.centerY)) {
                        op.x -= 1;
                    }
                    else {
                        op.x += 1;
                    }
                }
            }
            return op;
        };
        /**
         * @hidden @internal
         */
        PoolLink.prototype.getLinkDirection = function (node, port, linkpoint, spot, from, ortho, othernode, otherport) {
            if (node.category === 'privateProcess') {
                var p = port.getDocumentPoint(go.Spot.Center);
                var op = otherport.getDocumentPoint(go.Spot.Center);
                var below = op.y > p.y;
                return below ? 90 : 270;
            }
            else {
                return _super.prototype.getLinkDirection.call(this, node, port, linkpoint, spot, from, ortho, othernode, otherport);
            }
        };
        return PoolLink;
    }(go.Link));
    exports.PoolLink = PoolLink;
    /**
     * BPMNLinkingTool, a custom linking tool to switch the class of the link created.
     *
     * Used in the <a href="../../projects/bpmn/BPMN.html">BPMN extension</a>.
     * @category Extension
     */
    var BPMNLinkingTool = /** @class */ (function (_super) {
        __extends(BPMNLinkingTool, _super);
        function BPMNLinkingTool() {
            var _this = _super.call(this) || this;
            // don't allow user to create link starting on the To node
            _this.direction = go.LinkingTool.ForwardsOnly;
            // orthogonal routing during linking
            _this.temporaryLink.routing = go.Link.Orthogonal;
            // link validation using the validate methods defined below
            _this.linkValidation = function (fromnode, fromport, tonode, toport) {
                return BPMNLinkingTool.validateSequenceLinkConnection(fromnode, fromport, tonode, toport) ||
                    BPMNLinkingTool.validateMessageLinkConnection(fromnode, fromport, tonode, toport);
            };
            return _this;
        }
        /**
         * Override {@link LinkingTool#insertLink} to do some extra BPMN-specific processing.
         */
        BPMNLinkingTool.prototype.insertLink = function (fromnode, fromport, tonode, toport) {
            var lsave = null;
            // maybe temporarily change the link data that is copied to create the new link
            if (BPMNLinkingTool.validateMessageLinkConnection(fromnode, fromport, tonode, toport)) {
                lsave = this.archetypeLinkData;
                this.archetypeLinkData = { category: 'msg' };
            }
            // create the link in the standard manner by calling the base method
            var newlink = _super.prototype.insertLink.call(this, fromnode, fromport, tonode, toport);
            // maybe make the label visible
            if (newlink !== null && fromnode.category === 'gateway') {
                var label = newlink.findObject('Label');
                if (label !== null)
                    label.visible = true;
            }
            // maybe restore the original archetype link data
            if (lsave !== null)
                this.archetypeLinkData = lsave;
            return newlink;
        };
        // static utility validation routines for linking & relinking as well as insert link logic
        /**
         * Validate that sequence links don't cross subprocess or pool boundaries.
         */
        BPMNLinkingTool.validateSequenceLinkConnection = function (fromnode, fromport, tonode, toport) {
            if (fromnode.category === null || tonode.category === null)
                return true;
            // if either node is in a subprocess, both nodes must be in same subprocess (even for Message Flows)
            if ((fromnode.containingGroup !== null && fromnode.containingGroup.category === 'subprocess') ||
                (tonode.containingGroup !== null && tonode.containingGroup.category === 'subprocess')) {
                if (fromnode.containingGroup !== tonode.containingGroup)
                    return false;
            }
            if (fromnode.containingGroup === tonode.containingGroup)
                return true; // a valid Sequence Flow
            // also check for children in common pool
            var common = fromnode.findCommonContainingGroup(tonode);
            return common != null;
        };
        /**
         * Validate that message links cross pool boundaries.
         */
        BPMNLinkingTool.validateMessageLinkConnection = function (fromnode, fromport, tonode, toport) {
            if (fromnode.category === null || tonode.category === null)
                return true;
            if (fromnode.category === 'privateProcess' || tonode.category === 'privateProcess')
                return true;
            // if either node is in a subprocess, both nodes must be in same subprocess (even for Message Flows)
            if ((fromnode.containingGroup !== null && fromnode.containingGroup.category === 'subprocess') ||
                (tonode.containingGroup !== null && tonode.containingGroup.category === 'subprocess')) {
                if (fromnode.containingGroup !== tonode.containingGroup)
                    return false;
            }
            if (fromnode.containingGroup === tonode.containingGroup)
                return false; // an invalid Message Flow
            // also check if fromnode and tonode are in same pool
            var common = fromnode.findCommonContainingGroup(tonode);
            return common === null;
        };
        return BPMNLinkingTool;
    }(go.LinkingTool));
    exports.BPMNLinkingTool = BPMNLinkingTool;
    /**
     * BPMNRelinkingTool, a custom relinking tool to switch the class of the link reconnected.
     *
     * Used in the <a href="../../projects/bpmn/BPMN.html">BPMN extension</a>.
     */
    var BPMNRelinkingTool = /** @class */ (function (_super) {
        __extends(BPMNRelinkingTool, _super);
        function BPMNRelinkingTool() {
            var _this = _super.call(this) || this;
            // orthogonal routing during linking
            _this.temporaryLink.routing = go.Link.Orthogonal;
            // link validation using the validate methods defined below
            _this.linkValidation = function (fromnode, fromport, tonode, toport) {
                return BPMNLinkingTool.validateSequenceLinkConnection(fromnode, fromport, tonode, toport) ||
                    BPMNLinkingTool.validateMessageLinkConnection(fromnode, fromport, tonode, toport);
            };
            return _this;
        }
        /**
         * Override {@link RelinkingTool#reconnectLink} to do some extra BPMN-specific processing.
         */
        BPMNRelinkingTool.prototype.reconnectLink = function (existinglink, newnode, newport, toend) {
            var diagram = existinglink.diagram;
            if (diagram === null)
                return false;
            var model = diagram.model;
            if (model === null)
                return false;
            function recreateLinkData(data, cat) {
                // Copy existing data, then set from, to, and category
                var copy = model.copyLinkData(data);
                copy.from = data.from;
                copy.to = data.to;
                copy.category = cat;
                copy.points = undefined; // don't keep points from existing link
                model.removeLinkData(data);
                model.addLinkData(copy);
            }
            if (_super.prototype.reconnectLink.call(this, existinglink, newnode, newport, toend)) {
                var data = existinglink.data;
                var fromnode = existinglink.fromNode;
                var fromport = existinglink.fromPort;
                var tonode = existinglink.toNode;
                var toport = existinglink.toPort;
                if (fromnode !== null && fromport !== null && tonode !== null && toport !== null) {
                    diagram.startTransaction('Relink updates');
                    if (BPMNLinkingTool.validateMessageLinkConnection(fromnode, fromport, tonode, toport)) {
                        // Recreate the link if the category changed, since it is a different class
                        if (existinglink.category !== 'msg') {
                            recreateLinkData(data, 'msg');
                        }
                    }
                    // maybe make the label visible
                    if (fromnode.category === 'gateway') {
                        var label = existinglink.findObject('Label');
                        if (label !== null)
                            label.visible = true;
                    }
                    diagram.commitTransaction('Relink updates');
                }
                return true;
            }
            return false;
        };
        return BPMNRelinkingTool;
    }(go.RelinkingTool));
    exports.BPMNRelinkingTool = BPMNRelinkingTool;
});
