'use strict';
/*
 *  Copyright (C) 1998-2024 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */
import * as go from 'gojs';
/**
 * This custom CommandHandler is an example of how screen reader accessibility can be added to diagrams with an `aria-live` DIV.
 *
 * This CommandHandler adds more key commands for a user:
 * - Arrow keys: Change selection to a new node, if possible, based on direction. This is added to an internal navigation history.
 * - `b`: Give a description of which nodes are adjacent to the currently selected node
 * - `x`: Go backwards in the navigation history
 * - `c`: Go forwards in the navigation history
 *
 * This custom CommandHandler is meant as a starting point to create a more individualized CommandHandler for your unique use case.
 * Certain data and attributes of nodes that are different between diagrams may be important to the accessibility interpretation.
 * When describing a Part, this example calls {@link getPartText}, which uses the `Part.text` if it is specified, otherwise the `Part.key`.
 * You'll want to modify this to suit your needs.
 *
 * If you want to experiment with this extension, try the <a href="../../samples/Accessibility.html">Accessibility</a> sample.
 * @category Extension
 */
export class AriaCommandHandler extends go.CommandHandler {
    /**
     * Creates and sets the Aria live region.
     * Defines variables for node selection history and runs setup method.
     */
    constructor(init) {
        super();
        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.history = [];
        this.index = 0;
        this.mode = 'default'; // or 'tree'???
        this._selectionChanged = null;
        if (init)
            Object.assign(this, init);
    }
    /**
     * Set up a "ChangedSelection" listener.
     */
    _addSelectionChanged() {
        if (this.diagram === null)
            return;
        if (this._selectionChanged === null) {
            const aria = this;
            this._selectionChanged = function (e) {
                const part = e.diagram.selection.first();
                if (part !== null) {
                    aria.callAria(aria.getPartText(part));
                    if (e.diagram.lastInput.event instanceof MouseEvent) {
                        aria.history = aria.history.slice(0, aria.index + 1);
                        aria.index = aria.history.push(part) - 1;
                    }
                }
            };
        }
    }
    /**
     * Given a Part, return the text that the aria label should read
     * By default this uses `Part.text`, unless it is empty, then it uses `Part.key`
     * This can be overridden to return arbitrary text based on Part data, etc.
     */
    getPartText(part) {
        if (part.text)
            return part.text;
        if (part.key)
            return part.key.toString();
        return 'undefined';
    }
    /**
     * This implements custom behaviors for arrow key keyboard events.
     * to affect the behavior when the user types an arrow key.
     * @this {AriaCommandHandler}
     */
    doKeyDown() {
        if (this.diagram === null)
            return;
        this._addSelectionChanged();
        const e = this.diagram.lastInput;
        if (e.code === 'ArrowUp' ||
            e.code === 'ArrowDown' ||
            e.code === 'ArrowLeft' ||
            e.code === 'ArrowRight') {
            if (this.mode === 'tree') {
                this._arrowKeySelectTree();
            }
            else {
                this._arrowKeySelect(e.code);
            }
        }
        else if (e.code === 'KeyX') {
            this._goBack();
        }
        else if (e.code === 'KeyC') {
            this._goForward();
        }
        else if (e.code === 'KeyB') {
            this.callSurroundingNodes();
        }
        else {
            // otherwise do any standard command
            super.doKeyDown();
        }
    }
    /**
     * Clears the text on the aria region and sets it to the passed message.
     * @param {string} message the string to read
     */
    callAria(message) {
        this.liveRegion.textContent = '';
        this.liveRegion.textContent = message;
    }
    /**
     * @param {number} a angle
     * @param {number} dir direction to compare the angle to
     * @return {number} returns the difference between the two angles
     * @static
     */
    static _angleCloseness(a, dir) {
        return Math.min(Math.abs(dir - a), Math.min(Math.abs(dir + 360 - a), Math.abs(dir - 360 - a)));
    }
    /**
     * Looks for the closest node to the selection in the given direction and returns it.
     * Returns null if there are no nodes found in the direction.
     * @param {number} dir direction angle to look for the closest node
     * @return {go.Node | null}
     */
    _findClosestNode(dir) {
        const originalPart = this.diagram.selection.first();
        if (originalPart === null)
            return null;
        const originalPoint = originalPart.actualBounds.center;
        const allParts = this._getAllParts();
        let closestDistance = Infinity;
        let closest = originalPart; // if no parts meet the criteria, the same part remains selected
        for (let i = 0; i < allParts.length; i++) {
            const nextPart = allParts[i];
            if (nextPart === originalPart)
                continue; // skips over currently selected part
            if (!nextPart.canSelect())
                continue;
            const nextPoint = nextPart.actualBounds.center;
            const angle = originalPoint.directionPoint(nextPoint);
            const anglediff = AriaCommandHandler._angleCloseness(angle, dir);
            if (anglediff <= 45) {
                // if this part's center is within the desired direction's sector,
                let distance = originalPoint.distanceSquaredPoint(nextPoint);
                distance *= 1 + Math.sin((anglediff * Math.PI) / 180); // the more different from the intended angle, the further it is
                if (distance < closestDistance) {
                    // and if it's closer than any other part,
                    closestDistance = distance; // remember it as a better choice
                    closest = nextPart;
                }
            }
        }
        if (closest === originalPart) {
            return null;
        }
        return closest;
    }
    /**
     * Returns an array of all nodes and parts in the given diagram, but not any links.
     * @return {object[]}
     */
    _getAllParts() {
        const diagram = this.diagram;
        if (!diagram)
            return [];
        const allParts = [];
        diagram.nodes.each((node) => {
            if (node.isVisible())
                allParts.push(node);
        });
        diagram.parts.each((part) => {
            if (part.isVisible())
                allParts.push(part);
        });
        // note that this ignores Links
        return allParts;
    }
    /**
     * Checks for closest node in the direction of the hit arrow key and selects the node
     * Adds the node to the node movement history
     * If there is no node is checked direction completes an aria call letting the user know
     */
    _arrowKeySelect(ekey) {
        let node = this.diagram.selection.first();
        //if no node is currently selected it selects one and clears node history
        if (node === null) {
            node = this.diagram.nodes.first();
            if (node !== null) {
                this.diagram.select(node);
                this.history = [];
                this.index = this.history.push(node) - 1;
            }
            return;
        }
        //with a part selected, arrow keys change the selection
        let nextPart = null; // string | Part
        const right = this._findClosestNode(0);
        const down = this._findClosestNode(90);
        const left = this._findClosestNode(180);
        const up = this._findClosestNode(270);
        if (ekey === 'ArrowUp')
            nextPart = up != null ? up : 'No node above';
        else if (ekey === 'ArrowDown')
            nextPart = down != null ? down : 'No node below';
        else if (ekey === 'ArrowLeft')
            nextPart = left != null ? left : 'No node to the left';
        else if (ekey === 'ArrowRight')
            nextPart = right != null ? right : 'No node to the right';
        if (nextPart === null)
            return;
        //nextPart is a string it means that there wasn't a node in the direction so the string is called
        if (typeof nextPart === 'string') {
            this.callAria(nextPart);
        }
        else {
            //removes any nodes in the history ahead of the current index in the history then adds the selected node
            this.history = this.history.slice(0, this.index + 1);
            this.diagram.select(nextPart);
            this.index = this.history.push(nextPart) - 1;
        }
    }
    /**
     * Checks if the currently selected node is the farthest part of the history
     * Selects the previous node in the history array
     */
    _goBack() {
        if (this.index === 0)
            return;
        this.diagram.select(this.history[this.index - 1]);
        this.index--;
    }
    /**
     * Checks if the currently selected node is the closest part of the history
     * Selects the next node in the history array
     */
    _goForward() {
        if (this.history[this.index + 1] === undefined)
            return;
        this.diagram.select(this.history[this.index + 1]);
        this.index++;
    }
    /**
     * Checks for a node in each direction and build a message to be called based on
     * if there is and which nodes are around the currently selected one
     */
    callSurroundingNodes() {
        let message = '';
        const right = this._findClosestNode(0);
        const down = this._findClosestNode(90);
        const left = this._findClosestNode(180);
        const up = this._findClosestNode(270);
        message += (right != null ? right.data.key : 'No node') + ' to the right. ';
        message += (down != null ? down.data.key : 'No node') + ' below. ';
        message += (left != null ? left.data.key : 'No node') + ' to the left. ';
        message += (up != null ? up.data.key : 'No node') + ' above.';
        this.callAria(message);
    }
    /**
     * For tree layouts.
     * Checks for and returns the sibling nodes to the right of the currently selected node.
     * All nodes to the right of the currently selected node will be in the array and first element is the closest node.
     * @param node
     * @return returns null if there is no sibling node to the right
     */
    _getSiblingNodesRight(node) {
        if (node === null)
            return null;
        if (node.findTreeParentNode() === null)
            return null;
        const originalPoint = node.actualBounds.center;
        let closest = node;
        let closestDistance = Infinity;
        const siblingsRight = [];
        node
            .findTreeParentNode()
            .findTreeChildrenNodes()
            .each((x) => {
            if (x === node)
                return;
            const angle = originalPoint.directionPoint(x.actualBounds.center);
            if (angle >= 270 || angle <= 90) {
                if (originalPoint.distanceSquaredPoint(x.actualBounds.center) < closestDistance) {
                    closestDistance = originalPoint.distanceSquaredPoint(x.actualBounds.center);
                    closest = x;
                    siblingsRight.unshift(x);
                }
                else
                    siblingsRight.push(x);
            }
        });
        if (closest === node)
            return null;
        return siblingsRight;
    }
    /**
     * For tree layouts.
     * Checks for and returns the sibling nodes to the left of the currently selected node.
     * All nodes to the left of the currently selected node will be in the array and first element is the closest node.
     * @param {go.Node} node
     * @return returns null if there is no sibling node to the left
     */
    _getSiblingNodesLeft(node) {
        if (node === null)
            return null;
        if (node.findTreeParentNode() === null)
            return null;
        const originalPoint = node.actualBounds.center;
        let closest = node;
        let closestDistance = Infinity;
        const siblingsLeft = [];
        node
            .findTreeParentNode()
            .findTreeChildrenNodes()
            .each((x) => {
            if (x === node)
                return;
            const angle = originalPoint.directionPoint(x.actualBounds.center);
            if (angle < 270 && angle > 90) {
                if (originalPoint.distanceSquaredPoint(x.actualBounds.center) < closestDistance) {
                    closestDistance = originalPoint.distanceSquaredPoint(x.actualBounds.center);
                    closest = x;
                    siblingsLeft.unshift(x);
                }
                else
                    siblingsLeft.push(x);
            }
        });
        if (closest === node)
            return null;
        return siblingsLeft;
    }
    /**
     * For tree layouts.
     * Checks for closest node in the direction of the hit arrow key and selects the node
     * Adds the node to the node movement history
     * If there is no node is checked direction does an aria call letting the user know
     */
    _arrowKeySelectTree() {
        var _a, _b;
        let node = this.diagram.selection.first();
        const e = this.diagram.lastInput;
        if (node === null) {
            const first = this.diagram.nodes.first();
            if (first === null)
                return;
            node = first.findTreeRoot();
            this.diagram.select(node);
            this.history = [];
            this.index = this.history.push(node) - 1;
            this.callAria('No node selected, selecting root node');
            return;
        }
        if (!(node instanceof go.Node))
            return;
        let nextPart = null;
        if (e.code === 'ArrowUp')
            nextPart = (_a = node.findTreeParentNode()) !== null && _a !== void 0 ? _a : 'No parent node';
        else if (e.code === 'ArrowDown') {
            nextPart = (_b = node.findTreeChildrenNodes().first()) !== null && _b !== void 0 ? _b : 'No child node';
        }
        else if (e.code === 'ArrowLeft') {
            const nodes = this._getSiblingNodesLeft(node);
            nextPart = nodes !== null ? nodes[0] : 'No sibling node to the left';
        }
        else if (e.code === 'ArrowRight') {
            const nodes = this._getSiblingNodesRight(node);
            nextPart = nodes !== null ? nodes[0] : 'No sibling node to the right';
        }
        if (nextPart === null)
            return;
        if (typeof nextPart === 'string')
            this.callAria(nextPart);
        else {
            this.history = this.history.slice(0, this.index + 1);
            this.diagram.select(nextPart);
            this.index = this.history.push(nextPart) - 1;
        }
    }
}
