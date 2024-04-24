/*
 *  Copyright (C) 1998-2024 by Northwoods Software Corporation. All Rights Reserved.
 */
import * as go from 'gojs';
// Contains PoolLink and BPMNLinkingTool classes for the BPMN sample
/**
 * PoolLink, a special Link class for message flows from edges of pools
 *
 * Used in the <a href="../../samples/bpmn/BPMN.html">BPMN extension</a>.
 */
export class PoolLink extends go.Link {
    constructor(init) {
        super();
        if (init)
            Object.assign(this, init);
    }
    /**
     * @hidden @internal
     */
    getLinkPoint(node, port, spot, from, ortho, othernode, otherport) {
        const r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft), port.getDocumentPoint(go.Spot.BottomRight));
        const op = super.getLinkPoint(othernode, otherport, spot, from, ortho, node, port);
        const below = op.y > r.centerY;
        const y = below ? r.bottom : r.top;
        if (node.category === 'privateProcess') {
            if (op.x < r.left)
                return new go.Point(r.left, y);
            if (op.x > r.right)
                return new go.Point(r.right, y);
            return new go.Point(op.x, y);
        }
        else {
            // otherwise get the standard link point by calling the base class method
            return super.getLinkPoint(node, port, spot, from, ortho, othernode, otherport);
        }
    }
    /**
     * @hidden @internal
     * If there are two links from & to same node... and pool is offset in X from node... the link toPoints collide on pool
     */
    computeOtherPoint(othernode, otherport) {
        const op = super.computeOtherPoint(othernode, otherport);
        let node = this.toNode;
        if (node === othernode)
            node = this.fromNode;
        if (node !== null) {
            if (othernode.category === 'privateProcess') {
                op.x = node.getDocumentPoint(go.Spot.MiddleBottom).x;
            }
            else {
                if ((node === this.fromNode) !==
                    node.actualBounds.centerY < othernode.actualBounds.centerY) {
                    op.x -= 1;
                }
                else {
                    op.x += 1;
                }
            }
        }
        return op;
    }
    /**
     * @hidden @internal
     */
    getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport) {
        if (node.category === 'privateProcess') {
            const p = port.getDocumentPoint(go.Spot.Center);
            const op = otherport.getDocumentPoint(go.Spot.Center);
            const below = op.y > p.y;
            return below ? 90 : 270;
        }
        else {
            return super.getLinkDirection.call(this, node, port, linkpoint, spot, from, ortho, othernode, otherport);
        }
    }
}
/**
 * BPMNLinkingTool, a custom linking tool to switch the class of the link created.
 *
 * Used in the <a href="../../samples/bpmn/BPMN.html">BPMN extension</a>.
 * @category Extension
 */
export class BPMNLinkingTool extends go.LinkingTool {
    constructor(init) {
        super();
        // don't allow user to create link starting on the To node
        this.direction = go.LinkingDirection.ForwardsOnly;
        // orthogonal routing during linking
        this.temporaryLink.routing = go.Routing.Orthogonal;
        // link validation using the validate methods defined below
        this.linkValidation = (fromnode, fromport, tonode, toport) => BPMNLinkingTool.validateSequenceLinkConnection(fromnode, fromport, tonode, toport) ||
            BPMNLinkingTool.validateMessageLinkConnection(fromnode, fromport, tonode, toport);
        if (init)
            Object.assign(this, init);
    }
    /**
     * Override {@link LinkingTool#insertLink} to do some extra BPMN-specific processing.
     */
    insertLink(fromnode, fromport, tonode, toport) {
        let lsave = null;
        // maybe temporarily change the link data that is copied to create the new link
        if (BPMNLinkingTool.validateMessageLinkConnection(fromnode, fromport, tonode, toport)) {
            lsave = this.archetypeLinkData;
            this.archetypeLinkData = { category: 'msg' };
        }
        // create the link in the standard manner by calling the base method
        const newlink = super.insertLink(fromnode, fromport, tonode, toport);
        // maybe make the label visible
        if (newlink !== null && fromnode.category === 'gateway') {
            const label = newlink.findObject('Label');
            if (label !== null)
                label.visible = true;
        }
        // maybe restore the original archetype link data
        if (lsave !== null)
            this.archetypeLinkData = lsave;
        return newlink;
    }
    // static utility validation routines for linking & relinking as well as insert link logic
    /**
     * Validate that sequence links don't cross subprocess or pool boundaries.
     */
    static validateSequenceLinkConnection(fromnode, fromport, tonode, toport) {
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
        const common = fromnode.findCommonContainingGroup(tonode);
        return common != null;
    }
    /**
     * Validate that message links cross pool boundaries.
     */
    static validateMessageLinkConnection(fromnode, fromport, tonode, toport) {
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
        const common = fromnode.findCommonContainingGroup(tonode);
        return common === null;
    }
}
/**
 * BPMNRelinkingTool, a custom relinking tool to switch the class of the link reconnected.
 *
 * Used in the <a href="../../samples/bpmn/BPMN.html">BPMN extension</a>.
 */
export class BPMNRelinkingTool extends go.RelinkingTool {
    constructor(init) {
        super();
        // orthogonal routing during linking
        this.temporaryLink.routing = go.Routing.Orthogonal;
        // link validation using the validate methods defined below
        this.linkValidation = (fromnode, fromport, tonode, toport) => BPMNLinkingTool.validateSequenceLinkConnection(fromnode, fromport, tonode, toport) ||
            BPMNLinkingTool.validateMessageLinkConnection(fromnode, fromport, tonode, toport);
        if (init)
            Object.assign(this, init);
    }
    /**
     * Override {@link RelinkingTool#reconnectLink} to do some extra BPMN-specific processing.
     */
    reconnectLink(existinglink, newnode, newport, toend) {
        const diagram = existinglink.diagram;
        if (diagram === null)
            return false;
        const model = diagram.model;
        if (model === null)
            return false;
        function recreateLinkData(data, cat) {
            // Copy existing data, then set from, to, and category
            const copy = model.copyLinkData(data);
            copy.from = data.from;
            copy.to = data.to;
            copy.category = cat;
            copy.points = undefined; // don't keep points from existing link
            model.removeLinkData(data);
            model.addLinkData(copy);
        }
        if (super.reconnectLink(existinglink, newnode, newport, toend)) {
            const data = existinglink.data;
            const fromnode = existinglink.fromNode;
            const fromport = existinglink.fromPort;
            const tonode = existinglink.toNode;
            const toport = existinglink.toPort;
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
                    const label = existinglink.findObject('Label');
                    if (label !== null)
                        label.visible = true;
                }
                diagram.commitTransaction('Relink updates');
            }
            return true;
        }
        return false;
    }
}
