/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/DrawCommandHandler.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */
import * as go from 'gojs';
/**
 * This CommandHandler class allows the user to position selected Parts in a diagram
 * relative to the first part selected, in addition to overriding the doKeyDown method
 * of the CommandHandler for handling the arrow keys in additional manners.
 *
 * Typical usage:
 * ```js
 *   new go.Diagram("myDiagramDiv",
 *     {
 *       commandHandler: new DrawCommandHandler(),
 *       . . .
 *     }
 *   )
 * ```
 * or:
 * ```js
 *    myDiagram.commandHandler = new DrawCommandHandler();
 * ```
 *
 * If you want to experiment with this extension, try the <a href="../../samples/DrawCommandHandler.html">Drawing Commands</a> sample.
 *
 * New in version 3.1 this adds a command to save the model as a text file in the user's local file system,
 * typically in their Downloads folder, {@link saveLocalFile}.
 * And it adds a method for loading a File: {@link loadLocalFile}.
 *
 * There are two optional properties that can be used for calling {@link loadLocalFile}:
 * {@link localFileInput} and {@link localFileDropElement}.
 * The former may be a file type HTMLInputElement that you have on your page;
 * the latter may be an HTMLElement, or even the whole document.body, where the user may drag-and-drop a saved file.
 *
 * The default file type for files is controlled by {@link localFileType}.
 * @category Extension
 */
export class DrawCommandHandler extends go.CommandHandler {
    constructor(init) {
        super();
        this._arrowKeyBehavior = 'move';
        this._pasteOffset = new go.Point(10, 10);
        this._lastPasteOffset = new go.Point(0, 0);
        this._localFileType = 'gojs';
        this._localFileDropElement = null;
        this._preventPropagation = (e) => {
            e.stopPropagation();
            e.preventDefault();
        };
        this._handleDrop = (e) => {
            var _a;
            this._preventPropagation(e);
            const files = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
            if (files && files.length > 0) {
                this.diagram.focus();
                this.loadLocalFile(files[0], this.loader);
            }
        };
        this._localFileInput = null;
        this._handleFileInputChange = (e) => {
            var _a;
            const files = (_a = this._localFileInput) === null || _a === void 0 ? void 0 : _a.files;
            if (files && files.length > 0) {
                this.diagram.focus();
                this.loadLocalFile(files[0], this.loader);
            }
        };
        this._loader = null;
        if (init)
            Object.assign(this, init);
    }
    /**
     * Gets or sets the arrow key behavior. Possible values are "move", "select", "scroll", "tree", "none", and "default".
     *
     * The default value is "move".
     * Set this property to "default" in order to make use of the additional commands in this class
     * without affecting the arrow key behaviors.
     *
     * Note that this functionality is different from the focus navigation behavior of the {@link CommandHandler}
     * that was added in version 3.1 and enabled by the {@link CommandHandler.isFocusEnabled} property.
     * In this DrawCommandHandler the arrow keys for the "move", "select" or "tree" behaviors
     * depend on and modify the {@link Diagram.selection}.  The built-in focus navigation is completely independent
     * of the selection mechanism.
     */
    get arrowKeyBehavior() {
        return this._arrowKeyBehavior;
    }
    set arrowKeyBehavior(val) {
        if (val !== 'move' &&
            val !== 'select' &&
            val !== 'scroll' &&
            val !== 'none' &&
            val !== 'tree') {
            throw new Error('DrawCommandHandler.arrowKeyBehavior must be either "move", "select", "scroll", "tree", or "none", not: ' +
                val);
        }
        this._arrowKeyBehavior = val;
    }
    /**
     * Gets or sets the offset at which each repeated {@link pasteSelection} puts the new copied parts from the clipboard.
     */
    get pasteOffset() {
        return this._pasteOffset;
    }
    set pasteOffset(val) {
        if (!(val instanceof go.Point))
            throw new Error('DrawCommandHandler.pasteOffset must be a Point, not: ' + val);
        this._pasteOffset.set(val);
    }
    /**
     * This controls whether or not the user can invoke the {@link alignLeft}, {@link alignRight},
     * {@link alignTop}, {@link alignBottom}, {@link alignCenterX}, {@link alignCenterY} commands.
     * @returns This returns true:
     *                   if the diagram is not {@link go.Diagram.isReadOnly},
     *                   if the model is not {@link go.Model.isReadOnly}, and
     *                   if there are at least two selected {@link go.Part}s.
     */
    canAlignSelection() {
        const diagram = this.diagram;
        if (diagram.isReadOnly || diagram.isModelReadOnly)
            return false;
        if (diagram.selection.count < 2)
            return false;
        return true;
    }
    /**
     * Aligns selected parts along the left-most edge of the left-most part.
     */
    alignLeft() {
        const diagram = this.diagram;
        diagram.startTransaction('aligning left');
        let minPosition = Infinity;
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over go.Link
            minPosition = Math.min(current.position.x, minPosition);
        });
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over go.Link
            current.moveTo(minPosition, current.position.y);
        });
        diagram.commitTransaction('aligning left');
    }
    /**
     * Aligns selected parts at the right-most edge of the right-most part.
     */
    alignRight() {
        const diagram = this.diagram;
        diagram.startTransaction('aligning right');
        let maxPosition = -Infinity;
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over go.Link
            const rightSideLoc = current.actualBounds.x + current.actualBounds.width;
            maxPosition = Math.max(rightSideLoc, maxPosition);
        });
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over go.Link
            current.moveTo(maxPosition - current.actualBounds.width, current.position.y);
        });
        diagram.commitTransaction('aligning right');
    }
    /**
     * Aligns selected parts at the top-most edge of the top-most part.
     */
    alignTop() {
        const diagram = this.diagram;
        diagram.startTransaction('alignTop');
        let minPosition = Infinity;
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over go.Link
            minPosition = Math.min(current.position.y, minPosition);
        });
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over go.Link
            current.moveTo(current.position.x, minPosition);
        });
        diagram.commitTransaction('alignTop');
    }
    /**
     * Aligns selected parts at the bottom-most edge of the bottom-most part.
     */
    alignBottom() {
        const diagram = this.diagram;
        diagram.startTransaction('aligning bottom');
        let maxPosition = -Infinity;
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over go.Link
            const bottomSideLoc = current.actualBounds.y + current.actualBounds.height;
            maxPosition = Math.max(bottomSideLoc, maxPosition);
        });
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over go.Link
            current.moveTo(current.actualBounds.x, maxPosition - current.actualBounds.height);
        });
        diagram.commitTransaction('aligning bottom');
    }
    /**
     * Aligns selected parts at the x-value of the center point of the first selected part.
     */
    alignCenterX() {
        const diagram = this.diagram;
        const firstSelection = diagram.selection.first();
        if (!firstSelection)
            return;
        diagram.startTransaction('aligning Center X');
        const centerX = firstSelection.actualBounds.x + firstSelection.actualBounds.width / 2;
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over go.Link
            current.moveTo(centerX - current.actualBounds.width / 2, current.actualBounds.y);
        });
        diagram.commitTransaction('aligning Center X');
    }
    /**
     * Aligns selected parts at the y-value of the center point of the first selected part.
     */
    alignCenterY() {
        const diagram = this.diagram;
        const firstSelection = diagram.selection.first();
        if (!firstSelection)
            return;
        diagram.startTransaction('aligning Center Y');
        const centerY = firstSelection.actualBounds.y + firstSelection.actualBounds.height / 2;
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over go.Link
            current.moveTo(current.actualBounds.x, centerY - current.actualBounds.height / 2);
        });
        diagram.commitTransaction('aligning Center Y');
    }
    /**
     * Aligns selected parts top-to-bottom in order of the order selected.
     * Distance between parts can be specified. Default distance is 0.
     */
    alignColumn(distance) {
        if (distance === undefined)
            distance = 0; // for aligning edge to edge
        const diagram = this.diagram;
        const firstSelection = diagram.selection.first();
        if (!firstSelection)
            return;
        diagram.startTransaction('aligning Column');
        const centerX = firstSelection.actualBounds.centerX;
        let y = firstSelection.actualBounds.top;
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over links
            current.moveTo(centerX - current.actualBounds.width / 2, y);
            y += current.actualBounds.height + distance;
        });
        diagram.commitTransaction('aligning Column');
    }
    /**
     * Aligns selected parts left-to-right in order of the order selected.
     * Distance between parts can be specified. Default distance is 0.
     */
    alignRow(distance) {
        if (distance === undefined)
            distance = 0; // for aligning edge to edge
        const diagram = this.diagram;
        const firstSelection = diagram.selection.first();
        if (!firstSelection)
            return;
        diagram.startTransaction('aligning Row');
        const centerY = firstSelection.actualBounds.centerY;
        let x = firstSelection.actualBounds.left;
        diagram.selection.each((current) => {
            if (current instanceof go.Link)
                return; // skips over links
            current.moveTo(x, centerY - current.actualBounds.height / 2);
            x += current.actualBounds.width + distance;
        });
        diagram.commitTransaction('aligning Row');
    }
    /**
     * Position each selected non-Link horizontally so that each distance between them is the same,
     * given the total width of the area occupied by them.
     * Their Y positions are not modified.
     * It tries to maintain the same ordering of selected Parts by their X position.
     *
     * Note that if there is not enough room, the spacing might be negative -- the Parts might overlap.
     */
    spaceEvenlyHorizontally() {
        const diagram = this.diagram;
        const nonlinks = new go.List();
        diagram.selection.each((part) => {
            if (part instanceof go.Link)
                return; // skips over links
            nonlinks.add(part); // maybe check for non-movable Parts??
        });
        if (nonlinks.count <= 1)
            return;
        const b = diagram.computePartsBounds(nonlinks);
        if (!b.isReal())
            return;
        nonlinks.sort((n, m) => n.actualBounds.x - m.actualBounds.x);
        let w = 0;
        nonlinks.each((part) => (w += part.actualBounds.width));
        const sp = (b.width - w) / (nonlinks.count - 1); // calculate available space between nodes; might be negative
        diagram.startTransaction('space evenly horizontally');
        let x = b.x;
        nonlinks.each((part) => {
            part.moveTo(x, part.actualBounds.y);
            x += part.actualBounds.width + sp;
        });
        diagram.commitTransaction('space evenly horizontally');
    }
    /**
     * Position each selected non-Link vertically so that each distance between them is the same,
     * given the total height of the area occupied by them.
     * Their X positions are not modified.
     * It tries to maintain the same ordering of selected Parts by their Y position.
     *
     * Note that if there is not enough room, the spacing might be negative -- the Parts might overlap.
     */
    spaceEvenlyVertically() {
        const diagram = this.diagram;
        const nonlinks = new go.List();
        diagram.selection.each((part) => {
            if (part instanceof go.Link)
                return; // skips over links
            nonlinks.add(part); // maybe check for non-movable Parts??
        });
        if (nonlinks.count <= 1)
            return;
        const b = diagram.computePartsBounds(nonlinks);
        if (!b.isReal())
            return;
        nonlinks.sort((n, m) => n.actualBounds.y - m.actualBounds.y);
        let h = 0;
        nonlinks.each((part) => (h += part.actualBounds.height));
        const sp = (b.height - h) / (nonlinks.count - 1); // calculate available space between nodes; might be negative
        diagram.startTransaction('space evenly vertically');
        let y = b.y;
        nonlinks.each((part) => {
            part.moveTo(part.actualBounds.x, y);
            y += part.actualBounds.height + sp;
        });
        diagram.commitTransaction('space evenly vertically');
    }
    /**
     * This controls whether or not the user can invoke the {@link rotate} command.
     * @returns This returns true:
     *                   if the diagram is not {@link go.Diagram.isReadOnly},
     *                   if the model is not {@link go.Model.isReadOnly}, and
     *                   if there is at least one selected {@link go.Part}.
     */
    canRotate() {
        const diagram = this.diagram;
        if (diagram.isReadOnly || diagram.isModelReadOnly)
            return false;
        if (diagram.selection.count < 1)
            return false;
        return true;
    }
    /**
     * Change the angle of the parts connected with the given part. This is in the command handler
     * so it can be easily accessed for the purpose of creating commands that change the rotation of a part.
     * @param angle - the positive (clockwise) or negative (counter-clockwise) change in the rotation angle of each Part, in degrees.
     */
    rotate(angle) {
        if (angle === undefined)
            angle = 90;
        const diagram = this.diagram;
        diagram.startTransaction('rotate ' + angle.toString());
        diagram.selection.each((current) => {
            if (current instanceof go.Link || current instanceof go.Group)
                return; // skips over Links and Groups
            current.angle += angle;
        });
        diagram.commitTransaction('rotate ' + angle.toString());
    }
    /**
     * Change the z-ordering of selected parts to pull them forward, in front of all other parts
     * in their respective layers.
     * All unselected parts in each layer with a selected Part with a non-numeric {@link go.Part.zOrder} will get a zOrder of zero.
     */
    pullToFront() {
        const diagram = this.diagram;
        diagram.startTransaction('pullToFront');
        // find the affected Layers
        const layers = new Map();
        diagram.selection.each((part) => {
            if (part.layer !== null)
                layers.set(part.layer, 0);
        });
        // find the maximum zOrder in each Layer
        for (const layer of layers.keys()) {
            let max = 0;
            layer.parts.each((part) => {
                if (part.isSelected)
                    return;
                const z = part.zOrder;
                if (isNaN(z)) {
                    part.zOrder = 0;
                }
                else {
                    max = Math.max(max, z);
                }
            });
            layers.set(layer, max);
        }
        // assign each selected Part.zOrder to the computed value for each Layer
        diagram.selection.each((part) => {
            const z = layers.get(part.layer) || 0;
            DrawCommandHandler._assignZOrder(part, z + 1);
        });
        diagram.commitTransaction('pullToFront');
    }
    /**
     * Change the z-ordering of selected parts to push them backward, behind of all other parts
     * in their respective layers.
     * All unselected parts in each layer with a selected Part with a non-numeric {@link go.Part.zOrder} will get a zOrder of zero.
     */
    pushToBack() {
        const diagram = this.diagram;
        diagram.startTransaction('pushToBack');
        // find the affected Layers
        const layers = new Map();
        diagram.selection.each((part) => {
            if (part.layer !== null)
                layers.set(part.layer, 0);
        });
        // find the minimum zOrder in each Layer
        for (const layer of layers.keys()) {
            let min = 0;
            layer.parts.each((part) => {
                if (part.isSelected)
                    return;
                const z = part.zOrder;
                if (isNaN(z)) {
                    part.zOrder = 0;
                }
                else {
                    min = Math.min(min, z);
                }
            });
            layers.set(layer, min);
        }
        // assign each selected Part.zOrder to the computed value for each Layer
        diagram.selection.each((part) => {
            const z = layers.get(part.layer) || 0;
            DrawCommandHandler._assignZOrder(part, 
            // make sure a group's nested nodes are also behind everything else
            z - 1 - DrawCommandHandler._findGroupDepth(part));
        });
        diagram.commitTransaction('pushToBack');
    }
    static _assignZOrder(part, z, root) {
        if (root === undefined)
            root = part;
        if (part.layer === root.layer)
            part.zOrder = z;
        if (part instanceof go.Group) {
            part.memberParts.each((m) => {
                DrawCommandHandler._assignZOrder(m, z + 1, root);
            });
        }
    }
    static _findGroupDepth(part) {
        if (part instanceof go.Group) {
            let d = 0;
            part.memberParts.each((m) => {
                d = Math.max(d, DrawCommandHandler._findGroupDepth(m));
            });
            return d + 1;
        }
        else {
            return 0;
        }
    }
    /**
     * This implements custom behaviors for arrow key keyboard events.
     * Set {@link arrowKeyBehavior} to "select", "move" (the default), "scroll" (the standard behavior), or "none"
     * to affect the behavior when the user types an arrow key.
     * Set that property to "default" in order to make use of the additional commands in this class
     * without affecting the arrow key behaviors.
     *
     * Note that this functionality is different from the focus navigation behavior of the {@link CommandHandler}
     * that was added in version 3.1 and enabled by the {@link CommandHandler.isFocusEnabled} property.
     * In this DrawCommandHandler the arrow keys for the "move", "select" or "tree" behaviors
     * depend on and modify the {@link Diagram.selection}.  The built-in focus navigation is completely independent
     * of the selection mechanism.
     */
    doKeyDown() {
        const diagram = this.diagram;
        const e = diagram.lastInput;
        // determines the function of the arrow keys
        if (e.code === 'ArrowUp' ||
            e.code === 'ArrowDown' ||
            e.code === 'ArrowLeft' ||
            e.code === 'ArrowRight') {
            const behavior = this.arrowKeyBehavior;
            if (behavior === 'none') {
                // no-op
                return;
            }
            else if (behavior === 'select') {
                this._arrowKeySelect();
                return;
            }
            else if (behavior === 'move') {
                this._arrowKeyMove();
                return;
            }
            else if (behavior === 'tree') {
                this._arrowKeyTree();
                return;
            }
            // otherwise drop through to get the default scrolling behavior
        }
        // otherwise still does all standard commands
        super.doKeyDown();
    }
    /**
     * Collects in an Array all of the non-Link Parts currently in the Diagram.
     */
    _getAllParts() {
        const allParts = new Array();
        this.diagram.nodes.each((node) => {
            allParts.push(node);
        });
        this.diagram.parts.each((part) => {
            allParts.push(part);
        });
        // note that this ignores Links
        return allParts;
    }
    /**
     * To be called when arrow keys should move the Diagram.selection.
     */
    _arrowKeyMove() {
        const diagram = this.diagram;
        const e = diagram.lastInput;
        // moves all selected parts in the specified direction
        let vdistance = 0;
        let hdistance = 0;
        // if control is being held down, move pixel by pixel. Else, moves by grid cell size
        if (e.control || e.meta) {
            vdistance = 1;
            hdistance = 1;
        }
        else if (diagram.grid !== null) {
            const cellsize = diagram.grid.gridCellSize;
            hdistance = cellsize.width;
            vdistance = cellsize.height;
        }
        diagram.startTransaction('arrowKeyMove');
        diagram.selection.each((part) => {
            if (e.code === 'ArrowUp') {
                part.moveTo(part.actualBounds.x, part.actualBounds.y - vdistance);
            }
            else if (e.code === 'ArrowDown') {
                part.moveTo(part.actualBounds.x, part.actualBounds.y + vdistance);
            }
            else if (e.code === 'ArrowLeft') {
                part.moveTo(part.actualBounds.x - hdistance, part.actualBounds.y);
            }
            else if (e.code === 'ArrowRight') {
                part.moveTo(part.actualBounds.x + hdistance, part.actualBounds.y);
            }
        });
        diagram.commitTransaction('arrowKeyMove');
    }
    /**
     * To be called when arrow keys should change selection.
     */
    _arrowKeySelect() {
        const diagram = this.diagram;
        const e = diagram.lastInput;
        // with a part selected, arrow keys change the selection
        // arrow keys + shift selects the additional part in the specified direction
        // arrow keys + control toggles the selection of the additional part
        let nextPart = null;
        if (e.code === 'ArrowUp') {
            nextPart = this._findNearestPartTowards(270);
        }
        else if (e.code === 'ArrowDown') {
            nextPart = this._findNearestPartTowards(90);
        }
        else if (e.code === 'ArrowLeft') {
            nextPart = this._findNearestPartTowards(180);
        }
        else if (e.code === 'ArrowRight') {
            nextPart = this._findNearestPartTowards(0);
        }
        if (nextPart !== null) {
            if (e.shift) {
                nextPart.isSelected = true;
            }
            else if (e.control || e.meta) {
                nextPart.isSelected = !nextPart.isSelected;
            }
            else {
                diagram.select(nextPart);
            }
        }
    }
    /**
     * Finds the nearest selectable Part in the specified direction, based on their center points.
     * if it doesn't find anything, it just returns the current Part.
     * @param dir - the direction, in degrees
     * @returns the closest Part found in the given direction
     */
    _findNearestPartTowards(dir) {
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
            const anglediff = this._angleCloseness(angle, dir);
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
        return closest;
    }
    _angleCloseness(a, dir) {
        return Math.min(Math.abs(dir - a), Math.min(Math.abs(dir + 360 - a), Math.abs(dir - 360 - a)));
    }
    /**
     * To be called when arrow keys should change the selected node in a tree and expand or collapse subtrees.
     */
    _arrowKeyTree() {
        const diagram = this.diagram;
        let selected = diagram.selection.first();
        if (!(selected instanceof go.Node))
            return;
        const e = diagram.lastInput;
        if (e.code === 'ArrowRight') {
            if (selected.isTreeLeaf) {
                // no-op
            }
            else if (!selected.isTreeExpanded) {
                if (diagram.commandHandler.canExpandTree(selected)) {
                    diagram.commandHandler.expandTree(selected); // expands the tree
                }
            }
            else {
                // already expanded -- select the first child node
                const first = this._sortTreeChildrenByY(selected).first();
                if (first !== null)
                    diagram.select(first);
            }
        }
        else if (e.code === 'ArrowLeft') {
            if (!selected.isTreeLeaf && selected.isTreeExpanded) {
                if (diagram.commandHandler.canCollapseTree(selected)) {
                    diagram.commandHandler.collapseTree(selected); // collapses the tree
                }
            }
            else {
                // either a leaf or is already collapsed -- select the parent node
                const parent = selected.findTreeParentNode();
                if (parent !== null)
                    diagram.select(parent);
            }
        }
        else if (e.code === 'ArrowUp') {
            const parent = selected.findTreeParentNode();
            if (parent !== null) {
                const list = this._sortTreeChildrenByY(parent);
                const idx = list.indexOf(selected);
                if (idx > 0) {
                    // if there is a previous sibling
                    let prev = list.elt(idx - 1);
                    // keep looking at the last child until it's a leaf or collapsed
                    while (prev !== null && prev.isTreeExpanded && !prev.isTreeLeaf) {
                        const children = this._sortTreeChildrenByY(prev);
                        prev = children.last();
                    }
                    if (prev !== null)
                        diagram.select(prev);
                }
                else {
                    // no previous sibling -- select parent
                    diagram.select(parent);
                }
            }
        }
        else if (e.code === 'ArrowDown') {
            // if at an expanded parent, select the first child
            if (selected.isTreeExpanded && !selected.isTreeLeaf) {
                const first = this._sortTreeChildrenByY(selected).first();
                if (first !== null)
                    diagram.select(first);
            }
            else {
                while (selected instanceof go.Node) {
                    const parent = selected.findTreeParentNode();
                    if (parent === null)
                        break;
                    const list = this._sortTreeChildrenByY(parent);
                    const idx = list.indexOf(selected);
                    if (idx < list.length - 1) {
                        // select next lower node
                        diagram.select(list.elt(idx + 1));
                        break;
                    }
                    else {
                        // already at bottom of list of children
                        selected = parent;
                    }
                }
            }
        }
        // make sure the selection is now in the viewport, but not necessarily centered
        const sel = diagram.selection.first();
        if (sel !== null)
            diagram.scrollToRect(sel.actualBounds);
    }
    _sortTreeChildrenByY(node) {
        const list = new go.List().addAll(node.findTreeChildrenNodes());
        list.sort((a, b) => {
            const aloc = a.location;
            const bloc = b.location;
            if (aloc.y < bloc.y)
                return -1;
            if (aloc.y > bloc.y)
                return 1;
            if (aloc.x < bloc.x)
                return -1;
            if (aloc.x > bloc.x)
                return 1;
            return 0;
        });
        return list;
    }
    /**
     * Reset the last offset for pasting.
     * @param coll - a collection of {@link go.Part}s.
     */
    copyToClipboard(coll) {
        super.copyToClipboard(coll);
        this._lastPasteOffset.set(this.pasteOffset);
    }
    /**
     * Paste from the clipboard with an offset incremented on each paste, and reset when copied.
     * @returns a collection of newly pasted {@link go.Part}s
     */
    pasteFromClipboard() {
        const coll = super.pasteFromClipboard();
        this.diagram.moveParts(coll, this._lastPasteOffset, false);
        this._lastPasteOffset.add(this.pasteOffset);
        return coll;
    }
    // Saving and loading Models as files on local file system
    /** @hidden @internal */
    saveFile(name, mimetype, contents) {
        let url = null;
        let a = null;
        try {
            const blob = new Blob([contents], { type: mimetype });
            url = window.URL.createObjectURL(blob);
            a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            requestAnimationFrame(() => {
                try {
                    if (a !== null)
                        a.click();
                }
                finally {
                    if (url !== null)
                        window.URL.revokeObjectURL(url);
                    if (a !== null)
                        document.body.removeChild(a);
                }
            });
        }
        catch (ex) {
            if (url !== null)
                window.URL.revokeObjectURL(url);
            if (a !== null)
                document.body.removeChild(a);
        }
    }
    /**
     * This command downloads a text file that holds this diagram's model as JSON-formatted text.
     *
     * This calls {@link Model.toJson}.
     * @param options an optional file name (defaults to {@link Model.name}.{@link localFileType}) and
     * an optional MIME type (defaults to "application/text")
     * @since 3.1
     */
    saveLocalFile(options) {
        const diagram = this.diagram;
        let name = options === null || options === void 0 ? void 0 : options.name;
        if (!name)
            name = this.defaultFilename();
        let type = options === null || options === void 0 ? void 0 : options.mimetype;
        if (!type)
            type = 'application/text';
        const text = diagram.model.toJson();
        diagram.isModified = false;
        this.saveFile(name, type, text);
    }
    /**
     * This predicate controls whether or not the user can invoke the {@link saveLocalFile} command.
     *
     * @returns true, by default
     * @since 3.1
     */
    canSaveLocalFile() {
        const diagram = this.diagram;
        return diagram !== null;
    }
    /** @hidden @internal */
    defaultFilename() {
        const filetypeending = '.' + this.localFileType;
        let name = this.diagram.model.name;
        if (!name) {
            name = 'diagram';
        }
        else if (name.endsWith(filetypeending)) {
            name = name.substring(0, name.length - filetypeending.length);
        }
        name += filetypeending;
        return name;
    }
    /**
     * Gets or sets the default file type for locally saved files.
     * The default value is "gojs".
     * Setting this property does not raise any events.
     * @since 3.1
     */
    get localFileType() { return this._localFileType; }
    set localFileType(t) { this._localFileType = t || ''; }
    /**
     * This method loads a text file that the user chooses or drops that holds this diagram's model as JSON-formatted text,
     * normally saved via {@link saveLocalFile}.
     *
     * This calls {@link Model.fromJson}.
     * This is called by the "change" event of the {@link localFileInput} element (if present) or
     * the "drop" event of the {@link localFileDropElement} (if present).
     *
     * The file type of the File.name must match the {@link localFileType}, or it must not have a file type.
     * @param file a File instance from which to read the JSON-formatted text
     * @param loader an optional function that sets {@link Diagram.model}, perhaps modifying the model first,
     * and perhaps doing other updates after assigning the given Model to the given Diagram.
     * @since 3.1
     */
    loadLocalFile(file, loader) {
        const diagram = this.diagram;
        let type = '';
        let name = file.name;
        const lastdot = name.lastIndexOf('.');
        if (lastdot > 0) {
            type = name.substring(lastdot + 1).toLowerCase();
            name = name.substring(0, lastdot);
        }
        if (type === '' || type === this.localFileType) {
            diagram.currentCursor = 'progress';
            requestAnimationFrame(() => {
                const reader = new FileReader();
                reader.onload = e => {
                    var _a;
                    if (typeof ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) === 'string') {
                        const newmodel = go.Model.fromJson(e.target.result);
                        if (loader) {
                            loader(diagram, newmodel, name);
                        }
                        else {
                            if (!newmodel.name)
                                newmodel.name = name;
                            diagram.model = newmodel;
                        }
                    }
                };
                reader.readAsText(file);
            });
        }
    }
    /**
     * Gets or sets an HTMLElement so that the user can load a file saved by {@link saveLocalFile}
     * by drag-and-dropping it on this element.
     *
     * By default the value is null -- there is no such element.
     * Setting this property does not raise any events or modify the DOM, but does add or remove listeners,
     * including a "drop" listener that actually calls {@link loadLocalFile} and {@link Diagram.focus}.
     *
     * If you want to support drag-and-drop loading of files,
     * you will need to add the element to your page and set this property.
     * @see {@link localFileInput}
     * @since 3.1
     */
    get localFileDropElement() { return this._localFileDropElement; }
    set localFileDropElement(val) {
        const old = this._localFileDropElement;
        if (old != val) {
            if (old) {
                old.removeEventListener('dragenter', this._preventPropagation);
                old.removeEventListener('dragover', this._preventPropagation);
                old.removeEventListener('drop', this._handleDrop);
            }
            this._localFileDropElement = val;
            if (val) {
                val.addEventListener('dragenter', this._preventPropagation);
                val.addEventListener('dragover', this._preventPropagation);
                val.addEventListener('drop', this._handleDrop);
            }
        }
    }
    /**
     * Gets or sets an HTMLInputElement so that the user can load a file saved by {@link saveLocalFile}
     * by using the browser's file picker user interface.
     *
     * By default the value is null -- there is no such input element.
     * Setting this property does not raise any events or modify the DOM, but does add or remove a "change" listener
     * that actually calls {@link loadLocalFile} and {@link Diagram.focus}.
     *
     * If you want to support the user's picking of a file to load,
     * you will need to add an &lt;input type="file"&gt; element to your page and set this property.
     * It is moderately common to have this input element be hidden and invoke the input file picker by programmatically
     * calling <code>click()</code> on the element.
     * @see {@link localFileDropElement}
     * @since 3.1
     */
    get localFileInput() { return this._localFileInput; }
    set localFileInput(val) {
        const old = this._localFileInput;
        if (old !== val) {
            if (old) {
                old.removeEventListener('change', this._handleFileInputChange);
            }
            this._localFileInput = val;
            if (val) {
                //val.value = '';
                val.addEventListener('change', this._handleFileInputChange, false);
            }
        }
    }
    /**
     * Gets or sets a function that is used to set {@link Diagram.model}.
     * It can do more things before and/or after the actual setting of {@link Diagram.model}.
     *
     * The default value is null.
     * Setting this property does not raise any events.
     *
     * If non-null, the function is called by {@link loadLocalFile}.
     */
    get loader() { return this._loader; }
    set loader(func) { this._loader = func; }
}
