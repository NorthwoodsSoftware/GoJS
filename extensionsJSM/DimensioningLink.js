/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/
/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/
import * as go from '../release/go-module.js';
/**
 * A custom routed {@link Link} for showing the distances between a point on one node and a point on another node.
 *
 * Note that because this is a Link, the points being measured must be on {@link Node}s, not simple {@link Part}s.
 * The exact point on each Node is determined by the {@link Link#fromSpot} and {@link Link#toSpot}.
 *
 * Several properties of the DimensioningLink customize the appearance of the dimensioning:
 * {@link #direction}, for orientation of the dimension line and which side it is on,
 * {@link #extension}, for how far the dimension line is from the measured points,
 * {@link #inset}, for leaving room for a text label, and
 * {@link #gap}, for distance that the extension line starts from the measured points.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/Dimensioning.html">Dimensioning</a> sample.
 * @category Part Extension
 */
export class DimensioningLink extends go.Link {
    /**
     * Constructs a DimensioningLink and sets the following properties:
     *   - {@link #isLayoutPositioned} = false
     *   - {@link #isTreeLink} = false
     *   - {@link #routing} = {@link Link.Orthogonal}
     */
    constructor() {
        super();
        this._direction = 0;
        this._extension = 30;
        this._inset = 10;
        this._gap = 10;
        this.isLayoutPositioned = false;
        this.isTreeLink = false;
        this.routing = go.Link.Orthogonal;
    }
    /**
     * Copies properties to a cloned DimensioningLink.
     */
    cloneProtected(copy) {
        super.cloneProtected(copy);
        copy._direction = this._direction;
        copy._extension = this._extension;
        copy._inset = this._inset;
        copy._gap = this._gap;
    }
    /**
     * The general angle at which the measurement should be made.
     *
     * The default value is 0, meaning to go measure only along the X axis,
     * with the dimension line and label above the two nodes (at lower Y coordinates).
     * New values must be one of: 0, 90, 180, 270, or NaN.
     * The value NaN indicates that the measurement is point-to-point and not orthogonal.
     */
    get direction() { return this._direction; }
    set direction(val) {
        if (isNaN(val) || val === 0 || val === 90 || val === 180 || val === 270) {
            this._direction = val;
        }
        else {
            throw new Error('DimensioningLink: invalid new direction: ' + val);
        }
    }
    /**
     * The distance at which the dimension line should be from the points being measured.
     *
     * The default value is 30.
     * Larger values mean further away from the nodes.
     * The new value must be greater than or equal to zero.
     */
    get extension() { return this._extension; }
    set extension(val) { this._extension = val; }
    /**
     * The distance that the dimension line should be "indented" from the ends of the
     * extension lines that are orthogonal to the dimension line.
     *
     * The default value is 10.
     */
    get inset() { return this._inset; }
    set inset(val) {
        if (val >= 0) {
            this._inset = val;
        }
        else {
            throw new Error('DimensionLink: invalid new inset: ' + val);
        }
    }
    /**
     * The distance that the extension lines should come short of the measured points.
     *
     * The default value is 10.
     */
    get gap() { return this._gap; }
    set gap(val) {
        if (val >= 0) {
            this._gap = val;
        }
        else {
            throw new Error('DimensionLink: invalid new gap: ' + val);
        }
    }
    /**
     * Constructs the link's route by modifying {@link #points}.
     * @return {boolean} true if it computed a route of points
     */
    computePoints() {
        const fromnode = this.fromNode;
        if (!fromnode)
            return false;
        const fromport = this.fromPort;
        const fromspot = this.computeSpot(true);
        const tonode = this.toNode;
        if (!tonode)
            return false;
        const toport = this.toPort;
        const tospot = this.computeSpot(false);
        const frompoint = this.getLinkPoint(fromnode, fromport, fromspot, true, true, tonode, toport);
        if (!frompoint.isReal())
            return false;
        const topoint = this.getLinkPoint(tonode, toport, tospot, false, true, fromnode, fromport);
        if (!topoint.isReal())
            return false;
        this.clearPoints();
        let ang = this.direction;
        if (isNaN(ang)) {
            ang = frompoint.directionPoint(topoint);
            const p = new go.Point(this.extension, 0);
            p.rotate(ang + 90);
            const q = new go.Point(this.extension - this.inset, 0);
            q.rotate(ang + 90);
            const g = new go.Point(this.gap, 0);
            g.rotate(ang + 90);
            this.addPointAt(frompoint.x + g.x, frompoint.y + g.y);
            this.addPointAt(frompoint.x + p.x, frompoint.y + p.y);
            this.addPointAt(frompoint.x + q.x, frompoint.y + q.y);
            this.addPointAt(topoint.x + q.x, topoint.y + q.y);
            this.addPointAt(topoint.x + p.x, topoint.y + p.y);
            this.addPointAt(topoint.x + g.x, topoint.y + g.y);
        }
        else {
            const dist = this.extension;
            let r = 0.0;
            let s = 0.0;
            let t0 = 0.0;
            let t1 = 0.0;
            if (ang === 0 || ang === 180) {
                if (ang === 0) {
                    r = Math.min(frompoint.y, topoint.y) - this.extension;
                    s = r + this.inset;
                    t0 = frompoint.y - this.gap;
                    t1 = topoint.y - this.gap;
                }
                else {
                    r = Math.max(frompoint.y, topoint.y) + this.extension;
                    s = r - this.inset;
                    t0 = frompoint.y + this.gap;
                    t1 = topoint.y + this.gap;
                }
                this.addPointAt(frompoint.x, t0);
                this.addPointAt(frompoint.x + 0.01, r);
                this.addPointAt(frompoint.x, s);
                this.addPointAt(topoint.x, s);
                this.addPointAt(topoint.x - 0.01, r);
                this.addPointAt(topoint.x, t1);
            }
            else if (ang === 90 || ang === 270) {
                if (ang === 90) {
                    r = Math.max(frompoint.x, topoint.x) + this.extension;
                    s = r - this.inset;
                    t0 = frompoint.x + this.gap;
                    t1 = topoint.x + this.gap;
                }
                else {
                    r = Math.min(frompoint.x, topoint.x) - this.extension;
                    s = r + this.inset;
                    t0 = frompoint.x - this.gap;
                    t1 = topoint.x - this.gap;
                }
                this.addPointAt(t0, frompoint.y);
                this.addPointAt(r, frompoint.y + 0.01);
                this.addPointAt(s, frompoint.y);
                this.addPointAt(s, topoint.y);
                this.addPointAt(r, topoint.y - 0.01);
                this.addPointAt(t1, topoint.y);
            }
        }
        this.updateTargetBindings();
        return true;
    }
}
