/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/AriaCommandHandler.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

/**
 * This custom CommandHandler is an example of how screen reader accessibility can be added to diagrams with an `aria-live` DIV.
 *
 * This CommandHandler adds more key commands for a user:
 * - Arrow keys: Change selection to a new node, if possible, based on direction/tree realationship/linked nodes. This is added to an internal navigation history.
 * - `b`: Give a description of which nodes are adjacent/connected to the currently selected node
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
class AriaCommandHandler extends go.CommandHandler {
    /**
     * Creates and sets the Aria live region.
     * Defines variables for node selection history and runs setup method.
     *
     * @param {string} mode the mode of the diagram, 'default', 'tree', or 'links'
     *
     * Default mode: Arrow keys change selection to a new node, if possible, based on direction.
     * Tree mode: Arrow keys change selection to a new node, if possible, based on tree relationships.
     * Links mode: Arrow keys change selection to a new node, if possible, based on linked nodes.
     */
    constructor(mode = 'default', init) {
        super();
        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.history = [];
        this.index = 0;
        this.mode = mode; //'default' 'tree' or 'links'
        if (init)
            Object.assign(this, init);
    }
    /**
     * Given a Part, return the text that the aria label should read
     * By default this uses `Part.text`, unless it is empty, then it uses `Part.key`
     * This can be overridden to return arbitrary text based on Part data, etc.
     */
    getPartText(part) {
        if (!(part instanceof go.Part))
            return 'undefined';
        if (part.text)
            return part.text;
        if (part.key)
            return part.key.toString();
        return 'undefined';
    }
    /**
      * This implements custom behaviors for keyboard events.
      * This effects behavior when user types arrow keys, 'b', 'x', and 'c'.
      * @this {AriaCommandHandler}
      */
    doKeyDown() {
        if (this.diagram === null)
            return;
        const e = this.diagram.lastInput;
        const commandKey = e.commandKey;
        if (commandKey === 'ArrowUp' ||
            commandKey === 'ArrowDown' ||
            commandKey === 'ArrowLeft' ||
            commandKey === 'ArrowRight') {
            if (this.mode === 'tree') {
                this._arrowKeySelectTree();
            }
            else if (this.mode === 'links') {
                this._arrowKeySelectLinks();
            }
            else {
                this._arrowKeySelect(commandKey);
            }
        }
        else if (commandKey === 'x') {
            this._goBack();
        }
        else if (commandKey === 'c') {
            this._goForward();
        }
        else if (commandKey === 'KeyB') {
            if (this.mode === 'tree') {
                this.callFamilyTreeNodes();
            }
            else if (this.mode === 'links') {
                this.callLinkedNodes();
            }
            else {
                this.callSurroundingNodes();
            }
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
     * @hidden @internal
     * @param {number} a angle
     * @param {number} dir direction to compare the angle to
     * @return {number} returns the difference between the two angles
     * @static
     */
    static _angleCloseness(a, dir) {
        return Math.min(Math.abs(dir - a), Math.min(Math.abs(dir + 360 - a), Math.abs(dir - 360 - a)));
    }
    /**
     * @hidden @internal
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
     * @hidden @internal
     * For default layouts.
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
     * @hidden @internal
     * For default layouts.
     * Checks for closest node in the direction of the hit arrow key and selects the node
     * Adds the node to the node movement history
     * If there is no node is checked direction completes an aria call letting the user know
     */
    _arrowKeySelect(ekey) {
        let node = this.diagram.selection.first();
        //if no node is currently selected it selects one and clears node history
        if (node === null) {
            node = this.diagram.nodes.first();
            if (node instanceof go.Node) {
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
        if (!(nextPart instanceof go.Node))
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
            this.callAria(this.getPartText(nextPart));
        }
    }
    /**
     * @hidden @internal
     * Checks if the currently selected node is the furthest part of the history
     * Selects the previous node in the history array
     */
    _goBack() {
        if (this.index === 0)
            return;
        this.diagram.select(this.history[this.index - 1]);
        this.index--;
    }
    /**
     * @hidden @internal
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
      * For tree layouts.
      * Checks for parent, sibling, and child nodes and build a message to be called based on
      * if there is and which nodes are around the currently selected one
      */
    callFamilyTreeNodes() {
        let message = '';
        const node = this.diagram.selection.first();
        if (node === null || !(node instanceof go.Node)) {
            this.callAria('No node selected');
            return;
        }
        const parent = node.findTreeParentNode();
        const children = node.findTreeChildrenNodes();
        const nextSiblings = this._getNextSiblingNodes(node);
        const previousSiblings = this._getPreviousSiblingNodes(node);
        message += (parent != null ? this.getPartText(parent) + ' is the parent. ' : 'No parent node.');
        children.each(child => message += this.getPartText(child) + ' is a child. ');
        if (nextSiblings !== null)
            nextSiblings.forEach(sibling => message += this.getPartText(sibling) + ' is a next sibling. ');
        if (previousSiblings !== null)
            previousSiblings.forEach(sibling => message += this.getPartText(sibling) + ' is a previous sibling. ');
        this.callAria(message);
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
     * @hidden @internal
     * For tree layouts.
     * Checks for and returns the next sibling nodes of the currently selected node.
     * All nodes next from the currently selected node will be in the array and first element is the next node.
     * @param {go.Node}
     * @return {null || Array<go.Part>} returns null if there is no next sibling node
     */
    _getNextSiblingNodes(node) {
        if (!(node instanceof go.Node))
            return null;
        if (node.findTreeParentNode() === null)
            return null;
        let nodes = [];
        node.findTreeParentNode().findTreeChildrenNodes().each(n => nodes.push(n));
        nodes = nodes.slice(nodes.indexOf(node) + 1);
        return (nodes.length > 0) ? nodes : null;
    }
    /**
     * @hidden @internal
     * For tree layouts.
     * Checks for and returns the previous sibling nodes of the currently selected node.
     * All nodes previous of the currently selected node will be in the array and first element is the previous node.
     * @param {go.Node} node
     * @return {null || Array<go.Part>} returns null if there is no previous sibling node
     */
    _getPreviousSiblingNodes(node) {
        if (!(node instanceof go.Node))
            return null;
        if (node.findTreeParentNode() === null)
            return null;
        let nodes = [];
        node.findTreeParentNode().findTreeChildrenNodes().each(n => nodes.push(n));
        nodes = nodes.slice(0, nodes.indexOf(node)).reverse();
        return (nodes.length > 0) ? nodes : null;
    }
    /**
     * @hidden @internal
     * For tree layouts.
     * Checks for closest node in the direction of the hit arrow key and selects the node
     * Adds the node to the node movement history
     * If there is no node is checked direction does an aria call letting the user know
     */
    _arrowKeySelectTree() {
        let _a = null;
        let _c = null;
        let node = this.diagram.selection.first();
        const e = this.diagram.lastInput;
        if (node === null) {
            const first = this.diagram.nodes.first();
            if (first === null)
                return;
            node = first.findTreeRoot();
            if (!(node instanceof go.Node))
                return;
            this.diagram.select(node);
            this.history = [];
            this.index = this.history.push(node) - 1;
            this.callAria('No node selected, selecting root node');
            return;
        }
        if (!(node instanceof go.Node))
            return;
        let nextPart = null;
        if (e.code === 'ArrowUp') {
            nextPart = (_a = node.findTreeParentNode()) ? _a : 'No parent node';
        }
        else if (e.code === 'ArrowDown') {
            nextPart = (_a = node.findTreeChildrenNodes().first()) ? _a : 'No child node';
        }
        else if (e.code === 'ArrowLeft') {
            nextPart = (_c = this._getPreviousSiblingNodes(node)) ? _c[0] : 'No previous sibling node';
        }
        else if (e.code === 'ArrowRight') {
            nextPart = (_c = this._getNextSiblingNodes(node)) ? _c[0] : 'No next sibling node';
        }
        if (nextPart === null)
            return;
        if (typeof nextPart === 'string')
            this.callAria(nextPart);
        else {
            this.history = this.history.slice(0, this.index + 1);
            this.diagram.select(nextPart);
            this.index = this.history.push(nextPart) - 1;
            this.callAria(this.getPartText(nextPart));
        }
    }
    /**
     * @hidden @internal
     * For links layouts.
     * Checks if selected node is recorded node and if so selects the first linked node
     * If already selecting a linked node, gets array of linked nodes and selects the next one
     * If there is no next linked node does an aria call letting the user know
     */
    _linkSelectionForward() {
        const linkedNodes = [];
        const node = this.history[this.index];
        const selectedNode = this.diagram.selection.first();
        if (!(selectedNode instanceof go.Node && node instanceof go.Node))
            return;
        node.findNodesConnected().each(x => linkedNodes.push(x));
        if (linkedNodes.length === 0)
            return null;
        if (node === selectedNode) {
            return linkedNodes[0];
        }
        else {
            const index = linkedNodes.indexOf(selectedNode);
            if (index === linkedNodes.length - 1)
                return linkedNodes[0];
            else
                return linkedNodes[index + 1];
        }
    }
    /**
     * @hidden @internal
     * For links layouts.
     * Checks if selected node is recorded node and if so selects the first linked node
     * If already selecting a linked node, gets array of linked nodes and selects the previous one
     * If there is no previous linked node does an aria call letting the user know
     */
    _linkSelectionBack() {
        const linkedNodes = [];
        const node = this.history[this.index];
        const selectedNode = this.diagram.selection.first();
        if (!(selectedNode instanceof go.Node))
            return;
        node.findNodesConnected().each(x => linkedNodes.push(x));
        if (linkedNodes.length === 0)
            return null;
        if (node === selectedNode) {
            return linkedNodes[0];
        }
        else {
            const index = linkedNodes.indexOf(selectedNode);
            if (index === 0)
                return linkedNodes[linkedNodes.length - 1];
            else
                return linkedNodes[index - 1];
        }
    }
    /**
     * For links layouts.
     * Checks for linked nodes and build a message to be called based on
     * if there is and which nodes are around the currently selected one
     */
    callLinkedNodes() {
        let message = '';
        const node = this.diagram.selection.first();
        if (!(node instanceof go.Node)) {
            this.callAria('No node selected');
            return;
        }
        if (node.findNodesConnected().count === 0) {
            this.callAria('No linked nodes');
            return;
        }
        message += 'Linked to node ' + this.getPartText(node) + ' are: ';
        node.findNodesConnected().each(n => message += this.getPartText(n) + ', ');
        this.callAria(message);
    }
    /**
     * @hidden @internal
     * For links layouts.
     * Checks for closest node in the direction of the hit arrow key and selects the node
     * Adds the node to the node movement history
     * If there is no node is checked direction does an aria call letting the user know
     */
    _arrowKeySelectLinks() {
        const node = this.diagram.selection.first();
        const e = this.diagram.lastInput;
        if (!(node instanceof go.Node) || this.history.length === 0) {
            const first = this.diagram.nodes.first();
            if (!(first instanceof go.Node))
                return;
            this.diagram.select(first);
            this.history = [];
            this.index = this.history.push(first) - 1;
            this.callAria('Selecting root node');
            return;
        }
        let nextPart = null;
        if (e.code === 'ArrowUp') {
            if (this.history[this.index] === node)
                return;
            this.history = this.history.slice(0, this.index + 1);
            this.index = this.history.push(node) - 1;
        }
        else if (e.code === 'ArrowDown') {
            this.diagram.select(this.history[this.index]);
        }
        else if (e.code === 'ArrowLeft') {
            nextPart = this._linkSelectionBack();
        }
        else if (e.code === 'ArrowRight') {
            nextPart = this._linkSelectionForward();
        }
        if (typeof nextPart === 'string')
            this.callAria(nextPart);
        if (!(nextPart instanceof go.Node))
            return;
        else {
            if (!(this.mode === 'links')) {
                this.history = this.history.slice(0, this.index + 1);
                this.index = this.history.push(nextPart) - 1;
            }
            this.diagram.select(nextPart);
            this.callAria(this.getPartText(nextPart));
        }
    }
}
