/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/LinkLabelRouter.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

/**
 * A custom Router for reducing overlaps between label objects on links by moving them apart with a custom ForceDirectedLayout.
 * You can modify the properties of that Layout by setting {@link layoutProps} in the constructor.
 *
 * By default, this router considers a "link label" to be any GraphObject that is part of a {@link Link} which is not a path Shape
 * or an arrowhead. You can customize objects that the router operates on by overriding {@link LinkLabelRouter.isLabel}.
 *
 * This Router will override the {@link Spot.offsetX} and {@link Spot.offsetY} of the {@link GraphObject.alignmentFocus} value for all link labels.
 *
 * Typical setup:
 * ```
 *   myDiagram.routers.add(new LinkLabelRouter({
 *      layoutProps: {
 *        defaultElectricalCharge: 100,
 *        ...
 *      }
 *   }));
 * ```
 *
 * If you want to experiment with this extension, try the <a href="../../samples/LinkLabelRouter.html">LinkLabelRouter</a> sample.
 * @category Router Extension
 */
class LinkLabelRouter extends go.Router {
    constructor(init) {
        super();
        this.name = 'LinkLabelRouter';
        this.isRealtime = false;
        this._margin = new go.Margin();
        if (init)
            Object.assign(this, init);
        if (init === null || init === void 0 ? void 0 : init.layoutProps) {
            this._layoutProps = init.layoutProps;
            this.layout = new LabelLayout(init.layoutProps);
        }
        else {
            this._layoutProps = {};
            this.layout = new LabelLayout();
        }
        this.layout.router = this;
    }
    /**
     * Properties of the underlying custom {@link ForceDirectedLayout} for this router.
     */
    get layoutProps() {
        return this._layoutProps;
    }
    set layoutProps(value) {
        if (value !== this._layoutProps) {
            this._layoutProps = value;
            this.layout = new LabelLayout(this._layoutProps);
            this.layout.router = this;
            this.invalidateRouter();
        }
    }
    /**
     * Margin that will be applied to each link label when checking for overlaps.
     * The default value is 0 on all sides.
     */
    get margin() {
        return this._margin;
    }
    set margin(value) {
        if (value !== this._margin) {
            this._margin = value;
            this.invalidateRouter();
        }
    }
    /**
     * Determines which GraphObjects in {@link Panel.elements} list of each link should be treated as labels.
     * By default this consists of all objects that are not the "main path" of the link, and are not fromArrows or toArrows.
     *
     * @param { go.GraphObject } obj
     * @returns
     */
    isLabel(obj) {
        if (!obj)
            return false;
        const link = obj.panel;
        if (obj.panel === null)
            return false;
        if (link instanceof go.Link) {
            if (obj instanceof go.Shape && (obj.isPanelMain || obj.panel.findMainElement() === obj || obj.fromArrow !== 'None' || obj.toArrow !== 'None')) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    }
    /**
     * Determine if the LinkLabelRouter should run on a given collection.
     * By default only run once on the whole Diagram, never on Groups
     *
     * @param { go.Diagram | go.Group } container
     * @returns
     */
    canRoute(container) {
        if (container instanceof go.Group)
            return false;
        return super.canRoute(container);
    }
    /**
     * Attempt to move link label objects to avoid overlaps, if necessary.
     *
     * @param {go.Set<go.Link>} links
     * @param {*} container A Diagram or a Group
     * @returns
     */
    routeLinks(links, container) {
        if (this.layout === null)
            return;
        if (container instanceof go.Group)
            return;
        this.layout.activeSet = links;
        if (container instanceof go.Diagram)
            this.layout.diagram = container;
        this.layout.doLayout(container.links);
        if (this.layout.network === null)
            return;
        for (const vertex of this.layout.network.vertexes) {
            if (!(vertex instanceof LabelVertex))
                continue;
            if (vertex.isFixed)
                continue;
            const object = vertex.object;
            if (!object)
                continue;
            const x = isNaN(object.alignmentFocus.x) ? 0.5 : object.alignmentFocus.x;
            const y = isNaN(object.alignmentFocus.y) ? 0.5 : object.alignmentFocus.y;
            const dx = vertex.centerX - vertex.objectBounds.centerX;
            const dy = vertex.centerY - vertex.objectBounds.centerY;
            // moving alignmentFocus.offsetX/Y by some amount moves the node in the opposite direction, thus -dx and -dy
            object.alignmentFocus = new go.Spot(x, y, -dx, -dy);
        }
    }
}
/** @hidden @internal */
class LabelVertex extends go.ForceDirectedVertex {
    constructor(network) {
        super(network);
        this.object = null;
        this.objectBounds = null;
        this.currentBounds = null;
        this.isDummy = false;
    }
}
/** @hidden @internal */
class LabelLayout extends go.ForceDirectedLayout {
    constructor(init) {
        super();
        /** @hidden */ this.router = null;
        /** @hidden */ this.activeSet = null;
        if (init)
            Object.assign(this, init);
    }
    /**
     * we should not ever do a prelayout on this virtual, "fake" force-directed network
     */
    needsPrelayout() {
        return false;
    }
    /**
     * Keep track of the current bounding box of the link label on each node when moving its associated LabelVertex.
     *
     * @param { LabelVertex } v
     */
    moveVertex(v) {
        const result = super.moveVertex(v);
        v.currentBounds.offset(v.centerX - v.currentBounds.centerX, v.centerY - v.currentBounds.centerY);
        return result;
    }
    /**
     * Only allow interaction between two nodes if their associated GraphObjects are currently intersecting.
     *
     * @param { LabelVertex } v1
     * @param { LabelVertex } v2
     */
    shouldInteract(v1, v2) {
        if (v1.isDummy || v2.isDummy)
            return false;
        const b1 = v1.currentBounds;
        const b2 = v2.currentBounds;
        return b1.intersectsRect(b2);
    }
    makeNetwork(coll) {
        var _a;
        const net = new go.ForceDirectedNetwork(this);
        let allparts;
        if (coll instanceof go.Diagram) {
            allparts = coll.links;
        }
        else if (coll instanceof go.Group) {
            allparts = coll.memberParts;
        }
        else {
            allparts = coll;
        }
        for (const part of allparts) {
            if (!(part instanceof go.Link))
                continue;
            part.ensureBounds();
            for (const label of part.elements) {
                if (!this.router.isLabel(label))
                    continue;
                const margin = this.router.margin;
                const documentBounds = label.getDocumentBounds()
                    .offset(label.alignmentFocus.offsetX, label.alignmentFocus.offsetY);
                // add margin to "real" document bounds
                if (margin instanceof go.Margin) {
                    documentBounds.addMargin(margin);
                }
                else {
                    documentBounds.grow(margin, margin, margin, margin);
                }
                if ((_a = this.activeSet) === null || _a === void 0 ? void 0 : _a.has(part)) {
                    // add vertex for label node
                    const v1 = new LabelVertex(net);
                    v1.centerX = documentBounds.centerX;
                    v1.centerY = documentBounds.centerY;
                    v1.width = documentBounds.width;
                    v1.height = documentBounds.height;
                    v1.object = label;
                    v1.objectBounds = documentBounds.copy();
                    v1.currentBounds = documentBounds.copy();
                    net.addVertex(v1);
                    // add vertex for fixed dummy node at the label's original position
                    const v2 = new LabelVertex(net);
                    v2.centerX = v1.centerX;
                    v2.centerY = v1.centerY;
                    v2.charge = 0;
                    v2.isFixed = true;
                    v2.isDummy = true;
                    net.addVertex(v2);
                    // add edge to incentivize the Label to stay near its original position
                    const e = new go.ForceDirectedEdge(net);
                    e.length = 0;
                    e.fromVertex = v1;
                    e.toVertex = v2;
                    net.addEdge(e);
                }
                else {
                    const v = new LabelVertex(net);
                    v.centerX = documentBounds.centerX;
                    v.centerY = documentBounds.centerY;
                    v.width = documentBounds.width;
                    v.height = documentBounds.height;
                    v.object = label;
                    v.objectBounds = documentBounds.copy();
                    v.currentBounds = documentBounds.copy();
                    v.isFixed = true;
                    net.addVertex(v);
                }
            }
        }
        return net;
    }
}
