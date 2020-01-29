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
 * FishboneLayout is a custom {@link Layout} derived from {@link TreeLayout} for creating "fishbone" diagrams.
 * A fishbone diagram also requires a {@link Link} class that implements custom routing, {@link FishboneLink}.
 *
 * This only works for angle === 0 or angle === 180.
 *
 * This layout assumes Links are automatically routed in the way needed by fishbone diagrams,
 * by using the FishboneLink class instead of go.Link.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/Fishbone.html">Fishbone Layout</a> sample.
 * @category Layout Extension
 */
export class FishboneLayout extends go.TreeLayout {
    /**
     * Constructs a FishboneLayout and sets the following properties:
     *   - {@link #alignment} = {@link TreeLayout.AlignmentBusBranching}
     *   - {@link #setsPortSpot} = false
     *   - {@link #setsChildPortSpot} = false
     */
    constructor() {
        super();
        this.alignment = go.TreeLayout.AlignmentBusBranching;
        this.setsPortSpot = false;
        this.setsChildPortSpot = false;
    }
    /**
     * Create and initialize a {@link LayoutNetwork} with the given nodes and links.
     * This override creates dummy vertexes, when necessary, to allow for proper positioning within the fishbone.
     * @param {Diagram|Group|Iterable.<Part>} coll A {@link Diagram} or a {@link Group} or a collection of {@link Part}s.
     * @return {LayoutNetwork}
     */
    makeNetwork(coll) {
        // assert(this.angle === 0 || this.angle === 180);
        // assert(this.alignment === go.TreeLayout.AlignmentBusBranching);
        // assert(this.path !== go.TreeLayout.PathSource);
        // call base method for standard behavior
        const net = super.makeNetwork(coll);
        // make a copy of the collection of TreeVertexes
        // because we will be modifying the TreeNetwork.vertexes collection in the loop
        const verts = new go.List().addAll(net.vertexes.iterator);
        verts.each(function (v) {
            // ignore leaves of tree
            if (v.destinationEdges.count === 0)
                return;
            if (v.destinationEdges.count % 2 === 1) {
                // if there's an odd number of real children, add two dummies
                const dummy = net.createVertex();
                dummy.bounds = new go.Rect();
                dummy.focus = new go.Point();
                net.addVertex(dummy);
                net.linkVertexes(v, dummy, null);
            }
            // make sure there's an odd number of children, including at least one dummy;
            // commitNodes will move the parent node to where this dummy child node is placed
            const dummy2 = net.createVertex();
            dummy2.bounds = v.bounds;
            dummy2.focus = v.focus;
            net.addVertex(dummy2);
            net.linkVertexes(v, dummy2, null);
        });
        return net;
    }
    /**
     * Add a direction property to each vertex and modify {@link TreeVertex#layerSpacing}.
     */
    assignTreeVertexValues(v) {
        super.assignTreeVertexValues(v);
        v['_direction'] = 0; // add this property to each TreeVertex
        if (v.parent !== null) {
            // The parent node will be moved to where the last dummy will be;
            // reduce the space to account for the future hole.
            if (v.angle === 0 || v.angle === 180) {
                v.layerSpacing -= v.bounds.width;
            }
            else {
                v.layerSpacing -= v.bounds.height;
            }
        }
    }
    /**
     * Assigns {@link Link#fromSpot}s and {@link Link#toSpot}s based on branching and angle
     * and moves vertexes based on dummy locations.
     */
    commitNodes() {
        if (this.network === null)
            return;
        // vertex Angle is set by BusBranching "inheritance";
        // assign spots assuming overall Angle === 0 or 180
        // and links are always connecting horizontal with vertical
        this.network.edges.each(function (e) {
            const link = e.link;
            if (link === null)
                return;
            link.fromSpot = go.Spot.None;
            link.toSpot = go.Spot.None;
            const v = e.fromVertex;
            const w = e.toVertex;
            if (v.angle === 0) {
                link.fromSpot = go.Spot.MiddleLeft;
            }
            else if (v.angle === 180) {
                link.fromSpot = go.Spot.MiddleRight;
            }
            if (w.angle === 0) {
                link.toSpot = go.Spot.MiddleLeft;
            }
            else if (w.angle === 180) {
                link.toSpot = go.Spot.MiddleRight;
            }
        });
        // move the parent node to the location of the last dummy
        let vit = this.network.vertexes.iterator;
        while (vit.next()) {
            const v = vit.value;
            const len = v.children.length;
            if (len === 0)
                continue; // ignore leaf nodes
            if (v.parent === null)
                continue; // don't move root node
            const dummy2 = v.children[len - 1];
            v.centerX = dummy2.centerX;
            v.centerY = dummy2.centerY;
        }
        const layout = this;
        vit = this.network.vertexes.iterator;
        while (vit.next()) {
            const v = vit.value;
            if (v.parent === null) {
                layout.shift(v);
            }
        }
        // now actually change the Node.location of all nodes
        super.commitNodes();
    }
    /**
     * This override stops links from being committed since the work is done by the {@link FishboneLink} class.
     */
    commitLinks() { }
    /**
     * Shifts subtrees within the fishbone based on angle and node spacing.
     */
    shift(v) {
        const p = v.parent;
        if (p !== null && (v.angle === 90 || v.angle === 270)) {
            const g = p.parent;
            if (g !== null) {
                const shift = v.nodeSpacing;
                if (g['_direction'] > 0) {
                    if (g.angle === 90) {
                        if (p.angle === 0) {
                            v['_direction'] = 1;
                            if (v.angle === 270)
                                this.shiftAll(2, -shift, p, v);
                        }
                        else if (p.angle === 180) {
                            v['_direction'] = -1;
                            if (v.angle === 90)
                                this.shiftAll(-2, shift, p, v);
                        }
                    }
                    else if (g.angle === 270) {
                        if (p.angle === 0) {
                            v['_direction'] = 1;
                            if (v.angle === 90)
                                this.shiftAll(2, -shift, p, v);
                        }
                        else if (p.angle === 180) {
                            v['_direction'] = -1;
                            if (v.angle === 270)
                                this.shiftAll(-2, shift, p, v);
                        }
                    }
                }
                else if (g['_direction'] < 0) {
                    if (g.angle === 90) {
                        if (p.angle === 0) {
                            v['_direction'] = 1;
                            if (v.angle === 90)
                                this.shiftAll(2, -shift, p, v);
                        }
                        else if (p.angle === 180) {
                            v['_direction'] = -1;
                            if (v.angle === 270)
                                this.shiftAll(-2, shift, p, v);
                        }
                    }
                    else if (g.angle === 270) {
                        if (p.angle === 0) {
                            v['_direction'] = 1;
                            if (v.angle === 270)
                                this.shiftAll(2, -shift, p, v);
                        }
                        else if (p.angle === 180) {
                            v['_direction'] = -1;
                            if (v.angle === 90)
                                this.shiftAll(-2, shift, p, v);
                        }
                    }
                }
            }
            else { // g === null: V is a child of the tree ROOT
                const dir = ((p.angle === 0) ? 1 : -1);
                v['_direction'] = dir;
                this.shiftAll(dir, 0, p, v);
            }
        }
        for (let i = 0; i < v.children.length; i++) {
            const c = v.children[i];
            this.shift(c);
        }
    }
    /**
     * Shifts a subtree.
     */
    shiftAll(direction, absolute, root, v) {
        // assert(root.angle === 0 || root.angle === 180);
        let locx = v.centerX;
        locx += direction * Math.abs(root.centerY - v.centerY) / 2;
        locx += absolute;
        v.centerX = locx;
        for (let i = 0; i < v.children.length; i++) {
            const c = v.children[i];
            this.shiftAll(direction, absolute, root, c);
        }
    }
}
/**
 * Custom {@link Link} class for {@link FishboneLayout}.
 * @category Part Extension
 */
export class FishboneLink extends go.Link {
    computeAdjusting() { return this.adjusting; }
    /**
     * Determines the points for this link based on spots and maintains horizontal lines.
     */
    computePoints() {
        const result = super.computePoints();
        if (result) {
            // insert middle point to maintain horizontal lines
            if (this.fromSpot.equals(go.Spot.MiddleRight) || this.fromSpot.equals(go.Spot.MiddleLeft)) {
                let p1;
                // deal with root node being on the "wrong" side
                const fromnode = this.fromNode;
                const fromport = this.fromPort;
                if (fromnode !== null && fromport !== null && fromnode.findLinksInto().count === 0) {
                    // pretend the link is coming from the opposite direction than the declared FromSpot
                    const fromctr = fromport.getDocumentPoint(go.Spot.Center);
                    const fromfar = fromctr.copy();
                    fromfar.x += (this.fromSpot.equals(go.Spot.MiddleLeft) ? 99999 : -99999);
                    p1 = this.getLinkPointFromPoint(fromnode, fromport, fromctr, fromfar, true).copy();
                    // update the route points
                    this.setPoint(0, p1);
                    let endseg = this.fromEndSegmentLength;
                    if (isNaN(endseg))
                        endseg = fromport.fromEndSegmentLength;
                    p1.x += (this.fromSpot.equals(go.Spot.MiddleLeft)) ? endseg : -endseg;
                    this.setPoint(1, p1);
                }
                else {
                    p1 = this.getPoint(1); // points 0 & 1 should be OK already
                }
                const tonode = this.toNode;
                const toport = this.toPort;
                if (tonode !== null && toport !== null) {
                    const toctr = toport.getDocumentPoint(go.Spot.Center);
                    const far = toctr.copy();
                    far.x += (this.fromSpot.equals(go.Spot.MiddleLeft)) ? -99999 / 2 : 99999 / 2;
                    far.y += (toctr.y < p1.y) ? 99999 : -99999;
                    const p2 = this.getLinkPointFromPoint(tonode, toport, toctr, far, false);
                    this.setPoint(2, p2);
                    let dx = Math.abs(p2.y - p1.y) / 2;
                    if (this.fromSpot.equals(go.Spot.MiddleLeft))
                        dx = -dx;
                    this.insertPoint(2, new go.Point(p2.x + dx, p1.y));
                }
            }
            else if (this.toSpot.equals(go.Spot.MiddleRight) || this.toSpot.equals(go.Spot.MiddleLeft)) {
                const p1 = this.getPoint(1); // points 1 & 2 should be OK already
                const fromnode = this.fromNode;
                const fromport = this.fromPort;
                if (fromnode !== null && fromport !== null) {
                    const parentlink = fromnode.findLinksInto().first();
                    const fromctr = fromport.getDocumentPoint(go.Spot.Center);
                    const far = fromctr.copy();
                    far.x += (parentlink !== null && parentlink.fromSpot.equals(go.Spot.MiddleLeft)) ? -99999 / 2 : 99999 / 2;
                    far.y += (fromctr.y < p1.y) ? 99999 : -99999;
                    const p0 = this.getLinkPointFromPoint(fromnode, fromport, fromctr, far, true);
                    this.setPoint(0, p0);
                    let dx = Math.abs(p1.y - p0.y) / 2;
                    if (parentlink !== null && parentlink.fromSpot.equals(go.Spot.MiddleLeft))
                        dx = -dx;
                    this.insertPoint(1, new go.Point(p0.x + dx, p1.y));
                }
            }
        }
        return result;
    }
}
