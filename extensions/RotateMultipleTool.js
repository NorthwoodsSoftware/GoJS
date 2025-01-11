/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/RotateMultipleTool.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

/**
 * The RotateMultipleTool class lets the user rotate multiple objects at a time.
 * When more than one part is selected, rotates all parts, revolving them about their collective center.
 * If the control key is held down during rotation, rotates all parts individually.
 *
 * Caution: this only works for Groups that do *not* have a Placeholder.
 *
 * If you want to experiment with this extension, try the <a href="../../samples/RotateMultiple.html">Rotate Multiple</a> sample.
 * @category Tool Extension
 */
class RotateMultipleTool extends go.RotatingTool {
    /**
     * Constructs a RotateMultipleTool and sets the name for the tool.
     */
    constructor(init) {
        super();
        this.name = 'RotateMultiple';
        this._initialInfo = null;
        this._initialAngle = 0;
        this._centerPoint = new go.Point();
        if (init)
            Object.assign(this, init);
    }
    /**
     * Calls {@link go.RotatingTool.doActivate}, and then remembers the center point of the collection,
     * and the initial distances and angles of selected parts to the center.
     */
    doActivate() {
        super.doActivate();
        const diagram = this.diagram;
        // center point of the collection
        this._centerPoint = diagram.computePartsBounds(diagram.selection).center;
        // remember the angle relative to the center point when rotating the whole collection
        this._initialAngle = this._centerPoint.directionPoint(diagram.lastInput.documentPoint);
        // remember initial angle and distance for each Part
        const infos = new go.Map();
        const tool = this;
        diagram.selection.each((part) => {
            tool.walkTree(part, infos);
        });
        this._initialInfo = infos;
        // forget the rotationPoint since we use _centerPoint instead
        this.rotationPoint = new go.Point(NaN, NaN);
    }
    /**
     * @hidden @internal
     */
    walkTree(part, infos) {
        if (part === null || part instanceof go.Link)
            return;
        // distance from _centerPoint to locationSpot of part
        const dist = Math.sqrt(this._centerPoint.distanceSquaredPoint(part.location));
        // calculate initial relative angle
        const dir = this._centerPoint.directionPoint(part.location);
        // saves part-angle combination in array
        infos.set(part, new PartInfo(dir, dist, part.rotateObject.angle));
        // recurse into Groups
        if (part instanceof go.Group) {
            const it = part.memberParts.iterator;
            while (it.next())
                this.walkTree(it.value, infos);
        }
    }
    /**
     * Clean up any references to Parts.
     */
    doDeactivate() {
        this._initialInfo = null;
        super.doDeactivate();
    }
    /**
     * Rotate all selected objects about their collective center.
     * When the control key is held down while rotating, all selected objects are rotated individually.
     */
    rotate(newangle) {
        const diagram = this.diagram;
        if (this._initialInfo === null)
            return;
        const node = this.adornedObject !== null ? this.adornedObject.part : null;
        if (node === null)
            return;
        const e = diagram.lastInput;
        // when rotating individual parts, remember the original angle difference
        const angleDiff = newangle - node.rotateObject.angle;
        const tool = this;
        this._initialInfo.each((kvp) => {
            const part = kvp.key;
            if (part instanceof go.Link)
                return; // only Nodes and simple Parts
            const partInfo = kvp.value;
            // rotate every selected non-Link Part
            // find information about the part set in RotateMultipleTool._initialInformation
            if (e.control || e.meta) {
                if (node === part) {
                    part.rotateObject.angle = newangle;
                }
                else {
                    part.rotateObject.angle += angleDiff;
                }
            }
            else {
                const radAngle = newangle * (Math.PI / 180); // converts the angle traveled from degrees to radians
                // calculate the part's x-y location relative to the central rotation point
                const offsetX = partInfo.distance * Math.cos(radAngle + partInfo.placementAngle);
                const offsetY = partInfo.distance * Math.sin(radAngle + partInfo.placementAngle);
                // move part
                part.location = new go.Point(tool._centerPoint.x + offsetX, tool._centerPoint.y + offsetY);
                // rotate part
                part.rotateObject.angle = partInfo.rotationAngle + newangle;
            }
        });
    }
    /**
     * Calculate the desired angle with different rotation points,
     * depending on whether we are rotating the whole selection as one, or Parts individually.
     * @param newPoint - in document coordinates
     */
    computeRotate(newPoint) {
        const diagram = this.diagram;
        if (this.adornedObject === null)
            return 0.0;
        let angle = 0.0;
        const e = diagram.lastInput;
        if (e.control || e.meta) {
            // relative to the center of the Node whose handle we are rotating
            const part = this.adornedObject.part;
            if (part !== null) {
                const rotationPoint = part.getDocumentPoint(part.locationSpot);
                angle = rotationPoint.directionPoint(newPoint);
            }
        }
        else {
            // relative to the center of the whole selection
            angle = this._centerPoint.directionPoint(newPoint) - this._initialAngle;
        }
        if (angle >= 360)
            angle -= 360;
        else if (angle < 0)
            angle += 360;
        const interval = Math.min(Math.abs(this.snapAngleMultiple), 180);
        const epsilon = Math.min(Math.abs(this.snapAngleEpsilon), interval / 2);
        // if it's close to a multiple of INTERVAL degrees, make it exactly so
        if (!diagram.lastInput.shift && interval > 0 && epsilon > 0) {
            if (angle % interval < epsilon) {
                angle = Math.floor(angle / interval) * interval;
            }
            else if (angle % interval > interval - epsilon) {
                angle = (Math.floor(angle / interval) + 1) * interval;
            }
            if (angle >= 360)
                angle -= 360;
            else if (angle < 0)
                angle += 360;
        }
        return angle;
    }
}
/**
 * Internal class to remember a Part's offset and angle.
 */
class PartInfo {
    constructor(placementAngle, distance, rotationAngle) {
        this.placementAngle = placementAngle * (Math.PI / 180); // in radians
        this.distance = distance;
        this.rotationAngle = rotationAngle; // in degrees
    }
}
