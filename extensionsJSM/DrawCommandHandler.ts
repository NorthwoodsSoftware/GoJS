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
 * @category Extension
 */
export class DrawCommandHandler extends go.CommandHandler {
  private _arrowKeyBehavior: string;
  private _pasteOffset: go.Point;
  private _lastPasteOffset: go.Point;

  constructor(init?: Partial<DrawCommandHandler>) {
    super();
    this._arrowKeyBehavior = 'move';
    this._pasteOffset = new go.Point(10, 10);
    this._lastPasteOffset = new go.Point(0, 0);
    if (init) Object.assign(this, init);
  }

  /**
   * Gets or sets the arrow key behavior. Possible values are "move", "select", "scroll", "tree", and "none".
   *
   * The default value is "move".
   */
  get arrowKeyBehavior(): string {
    return this._arrowKeyBehavior;
  }
  set arrowKeyBehavior(val: string) {
    if (
      val !== 'move' &&
      val !== 'select' &&
      val !== 'scroll' &&
      val !== 'none' &&
      val !== 'tree'
    ) {
      throw new Error(
        'DrawCommandHandler.arrowKeyBehavior must be either "move", "select", "scroll", "tree", or "none", not: ' +
          val
      );
    }
    this._arrowKeyBehavior = val;
  }

  /**
   * Gets or sets the offset at which each repeated {@link pasteSelection} puts the new copied parts from the clipboard.
   */
  get pasteOffset(): go.Point {
    return this._pasteOffset;
  }
  set pasteOffset(val: go.Point) {
    if (!(val instanceof go.Point)) throw new Error('DrawCommandHandler.pasteOffset must be a Point, not: ' + val);
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
  canAlignSelection(): boolean {
    const diagram = this.diagram;
    if (diagram.isReadOnly || diagram.isModelReadOnly) return false;
    if (diagram.selection.count < 2) return false;
    return true;
  }

  /**
   * Aligns selected parts along the left-most edge of the left-most part.
   */
  alignLeft(): void {
    const diagram = this.diagram;
    diagram.startTransaction('aligning left');
    let minPosition = Infinity;
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over go.Link
      minPosition = Math.min(current.position.x, minPosition);
    });
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over go.Link
      current.moveTo(minPosition, current.position.y);
    });
    diagram.commitTransaction('aligning left');
  }

  /**
   * Aligns selected parts at the right-most edge of the right-most part.
   */
  alignRight(): void {
    const diagram = this.diagram;
    diagram.startTransaction('aligning right');
    let maxPosition = -Infinity;
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over go.Link
      const rightSideLoc = current.actualBounds.x + current.actualBounds.width;
      maxPosition = Math.max(rightSideLoc, maxPosition);
    });
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over go.Link
      current.moveTo(maxPosition - current.actualBounds.width, current.position.y);
    });
    diagram.commitTransaction('aligning right');
  }

  /**
   * Aligns selected parts at the top-most edge of the top-most part.
   */
  alignTop(): void {
    const diagram = this.diagram;
    diagram.startTransaction('alignTop');
    let minPosition = Infinity;
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over go.Link
      minPosition = Math.min(current.position.y, minPosition);
    });
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over go.Link
      current.moveTo(current.position.x, minPosition);
    });
    diagram.commitTransaction('alignTop');
  }

  /**
   * Aligns selected parts at the bottom-most edge of the bottom-most part.
   */
  alignBottom(): void {
    const diagram = this.diagram;
    diagram.startTransaction('aligning bottom');
    let maxPosition = -Infinity;
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over go.Link
      const bottomSideLoc = current.actualBounds.y + current.actualBounds.height;
      maxPosition = Math.max(bottomSideLoc, maxPosition);
    });
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over go.Link
      current.moveTo(current.actualBounds.x, maxPosition - current.actualBounds.height);
    });
    diagram.commitTransaction('aligning bottom');
  }

  /**
   * Aligns selected parts at the x-value of the center point of the first selected part.
   */
  alignCenterX(): void {
    const diagram = this.diagram;
    const firstSelection = diagram.selection.first();
    if (!firstSelection) return;
    diagram.startTransaction('aligning Center X');
    const centerX = firstSelection.actualBounds.x + firstSelection.actualBounds.width / 2;
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over go.Link
      current.moveTo(centerX - current.actualBounds.width / 2, current.actualBounds.y);
    });
    diagram.commitTransaction('aligning Center X');
  }

  /**
   * Aligns selected parts at the y-value of the center point of the first selected part.
   */
  alignCenterY(): void {
    const diagram = this.diagram;
    const firstSelection = diagram.selection.first();
    if (!firstSelection) return;
    diagram.startTransaction('aligning Center Y');
    const centerY = firstSelection.actualBounds.y + firstSelection.actualBounds.height / 2;
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over go.Link
      current.moveTo(current.actualBounds.x, centerY - current.actualBounds.height / 2);
    });
    diagram.commitTransaction('aligning Center Y');
  }

  /**
   * Aligns selected parts top-to-bottom in order of the order selected.
   * Distance between parts can be specified. Default distance is 0.
   */
  alignColumn(distance: number): void {
    if (distance === undefined) distance = 0; // for aligning edge to edge
    const diagram = this.diagram;
    const firstSelection = diagram.selection.first();
    if (!firstSelection) return;
    diagram.startTransaction('aligning Column');
    const centerX = firstSelection.actualBounds.centerX;
    let y = firstSelection.actualBounds.top;
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over links
      current.moveTo(centerX - current.actualBounds.width / 2, y);
      y += current.actualBounds.height + distance;
    });
    diagram.commitTransaction('aligning Column');
  }

  /**
   * Aligns selected parts left-to-right in order of the order selected.
   * Distance between parts can be specified. Default distance is 0.
   */
  alignRow(distance: number): void {
    if (distance === undefined) distance = 0; // for aligning edge to edge
    const diagram = this.diagram;
    const firstSelection = diagram.selection.first();
    if (!firstSelection) return;
    diagram.startTransaction('aligning Row');
    const centerY = firstSelection.actualBounds.centerY;
    let x = firstSelection.actualBounds.left;
    diagram.selection.each((current) => {
      if (current instanceof go.Link) return; // skips over links
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
  spaceEvenlyHorizontally(): void {
    const diagram = this.diagram;
    const nonlinks = new go.List<go.Part>();
    diagram.selection.each((part) => {
      if (part instanceof go.Link) return; // skips over links
      nonlinks.add(part); // maybe check for non-movable Parts??
    });
    if (nonlinks.count <= 1) return;
    const b = diagram.computePartsBounds(nonlinks);
    if (!b.isReal()) return;
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
  spaceEvenlyVertically(): void {
    const diagram = this.diagram;
    const nonlinks = new go.List<go.Part>();
    diagram.selection.each((part) => {
      if (part instanceof go.Link) return; // skips over links
      nonlinks.add(part); // maybe check for non-movable Parts??
    });
    if (nonlinks.count <= 1) return;
    const b = diagram.computePartsBounds(nonlinks);
    if (!b.isReal()) return;
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
  canRotate(): boolean {
    const diagram = this.diagram;
    if (diagram.isReadOnly || diagram.isModelReadOnly) return false;
    if (diagram.selection.count < 1) return false;
    return true;
  }

  /**
   * Change the angle of the parts connected with the given part. This is in the command handler
   * so it can be easily accessed for the purpose of creating commands that change the rotation of a part.
   * @param angle - the positive (clockwise) or negative (counter-clockwise) change in the rotation angle of each Part, in degrees.
   */
  rotate(angle: number): void {
    if (angle === undefined) angle = 90;
    const diagram = this.diagram;
    diagram.startTransaction('rotate ' + angle.toString());
    diagram.selection.each((current) => {
      if (current instanceof go.Link || current instanceof go.Group) return; // skips over Links and Groups
      current.angle += angle;
    });
    diagram.commitTransaction('rotate ' + angle.toString());
  }

  /**
   * Change the z-ordering of selected parts to pull them forward, in front of all other parts
   * in their respective layers.
   * All unselected parts in each layer with a selected Part with a non-numeric {@link go.Part.zOrder} will get a zOrder of zero.
   */
  pullToFront(): void {
    const diagram = this.diagram;
    diagram.startTransaction('pullToFront');
    // find the affected Layers
    const layers = new go.Map<go.Layer, number>();
    diagram.selection.each((part) => {
      if (part.layer !== null) layers.set(part.layer, 0);
    });
    // find the maximum zOrder in each Layer
    layers.iteratorKeys.each((layer) => {
      let max = 0;
      layer.parts.each((part) => {
        if (part.isSelected) return;
        const z = part.zOrder;
        if (isNaN(z)) {
          part.zOrder = 0;
        } else {
          max = Math.max(max, z);
        }
      });
      layers.set(layer, max);
    });
    // assign each selected Part.zOrder to the computed value for each Layer
    diagram.selection.each((part) => {
      const z = layers.get(part.layer as go.Layer) || 0;
      DrawCommandHandler._assignZOrder(part, z + 1);
    });
    diagram.commitTransaction('pullToFront');
  }

  /**
   * Change the z-ordering of selected parts to push them backward, behind of all other parts
   * in their respective layers.
   * All unselected parts in each layer with a selected Part with a non-numeric {@link go.Part.zOrder} will get a zOrder of zero.
   */
  pushToBack(): void {
    const diagram = this.diagram;
    diagram.startTransaction('pushToBack');
    // find the affected Layers
    const layers = new go.Map<go.Layer, number>();
    diagram.selection.each((part) => {
      if (part.layer !== null) layers.set(part.layer, 0);
    });
    // find the minimum zOrder in each Layer
    layers.iteratorKeys.each((layer) => {
      let min = 0;
      layer.parts.each((part) => {
        if (part.isSelected) return;
        const z = part.zOrder;
        if (isNaN(z)) {
          part.zOrder = 0;
        } else {
          min = Math.min(min, z);
        }
      });
      layers.set(layer, min);
    });
    // assign each selected Part.zOrder to the computed value for each Layer
    diagram.selection.each((part) => {
      const z = layers.get(part.layer as go.Layer) || 0;
      DrawCommandHandler._assignZOrder(
        part,
        // make sure a group's nested nodes are also behind everything else
        z - 1 - DrawCommandHandler._findGroupDepth(part)
      );
    });
    diagram.commitTransaction('pushToBack');
  }

  private static _assignZOrder(part: go.Part, z: number, root?: go.Part): void {
    if (root === undefined) root = part;
    if (part.layer === root.layer) part.zOrder = z;
    if (part instanceof go.Group) {
      part.memberParts.each((m) => {
        DrawCommandHandler._assignZOrder(m, z + 1, root);
      });
    }
  }

  private static _findGroupDepth(part: go.Part): number {
    if (part instanceof go.Group) {
      let d = 0;
      part.memberParts.each((m) => {
        d = Math.max(d, DrawCommandHandler._findGroupDepth(m));
      });
      return d + 1;
    } else {
      return 0;
    }
  }

  /**
   * This implements custom behaviors for arrow key keyboard events.
   * Set {@link arrowKeyBehavior} to "select", "move" (the default), "scroll" (the standard behavior), or "none"
   * to affect the behavior when the user types an arrow key.
   */
  override doKeyDown(): void {
    const diagram = this.diagram;
    const e = diagram.lastInput;

    // determines the function of the arrow keys
    if (
      e.code === 'ArrowUp' ||
      e.code === 'ArrowDown' ||
      e.code === 'ArrowLeft' ||
      e.code === 'ArrowRight'
    ) {
      const behavior = this.arrowKeyBehavior;
      if (behavior === 'none') {
        // no-op
        return;
      } else if (behavior === 'select') {
        this._arrowKeySelect();
        return;
      } else if (behavior === 'move') {
        this._arrowKeyMove();
        return;
      } else if (behavior === 'tree') {
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
  private _getAllParts(): Array<any> {
    const allParts = new Array<go.Part>();
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
  private _arrowKeyMove(): void {
    const diagram = this.diagram;
    const e = diagram.lastInput;
    // moves all selected parts in the specified direction
    let vdistance = 0;
    let hdistance = 0;
    // if control is being held down, move pixel by pixel. Else, moves by grid cell size
    if (e.control || e.meta) {
      vdistance = 1;
      hdistance = 1;
    } else if (diagram.grid !== null) {
      const cellsize = diagram.grid.gridCellSize;
      hdistance = cellsize.width;
      vdistance = cellsize.height;
    }
    diagram.startTransaction('arrowKeyMove');
    diagram.selection.each((part) => {
      if (e.code === 'ArrowUp') {
        part.moveTo(part.actualBounds.x, part.actualBounds.y - vdistance);
      } else if (e.code === 'ArrowDown') {
        part.moveTo(part.actualBounds.x, part.actualBounds.y + vdistance);
      } else if (e.code === 'ArrowLeft') {
        part.moveTo(part.actualBounds.x - hdistance, part.actualBounds.y);
      } else if (e.code === 'ArrowRight') {
        part.moveTo(part.actualBounds.x + hdistance, part.actualBounds.y);
      }
    });
    diagram.commitTransaction('arrowKeyMove');
  }

  /**
   * To be called when arrow keys should change selection.
   */
  private _arrowKeySelect(): void {
    const diagram = this.diagram;
    const e = diagram.lastInput;
    // with a part selected, arrow keys change the selection
    // arrow keys + shift selects the additional part in the specified direction
    // arrow keys + control toggles the selection of the additional part
    let nextPart = null;
    if (e.code === 'ArrowUp') {
      nextPart = this._findNearestPartTowards(270);
    } else if (e.code === 'ArrowDown') {
      nextPart = this._findNearestPartTowards(90);
    } else if (e.code === 'ArrowLeft') {
      nextPart = this._findNearestPartTowards(180);
    } else if (e.code === 'ArrowRight') {
      nextPart = this._findNearestPartTowards(0);
    }
    if (nextPart !== null) {
      if (e.shift) {
        nextPart.isSelected = true;
      } else if (e.control || e.meta) {
        nextPart.isSelected = !nextPart.isSelected;
      } else {
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
  private _findNearestPartTowards(dir: number): go.Part | null {
    const originalPart = this.diagram.selection.first();
    if (originalPart === null) return null;
    const originalPoint = originalPart.actualBounds.center;
    const allParts = this._getAllParts();
    let closestDistance = Infinity;
    let closest = originalPart; // if no parts meet the criteria, the same part remains selected

    for (let i = 0; i < allParts.length; i++) {
      const nextPart = allParts[i];
      if (nextPart === originalPart) continue; // skips over currently selected part
      if (!nextPart.canSelect()) continue;
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

  private _angleCloseness(a: number, dir: number): number {
    return Math.min(Math.abs(dir - a), Math.min(Math.abs(dir + 360 - a), Math.abs(dir - 360 - a)));
  }

  /**
   * To be called when arrow keys should change the selected node in a tree and expand or collapse subtrees.
   */
  private _arrowKeyTree() {
    const diagram = this.diagram;
    let selected = diagram.selection.first();
    if (!(selected instanceof go.Node)) return;

    const e = diagram.lastInput;
    if (e.code === 'ArrowRight') {
      if (selected.isTreeLeaf) {
        // no-op
      } else if (!selected.isTreeExpanded) {
        if (diagram.commandHandler.canExpandTree(selected)) {
          diagram.commandHandler.expandTree(selected); // expands the tree
        }
      } else {
        // already expanded -- select the first child node
        const first = this._sortTreeChildrenByY(selected).first();
        if (first !== null) diagram.select(first);
      }
    } else if (e.code === 'ArrowLeft') {
      if (!selected.isTreeLeaf && selected.isTreeExpanded) {
        if (diagram.commandHandler.canCollapseTree(selected)) {
          diagram.commandHandler.collapseTree(selected); // collapses the tree
        }
      } else {
        // either a leaf or is already collapsed -- select the parent node
        const parent = selected.findTreeParentNode();
        if (parent !== null) diagram.select(parent);
      }
    } else if (e.code === 'ArrowUp') {
      const parent = selected.findTreeParentNode();
      if (parent !== null) {
        const list = this._sortTreeChildrenByY(parent);
        const idx = list.indexOf(selected);
        if (idx > 0) {
          // if there is a previous sibling
          let prev: go.Node | null = list.elt(idx - 1);
          // keep looking at the last child until it's a leaf or collapsed
          while (prev !== null && prev.isTreeExpanded && !prev.isTreeLeaf) {
            const children = this._sortTreeChildrenByY(prev);
            prev = children.last();
          }
          if (prev !== null) diagram.select(prev);
        } else {
          // no previous sibling -- select parent
          diagram.select(parent);
        }
      }
    } else if (e.code === 'ArrowDown') {
      // if at an expanded parent, select the first child
      if (selected.isTreeExpanded && !selected.isTreeLeaf) {
        const first = this._sortTreeChildrenByY(selected).first();
        if (first !== null) diagram.select(first);
      } else {
        while (selected instanceof go.Node) {
          const parent = selected.findTreeParentNode();
          if (parent === null) break;
          const list = this._sortTreeChildrenByY(parent);
          const idx = list.indexOf(selected);
          if (idx < list.length - 1) {
            // select next lower node
            diagram.select(list.elt(idx + 1));
            break;
          } else {
            // already at bottom of list of children
            selected = parent;
          }
        }
      }
    }

    // make sure the selection is now in the viewport, but not necessarily centered
    const sel = diagram.selection.first();
    if (sel !== null) diagram.scrollToRect(sel.actualBounds);
  }

  private _sortTreeChildrenByY(node: go.Node): go.List<go.Node> {
    const list = new go.List().addAll(node.findTreeChildrenNodes()) as go.List<go.Node>;
    list.sort((a, b) => {
      const aloc = a.location;
      const bloc = b.location;
      if (aloc.y < bloc.y) return -1;
      if (aloc.y > bloc.y) return 1;
      if (aloc.x < bloc.x) return -1;
      if (aloc.x > bloc.x) return 1;
      return 0;
    });
    return list;
  }

  /**
   * Reset the last offset for pasting.
   * @param coll - a collection of {@link go.Part}s.
   */
  override copyToClipboard(coll: go.Iterable<go.Part>): void {
    super.copyToClipboard(coll);
    this._lastPasteOffset.set(this.pasteOffset);
  }

  /**
   * Paste from the clipboard with an offset incremented on each paste, and reset when copied.
   * @returns a collection of newly pasted {@link go.Part}s
   */
  override pasteFromClipboard(): go.Set<go.Part> {
    const coll = super.pasteFromClipboard();
    this.diagram.moveParts(coll, this._lastPasteOffset, false);
    this._lastPasteOffset.add(this.pasteOffset);
    return coll;
  }
}
