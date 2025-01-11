/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/AvoidsLinksRouter.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */

/**
 * A custom Router that will cause overlapping segments of Orthogonal or AvoidsNodes links to be routed in parallel,
 * while minimizing resulting crossings between links.
 *
 * The maximum distance that resulting sets of links will be spread apart is given by {@link AvoidsLinksRouter.linkSpacing}.
 *
 * By default the router will reduce the space between parallel segments to prevent them from overlapping nearby Nodes,
 * however this behavior can be disabled by setting {@link AvoidsLinksRouter.avoidsNodes} to false.
 * If that property is set to false, then all modified sets of links will be at a distance of exactly {@link AvoidsLinksRouter.linkSpacing},
 * even if this causes some of the links to overlap a nearby Node.
 *
 * Typical setup:
 * ```
 *   myDiagram.routers.add(new AvoidsLinksRouter());
 * ```
 *
 * If you want to experiment with this extension, try the <a href="../../samples/AvoidsLinksRouter.html">AvoidsLinksRouter</a> sample.
 * @category Router Extension
 */
class AvoidsLinksRouter extends go.Router {
    constructor(init) {
        super();
        this.name = 'AvoidsLinksRouter';
        this._linkSpacing = 4;
        this._allsegs = new go.List();
        this._gridlines = new go.List();
        this._segs = new go.List();
        this._avoidsNodes = true; // whether to aggressively reduce link spacing to avoid node overlaps
        this._epsilonDistance = 0.5;
        this._iterations = 1; // the Router should produce a good result without iterating in most cases, unless there are many coincident segments very close to Nodes
        this._ignoreContainingGroups = false;
        if (init)
            Object.assign(this, init);
    }
    /**
     * Gets or sets the desired distance between Links that are separated by AvoidsLinksRouter.
     * If {@link avoidsNodes} is true, this value is the maximum allowed distance between such links,
     * but the distance could be smaller to avoid overlapping Nodes.
     *
     * The default value is 4.
     */
    get linkSpacing() {
        return this._linkSpacing;
    }
    set linkSpacing(value) {
        if (value !== this._linkSpacing) {
            if (typeof value !== 'number')
                throw new Error('AvoidsLinksRouter.linkSpacing must be a number');
            this._linkSpacing = value;
            this.invalidateRouter();
        }
    }
    /**
     * Gets or sets whether the AvoidsLinksRouter should reduce spacing between separated Links to avoid overlap
     * with nearby Nodes. If {@link avoidsNodes} is false, all separated links will have a distance of exactly {@link linkSpacing},
     * even if this causes them to cross over a nearby Node.
     *
     * The default value is true.
     */
    get avoidsNodes() {
        return this._avoidsNodes;
    }
    set avoidsNodes(value) {
        value = !!value;
        if (value !== this._avoidsNodes) {
            this._avoidsNodes = value;
            this.invalidateRouter();
        }
    }
    /**
     * Gets or sets the minimum distance between links for them to be considered "overlapping" and be separated by
     * AvoidsLinksRouter. Large values of this parameter compared to {@link linkSpacing} can make the resulting
     * groups of segments less evenly-spaced, so it is recommended to use a small value for this parameter - ideally
     * a small fraction of {@link linkSpacing}.
     *
     * The default value is 0.5.
     */
    get epsilonDistance() {
        return this._epsilonDistance;
    }
    set epsilonDistance(value) {
        if (value !== this._epsilonDistance) {
            if (typeof value !== 'number')
                throw new Error('AvoidsLinksRouter.epsilonDistance must be a number');
            this._epsilonDistance = value;
            this.invalidateRouter();
        }
    }
    /**
     * Gets or sets the number of times the AvoidsLinksRouter will run iteratively.
     * In the vast majority of cases, one iteration should be enough and this parameter should not need to be modified.
     * Multiple iterations may be useful when numerous links coincide, particularly when they are close to Nodes with {@link avoidsNodes} set to true.
     *
     * The default value is 1.
     */
    get iterations() {
        return this._iterations;
    }
    set iterations(value) {
        if (value !== this._iterations) {
            if (typeof value !== 'number')
                throw new Error('AvoidsLinksRouter.iterations must be a number');
            this._iterations = value;
            this.invalidateRouter();
        }
    }
    /**
     * Gets or sets whether the router will run only once on the top-level Diagram,
     * considering all links regardless of their containing group.
     *
     * If false, the router will instead separately route the top-level links against
     * links in each Group, which is more efficient but may have undefined results when links
     * route in and out of nested Groups.
     *
     * The default value is false.
     */
    get ignoreContainingGroups() {
        return this._ignoreContainingGroups;
    }
    set ignoreContainingGroups(value) {
        value = !!value;
        if (value !== this._ignoreContainingGroups) {
            this._ignoreContainingGroups = value;
            this.invalidateRouter();
        }
    }
    /**
     * Determine whether the AvoidsLinksRouter should operate on a given collection.
     * See {@link ignoreContainingGroups} for the default behavior.
     * @param {go.Group | go.Diagram} container
     * @returns
     */
    canRoute(container) {
        if (this._ignoreContainingGroups && container instanceof go.Group)
            return false;
        return super.canRoute(container);
    }
    /**
     * Adjust segments of all links in the Diagram to prevent overlap.
     *
     * @param {go.Set<go.Link>} links
     * @param {*} container A Diagram or a Group
     * @returns
     */
    routeLinks(links, container) {
        const diagram = this.diagram;
        if (diagram === null)
            return;
        for (let i = 0; i < this.iterations; i++) {
            this._allsegs = new go.List();
            this._gridlines = new go.List();
            this.collectSegments(links, container);
            let positions = null;
            if (this._avoidsNodes) {
                positions = diagram.getPositions(true, null, null);
            }
            this.adjustOverlaps(positions);
            // free segments used in this calculation
            for (const line of this._allsegs) {
                for (const seg of line)
                    this._freeSegInfo(seg);
            }
            for (const line of this._gridlines) {
                for (const seg of line)
                    this._freeSegInfo(seg);
            }
        }
    }
    /** @internal */
    _allocSegInfo() {
        const si = this._segs.pop();
        if (si)
            return si;
        return new _SegInfo();
    }
    /** @internal */
    _freeSegInfo(si) {
        si.link = null;
        this._segs.push(si);
    }
    /** @internal */
    _coord(si) {
        return si.vertical ? si.link.getPoint(si.indexStart).x : si.link.getPoint(si.indexStart).y;
    }
    /** @internal */
    _columnStart(si) {
        return si.vertical ? si.link.getPoint(si.indexStart).y : si.link.getPoint(si.indexStart).x;
    }
    /** @internal */
    _columnEnd(si) {
        return si.vertical ? si.link.getPoint(si.indexEnd).y : si.link.getPoint(si.indexEnd).x;
    }
    /** @internal */
    nextOrthoBend(link, index) {
        let p = link.getPoint(index);
        let q = link.getPoint(index + 1);
        let i = index;
        const vertical = this.isApprox(p.x, q.x) && !this.isApprox(p.y, q.y);
        while (i < link.pointsCount - 2) {
            i++;
            p = link.getPoint(i);
            q = link.getPoint(i + 1);
            if (vertical !== (this.isApprox(p.x, q.x) && !this.isApprox(p.y, q.y)))
                return i;
        }
        return link.pointsCount - 1;
    }
    /** @internal */
    collectSegments(links, coll) {
        this._allsegs.clear();
        this._gridlines.clear();
        const isDiagram = coll instanceof go.Diagram;
        let p;
        let q;
        let found;
        let i;
        let j;
        let currentseg = this._allocSegInfo();
        let enclosingRect = null;
        // true if all links in the diagram part of the modified collection, thus we don't need to call findPartsIn
        const skipBounds = (coll instanceof go.Diagram && links.count === coll.links.count);
        // add segments of links in the "invalid" links Set
        for (const l of links) {
            if (!this._ignoreContainingGroups && !((isDiagram && l.containingGroup === null) || l.containingGroup === coll))
                continue;
            if (!l.isOrthogonal)
                continue;
            if (!skipBounds) {
                if (enclosingRect === null) {
                    enclosingRect = l.getDocumentBounds();
                }
                else {
                    enclosingRect.unionRect(l.getDocumentBounds());
                }
            }
            i = this.nextOrthoBend(l, 0);
            while (i < l.pointsCount - 1) {
                j = this.nextOrthoBend(l, i);
                if (j === l.pointsCount - 1)
                    break;
                p = l.getPoint(i);
                q = l.getPoint(j);
                const vertical = this.isApprox(p.x, q.x) && !this.isApprox(p.y, q.y);
                const seginfo = this._allocSegInfo();
                seginfo.indexStart = i;
                seginfo.indexEnd = j;
                seginfo.link = l;
                seginfo.vertical = vertical;
                seginfo._computeGeo();
                found = false;
                for (const line of this._allsegs) {
                    if (Math.abs(this._coord(line.first()) - this._coord(seginfo)) < this._epsilonDistance && line.first().vertical === vertical) {
                        found = true;
                        line.add(seginfo);
                        break;
                    }
                }
                if (!found) {
                    this._allsegs.add(new go.List([seginfo]));
                }
                i = j;
            }
        }
        if (coll && enclosingRect !== null && !skipBounds) {
            for (const l of this.diagram.findPartsIn(enclosingRect, true)) {
                if (!(l instanceof go.Link))
                    continue;
                if (!l.isOrthogonal)
                    continue;
                if (links.has(l))
                    continue;
                i = this.nextOrthoBend(l, 0);
                while (i < l.pointsCount - 1) {
                    j = this.nextOrthoBend(l, i);
                    if (j === l.pointsCount - 1)
                        break;
                    p = l.getPoint(i);
                    q = l.getPoint(j);
                    const vertical = this.isApprox(p.x, q.x) && !this.isApprox(p.y, q.y);
                    const coord = vertical ? p.x : p.y;
                    for (const line of this._allsegs) {
                        if (Math.abs(this._coord(line.first()) - coord) < this._epsilonDistance && line.first().vertical === vertical) {
                            const seginfo = this._allocSegInfo();
                            seginfo.indexStart = i;
                            seginfo.indexEnd = j;
                            seginfo.link = l;
                            seginfo.vertical = vertical;
                            seginfo._computeGeo();
                            line.add(seginfo);
                            break;
                        }
                    }
                    i = j;
                }
            }
        }
        // split sets of segments into those which actually overlap
        for (const line of this._allsegs) {
            while (line.count > 0) {
                currentseg = line.pop();
                const newline = new go.List([currentseg]);
                found = true;
                while (found) {
                    found = false;
                    for (const otherseg of newline) {
                        for (const seginfo of line) {
                            const minI = Math.min(this._columnStart(seginfo), this._columnEnd(seginfo));
                            const maxI = Math.max(this._columnStart(seginfo), this._columnEnd(seginfo));
                            const minJ = Math.min(this._columnStart(otherseg), this._columnEnd(otherseg));
                            const maxJ = Math.max(this._columnStart(otherseg), this._columnEnd(otherseg));
                            if (minJ <= maxI && minI <= maxJ && seginfo.link !== otherseg.link) {
                                line.remove(seginfo);
                                newline.push(seginfo);
                                found = true;
                                break;
                            }
                        }
                    }
                }
                this._gridlines.add(newline);
            }
        }
    }
    /** @internal */
    adjustOverlaps(positions) {
        const gridlines = this._gridlines;
        for (const line of gridlines) {
            if (line.size < 2)
                continue;
            const gridline = line.toArray();
            this.sortGridline(gridline);
            const vertical = gridline[0].vertical;
            // assign layers to overlapping segments greedily
            const maxlayer = gridline.length - 1;
            let realSpacing = this._linkSpacing;
            if (this._avoidsNodes && maxlayer > 0) {
                // find the initial bounding box of the newly routed segments in the gridline
                let minColumn = Math.min(this._columnStart(gridline[0]), this._columnEnd(gridline[0])); // x if horizontal
                let maxColumn = Math.max(this._columnStart(gridline[0]), this._columnEnd(gridline[0]));
                const minCoord = this._coord(gridline[0]) - (maxlayer * this._linkSpacing) / 2; // x if vertical
                const maxCoord = this._coord(gridline[0]) + (maxlayer * this._linkSpacing) / 2;
                for (let i = 1; i < gridline.length; i++) {
                    const seg = gridline[i];
                    minColumn = Math.min(minColumn, Math.min(this._columnStart(seg), this._columnEnd(seg)));
                    maxColumn = Math.max(maxColumn, Math.max(this._columnStart(seg), this._columnEnd(seg)));
                }
                // if there are node overlaps, find the minimum spacing that will avoid node overlaps with some padding
                if (vertical) {
                    if (!positions.isUnoccupied(minCoord, minColumn, maxCoord - minCoord, maxColumn - minColumn)) {
                        const availSpace = positions.maxAvoidsLinksSpaceV(minColumn, maxColumn, this._coord(gridline[0]), maxCoord - minCoord);
                        realSpacing = Math.min(this._linkSpacing, (2 * availSpace) / (1 + maxlayer));
                    }
                }
                else {
                    if (!positions.isUnoccupied(minColumn, minCoord, maxColumn - minColumn, maxCoord - minCoord)) {
                        const availSpace = positions.maxAvoidsLinksSpaceH(minColumn, maxColumn, this._coord(gridline[0]), maxCoord - minCoord);
                        realSpacing = Math.min(this._linkSpacing, (2 * availSpace) / (1 + maxlayer));
                    }
                }
                if (realSpacing === 0)
                    realSpacing = this._linkSpacing;
            }
            // now that segment layers have been found, reroute segments according to their layer
            for (let i = 0; i < gridline.length; i++) {
                const seg = gridline[i];
                if (seg.link === null)
                    continue;
                const newcoord = this._coord(seg) + (i - maxlayer / 2) * realSpacing;
                seg.link.startRoute();
                for (let j = seg.indexStart; j <= seg.indexEnd; j++) {
                    if (vertical) {
                        seg.link.setPoint(j, new go.Point(newcoord, seg.link.getPoint(j).y));
                    }
                    else {
                        seg.link.setPoint(j, new go.Point(seg.link.getPoint(j).x, newcoord));
                    }
                }
                seg.link.commitRoute();
            }
        }
    }
    /** @internal */
    partialSort(arr, start, end, f) {
        const preSorted = arr.slice(0, start);
        const postSorted = arr.slice(end);
        const sorted = arr.slice(start, end).sort(f);
        arr.length = 0;
        // eslint-disable-next-line prefer-spread
        arr.push.apply(arr, preSorted.concat(sorted).concat(postSorted));
        return arr;
    }
    /** @internal */
    endpointComparer(seg1, seg2) {
        const start1 = Math.min(this._columnStart(seg1), this._columnEnd(seg1));
        const end1 = Math.max(this._columnStart(seg1), this._columnEnd(seg1));
        const start2 = Math.min(this._columnStart(seg2), this._columnEnd(seg2));
        const end2 = Math.max(this._columnStart(seg2), this._columnEnd(seg2));
        const startEqual = this.isApprox(start1, start2);
        const endEqual = this.isApprox(end1, end2);
        const geo = seg1.geo;
        let result = 0;
        if (start2 <= start1 && end1 <= end2) {
            if (geo === 0 && startEqual)
                result = 1;
            else if (geo === 0 && endEqual)
                result = -1;
            else if (geo === 1 && startEqual)
                result = -1;
            else if (geo === 1 && endEqual)
                result = 1;
            else if (geo === 2)
                result = 1;
            else if (geo === 3)
                result = -1;
        }
        else if (start1 <= start2 && end2 <= end1) {
            if (geo === 0 && startEqual)
                result = -1;
            else if (geo === 0 && endEqual)
                result = 1;
            else if (geo === 1 && startEqual)
                result = 1;
            else if (geo === 1 && endEqual)
                result = -1;
            else if (geo === 2)
                result = -1;
            else if (geo === 3)
                result = 1;
        }
        else if (start2 <= start1 && end2 <= end1) {
            if (geo === 0)
                result = -1;
            else if (geo === 1)
                result = 1;
        }
        else if (start1 <= start2 && end1 <= end2) {
            if (geo === 0)
                result = 1;
            else if (geo === 1)
                result = -1;
        }
        // if this returns 0, a crossing between the two segments is unavoidable
        return result;
    }
    /** @internal */
    sortGridline(gridline) {
        // first sort all segments according to their seginfo.geo value,
        // so that segments with the same geometry can be sorted against each other
        gridline.sort((seg1, seg2) => seg2.geo - seg1.geo);
        // find number of segments with each geometry
        let numGeo0 = 0;
        let numGeo1 = 0;
        let numGeo2 = 0;
        let numGeo3 = 0;
        for (let i = 0; i < gridline.length; i++) {
            switch (gridline[i].geo) {
                case 0:
                    numGeo0++;
                    break;
                case 1:
                    numGeo1++;
                    break;
                case 2:
                    numGeo2++;
                    break;
                case 3:
                    numGeo3++;
                    break;
            }
        }
        const n1 = numGeo0;
        const n2 = numGeo0 + numGeo1;
        const n3 = numGeo0 + numGeo1 + numGeo2;
        const n4 = numGeo0 + numGeo1 + numGeo2 + numGeo3;
        // sort segments with geo = 0
        if (numGeo0 > 1) {
            this.partialSort(gridline, 0, n1, (seg1, seg2) => this.endpointComparer(seg1, seg2));
        }
        // sort segments with geo = 1
        if (numGeo1 > 1) {
            this.partialSort(gridline, n1, n2, (seg1, seg2) => this.endpointComparer(seg1, seg2));
        }
        // sort segments with geo = 2
        if (numGeo2 > 1) {
            this.partialSort(gridline, n2, n3, (seg1, seg2) => this.endpointComparer(seg1, seg2));
        }
        // sort segments with geo = 3
        if (numGeo3 > 1) {
            this.partialSort(gridline, n3, n4, (seg1, seg2) => this.endpointComparer(seg1, seg2));
        }
    }
    /** @hidden */
    isApprox(a, b) {
        const d = a - b;
        return d > -0.5 && d < 0.5;
    }
}
/** @internal */
class _SegInfo {
    constructor() {
        this.vertical = false; // true if the segment is vertical, false if horizontal
        this.indexStart = NaN;
        this.indexEnd = NaN;
        this.link = null;
        this.geo = 0; // geometry of the segment. horizontally, 0 = down->over->down, 1 = up->over->up, 2 = up->over->down, 3 = down->over->up
    }
    // generic compute this.geo
    _computeGeo() {
        if (this.vertical)
            this._computeGeoV();
        else
            this._computeGeoH();
    }
    // compute this.geo if horizontal
    _computeGeoH() {
        if (this.link === null)
            return;
        // j1 and j2 are the indices of the next orthogonal bends (not necessarily the next point if there are redundant link points)
        let j1 = this.indexStart - 1;
        let j2 = this.indexEnd + 1;
        while (j1 > 0 && Math.abs(this.link.getPoint(j1).x - this.link.getPoint(j1 - 1).x) < 0.5)
            j1--;
        while (j2 < this.link.pointsCount - 1 &&
            Math.abs(this.link.getPoint(j2).x - this.link.getPoint(j2 + 1).x) < 0.5) {
            j2++;
        }
        const y1 = this.link.getPoint(j1).y;
        const y2 = this.link.getPoint(j2).y;
        const coord = this.link.getPoint(this.indexStart).y;
        const columnStart = this.link.getPoint(this.indexStart).x;
        const columnEnd = this.link.getPoint(this.indexEnd + 1).x;
        if (columnStart < columnEnd) {
            if (y1 < coord && y2 > coord)
                this.geo = 0;
            else if (y1 > coord && y2 < coord)
                this.geo = 1;
            else if (y1 > coord && y2 > coord)
                this.geo = 2;
            else if (y1 < coord && y2 < coord)
                this.geo = 3;
        }
        else {
            if (y2 < coord && y1 > coord)
                this.geo = 0;
            else if (y2 > coord && y1 < coord)
                this.geo = 1;
            else if (y2 > coord && y1 > coord)
                this.geo = 2;
            else if (y2 < coord && y1 < coord)
                this.geo = 3;
        }
    }
    // compute this.geo if vertical
    _computeGeoV() {
        if (this.link === null)
            return;
        // j1 and j2 are the indices of the next orthogonal bends (not necessarily the next point if there are redundant link points)
        let j1 = this.indexStart - 1;
        let j2 = this.indexEnd + 1;
        while (j1 > 0 && Math.abs(this.link.getPoint(j1).y - this.link.getPoint(j1 - 1).y) < 0.5)
            j1--;
        while (j2 < this.link.pointsCount - 1 &&
            Math.abs(this.link.getPoint(j2).y - this.link.getPoint(j2 + 1).y) < 0.5) {
            j2++;
        }
        const x1 = this.link.getPoint(j1).x;
        const x2 = this.link.getPoint(j2).x;
        const coord = this.link.getPoint(this.indexStart).x;
        const columnStart = this.link.getPoint(this.indexStart).y;
        const columnEnd = this.link.getPoint(this.indexEnd + 1).y;
        if (columnStart < columnEnd) {
            if (x1 < coord && x2 > coord)
                this.geo = 0;
            else if (x1 > coord && x2 < coord)
                this.geo = 1;
            else if (x1 > coord && x2 > coord)
                this.geo = 2;
            else if (x1 < coord && x2 < coord)
                this.geo = 3;
        }
        else {
            if (x2 < coord && x1 > coord)
                this.geo = 0;
            else if (x2 > coord && x1 < coord)
                this.geo = 1;
            else if (x2 > coord && x1 > coord)
                this.geo = 2;
            else if (x2 < coord && x1 < coord)
                this.geo = 3;
        }
    }
} // end of _SegInfo
