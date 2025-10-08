/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/GuidedDraggingTool.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */
import * as go from 'gojs';
/**
 * The GuidedDraggingTool class makes guidelines visible as the parts are dragged around a diagram
 * when the selected part is nearly aligned with another part, or when a part is nearly positioned
 * between two other parts with equal space on both sides.
 *
 * During dragging, this tool will show temporary Parts named "guide..." to indicate what the dragged Part will align with.
 * You can customize the appearance of those Parts by setting those properties.
 * By default they are Parts in the "Tool" Layer holding magenta or cyan dashed lines.
 * You may also set some of those "guide..." properties to null if you do not want those guides to be shown
 * and do not want to snap to those alignments.
 *
 * Normally as the user drags a Part, that Part will snap to center itself with equal spacing on both sides,
 * or it will line up with a nearby Part.  If you do not want that snapping behavior during a drag,
 * the user can hold down the Shift modifier key in order to move the Part smoothly,
 * or you can set {@link isRealtimeSnapEnabled} to false.
 * When that property is set to false, snapping will still happen upon mouse-up.
 *
 * You can set the {@link isGuidelineSnapEnabled} or {@link isEqualSpacingSnapEnabled} property to false
 * to avoid that kind of snapping behavior.
 * When both those properties are true, as they are by default,
 * and when a Part is near a point that provides both equal spacing between two Parts and alignment with a nearby Part,
 * the equal spacing snapping takes precedence.
 *
 * The maximum distance from perfect algnment that a dragged Part will snap to is controlled by the
 * {@link guideSnapDistance} property.  This tends to be a small value.
 *
 * The maximum distance at which another Part might affect the alignment of the dragged Part is controlled by the
 * {@link searchDistance} property.  This tends to be a large value.
 *
 * If you want to experiment with this extension, try the <a href="../../samples/GuidedDragging.html">Guided Dragging</a> sample.
 * @category Tool Extension
 */
export class GuidedDraggingTool extends go.DraggingTool {
    /**
     * Constructs a GuidedDraggingTool and sets up the temporary guideline parts.
     */
    constructor(init) {
        super();
        this.name = 'GuidedDragging';
        this._guideSnapDistance = 6;
        this._searchDistance = 2000;
        this._isRealtimeSnapEnabled = true;
        this._isGuidelineSnapEnabled = true;
        this._isEqualSpacingSnapEnabled = true;
        this._showsGuides = true;
        const partProperties = { layerName: 'Tool', isInDocumentBounds: false };
        const shapeProperties = { stroke: 'magenta', strokeDashArray: [4, 4], isGeometryPositioned: true };
        // temporary parts for horizonal guidelines
        this._guidelineHTop = new go.Part(partProperties).add(new go.Shape(shapeProperties).set({ geometryString: 'M0 0 100 0' }));
        this._guidelineHCenter = new go.Part(partProperties).add(new go.Shape(shapeProperties).set({ geometryString: 'M0 0 100 0' }));
        this._guidelineHBottom = new go.Part(partProperties).add(new go.Shape(shapeProperties).set({ geometryString: 'M0 0 100 0' }));
        // temporary parts for vertical guidelines
        this._guidelineVLeft = new go.Part(partProperties).add(new go.Shape(shapeProperties).set({ geometryString: 'M0 0 0 100' }));
        this._guidelineVCenter = new go.Part(partProperties).add(new go.Shape(shapeProperties).set({ geometryString: 'M0 0 0 100' }));
        this._guidelineVRight = new go.Part(partProperties).add(new go.Shape(shapeProperties).set({ geometryString: 'M0 0 0 100' }));
        // temporary parts for spacing guides
        shapeProperties.stroke = 'darkcyan';
        this._guideHSpacingLeft = new go.Part(partProperties).add(new go.Shape(shapeProperties).set({ name: 'H', geometryString: 'M0 0 100 0' }), new go.Shape(shapeProperties).set({ name: 'V', geometryString: 'M0 0 0 100' }));
        this._guideHSpacingRight = new go.Part(partProperties).add(new go.Shape(shapeProperties).set({ name: 'H', geometryString: 'M0 0 100 0' }), new go.Shape(shapeProperties).set({ name: 'V', geometryString: 'M0 0 0 100' }));
        this._guideVSpacingTop = new go.Part(partProperties).add(new go.Shape(shapeProperties).set({ name: 'H', geometryString: 'M0 0 100 0' }), new go.Shape(shapeProperties).set({ name: 'V', geometryString: 'M0 0 0 100' }));
        this._guideVSpacingBottom = new go.Part(partProperties).add(new go.Shape(shapeProperties).set({ name: 'H', geometryString: 'M0 0 100 0' }), new go.Shape(shapeProperties).set({ name: 'V', geometryString: 'M0 0 0 100' }));
        if (init)
            Object.assign(this, init);
    }
    /**
     * Gets or sets the margin of error for which guidelines show up.
     *
     * The default value is 6.
     * Guidelines will show up when the aligned nodes are ± 6px away from perfect alignment.
     */
    get guideSnapDistance() {
        return this._guideSnapDistance;
    }
    set guideSnapDistance(val) {
        if (typeof val !== 'number' || isNaN(val) || val < 0)
            throw new Error('new value for GuidedDraggingTool.guideSnapDistance must be a non-negative number');
        this._guideSnapDistance = val;
    }
    /**
     * Gets or sets the distance around the selected part to search for aligned parts.
     *
     * The default value is 2000.
     * Set this to Infinity if you want to search the entire diagram no matter how far away.
     */
    get searchDistance() {
        return this._searchDistance;
    }
    set searchDistance(val) {
        if (typeof val !== 'number' || isNaN(val) || val <= 0)
            throw new Error('new value for GuidedDraggingTool.searchDistance must be a positive number.');
        this._searchDistance = val;
    }
    /**
     * Gets or sets whether snapping for equal spacing or to guidelines is enabled during a drag.
     * This property is useless when both {@link isGuidelineSnapEnabled} and {@link isEqualSpacingSnapEnabled} are false.
     *
     * The default value is true.
     */
    get isRealtimeSnapEnabled() { return this._isRealtimeSnapEnabled; }
    set isRealtimeSnapEnabled(val) { this._isRealtimeSnapEnabled = !!val; }
    /**
     * Gets or sets whether snapping to guidelines provided by nearby Parts is enabled.
     *
     * The default value is true.
     */
    get isGuidelineSnapEnabled() { return this._isGuidelineSnapEnabled; }
    set isGuidelineSnapEnabled(val) { this._isGuidelineSnapEnabled = !!val; }
    /**
     * Gets or sets whether snapping to have equal space on both sides of the moved Part is enabled.
     *
     * The default value is true.
     */
    get isEqualSpacingSnapEnabled() { return this._isEqualSpacingSnapEnabled; }
    set isEqualSpacingSnapEnabled(val) { this._isEqualSpacingSnapEnabled = !!val; }
    /**
     * Gets or sets whether the guidelines are shown or not.
     * Setting this to false causes no horizontal or vertical
     * guidelines, nor the spacing guides, to be shown.
     * However, snapping may still take place, during the drag if {@link isRealtimeSnapEnabled} is true,
     * or at the end on mouse-up.
     *
     * The default value is true.
     */
    get showsGuides() { return this._showsGuides; }
    set showsGuides(val) { this._showsGuides = !!val; }
    /**
     * Gets or sets the Part to show when the moved Part's top lines up with a stationary Part.
     * This defaults to a horizontal magenta dashed line.  Set this to null to not show anything for this case.
     * */
    get guidelineHTop() { return this._guidelineHTop; }
    set guidelineHTop(val) { this._guidelineHTop = val; }
    /**
     * Gets or sets the Part to show when the moved Part's center lines up with a stationary Part.
     * This defaults to a horizontal magenta dashed line.  Set this to null to not show anything for this case.
     * */
    get guidelineHCenter() { return this._guidelineHCenter; }
    set guidelineHCenter(val) { this._guidelineHCenter = val; }
    /**
     * Gets or sets the Part to show when the moved Part's bottom lines up with a stationary Part.
     * This defaults to a horizontal magenta dashed line.  Set this to null to not show anything for this case.
     * */
    get guidelineHBottom() { return this._guidelineHBottom; }
    set guidelineHBottom(val) { this._guidelineHBottom = val; }
    /**
     * Gets or sets the Part to show when the moved Part's left side lines up with a stationary Part.
     * This defaults to a vertical magenta dashed line.  Set this to null to not show anything for this case.
     * */
    get guidelineVLeft() { return this._guidelineVLeft; }
    set guidelineVLeft(val) { this._guidelineVLeft = val; }
    /**
     * Gets or sets the Part to show when the moved Part's center lines up with a stationary Part.
     * This defaults to a vertical magenta dashed line.  Set this to null to not show anything for this case.
     * */
    get guidelineVCenter() { return this._guidelineVCenter; }
    set guidelineVCenter(val) { this._guidelineVCenter = val; }
    /**
     * Gets or sets the Part to show when the moved Part's right side lines up with a stationary Part.
     * This defaults to a vertical magenta dashed line.  Set this to null to not show anything for this case.
     * */
    get guidelineVRight() { return this._guidelineVRight; }
    set guidelineVRight(val) { this._guidelineVRight = val; }
    /**
     * Gets or sets the Part to show on the left side when the moved Part leaves nearly the same spacing left and right
     * between this Part and the nearest Parts on either side of it.
     * This defaults to a vertical cyan dashed line.  Set this to null to not show anything for this case.
     * */
    get guideHSpacingLeft() { return this._guideHSpacingLeft; }
    set guideHSpacingLeft(val) { this._guideHSpacingLeft = val; }
    /**
     * Gets or sets the Part to show on the right side when the moved Part leaves nearly the same spacing left and right
     * between this Part and the nearest Parts on either side of it.
     * This defaults to a vertical cyan dashed line.  Set this to null to not show anything for this case.
     * */
    get guideHSpacingRight() { return this._guideHSpacingRight; }
    set guideHSpacingRight(val) { this._guideHSpacingRight = val; }
    /**
     * Gets or sets the Part to show above when the moved Part leaves nearly the same spacing above and below
     * between this Part and the nearest Parts above and below it.
     * This defaults to a vertical cyan dashed line.  Set this to null to not show anything for this case.
     * */
    get guideVSpacingTop() { return this._guideVSpacingTop; }
    set guideVSpacingTop(val) { this._guideVSpacingTop = val; }
    /**
     * Gets or sets the Part to show below when the moved Part leaves nearly the same spacing above and below
     * between this Part and the nearest Parts above and below it.
     * This defaults to a vertical cyan dashed line.  Set this to null to not show anything for this case.
     * */
    get guideVSpacingBottom() { return this._guideVSpacingBottom; }
    set guideVSpacingBottom(val) { this._guideVSpacingBottom = val; }
    /**
     * Removes all of the guidelines from the grid.
     */
    clearGuidelines() {
        if (this.guidelineHTop)
            this.diagram.remove(this.guidelineHTop);
        if (this.guidelineHCenter)
            this.diagram.remove(this.guidelineHCenter);
        if (this.guidelineHBottom)
            this.diagram.remove(this.guidelineHBottom);
        if (this.guidelineVLeft)
            this.diagram.remove(this.guidelineVLeft);
        if (this.guidelineVCenter)
            this.diagram.remove(this.guidelineVCenter);
        if (this.guidelineVRight)
            this.diagram.remove(this.guidelineVRight);
        if (this.guideHSpacingLeft)
            this.diagram.remove(this.guideHSpacingLeft);
        if (this.guideHSpacingRight)
            this.diagram.remove(this.guideHSpacingRight);
        if (this.guideVSpacingTop)
            this.diagram.remove(this.guideVSpacingTop);
        if (this.guideVSpacingBottom)
            this.diagram.remove(this.guideVSpacingBottom);
    }
    /**
     * Calls the base method and removes the guidelines from the graph.
     */
    doDeactivate() {
        super.doDeactivate();
        // clear any guidelines when dragging is done
        this.clearGuidelines();
    }
    /**
     * Shows vertical and horizontal guidelines for the dragged part.
     */
    doDragOver(pt, obj) {
        // clear all existing guidelines in case either show... method decides to show a guideline
        this.clearGuidelines();
        // gets the selected part
        const draggingParts = this.copiedParts || this.draggedParts;
        if (draggingParts === null)
            return;
        const partItr = draggingParts.iterator;
        if (partItr.next()) {
            const part = partItr.key;
            // maybe snaps during drag
            const e = this.diagram.lastInput;
            const snap = this.isRealtimeSnapEnabled && !e.shift;
            this.showMatches(part, this.showsGuides, snap);
        }
    }
    /**
     * On a mouse-up, snaps the selected part to the nearest guideline.
     * If not snapping, the part remains at its position.
     */
    doDropOnto(pt, obj) {
        this.clearGuidelines();
        // gets the selected (perhaps copied) Part
        const draggingParts = this.copiedParts || this.draggedParts;
        if (draggingParts === null)
            return;
        const partItr = draggingParts.iterator;
        if (partItr.next()) {
            const part = partItr.key;
            // snaps only when the mouse is released without shift modifier
            const e = this.diagram.lastInput;
            const snap = !e.shift;
            this.showMatches(part, false, snap); // false means don't show guidelines
        }
    }
    /**
     * When nodes are shifted due to being guided upon a drop, make sure all connected link routes are invalidated,
     * since the node is likely to have moved a different amount than all its connected links in the regular
     * operation of the DraggingTool.
     */
    invalidateLinks(node) {
        if (node instanceof go.Node)
            node.invalidateConnectedLinks();
    }
    /**
     * This predicate decides whether or not the given Part should guide the dragged part.
     * @param part -  a stationary Part to which the dragged part might be aligned
     * @param guidedpart -  the Part being dragged
     */
    isGuiding(part, guidedpart) {
        return (part instanceof go.Part &&
            !part.isSelected &&
            !(part instanceof go.Link) &&
            guidedpart instanceof go.Part &&
            part.containingGroup === guidedpart.containingGroup &&
            part.layer !== null &&
            !part.layer.isTemporary);
    }
    /**
     * This finds parts that are aligned near the selected part along horizontal and vertical lines.
     * It compares the selected part to all parts within a rectangle approximately twice the {@link searchDistance} wide.
     * The guidelines appear when a part is aligned within a margin-of-error equal to {@link guideSnapDistance}.
     * @param part the Part being moved
     * @param guide - if true, show guideline
     * @param snap - if true, snap the part to where the guideline would be
     */
    showMatches(part, guide, snap) {
        const marginOfError = this.guideSnapDistance;
        let distance = this.searchDistance;
        if (distance === Infinity)
            distance = this.diagram.documentBounds.width;
        const objBounds = part.locationObject.getDocumentBounds();
        const p0x = objBounds.x;
        const p1x = objBounds.x + objBounds.width / 2;
        const p2x = objBounds.x + objBounds.width;
        const p0y = objBounds.y;
        const p1y = objBounds.y + objBounds.height / 2;
        const p2y = objBounds.y + objBounds.height;
        // compares with parts within narrow vertical area
        const rowArea = objBounds.copy();
        rowArea.inflate(distance, marginOfError + 1);
        const rowParts = this.diagram.findObjectsIn(rowArea, (obj) => obj.part, (p) => this.isGuiding(p, part), true);
        let bestVDiff = marginOfError;
        let bestVPart = null;
        let bestVSpot = go.Spot.Default;
        let bestVOtherSpot = go.Spot.Default;
        let closestLeft = null;
        let closestLeftX = -Infinity;
        let closestRight = null;
        let closestRightX = Infinity;
        // horizontal line -- comparing y-values
        rowParts.each((other) => {
            if (other === part)
                return; // ignore itself
            const otherBounds = other.locationObject.getDocumentBounds();
            if (this.isGuidelineSnapEnabled) {
                const q0y = otherBounds.y;
                const q1y = otherBounds.y + otherBounds.height / 2;
                const q2y = otherBounds.y + otherBounds.height;
                // compare center with center of OTHER part
                if (this.guidelineHCenter && Math.abs(p1y - q1y) < bestVDiff) {
                    bestVDiff = Math.abs(p1y - q1y);
                    bestVPart = other;
                    bestVSpot = go.Spot.Center;
                    bestVOtherSpot = go.Spot.Center;
                }
                // compare top side with top and bottom sides of OTHER part
                if (this.guidelineHTop && Math.abs(p0y - q0y) < bestVDiff) {
                    bestVDiff = Math.abs(p0y - q0y);
                    bestVPart = other;
                    bestVSpot = go.Spot.Top;
                    bestVOtherSpot = go.Spot.Top;
                }
                else if (this.guidelineHTop && Math.abs(p0y - q2y) < bestVDiff) {
                    bestVDiff = Math.abs(p0y - q2y);
                    bestVPart = other;
                    bestVSpot = go.Spot.Top;
                    bestVOtherSpot = go.Spot.Bottom;
                }
                // compare bottom side with top and bottom sides of OTHER part
                if (this.guidelineHBottom && Math.abs(p2y - q0y) < bestVDiff) {
                    bestVDiff = Math.abs(p2y - q0y);
                    bestVPart = other;
                    bestVSpot = go.Spot.Bottom;
                    bestVOtherSpot = go.Spot.Top;
                }
                else if (this.guidelineHBottom && Math.abs(p2y - q2y) < bestVDiff) {
                    bestVDiff = Math.abs(p2y - q2y);
                    bestVPart = other;
                    bestVSpot = go.Spot.Bottom;
                    bestVOtherSpot = go.Spot.Bottom;
                }
            }
            if (this.isEqualSpacingSnapEnabled) {
                // look for something on the left side that overlaps vertically
                if (otherBounds.right <= objBounds.x && (!closestLeft || otherBounds.right > closestLeftX) && otherBounds.y < objBounds.bottom && otherBounds.bottom > objBounds.top) {
                    closestLeft = other;
                    closestLeftX = otherBounds.right;
                }
                // look for something on the right side that overlaps vertically
                if (otherBounds.x >= objBounds.right && (!closestRight || otherBounds.x < closestRightX) && otherBounds.y < objBounds.bottom && otherBounds.bottom > objBounds.top) {
                    closestRight = other;
                    closestRightX = otherBounds.x;
                }
            }
        });
        // compares with parts within narrow vertical area
        const colArea = objBounds.copy();
        colArea.inflate(marginOfError + 1, distance);
        const colParts = this.diagram.findObjectsIn(colArea, (obj) => obj.part, (p) => this.isGuiding(p, part), true);
        let bestHDiff = marginOfError;
        let bestHPart = null;
        let bestHSpot = go.Spot.Default;
        let bestHOtherSpot = go.Spot.Default;
        let closestTop = null;
        let closestTopY = -Infinity;
        let closestBottom = null;
        let closestBottomY = Infinity;
        // vertical line -- comparing x-values
        colParts.each((other) => {
            if (other === part)
                return; // ignore itself
            const otherBounds = other.locationObject.getDocumentBounds();
            if (this.isGuidelineSnapEnabled) {
                const q0x = otherBounds.x;
                const q1x = otherBounds.x + otherBounds.width / 2;
                const q2x = otherBounds.x + otherBounds.width;
                // compare center with center of OTHER part
                if (this.guidelineVCenter && Math.abs(p1x - q1x) < bestHDiff) {
                    bestHDiff = Math.abs(p1x - q1x);
                    bestHPart = other;
                    bestHSpot = go.Spot.Center;
                    bestHOtherSpot = go.Spot.Center;
                }
                // compare left side with left and right sides of OTHER part
                if (this.guidelineVLeft && Math.abs(p0x - q0x) < bestHDiff) {
                    bestHDiff = Math.abs(p0x - q0x);
                    bestHPart = other;
                    bestHSpot = go.Spot.Left;
                    bestHOtherSpot = go.Spot.Left;
                }
                else if (this.guidelineVLeft && Math.abs(p0x - q2x) < bestHDiff) {
                    bestHDiff = Math.abs(p0x - q2x);
                    bestHPart = other;
                    bestHSpot = go.Spot.Left;
                    bestHOtherSpot = go.Spot.Right;
                }
                // compare right side with left and right sides of OTHER part
                if (this.guidelineVRight && Math.abs(p2x - q0x) < bestHDiff) {
                    bestHDiff = Math.abs(p2x - q0x);
                    bestHPart = other;
                    bestHSpot = go.Spot.Right;
                    bestHOtherSpot = go.Spot.Left;
                }
                else if (this.guidelineVRight && Math.abs(p2x - q2x) < bestHDiff) {
                    bestHDiff = Math.abs(p2x - q2x);
                    bestHPart = other;
                    bestHSpot = go.Spot.Right;
                    bestHOtherSpot = go.Spot.Right;
                }
            }
            if (this.isEqualSpacingSnapEnabled) {
                // look for something on the left side that overlaps vertically
                if (this.guideVSpacingTop && otherBounds.bottom <= objBounds.y &&
                    (!closestTop || otherBounds.bottom > closestTopY) && otherBounds.x < objBounds.right && otherBounds.right > objBounds.x) {
                    closestTop = other;
                    closestTopY = otherBounds.bottom;
                }
                // look for something on the right side that overlaps vertically
                if (this.guideVSpacingBottom && otherBounds.y >= objBounds.bottom &&
                    (!closestBottom || otherBounds.y < closestBottomY) && otherBounds.x < objBounds.right && otherBounds.right > objBounds.x) {
                    closestBottom = other;
                    closestBottomY = otherBounds.y;
                }
            }
        });
        // figure out whether to snap, and where to
        let snapx = NaN;
        let snapy = NaN;
        // vertical equal spacing takes precedence over guideline snapping
        let verticalSpacing = false;
        if (closestTop && closestBottom) {
            const dxTop = objBounds.y - closestTopY;
            const dxBottom = closestBottomY - objBounds.bottom;
            if (dxTop >= 0 && dxBottom >= 0 && Math.abs(dxBottom - dxTop) < 2 * marginOfError) {
                verticalSpacing = true;
                if (snap) {
                    snapy = part.actualBounds.y + (dxBottom - dxTop) / 2;
                }
                if (guide) { // show equal vertical spacing guidelines
                    if (this.guideVSpacingTop) {
                        const minx = Math.min(closestTop.actualBounds.x, objBounds.x);
                        const maxx = Math.max(closestTop.actualBounds.right, objBounds.right);
                        this.guideVSpacingTop.position = new go.Point(minx - 10, closestTopY);
                        this.guideVSpacingTop.findObject('V').height = dxTop;
                        this.guideVSpacingTop.findObject('H').width = maxx - minx + 20;
                        this.guideVSpacingTop.findObject('V').position = new go.Point(objBounds.x + objBounds.width * 3 / 4 - minx + 10, 0);
                        this.diagram.add(this.guideVSpacingTop);
                    }
                    if (this.guideVSpacingBottom) {
                        const minx = Math.min(closestBottom.actualBounds.x, objBounds.x);
                        const maxx = Math.max(closestBottom.actualBounds.right, objBounds.right);
                        this.guideVSpacingBottom.position = new go.Point(minx - 10, objBounds.bottom);
                        this.guideVSpacingBottom.findObject('V').height = dxBottom;
                        this.guideVSpacingBottom.findObject('H').width = maxx - minx + 20;
                        this.guideVSpacingBottom.findObject('V').position = new go.Point(objBounds.x + objBounds.width * 3 / 4 - minx + 10, 0);
                        this.guideVSpacingBottom.findObject('H').position = new go.Point(0, dxBottom);
                        this.diagram.add(this.guideVSpacingBottom);
                    }
                }
            }
        }
        if (!verticalSpacing && bestVPart) {
            const offsetY = objBounds.y - part.actualBounds.y;
            const bestBounds = bestVPart.locationObject.getDocumentBounds();
            // line extends from x0 to x2
            const x0 = Math.min(objBounds.x, bestBounds.x) - 10;
            const x2 = Math.max(objBounds.x + objBounds.width, bestBounds.x + bestBounds.width) + 10;
            // find bestObj's desired Y
            const bestPoint = new go.Point().setRectSpot(bestBounds, bestVOtherSpot);
            if (bestVSpot === go.Spot.Center) {
                if (snap) {
                    // call Part.move in order to automatically move member Parts of Groups
                    snapy = bestPoint.y - objBounds.height / 2 - offsetY;
                }
                if (guide && this.guidelineHCenter) {
                    this.guidelineHCenter.position = new go.Point(x0, bestPoint.y);
                    this.guidelineHCenter.elt(0).width = x2 - x0;
                    this.diagram.add(this.guidelineHCenter);
                }
            }
            else if (bestVSpot === go.Spot.Top) {
                if (snap) {
                    snapy = bestPoint.y - offsetY;
                }
                if (guide && this.guidelineHTop) {
                    this.guidelineHTop.position = new go.Point(x0, bestPoint.y);
                    this.guidelineHTop.elt(0).width = x2 - x0;
                    this.diagram.add(this.guidelineHTop);
                }
            }
            else if (bestVSpot === go.Spot.Bottom) {
                if (snap) {
                    snapy = bestPoint.y - objBounds.height - offsetY;
                }
                if (guide && this.guidelineHBottom) {
                    this.guidelineHBottom.position = new go.Point(x0, bestPoint.y);
                    this.guidelineHBottom.elt(0).width = x2 - x0;
                    this.diagram.add(this.guidelineHBottom);
                }
            }
        }
        // horizontal equal spacing takes precedence over guideline snapping
        let horizontalSpacing = false;
        if (closestLeft && closestRight) {
            const dxLeft = objBounds.x - closestLeftX;
            const dxRight = closestRightX - objBounds.right;
            if (dxLeft >= 0 && dxRight >= 0 && Math.abs(dxRight - dxLeft) < 2 * marginOfError) {
                horizontalSpacing = true;
                if (snap) {
                    snapx = part.actualBounds.x + (dxRight - dxLeft) / 2;
                }
                if (guide) { // show equal horizontal spacing guidelines
                    if (this.guideHSpacingLeft) {
                        const miny = Math.min(closestLeft.actualBounds.y, objBounds.y);
                        const maxy = Math.max(closestLeft.actualBounds.bottom, objBounds.bottom);
                        this.guideHSpacingLeft.position = new go.Point(closestLeftX, miny - 10);
                        this.guideHSpacingLeft.findObject('H').width = dxLeft;
                        this.guideHSpacingLeft.findObject('V').height = maxy - miny + 20;
                        this.guideHSpacingLeft.findObject('H').position = new go.Point(0, objBounds.y + objBounds.height * 3 / 4 - miny + 10);
                        this.diagram.add(this.guideHSpacingLeft);
                    }
                    if (this.guideHSpacingRight) {
                        const miny = Math.min(closestRight.actualBounds.y, objBounds.y);
                        const maxy = Math.max(closestRight.actualBounds.bottom, objBounds.bottom);
                        this.guideHSpacingRight.position = new go.Point(objBounds.right, miny - 10);
                        this.guideHSpacingRight.findObject('H').width = dxRight;
                        this.guideHSpacingRight.findObject('V').height = maxy - miny + 20;
                        this.guideHSpacingRight.findObject('H').position = new go.Point(0, objBounds.y + objBounds.height * 3 / 4 - miny + 10);
                        this.guideHSpacingRight.findObject('V').position = new go.Point(dxRight, 0);
                        this.diagram.add(this.guideHSpacingRight);
                    }
                }
            }
        }
        if (!horizontalSpacing && bestHPart) {
            const offsetX = objBounds.x - part.actualBounds.x;
            const bestBounds = bestHPart.locationObject.getDocumentBounds();
            // line extends from y0 to y2
            const y0 = Math.min(objBounds.y, bestBounds.y) - 10;
            const y2 = Math.max(objBounds.y + objBounds.height, bestBounds.y + bestBounds.height) + 10;
            // find bestObj's desired X
            const bestPoint = new go.Point().setRectSpot(bestBounds, bestHOtherSpot);
            if (bestHSpot === go.Spot.Center) {
                if (snap) {
                    // call Part.move in order to automatically move member Parts of Groups
                    snapx = bestPoint.x - objBounds.width / 2 - offsetX;
                }
                if (guide && this.guidelineVCenter) {
                    this.guidelineVCenter.position = new go.Point(bestPoint.x, y0);
                    this.guidelineVCenter.elt(0).height = y2 - y0;
                    this.diagram.add(this.guidelineVCenter);
                }
            }
            else if (bestHSpot === go.Spot.Left) {
                if (snap) {
                    snapx = bestPoint.x - offsetX;
                }
                if (guide && this.guidelineVLeft) {
                    this.guidelineVLeft.position = new go.Point(bestPoint.x, y0);
                    this.guidelineVLeft.elt(0).height = y2 - y0;
                    this.diagram.add(this.guidelineVLeft);
                }
            }
            else if (bestHSpot === go.Spot.Right) {
                if (snap) {
                    snapx = bestPoint.x - objBounds.width - offsetX;
                }
                if (guide && this.guidelineVRight) {
                    this.guidelineVRight.position = new go.Point(bestPoint.x, y0);
                    this.guidelineVRight.elt(0).height = y2 - y0;
                    this.diagram.add(this.guidelineVRight);
                }
            }
        }
        // if either snapx and/or snapy have been set, snap move the part
        if (!isNaN(snapx) || !isNaN(snapy)) {
            if (isNaN(snapx))
                snapx = part.actualBounds.x;
            if (isNaN(snapy))
                snapy = part.actualBounds.y;
            part.moveTo(snapx, snapy);
            this.invalidateLinks(part);
        }
    }
}
